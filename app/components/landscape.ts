// shared loss-landscape math for the gradient-descent visuals:
// landscape definition, 3d camera projection, and contour extraction.

// ---------------------------------------------------------------------------
// loss landscape: a soft bowl with a few valleys (wells) and peaks (bumps)
// ---------------------------------------------------------------------------

export type Blob = { x: number; y: number; a: number; s: number };

export const DOMAIN = 3; // x, y in [-DOMAIN, DOMAIN]

export const LEVELS = 16;
export const Z_MIN = -1.3;
export const Z_MAX = 1.3;

export const gauss = (dx: number, dy: number, s: number) =>
  Math.exp(-(dx * dx + dy * dy) / (2 * s * s));

// ---------------------------------------------------------------------------
// camera
// ---------------------------------------------------------------------------

export type Cam = {
  theta: number; // azimuth
  phi: number; // elevation
  dist: number;
  focal: number;
  scale: number; // px per world unit
  cx: number;
  cy: number;
  zScale: number;
};

export function project(cam: Cam, x: number, y: number, z: number): [number, number] {
  const ct = Math.cos(cam.theta), st = Math.sin(cam.theta);
  const cp = Math.cos(cam.phi), sp = Math.sin(cam.phi);
  const xr = x * ct - y * st;
  const yr = x * st + y * ct;
  const zz = z * cam.zScale;
  const u = xr;
  const v = yr * sp + zz * cp;
  const w = yr * cp - zz * sp;
  const k = cam.focal / (cam.dist + w);
  return [cam.cx + u * k * cam.scale, cam.cy - v * k * cam.scale];
}

// ---------------------------------------------------------------------------
// marching squares -> contour segments for one level
// ---------------------------------------------------------------------------

// square grid over [-DOMAIN, DOMAIN]^2 with n cells per side
export function contourSegments(
  vals: Float32Array,
  n: number,
  level: number,
  out: number[],
) {
  contourGrid(vals, n, n, -DOMAIN, -DOMAIN, (2 * DOMAIN) / n, level, out);
}

// any rectangular grid: nx * ny cells of size `step`, origin (x0, y0),
// vals laid out row-major with (nx + 1) values per row
export function contourGrid(
  vals: Float32Array,
  nx: number,
  ny: number,
  ox: number,
  oy: number,
  step: number,
  level: number,
  out: number[],
) {
  const lerp = (a: number, b: number) => (level - a) / (b - a);
  const w = nx + 1;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = vals[j * w + i];
      const b = vals[j * w + i + 1];
      const c = vals[(j + 1) * w + i + 1];
      const d = vals[(j + 1) * w + i];
      const idx =
        (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x0 = ox + i * step;
      const y0 = oy + j * step;
      // edge midpoints (interpolated)
      const top = () => [x0 + lerp(a, b) * step, y0];
      const right = () => [x0 + step, y0 + lerp(b, c) * step];
      const bottom = () => [x0 + lerp(d, c) * step, y0 + step];
      const left = () => [x0, y0 + lerp(a, d) * step];
      const push = (p: number[], q: number[]) => out.push(p[0], p[1], q[0], q[1]);
      switch (idx) {
        case 1: case 14: push(left(), bottom()); break;
        case 2: case 13: push(bottom(), right()); break;
        case 3: case 12: push(left(), right()); break;
        case 4: case 11: push(top(), right()); break;
        case 6: case 9: push(top(), bottom()); break;
        case 7: case 8: push(left(), top()); break;
        case 5: push(left(), top()); push(bottom(), right()); break;
        case 10: push(top(), right()); push(left(), bottom()); break;
      }
    }
  }
}

// ---------------------------------------------------------------------------

export type Palette = { fg: string; muted: string; accent: string; bg: string };

export function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  return {
    fg: s.getPropertyValue("--fg").trim() || "#e5e5e5",
    muted: s.getPropertyValue("--muted").trim() || "#737373",
    accent: s.getPropertyValue("--accent").trim() || "#f59e0b",
    bg: s.getPropertyValue("--bg").trim() || "#0a0a0a",
  };
}

// ---------------------------------------------------------------------------
// seeded randomness
// ---------------------------------------------------------------------------

// small deterministic prng so every page gets the same landscape on every visit
export function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}
