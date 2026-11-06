"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export const RAMPS: Record<string, string[]> = {
  Classic: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"],
  Blocks: [" ", "·", "░", "▒", "▓", "█"],
  Dots: [" ", "·", "•", "●"],
};

const MONO = `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace`;
const COLD = 0.04;
const RING_S = 1.8;

interface AsciiHeroButtonProps {
  shape: "circle" | "cube";
  label: string;
  sublabel?: string;
  href: string;
  color?: string;
  width?: number;
  height?: number;
}

export function AsciiHeroButton({
  shape = "circle",
  label = "SEEKER",
  sublabel = "CANDIDATE SANDBOX",
  href = "/seeker/onboarding",
  color = "#00ff41",
  width = 280,
  height = 180,
}: AsciiHeroButtonProps) {
  const router = useRouter();
  const cv = useRef<HTMLCanvasElement>(null);
  const W = width;
  const H = height;
  const size = 9;

  const st = useRef({
    cols: 0,
    rows: 0,
    cw: 0,
    ch: 0,
    ox: 0,
    oy: 0,
    font: "",
    heat: new Float32Array(0),
    mask: new Float32Array(0),
    hx: -999,
    hy: -999,
    lx: NaN,
    ly: NaN,
    near: 0,
    inside: false,
    rings: [] as { x: number; y: number; t: number }[],
    deal: 0,
    tick: 0,
    raf: 0,
    ratio: 1,
  });

  // Cube shape math
  const cube = (x: number, y: number) => {
    const lit = (v: number) => 0.35 + 0.65 * clamp(v, 0, 1);
    const R = Math.min(W, H) * 0.42;
    const c = Math.cos(Math.PI / 6) * R;
    const h = R / 2;
    const T = [0, -R], UR = [c, -h], B = [0, R], LL = [-c, h], UL = [-c, -h];
    const along = (o: number[], p: number[], q: number[]) => {
      const ax = p[0] - o[0], ay = p[1] - o[1], bx = q[0] - o[0], by = q[1] - o[1];
      const dx = x - o[0], dy = y - o[1];
      const det = ax * by - ay * bx;
      return [(dx * by - dy * bx) / det, (ax * dy - ay * dx) / det];
    };
    const inside = ([s, t]: number[]) => s >= 0 && s <= 1 && t >= 0 && t <= 1;
    const seam = (v: number) => (v < 0.045 ? 1 : 0);

    const top = along(T, UR, UL);
    if (inside(top)) {
      const [s, t] = top;
      return seam(1 - s) || seam(1 - t) ? 1 : lit(0.96 - 0.1 * (s + t) / 2);
    }
    const left = along(UL, [0, 0], LL);
    if (inside(left)) {
      const [s, t] = left;
      return seam(s) ? 1 : lit(0.56 - 0.12 * t);
    }
    const right = along([0, 0], UR, B);
    if (inside(right)) {
      const [s, t] = right;
      return seam(s) || seam(t) ? 1 : lit(0.22 - 0.05 * s);
    }
    return 0;
  };

  // Circle shape math
  const circle = (x: number, y: number) => {
    const lit = (v: number) => 0.35 + 0.65 * clamp(v, 0, 1);
    const R = Math.min(W, H) * 0.42;
    const d = Math.hypot(x, y);
    if (d > R) return 0;
    if (d >= R - 3) return 1;
    const sphereGrad = Math.sqrt(Math.max(0, 1 - (d / R) ** 2));
    return lit(sphereGrad);
  };

  const build = () => {
    const s = st.current;
    const c = cv.current;
    if (!c) return;
    const r = Math.min(2, window.devicePixelRatio || 1);
    s.ratio = r;
    c.width = Math.round(W * r);
    c.height = Math.round(H * r);

    s.ch = size * 0.85;
    s.cw = size * 0.65;
    s.cols = Math.floor(W / s.cw - 0.5);
    s.rows = Math.floor(H / s.ch);
    s.font = `600 ${size}px ${MONO}`;
    s.heat = new Float32Array(s.cols * s.rows);
    s.mask = new Float32Array(s.cols * s.rows);

    const ox = (s.ox = (W - s.cols * s.cw) / 2);
    const oy = (s.oy = (H - s.rows * s.ch) / 2);
    const shapeFn = shape === "circle" ? circle : cube;

    for (let j = 0; j < s.rows; j++) {
      for (let i = 0; i < s.cols; i++) {
        const x = ox + (i + 0.5 + (j & 1) * 0.5) * s.cw - W / 2;
        const y = oy + (j + 0.5) * s.ch - H / 2;
        s.mask[j * s.cols + i] = shapeFn(x, y);
      }
    }
  };

  const stamp = (x: number, y: number, rad: number, amt: number) => {
    const s = st.current;
    x -= s.ox;
    y -= s.oy;
    const c0 = Math.max(0, Math.floor((x - rad) / s.cw));
    const c1 = Math.min(s.cols - 1, Math.ceil((x + rad) / s.cw));
    const r0 = Math.max(0, Math.floor((y - rad) / s.ch));
    const r1 = Math.min(s.rows - 1, Math.ceil((y + rad) / s.ch));
    const R2 = rad * rad;
    for (let j = r0; j <= r1; j++) {
      const dy = (j + 0.5) * s.ch - y;
      for (let i = c0; i <= c1; i++) {
        const dx = (i + 0.5) * s.cw - x;
        const q = (dx * dx + dy * dy) / R2;
        if (q >= 1) continue;
        const t = 1 - q;
        const k = j * s.cols + i;
        s.heat[k] = Math.min(1, s.heat[k] + amt * t * t);
      }
    }
  };

  const paint = () => {
    const s = st.current;
    const c = cv.current;
    if (!c || !s.cols) return;
    const g = c.getContext("2d")!;
    g.setTransform(s.ratio, 0, 0, s.ratio, 0, 0);
    g.clearRect(0, 0, W, H);
    g.fillStyle = color;

    const glyphsList = RAMPS.Classic;
    const L = glyphsList.length - 1;
    g.font = s.font;
    g.textAlign = "center";
    g.textBaseline = "middle";

    for (let j = 0; j < s.rows; j++) {
      const cy = s.oy + (j + 0.5) * s.ch;
      const stagger = (j & 1) * 0.5 * s.cw;
      for (let i = 0; i < s.cols; i++) {
        const k = j * s.cols + i;
        const base = s.mask[k];
        if (base <= 0) continue;

        const h = s.heat[k];
        const cx = s.ox + (i + 0.5) * s.cw + stagger;

        let ringAdd = 0;
        for (const rg of s.rings) {
          const d = Math.hypot(cx - rg.x, cy - rg.y);
          const wav = Math.abs(d - rg.t * 140);
          if (wav < 18) {
            ringAdd = Math.max(ringAdd, (1 - wav / 18) * (1 - rg.t / RING_S));
          }
        }

        const totalHeat = clamp(h + ringAdd * 0.8, 0, 1);
        if (totalHeat < COLD) {
          const r = 0.5 + base * 1.5;
          g.beginPath();
          g.arc(cx, cy, r, 0, Math.PI * 2);
          g.fill();
        } else {
          const idx = clamp(Math.round(totalHeat * L), 1, L);
          g.fillText(glyphsList[idx], cx, cy);
        }
      }
    }
  };

  const run = () => {
    const s = st.current;
    if (s.raf) return;
    let last = performance.now();
    const frame = (now: number) => {
      s.raf = 0;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;

      let keep = false;
      const decay = Math.exp(-dt / 1.2);
      for (let k = 0; k < s.heat.length; k++) {
        if (s.heat[k] > 0.001) {
          s.heat[k] *= decay;
          if (s.heat[k] > 0.005) keep = true;
        }
      }

      for (let i = s.rings.length - 1; i >= 0; i--) {
        s.rings[i].t += dt;
        if (s.rings[i].t >= RING_S) {
          s.rings.splice(i, 1);
        } else {
          keep = true;
        }
      }

      paint();
      if (keep || s.inside) {
        s.raf = requestAnimationFrame(frame);
      }
    };
    s.raf = requestAnimationFrame(frame);
  };

  useEffect(() => {
    build();
    paint();
    return () => {
      if (st.current.raf) cancelAnimationFrame(st.current.raf);
    };
  }, [shape, width, height]);

  const where = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const k = r.width / W;
    return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k };
  };

  const move = (e: React.PointerEvent) => {
    const s = st.current;
    const { x, y } = where(e);
    const rad = 28;
    if (Number.isNaN(s.lx)) {
      s.lx = x;
      s.ly = y;
    }
    const d = Math.hypot(x - s.lx, y - s.ly);
    const n = Math.max(1, Math.ceil(d / 8));
    for (let k = 1; k <= n; k++) {
      const f = k / n;
      stamp(s.lx + (x - s.lx) * f, s.ly + (y - s.ly) * f, rad, 0.4);
    }
    s.lx = x;
    s.ly = y;
    s.hx = x;
    s.hy = y;
    s.inside = true;
    run();
  };

  const handleClick = (e: React.PointerEvent) => {
    const { x, y } = where(e);
    st.current.rings.push({ x, y, t: 0 });
    run();
    setTimeout(() => {
      router.push(href);
    }, 240);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick as any}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") router.push(href);
      }}
      className="group relative flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none focus:outline-none"
      style={{
        width: W,
        height: H,
        background: "rgba(6, 11, 20, 0.7)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${color === "#00ff41" ? "rgba(0, 255, 65, 0.3)" : "rgba(255, 255, 255, 0.15)"}`,
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 25px ${color === "#00ff41" ? "rgba(0, 255, 65, 0.15)" : "rgba(56, 189, 248, 0.12)"}`,
      }}
      onPointerEnter={(e) => {
        st.current.lx = NaN;
        move(e);
      }}
      onPointerMove={move}
      onPointerLeave={() => {
        st.current.inside = false;
        st.current.lx = NaN;
        run();
      }}
      onPointerDown={handleClick}
    >
      {/* ASCII Halftone Canvas */}
      <canvas
        ref={cv}
        style={{ width: W, height: H, position: "absolute", inset: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* Floating Center Glass Badge */}
      <div
        className="relative z-10 px-5 py-2.5 rounded-xl flex flex-col items-center justify-center transition-all duration-200"
        style={{
          background: "rgba(4, 8, 15, 0.88)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${color === "#00ff41" ? "rgba(0, 255, 65, 0.5)" : "rgba(255, 255, 255, 0.25)"}`,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.8), 0 0 15px ${color === "#00ff41" ? "rgba(0, 255, 65, 0.3)" : "rgba(56, 189, 248, 0.2)"}`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span
            className="text-sm font-mono font-bold tracking-wider"
            style={{ color: "#ffffff" }}
          >
            [ I'M A {label} ]
          </span>
        </div>
        {sublabel && (
          <span className="text-[10px] font-mono text-zinc-400 mt-0.5 tracking-widest uppercase">
            {sublabel}
          </span>
        )}
      </div>

      {/* Hover Ripple Hint */}
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">
          CLICK TO ENTER {label} →
        </span>
      </div>
    </div>
  );
}
