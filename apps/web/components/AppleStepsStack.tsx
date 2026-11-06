"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Target,
  Cpu,
  Layers,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export interface StepItem {
  step: string;
  title: string;
  desc: string;
  icon: string;
  badge: string;
  color: string;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    title: "Baseline Litmus",
    desc: "Lightweight domain filter. Minimum viable competency gets you in.",
    icon: "⚡",
    badge: "GATE 01",
    color: "#00ff41",
  },
  {
    step: "02",
    title: "Segmentation",
    desc: "Grouped by performance, not pedigree. Your baseline score sets your tier.",
    icon: "🎯",
    badge: "GATE 02",
    color: "#10b981",
  },
  {
    step: "03",
    title: "Simulation Engine",
    desc: "Real problems, procedurally mutated. No two candidates see the same version.",
    icon: "🧬",
    badge: "GATE 03",
    color: "#38bdf8",
  },
  {
    step: "04",
    title: "Cross-Domain",
    desc: "Same engine, domain-specific skins. Engineering, Product, Finance, Data.",
    icon: "🔀",
    badge: "GATE 04",
    color: "#a78bfa",
  },
  {
    step: "05",
    title: "Process Ranking",
    desc: "Approach, creativity, error recovery. Not just correctness.",
    icon: "📊",
    badge: "GATE 05",
    color: "#f59e0b",
  },
  {
    step: "06",
    title: "Portable Record",
    desc: "Your verified track record. LinkedIn but your profile is your proof.",
    icon: "🛡️",
    badge: "GATE 06",
    color: "#00ff41",
  },
];

const SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

export function AppleStepsStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center py-6"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setActiveStep(null);
      }}
    >
      {/* Interactive Expand Hint Header */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isExpanded ? "bg-emerald-400 shadow-[0_0_10px_#00ff41]" : "bg-zinc-600"
          }`}
        />
        <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-emerald-400 transition-colors">
          {isExpanded ? "[ PIPELINE EXPANDED · 6 COGNITIVE STEPS ]" : "[ HOVER TO EXPAND 6-STEP PIPELINE ]"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-emerald-400" : ""
          }`}
        />
      </div>

      {/* The Animated Apple Stack Container */}
      <div className="relative w-full min-h-[220px] flex justify-center items-start">
        {/* CLOSED DECK (When not hovered) */}
        {!isExpanded && (
          <div className="relative w-full max-w-md h-[180px] cursor-pointer">
            {STEPS.map((step, i) => {
              // Only render top 4 cards in peeking deck
              if (i > 3) return null;
              const yOffset = -i * 12;
              const scale = 1 - i * 0.04;
              const zIndex = 10 - i;
              const opacity = 1 - i * 0.18;

              return (
                <motion.div
                  key={step.step}
                  className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
                  style={{
                    y: yOffset,
                    scale,
                    zIndex,
                    opacity,
                    background: i === 0 ? "rgba(8, 14, 24, 0.95)" : "rgba(6, 11, 20, 0.8)",
                    backdropFilter: "blur(24px)",
                    border: `1px solid ${i === 0 ? "rgba(0, 255, 65, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
                    boxShadow: "0 16px 36px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  layoutId={`card-${step.step}`}
                  transition={SPRING}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl select-none">{step.icon}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        [{step.step}]
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {step.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1 line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* OPEN GRID (When hovered: splits into all 6 steps smoothly) */}
        {isExpanded && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {STEPS.map((step) => {
              const isHovered = activeStep === step.step;

              return (
                <motion.div
                  key={step.step}
                  layoutId={`card-${step.step}`}
                  transition={SPRING}
                  onMouseEnter={() => setActiveStep(step.step)}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 cursor-default ${
                    isHovered
                      ? "bg-[#0b1626]/95 border-emerald-400 shadow-xl shadow-emerald-950/40 scale-[1.02]"
                      : "bg-[#060c16]/85 border-white/10 hover:border-emerald-500/30"
                  }`}
                  style={{
                    borderWidth: 1,
                    backdropFilter: "blur(24px)",
                    boxShadow: isHovered
                      ? "0 14px 34px -8px rgba(0,0,0,0.8), 0 0 20px rgba(0,255,65,0.2)"
                      : "0 10px 25px -10px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none">{step.icon}</span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: step.color }}
                      >
                        [{step.step}]
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        background: `${step.color}15`,
                        color: step.color,
                        borderColor: `${step.color}35`,
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-sans tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>DETERMINISTIC EVAL</span>
                    <span style={{ color: step.color }}>PASS GATE →</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
