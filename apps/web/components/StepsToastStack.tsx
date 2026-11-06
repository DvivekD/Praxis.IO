"use client";

import { type CSSProperties, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircleCheck, CircleX, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";

type Kind = "success" | "info" | "error" | "warning";
type Toast = { id: number; kind: Kind; title: string; body: string; action?: string };

const ICON: Record<Kind, LucideIcon> = {
  success: CircleCheck,
  info: Info,
  error: CircleX,
  warning: TriangleAlert,
};

const POOL: Omit<Toast, "id">[] = [
  { kind: "success", title: "01 / BASELINE LITMUS", body: "Lightweight domain filter. Minimum viable competency gets you in.", action: "Gate 1" },
  { kind: "info", title: "02 / SEGMENTATION", body: "Grouped by performance, not pedigree. Your baseline score sets your tier.", action: "Gate 2" },
  { kind: "warning", title: "03 / SIMULATION ENGINE", body: "Real problems, procedurally mutated. No two candidates see the same version.", action: "Gate 3" },
  { kind: "info", title: "04 / CROSS-DOMAIN", body: "Same engine, domain-specific skins. Engineering, Product, Finance, Data.", action: "Gate 4" },
  { kind: "warning", title: "05 / PROCESS RANKING", body: "Approach, creativity, error recovery. Not just correctness.", action: "Gate 5" },
  { kind: "success", title: "06 / PORTABLE RECORD", body: "Your verified track record. LinkedIn but your profile is your proof.", action: "Gate 6" },
];

const W = 460;
const H = 64;
const SHOWN = 6;
/* a touch under critical: it settles with a hint of give, no wobble */
const SPRING = { type: "spring", stiffness: 380, damping: 34, mass: 1 } as const;

export function StepsToastStack({
  peek = 14,
  gap = 10,
  corner = 18,
}: {
  peek?: number;
  gap?: number;
  corner?: number;
}) {
  const next = useRef(SHOWN);
  const [stack, setStack] = useState<Toast[]>(() =>
    POOL.slice(0, SHOWN).map((t, i) => ({ ...t, id: i })),
  );
  const [leaving, setLeaving] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

  /* the frame is the open list's size; both states sit in its middle */
  const listH = SHOWN * H + (SHOWN - 1) * gap;
  const stackH = H + (SHOWN - 1) * peek;
  const FH = listH;

  const place = (k: number) => {
    if (open) {
      /* the list: step 01 at the top, step 06 at the bottom */
      const top = (FH - listH) / 2;
      return { y: top + k * (H + gap), scale: 1 };
    }
    /* the stack: front at the bottom, each one behind a peek higher
       and a step smaller, hanging from its top edge */
    const top = (FH - stackH) / 2;
    const d = Math.min(k, SHOWN - 1);
    return { y: top + (SHOWN - 1 - d) * peek, scale: 1 - d * 0.035 };
  };

  const dismiss = (id: number) => {
    if (leaving !== null) return;
    setLeaving(id);
    window.setTimeout(() => {
      setStack((s) => {
        const rest = s.filter((t) => t.id !== id);
        const n = next.current++;
        const fresh = { ...POOL[n % POOL.length], id: n };
        return [...rest, fresh];
      });
      setLeaving(null);
    }, 220);
  };

  const retry = (id: number) => {
    setStack((s) =>
      s.map((t) =>
        t.id === id
          ? { ...t, kind: "success", title: `${t.title} [VERIFIED]`, body: "Execution validated on-chain.", action: undefined }
          : t,
      ),
    );
  };

  return (
    <div className="flex flex-col items-center w-full my-6 select-none">
      {/* Interactive Helper Hint */}
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-zinc-400">
        <span className={`w-2 h-2 rounded-full transition-colors ${open ? "bg-emerald-400 shadow-[0_0_8px_#00ff41]" : "bg-zinc-600"}`} />
        <span>{open ? "[ 6-STEP COGNITIVE PIPELINE EXPANDED ]" : "[ HOVER STACK TO EXPAND 6-STEP PIPELINE ]"}</span>
      </div>

      <div
        ref={root}
        className="relative"
        role="region"
        aria-label="6 Steps Zero Guesswork"
        data-open={open || undefined}
        style={{ width: "100%", maxWidth: W, height: FH }}
        onPointerOver={() => setOpen(true)}
        onPointerOut={(e) => {
          const to = e.relatedTarget as Node | null;
          if (!to || !root.current?.contains(to)) setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!root.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        {stack.map((t, k) => {
          const Icon = ICON[t.kind];
          const out = leaving === t.id;
          const p = place(k);
          const front = k === 0;

          return (
            <motion.div
              key={t.id}
              className="absolute left-0 right-0 rounded-2xl flex items-center px-4 gap-3 cursor-default transition-colors duration-150"
              data-kind={t.kind}
              data-front={front || undefined}
              style={{
                height: H,
                zIndex: open ? k + 1 : SHOWN - k,
                background: "rgba(10, 16, 28, 0.92)",
                backdropFilter: "blur(20px)",
                border: front && !open ? "1px solid rgba(0, 255, 65, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 12px 30px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              }}
              /* a new one rises in from below the front */
              initial={{ y: place(0).y + 24, scale: 1, opacity: 0, x: 0 }}
              animate={
                out
                  ? { y: p.y, scale: p.scale, opacity: 0, x: 60 }
                  : { y: p.y, scale: p.scale, opacity: 1, x: 0 }
              }
              transition={out ? { duration: 0.22, ease: [0.4, 0, 1, 1] } : SPRING}
              aria-hidden={!open && !front ? true : undefined}
            >
              {/* Kind Icon Container */}
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    t.kind === "success"
                      ? "rgba(0, 255, 65, 0.12)"
                      : t.kind === "warning"
                      ? "rgba(245, 158, 11, 0.12)"
                      : "rgba(56, 189, 248, 0.12)",
                  color:
                    t.kind === "success"
                      ? "#00ff41"
                      : t.kind === "warning"
                      ? "#f59e0b"
                      : "#38bdf8",
                  border:
                    t.kind === "success"
                      ? "1px solid rgba(0, 255, 65, 0.3)"
                      : t.kind === "warning"
                      ? "1px solid rgba(245, 158, 11, 0.3)"
                      : "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
              </span>

              {/* Text Body */}
              <span className="flex flex-col flex-1 min-w-0">
                <b className="text-xs sm:text-sm font-mono font-bold tracking-tight text-white truncate">
                  {t.title}
                </b>
                <span className="text-[11px] font-mono text-zinc-400 truncate">
                  {t.body}
                </span>
              </span>

              {/* Action Button */}
              {t.action && (
                <button
                  type="button"
                  tabIndex={open || front ? 0 : -1}
                  onClick={() => retry(t.id)}
                  className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(0, 255, 65, 0.15)",
                    border: "1px solid rgba(0, 255, 65, 0.35)",
                    color: "#00ff41",
                  }}
                >
                  {t.action}
                </button>
              )}

              {/* Dismiss Button */}
              <button
                type="button"
                className="text-zinc-500 hover:text-white p-1 rounded transition-colors"
                aria-label={`Dismiss ${t.title}`}
                tabIndex={open || front ? 0 : -1}
                onClick={() => dismiss(t.id)}
              >
                <X size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
