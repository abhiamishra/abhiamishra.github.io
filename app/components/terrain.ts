// the terrain behind the home page: a hillside running the full height of
// the document, scattered with round hills and valleys. coordinates are
// document pixels.
//
//   hills    the ball swerves around them, sometimes rolling partway up
//   valleys  shallow enough not to trap it, deep enough to pull it into loops
//   funnel   the global minimum at the bottom; it spirals in and settles
//
// above `courseTop` (the hero) is plain slope, so the ball from the hero
// animation can roll out of it into the field from wherever it is.

import { rng } from "./landscape";

const U = 100; // px per terrain unit
const SLOPE = 0.25; // downhill pull toward the bottom of the page
const LR = 0.006;
const BETA = 0.985; // low friction, so the ball carries momentum into loops

type Bump = { x: number; y: number; a: number; s: number }; // a > 0 hill, a < 0 valley

export type Terrain = {
  width: number;
  height: number;
  courseTop: number;
  // height of the hills and valleys alone (no slope, no walls): contours of
  // this draw each one as its own set of concentric circles
  relief: (xPx: number, yPx: number) => number;
  descend: (startPx: [number, number]) => Descent;
};

export type Descent = {
  path: [number, number][]; // in px
  param: number[]; // 0..1 per path point; scroll progress maps onto this
};

const gauss2 = (d2: number, s: number) => Math.exp(-d2 / (2 * s * s));

export function buildTerrain(
  seed: string,
  width: number,
  height: number,
  viewport: number,
  courseTop: number,
): Terrain {
  const WX = width / U / 2; // x in [-WX, WX]
  const LY = height / U;
  const top = courseTop / U + 0.6;
  const goal: [number, number] = [0, LY - (viewport * 0.45) / U];
  const funnel: Bump = { x: goal[0], y: goal[1], a: -3, s: 1.9 };
  // a layout has to work wherever the hero leaves the ball
  const starts: [number, number][] = [0.5, 0.25, 0.75].map((fx) => [
    (fx - 0.5) * 2 * WX,
    (viewport * 0.6) / U,
  ]);

  const ATTEMPTS = 40;
  const KEEP = 6;
  let best: { terrain: Terrain; score: number } | null = null;
  let found = 0;

  for (let attempt = 0; attempt <= ATTEMPTS && found < KEEP; attempt++) {
    if (attempt === ATTEMPTS && best) break;
    const r = rng(`${seed}:${Math.round(width)}x${Math.round(height)}:${attempt}`);

    // scatter circles down the page, row by row, kept apart so each one
    // reads as its own set of rings. the final attempt (fallback for screens
    // too narrow for anything) is an empty slope.
    const bumps: Bump[] = [];
    for (let y = top + 0.8; attempt < ATTEMPTS && WX > 3 && y < goal[1] - 3.2; y += 1.6 + r() * 0.9) {
      const n = 1 + Math.floor(r() * (WX > 6 ? 3 : 2));
      for (let k = 0; k < n; k++) {
        const hill = r() < 0.55;
        const b: Bump = hill
          ? { x: 0, y: y + r() * 0.6, a: 0.6 + r() * 0.7, s: 0.5 + r() * 0.5 }
          : { x: 0, y: y + r() * 0.6, a: -(0.55 + r() * 0.4), s: 0.6 + r() * 0.5 };
        for (let tries = 0; tries < 12; tries++) {
          b.x = (r() * 2 - 1) * (WX - 1);
          // close enough to merge into organic shapes, like the hero's map
          if (bumps.every((o) => Math.hypot(o.x - b.x, o.y - b.y) > 1.4 * (o.s + b.s))) {
            bumps.push(b);
            break;
          }
        }
      }
    }

    // walls at the page edges and past the goal keep the ball on the page,
    // and a gentle bowl across the page stops it riding along an edge
    const walls = (x: number, y: number) => {
      const over = Math.abs(x) - (WX - 0.4);
      const bowl = 0.6 * (x / WX) ** 4;
      return bowl + (over > 0 ? 3 * over * over : 0) + (y > goal[1] ? 0.35 * (y - goal[1]) ** 2 : 0);
    };

    const features = (x: number, y: number) => {
      let z = funnel.a * gauss2((x - funnel.x) ** 2 + (y - funnel.y) ** 2, funnel.s);
      for (const b of bumps) {
        const dy = y - b.y;
        if (dy > 3 || dy < -3) continue;
        z += b.a * gauss2((x - b.x) ** 2 + dy * dy, b.s);
      }
      return z;
    };

    const fu = (x: number, y: number) => -SLOPE * y + walls(x, y) + features(x, y);

    // must reach the bottom from every start; score by how much it loops
    // and weaves (total turning) on the way down
    let ok = true;
    let score = 0;
    for (const start of starts) {
      const path = simulate(fu, start, WX, LY, goal);
      const [ex, ey] = path[path.length - 1];
      if (Math.hypot(ex - goal[0], ey - goal[1]) > 1) { ok = false; break; }
      score += turning(path, goal[1] - 3);
      if (maxLoopsInStretch(path, goal[1] - 3) > 2) ok = false;
    }
    if (!ok && attempt < ATTEMPTS) continue;
    found++;
    if (best && score <= best.score) continue;

    best = {
      score,
      terrain: {
        width,
        height,
        courseTop,
        relief: (xPx, yPx) => features(xPx / U - WX, yPx / U),
        descend: ([sx, sy]) => {
          const path = simulate(fu, [sx / U - WX, sy / U], WX, LY, goal).map(
            ([x, y]) => [(x + WX) * U, y * U] as [number, number],
          );
          return { path, param: parametrize(path) };
        },
      },
    };
  }
  return best!.terrain;
}

// the most turning packed into any 4-unit stretch of the page (above the
// funnel), in turns. a pile-up here reads as the ball going round and round
function maxLoopsInStretch(path: [number, number][], untilY: number) {
  const bands = new Map<number, number>();
  for (let i = 2; i < path.length; i++) {
    if (path[i][1] > untilY) break;
    const ax = path[i - 1][0] - path[i - 2][0], ay = path[i - 1][1] - path[i - 2][1];
    const bx = path[i][0] - path[i - 1][0], by = path[i][1] - path[i - 1][1];
    if (Math.hypot(ax, ay) < 1e-4 || Math.hypot(bx, by) < 1e-4) continue;
    let d = Math.atan2(by, bx) - Math.atan2(ay, ax);
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    const k = Math.floor(path[i][1] / 4);
    bands.set(k, (bands.get(k) ?? 0) + Math.abs(d) / (2 * Math.PI));
  }
  return Math.max(0, ...bands.values());
}

// total change of heading along the path above `untilY` (the funnel's own
// spiral doesn't count), in turns
function turning(path: [number, number][], untilY: number) {
  let total = 0;
  for (let i = 2; i < path.length; i++) {
    if (path[i][1] > untilY) break;
    const ax = path[i - 1][0] - path[i - 2][0], ay = path[i - 1][1] - path[i - 2][1];
    const bx = path[i][0] - path[i - 1][0], by = path[i][1] - path[i - 1][1];
    if (Math.hypot(ax, ay) < 1e-4 || Math.hypot(bx, by) < 1e-4) continue;
    let d = Math.atan2(by, bx) - Math.atan2(ay, ax);
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    total += Math.abs(d);
  }
  return total / (2 * Math.PI);
}

function simulate(
  f: (x: number, y: number) => number,
  [x, y]: [number, number],
  WX: number,
  LY: number,
  goal: [number, number],
): [number, number][] {
  const h = 1e-3;
  let vx = 0, vy = 0, still = 0, maxY = y, sinceProgress = 0;
  const path: [number, number][] = [[x, y]];
  for (let s = 0; s < 14000; s++) {
    // settled in the funnel: stop recording so the tail of tiny wobbles
    // doesn't eat up the end of the scroll
    if (still >= 60 && Math.hypot(x - goal[0], y - goal[1]) < 1) break;
    const gx = (f(x + h, y) - f(x - h, y)) / (2 * h);
    // circling or resting in a side valley: after a loop or so, tilt the
    // slope a little more each step until it rolls out and carries on
    const tilt = sinceProgress > 90 ? Math.min((sinceProgress - 90) / 150, 1) * 2 : 0;
    const gy = (f(x, y + h) - f(x, y - h)) / (2 * h) - tilt;
    // more friction in the funnel, so it spirals in and settles instead of
    // swinging wide past the bottom of the page
    const beta = y > goal[1] - 2.5 ? 0.96 : BETA;
    vx = beta * vx - LR * gx;
    vy = beta * vy - LR * gy;
    x += vx;
    y += vy;
    if (Math.abs(x) > WX - 0.1) { x = Math.sign(x) * (WX - 0.1); vx *= -0.5; }
    if (y > LY - 0.1) { y = LY - 0.1; vy *= -0.5; }
    path.push([x, y]);
    // progress = a real step further down the page (creeping down while
    // circling doesn't count, so loops stay short)
    if (y > maxY + 0.3 || y > goal[1] - 2.5) { maxY = Math.max(maxY, y); sinceProgress = 0; }
    else sinceProgress++;
    still = Math.hypot(vx, vy) < 0.002 ? still + 1 : 0;
  }
  return path;
}

// map scroll progress to path points. mostly by how far down the page the
// ball has got (so it stays on screen), a little by distance travelled (so
// loops and the final spiral still play out rather than flashing past).
function parametrize(path: [number, number][]): number[] {
  const ys: number[] = [], arcs: number[] = [];
  let maxY = path[0][1], arc = 0;
  for (let i = 0; i < path.length; i++) {
    if (i > 0) arc += Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
    maxY = Math.max(maxY, path[i][1]);
    ys.push(maxY);
    arcs.push(arc);
  }
  const y0 = ys[0], y1 = ys[ys.length - 1], a1 = arcs[arcs.length - 1] || 1;
  return path.map((_, i) => 0.9 * ((ys[i] - y0) / (y1 - y0 || 1)) + 0.1 * (arcs[i] / a1));
}

// path point for a scroll progress p in [0, 1] (binary search on param)
export function pointAt(d: Descent, p: number): { x: number; y: number; i: number } {
  const { param, path } = d;
  let lo = 0, hi = param.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (param[mid] < p) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(lo, 1);
  const span = param[i] - param[i - 1] || 1;
  const k = Math.min(Math.max((p - param[i - 1]) / span, 0), 1);
  return {
    x: path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k,
    y: path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k,
    i: i - 1,
  };
}
