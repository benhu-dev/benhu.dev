'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

const SPACING = 28;
const RADIUS = 110;
const LIFT_MAX = 90;
const FOCAL = 700;
const FAR_FADE = 150;
const SIGMA = 50;
const CURSOR_LERP = 0.12;
const ACT_LERP = 0.06;
const ACT_IDLE = 0.22;
const ACT_INITIAL = 0.25;
const IDLE_TIMEOUT_MS = 700;

const STATIC_GRID_STYLE: CSSProperties = {
  backgroundImage: [
    'linear-gradient(to right, rgba(86,95,137,0.4) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(86,95,137,0.4) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: `${SPACING}px ${SPACING}px`,
  opacity: 0.18,
};

interface GridPoint {
  x: number;
  y: number;
  ph: number;
  fr: number;
}

interface ProjectedPoint {
  sx: number;
  sy: number;
  intensity: number;
}

export function GridSphere() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    if (mqReduce.matches || mqCoarse.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let pts: GridPoint[] = [];

    const buildGrid = () => {
      cols = Math.ceil(W / SPACING) + 4;
      rows = Math.ceil(H / SPACING) + 4;
      pts = new Array<GridPoint>(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          pts[j * cols + i] = {
            x: (i - 1) * SPACING,
            y: (j - 1) * SPACING,
            ph: Math.random() * Math.PI * 2,
            fr: 0.5 + Math.random() * 0.6,
          };
        }
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    let mx = -9999;
    let my = -9999;
    let lastSeen = 0;
    let cx = W * 0.32;
    let cy = H * 0.55;
    let visible = true;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      lastSeen = performance.now();
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const state = { act: ACT_INITIAL };
    let raf = 0;
    const t0 = performance.now();

    const drawSeg = (a: ProjectedPoint, b: ProjectedPoint, act: number) => {
      const intensity = Math.max(a.intensity, b.intensity);
      const blueMix = intensity;
      const lr = Math.round(65 + (122 - 65) * blueMix);
      const lg = Math.round(72 + (162 - 72) * blueMix);
      const lb = Math.round(104 + (247 - 104) * blueMix);
      const alpha = 0.12 + intensity * 0.32 * act;
      ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`;
      ctx.lineWidth = 0.5 + intensity * 0.9;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;

      const tx = mx > -9000 ? mx : W * 0.35;
      const ty = my > -9000 ? my : H * 0.55;
      cx += (tx - cx) * CURSOR_LERP;
      cy += (ty - cy) * CURSOR_LERP;

      const since = performance.now() - lastSeen;
      const cursorActive = mx > -9000 && since < IDLE_TIMEOUT_MS;
      state.act += ((cursorActive ? 1 : ACT_IDLE) - state.act) * ACT_LERP;
      const act = state.act;

      ctx.clearRect(0, 0, W, H);

      // Background glow under the bulge
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 1.4);
      glow.addColorStop(0, `rgba(122,162,247,${0.04 * act})`);
      glow.addColorStop(0.5, `rgba(122,162,247,${0.015 * act})`);
      glow.addColorStop(1, 'rgba(122,162,247,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Project every grid point through the perspective transform
      const sigma2 = SIGMA * SIGMA;
      const proj = new Array<ProjectedPoint>(pts.length);
      for (let k = 0; k < pts.length; k++) {
        const p = pts[k];
        if (!p) continue;
        const breathe = Math.sin(t * p.fr + p.ph) * 0.9;
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d2 = dx * dx + dy * dy;
        const dist = Math.sqrt(d2);
        const farMask = dist > FAR_FADE ? 0 : 1;
        const gauss = Math.exp(-d2 / (2 * sigma2));
        const lift = LIFT_MAX * act * gauss * farMask + breathe;
        const persp = FOCAL / (FOCAL - lift);
        proj[k] = {
          sx: cx + dx * persp,
          sy: cy + dy * persp,
          intensity: Math.min(1, gauss * farMask),
        };
      }

      // Lines: bidirectional — each point connects right + bottom neighbour
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = proj[j * cols + i];
          if (!a) continue;
          if (i + 1 < cols) {
            const b = proj[j * cols + (i + 1)];
            if (b) drawSeg(a, b, act);
          }
          if (j + 1 < rows) {
            const b = proj[(j + 1) * cols + i];
            if (b) drawSeg(a, b, act);
          }
        }
      }

      // Points + halos
      for (let k = 0; k < proj.length; k++) {
        const a = proj[k];
        if (!a) continue;
        if (a.intensity < 0.08) continue;
        const isPurple = k % 11 === 0 && a.intensity > 0.65;
        const baseColor = isPurple ? '187,154,247' : '122,162,247';
        const r = 0.6 + a.intensity * 1.4;
        const peakAlpha = isPurple ? 0.5 : 0.66;
        const alpha = peakAlpha * a.intensity * act;
        const haloR = r * 3.0;
        const grad = ctx.createRadialGradient(a.sx, a.sy, 0, a.sx, a.sy, haloR);
        grad.addColorStop(0, `rgba(${baseColor},${alpha * 0.7})`);
        grad.addColorStop(1, `rgba(${baseColor},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${baseColor},${alpha})`;
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0" style={STATIC_GRID_STYLE} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
