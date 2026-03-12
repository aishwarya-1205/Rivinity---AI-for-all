"use client";

import { useEffect, useRef } from "react";

interface Pt {
  x: number;
  y: number;
}

const SKYLINE: Pt[] = [
  { x: 0.0, y: 0.7 },
  { x: 0.018, y: 0.655 },
  { x: 0.04, y: 0.642 },
  { x: 0.062, y: 0.636 },
  { x: 0.084, y: 0.616 },
  { x: 0.106, y: 0.598 },
  { x: 0.128, y: 0.572 },
  { x: 0.149, y: 0.552 },
  { x: 0.171, y: 0.52 },
  { x: 0.193, y: 0.499 },
  { x: 0.215, y: 0.464 }, // left peak begins rising
  { x: 0.237, y: 0.457 }, // ← left peak top
  { x: 0.259, y: 0.469 }, // slight notch
  { x: 0.281, y: 0.498 },
  { x: 0.303, y: 0.499 },
  { x: 0.325, y: 0.499 },
  { x: 0.347, y: 0.496 },
  { x: 0.369, y: 0.508 },
  { x: 0.391, y: 0.522 },
  { x: 0.413, y: 0.526 },
  { x: 0.435, y: 0.525 },
  { x: 0.457, y: 0.54 }, // slight dip centre
  { x: 0.478, y: 0.54 },
  { x: 0.5, y: 0.529 },
  { x: 0.522, y: 0.508 },
  { x: 0.544, y: 0.492 }, // right-of-centre ridge
  { x: 0.566, y: 0.489 }, // ← right ridge top
  { x: 0.588, y: 0.513 },
  { x: 0.61, y: 0.534 },
  { x: 0.632, y: 0.558 },
  { x: 0.654, y: 0.549 },
  { x: 0.676, y: 0.531 },
  { x: 0.698, y: 0.522 },
  { x: 0.72, y: 0.526 },
  { x: 0.742, y: 0.535 },
  { x: 0.764, y: 0.555 }, // right shoulder
  { x: 0.786, y: 0.578 },
  { x: 0.808, y: 0.606 },
  { x: 0.829, y: 0.607 },
  { x: 0.851, y: 0.633 },
  { x: 0.873, y: 0.649 },
  { x: 0.895, y: 0.675 },
  { x: 0.917, y: 0.677 },
  { x: 0.939, y: 0.69 },
  { x: 0.961, y: 0.69 },
  { x: 1.0, y: 0.71 },
];

function crY(pts: Pt[], tx: number): number {
  const n = pts.length;
  if (tx <= pts[0].x) return pts[0].y;
  if (tx >= pts[n - 1].x) return pts[n - 1].y;
  let i = 1;
  while (i < n - 1 && pts[i].x < tx) i++;
  const p0 = pts[Math.max(0, i - 2)];
  const p1 = pts[i - 1];
  const p2 = pts[i];
  const p3 = pts[Math.min(n - 1, i + 1)];
  const span = p2.x - p1.x;
  if (span === 0) return p1.y;
  const t = (tx - p1.x) / span,
    t2 = t * t,
    t3 = t2 * t;
  return (
    0.5 *
    (2 * p1.y +
      (-p0.y + p2.y) * t +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
  );
}

function drawSquareDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  opacity: number,
) {
  const r = size * 0.32;
  const half = size / 2;
  const x = cx - half;
  const y = cy - half;

  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + size - r, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + r);
  ctx.lineTo(x + size, y + size - r);
  ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
  ctx.lineTo(x + r, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

export default function HeroDotMountain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const BASE_W = 1459;
      const SPACING = Math.max(7, Math.round((10 * W) / BASE_W));
      const DOT_SIZE = Math.max(5, Math.round(SPACING * 0.78));
      const GAP = SPACING - DOT_SIZE; // ~2px gap

      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      const sky = new Float32Array(cols + 1);
      for (let c = 0; c <= cols; c++) {
        sky[c] = crY(SKYLINE, (c * SPACING) / W) * H;
      }

      ctx.fillStyle = "rgb(120, 120, 130)";

      const FADE_RANGE = 0.8;
      const PEAK_OP = 0.85;
      const BOTTOM_OP = 0.0;

      for (let c = 0; c <= cols; c++) {
        const px = c * SPACING;
        const nx = px / W;
        const skyPY = sky[c];

        for (let r = 0; r <= rows; r++) {
          const py = r * SPACING;
          if (py < skyPY) continue;

          const depth = (py - skyPY) / (H * FADE_RANGE);
          if (depth >= 1) continue;

          const edgeSoften = Math.min(1, (py - skyPY) / (SPACING * 2.5));
          const fadeOut = Math.pow(1 - depth, 1.4);
          const vertOp = PEAK_OP * edgeSoften * fadeOut;

          const hBell = Math.pow(
            Math.sin(Math.max(0, Math.min(1, nx)) * Math.PI),
            0.5,
          );

          const opacity = Math.min(PEAK_OP, vertOp * hBell);
          if (opacity < 0.015) continue;

          drawSquareDot(ctx, px, py, DOT_SIZE, opacity);
        }
      }
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
