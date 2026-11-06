"use client";

import { useEffect, useRef, useState } from "react";
import {
  type Blob,
  type Cam,
  DOMAIN,
  LEVELS,
  Z_MAX,
  Z_MIN,
  contourSegments,
  gauss,
  project,
  readPalette,
} from "./landscape";
import { ballHandoff, scrolledAway } from "./ballHandoff";

// ---------------------------------------------------------------------------
// loss landscape: a soft bowl with a few valleys (wells) and peaks (bumps)
// ---------------------------------------------------------------------------

const BLOBS: Blob[] = [
  { x: -1.4, y: -0.9, a: -1.15, s: 0.75 }, // deepest valley
  { x: 1.3, y: 1.1, a: -0.85, s: 0.65 },
  { x: 1.5, y: -1.4, a: -0.6, s: 0.55 },
  { x: -1.2, y: 1.5, a: -0.5, s: 0.5 },
  { x: 0.2, y: 0.1, a: 0.9, s: 0.7 }, // central peak
  { x: -0.2, y: -2.0, a: 0.55, s: 0.6 },
  { x: 2.3, y: 0.0, a: 0.5, s: 0.55 },
  { x: -2.4, y: 0.4, a: 0.45, s: 0.6 },
];

const GRID = 72;

// optimizer (sgd + momentum)
const LR = 0.012;
const BETA = 0.9;
const STEPS_PER_FRAME = 1;
const SETTLE_FRAMES = 30;

// the mountain the cursor raises
const MOUNTAIN_HEIGHT = 1.3;
const MOUNTAIN_WIDTH = 0.55;

type Cursor = { x: number; y: number; a: number; target: number };

function loss(x: number, y: number, c: Cursor) {
  let z = 0.06 * (x * x + y * y);
  for (const b of BLOBS) z += b.a * gauss(x - b.x, y - b.y, b.s);
  if (c.a > 0.001) z += c.a * gauss(x - c.x, y - c.y, MOUNTAIN_WIDTH);
  return z;
}

function grad(x: number, y: number, c: Cursor): [number, number] {
  const h = 1e-3;
  return [
    (loss(x + h, y, c) - loss(x - h, y, c)) / (2 * h),
    (loss(x, y + h, c) - loss(x, y - h, c)) / (2 * h),
  ];
}

// screen -> point on the (cursor-free) surface: march the camera ray through
// the pixel until it dips below the surface, then bisect. null = missed it.
function unproject(cam: Cam, sx: number, sy: number): [number, number] | null {
  const ct = Math.cos(cam.theta), st = Math.sin(cam.theta);
  const cp = Math.cos(cam.phi), sp = Math.sin(cam.phi);
  const U = (sx - cam.cx) / cam.scale;
  const V = (cam.cy - sy) / cam.scale;
  const noCursor: Cursor = { x: 0, y: 0, a: 0, target: 0 };

  // point on the ray at view depth w -> world (x, y) and height above surface
  const at = (w: number): [number, number, number] => {
    const u = (U * (cam.dist + w)) / cam.focal;
    const v = (V * (cam.dist + w)) / cam.focal;
    const yr = v * sp + w * cp;
    const z = (v * cp - w * sp) / cam.zScale;
    const x = u * ct + yr * st;
    const y = -u * st + yr * ct;
    return [x, y, z - loss(x, y, noCursor)];
  };

  let prev = -6;
  for (let w = -6 + 0.05; w <= 8; w += 0.05) {
    if (at(w)[2] < 0) {
      let lo = prev, hi = w;
      for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        if (at(mid)[2] > 0) lo = mid;
        else hi = mid;
      }
      const [x, y] = at(hi);
      return Math.abs(x) < DOMAIN && Math.abs(y) < DOMAIN ? [x, y] : null;
    }
    prev = w;
  }
  return null;
}

const WELCOME = "welcome to abhi's workshop";

export default function GradientDescentHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [converged, setConverged] = useState(false);
  const [typed, setTyped] = useState(0);

  // typewriter for the welcome line
  useEffect(() => {
    if (!converged) {
      setTyped(0);
      return;
    }
    if (typed >= WELCOME.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), 45);
    return () => clearTimeout(t);
  }, [converged, typed]);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let palette = readPalette(wrap);
    const themeObs = new MutationObserver(() => (palette = readPalette(wrap)));
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const cam: Cam = {
      theta: -0.6,
      phi: 0.95,
      dist: 9,
      focal: 9,
      scale: 1,
      cx: 0,
      cy: 0,
      zScale: 1.3,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cam.cx = width / 2;
      cam.cy = height * 0.54;
      cam.scale = Math.min(width, height * 1.3) / 7.2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const cursor: Cursor = { x: 0, y: 0, a: 0, target: 0 };
    let mouse: [number, number] | null = null;

    // start high up on a slope
    const p = { x: 0.6, y: -2.7, vx: 0, vy: 0 };
    const trail: [number, number][] = [];
    let step = 0;
    let still = 0;
    let isConverged = false;

    const setConv = (v: boolean) => {
      if (v !== isConverged) {
        isConverged = v;
        setConverged(v);
      }
    };

    const optimStep = () => {
      const [gx, gy] = grad(p.x, p.y, cursor);
      p.vx = BETA * p.vx - LR * gx;
      p.vy = BETA * p.vy - LR * gy;
      p.x += p.vx;
      p.y += p.vy;
      // bounce off the walls of the domain
      const lim = DOMAIN - 0.05;
      if (Math.abs(p.x) > lim) { p.x = Math.sign(p.x) * lim; p.vx *= -0.5; }
      if (Math.abs(p.y) > lim) { p.y = Math.sign(p.y) * lim; p.vy *= -0.5; }
      step++;
      if (Math.hypot(gx, gy) < 0.005 && Math.hypot(p.vx, p.vy) < 0.0008) still++;
      else still = 0;
      if (step % 2 === 0) {
        trail.push([p.x, p.y]);
        if (trail.length > 160) trail.shift();
      }
    };

    const isSettled = () => still > SETTLE_FRAMES;

    // reduced motion: settle immediately, no camera drift
    if (reduceMotion) {
      for (let i = 0; i < 5000 && !isSettled(); i++) optimStep();
      setConv(isSettled());
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = [e.clientX - r.left, e.clientY - r.top];
    };
    const onLeave = () => (mouse = null);
    const onDown = () => {
      // click = kick the optimizer
      const ang = Math.random() * Math.PI * 2;
      p.vx += Math.cos(ang) * 0.12;
      p.vy += Math.sin(ang) * 0.12;
      still = 0;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    const vals = new Float32Array((GRID + 1) * (GRID + 1));
    const segs: number[] = [];
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(wrap);

    let t0 = performance.now();

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      const { width, height } = canvas.getBoundingClientRect();

      // once the page is scrolled, the ball belongs to the page terrain:
      // freeze here so it's exactly where we left it when it comes back
      const away = scrolledAway();

      // camera drift
      if (!reduceMotion && !away) cam.theta += dt * 0.04;

      // cursor mountain: rises under the pointer, follows it, sinks when it leaves
      const hit = mouse && unproject(cam, mouse[0], mouse[1]);
      if (hit) {
        if (cursor.a < 0.01) { cursor.x = hit[0]; cursor.y = hit[1]; }
        cursor.x += (hit[0] - cursor.x) * 0.4;
        cursor.y += (hit[1] - cursor.y) * 0.4;
        cursor.target = MOUNTAIN_HEIGHT;
      } else {
        cursor.target = 0;
      }
      cursor.a += (cursor.target - cursor.a) * 0.12;

      if (!away) for (let i = 0; i < STEPS_PER_FRAME; i++) optimStep();
      setConv(isSettled());

      // ---- draw
      ctx.clearRect(0, 0, width, height);

      const n = GRID;
      const stepW = (2 * DOMAIN) / n;
      let zTop = Z_MAX;
      for (let j = 0; j <= n; j++)
        for (let i = 0; i <= n; i++) {
          const v = loss(-DOMAIN + i * stepW, -DOMAIN + j * stepW, cursor);
          vals[j * (n + 1) + i] = v;
          if (v > zTop) zTop = v;
        }

      ctx.lineCap = "round";

      // floor shadow + lifted contours
      // evenly spaced levels; extra ones above Z_MAX ring the cursor's mountain
      const levelStep = (Z_MAX - Z_MIN) / LEVELS;
      for (let l = 0; Z_MIN + (l + 0.5) * levelStep < zTop; l++) {
        const level = Z_MIN + (l + 0.5) * levelStep;
        segs.length = 0;
        contourSegments(vals, n, level, segs);
        if (!segs.length) continue;
        const tNorm = Math.min(l / (LEVELS - 1), 1);

        // shadow on the floor
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          const [ax, ay] = project(cam, segs[s], segs[s + 1], Z_MIN - 0.35);
          const [bx, by] = project(cam, segs[s + 2], segs[s + 3], Z_MIN - 0.35);
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = palette.muted;
        ctx.globalAlpha = 0.12;
        ctx.lineWidth = 1;
        ctx.stroke();

        // the level itself, floating at its height
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          const [ax, ay] = project(cam, segs[s], segs[s + 1], level);
          const [bx, by] = project(cam, segs[s + 2], segs[s + 3], level);
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
        // valleys glow in the accent color, peaks fade into the foreground
        ctx.strokeStyle = tNorm < 0.35 ? palette.accent : palette.fg;
        ctx.globalAlpha = tNorm < 0.35 ? 0.85 - tNorm : 0.18 + 0.35 * tNorm;
        ctx.lineWidth = tNorm < 0.35 ? 1.4 : 1;
        ctx.stroke();
      }

      // trail
      ctx.beginPath();
      trail.forEach(([tx, ty], i) => {
        const [sx, sy] = project(cam, tx, ty, loss(tx, ty, cursor) + 0.02);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.strokeStyle = palette.accent;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ball + drop line to the floor
      const z = loss(p.x, p.y, cursor);
      const [bx, by] = project(cam, p.x, p.y, z);
      const [fx, fy] = project(cam, p.x, p.y, Z_MIN - 0.35);
      if (!away) {
        ballHandoff.hero = [bx, by + wrap.getBoundingClientRect().top + window.scrollY];
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = palette.muted;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.globalAlpha = 0.25;
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.arc(bx, by, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(bx, by, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // cursor ring
      if (cursor.a > 0.05) {
        const [cx, cy] = project(cam, cursor.x, cursor.y, loss(cursor.x, cursor.y, cursor));
        ctx.globalAlpha = Math.min(cursor.a, 0.6);
        ctx.strokeStyle = palette.fg;
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;


      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <section ref={wrapRef} className="gd-hero">
      <canvas ref={canvasRef} className="gd-canvas" aria-label="gradient descent finding a local minimum on a loss landscape" />

      <div className="gd-overlay">
        <h1 className={`gd-welcome ${converged ? "is-on" : ""}`} aria-live="polite">
          {WELCOME.slice(0, typed)}
          <span className="gd-caret">▍</span>
        </h1>
        <a href="#abhi-md" className={`gd-scroll ${converged && typed >= WELCOME.length ? "is-on" : ""}`}>
          ↓ read abhi.md
        </a>
      </div>

      <div className="gd-hints">
        <span>move your cursor to raise a mountain</span>
        <span aria-hidden>·</span>
        <span>click to kick the ball</span>
      </div>
    </section>
  );
}

