"use client";

import { useEffect, useRef } from "react";
import { ballHandoff, scrolledAway } from "./ballHandoff";
import { contourGrid, readPalette } from "./landscape";
import { buildTerrain, pointAt, type Descent, type Terrain } from "./terrain";

// topographic terrain drawn behind the text of `targetId`. once you scroll,
// the ball from the hero animation rolls out of it and down this terrain:
// swerving around hills, looping through valleys, and finally spiralling
// into the global minimum at the bottom of the page. scrolling back up
// rewinds it exactly, all the way back into the hero.

const CELL = 8; // px per contour grid cell
const BAND = 320; // contour segments are bucketed into horizontal bands

// contour heights of the hills and valleys. the slope itself isn't drawn,
// so each feature reads as its own rings, like the map in the hero
const LEVELS = [
  ...Array.from({ length: 14 }, (_, i) => -0.18 - i * 0.2), // valleys + funnel
  ...Array.from({ length: 8 }, (_, i) => 0.15 + i * 0.17), // hills
];
const DEEPEST = -0.18 - 13 * 0.2;
const HIGHEST = 0.15 + 7 * 0.17;

type Bands = Map<number, Map<number, number[]>>; // band -> level -> segments

function contours(terrain: Terrain): Bands {
  const { width, height, courseTop } = terrain;
  const nx = Math.ceil(width / CELL);
  const ny = Math.ceil((height - courseTop) / CELL);
  const vals = new Float32Array((nx + 1) * (ny + 1));
  for (let j = 0; j <= ny; j++)
    for (let i = 0; i <= nx; i++)
      vals[j * (nx + 1) + i] = terrain.relief(i * CELL, courseTop + j * CELL);

  const bands: Bands = new Map();
  const segs: number[] = [];
  for (const z of LEVELS) {
    segs.length = 0;
    contourGrid(vals, nx, ny, 0, courseTop, CELL, z, segs);
    for (let s = 0; s < segs.length; s += 4) {
      const band = Math.floor((segs[s + 1] + segs[s + 3]) / 2 / BAND);
      if (!bands.has(band)) bands.set(band, new Map());
      const byLevel = bands.get(band)!;
      if (!byLevel.has(z)) byLevel.set(z, []);
      byLevel.get(z)!.push(segs[s], segs[s + 1], segs[s + 2], segs[s + 3]);
    }
  }
  return bands;
}

export default function PageTerrain({ seed, targetId }: { seed: string; targetId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const canvas = canvasRef.current!;
    if (!target) return;
    const ctx = canvas.getContext("2d")!;

    let palette = readPalette(canvas);
    let terrain: Terrain | null = null;
    let bands: Bands = new Map();
    let descent: Descent | null = null;
    let raf = 0;

    const docHeight = () => document.documentElement.scrollHeight;

    const rebuild = () => {
      const width = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const courseTop = target.getBoundingClientRect().top + window.scrollY;
      terrain = buildTerrain(seed, width, docHeight(), vh, courseTop);
      bands = contours(terrain);
      descent = null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${vh}px`;
      schedule();
    };

    const draw = () => {
      raf = 0;
      if (!terrain) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // the hero owns the ball at the very top; leaving the top hands it over
      // from wherever the hero last drew it
      if (!scrolledAway()) descent = null;
      else if (!descent)
        descent = terrain.descend(ballHandoff.hero ?? [terrain.width / 2, vh * 0.6]);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(0, -scrollY);
      ctx.lineCap = "round";

      // contours, only behind the text (the hero draws its own landscape)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, terrain.courseTop, terrain.width, terrain.height);
      ctx.clip();
      const b0 = Math.floor(scrollY / BAND) - 1, b1 = Math.floor((scrollY + vh) / BAND) + 1;
      for (const z of LEVELS) {
        ctx.beginPath();
        for (let b = b0; b <= b1; b++) {
          const list = bands.get(b)?.get(z);
          if (!list) continue;
          for (let s = 0; s < list.length; s += 4) {
            ctx.moveTo(list[s], list[s + 1]);
            ctx.lineTo(list[s + 2], list[s + 3]);
          }
        }
        // same language as the hero: valleys glow amber, stronger toward the
        // bottom; hills in pale rings, stronger toward their tops. a touch
        // fainter than the hero so the text on top stays easy to read.
        if (z < 0) {
          ctx.strokeStyle = palette.accent;
          ctx.globalAlpha = 0.22 + 0.4 * (z / DEEPEST);
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = palette.fg;
          ctx.globalAlpha = 0.1 + 0.22 * (z / HIGHEST);
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
      ctx.restore();

      if (descent) {
        const progress = Math.min(Math.max(scrollY / Math.max(terrain.height - vh, 1), 0), 1);
        const ball = pointAt(descent, progress);

        // the route so far: grows as you scroll down, shrinks as you scroll up
        ctx.beginPath();
        for (let i = 0; i <= ball.i; i++) {
          const [x, y] = descent.path[i];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(ball.x, ball.y);
        ctx.strokeStyle = palette.accent;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // drawn exactly like the hero's ball, so the handoff is seamless
        ctx.fillStyle = palette.accent;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 150);
    };
    const themeObs = new MutationObserver(() => {
      palette = readPalette(canvas);
      schedule();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // the text reflows as fonts load; the terrain has to match the page
    const ro = new ResizeObserver(onResize);
    ro.observe(target);

    rebuild();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      themeObs.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [seed, targetId]);

  return <canvas ref={canvasRef} className="pt-canvas" aria-hidden />;
}
