"use client";

import React, { useState } from "react";
import { FoldingBill } from "./FoldingBill";
import { Users, Briefcase, TrendingUp, Hand, Move3d } from "lucide-react";

const SIGNALS = [
  {
    id: "reputation",
    title: "Reputation Network",
    desc: "Past colleagues provide structured, accountable testimony tied to observable outcomes. Not endorsements — verified relational signal.",
    badge: "RELATIONAL GRAPH",
    icon: Users,
    color: "#00ff41",
    stat: "99.4% SIGNAL INTEGRITY",
  },
  {
    id: "apprenticeship",
    title: "Apprenticeship Market",
    desc: "Skip evaluation. Go straight to a 1-2 week paid trial. Real work, real environment. Outcome feeds your portable record.",
    badge: "DIRECT TRIAL",
    icon: Briefcase,
    color: "#ffffff",
    stat: "100% PAID SPRINT",
  },
  {
    id: "outcome",
    title: "Outcome Tracking",
    desc: "Post-hire performance data. Which simulation signals predicted success at your company? We close the loop.",
    badge: "FEEDBACK LOOP",
    icon: TrendingUp,
    color: "#38bdf8",
    stat: "CLOSED-LOOP FEEDBACK",
  },
];

export function VerificationSignalsStage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SIGNALS[activeIdx];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 flex flex-col items-center">
      {/* 3D Glass Cloth Interactive Stage Container */}
      <div className="relative w-full rounded-3xl p-6 sm:p-10 bg-[#050912]/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/90 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Interactive 3D Folding Glass Cloth Stage */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative p-2 rounded-2xl bg-black/40 border border-white/10 shadow-2xl shadow-emerald-950/30 flex items-center justify-center">
            {/* The 3D Glass Cloth Canvas */}
            <FoldingBill width={340} height={230} stiffness={42} settle={0} />

            {/* Subtle Grab/Drag Overlay Indicator */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-black/60 px-3 py-1 rounded-lg border border-white/10 pointer-events-none">
              <span className="flex items-center gap-1 text-emerald-400">
                <Hand className="w-3 h-3" />
                <span>DRAG & FOLD GLASS SHEET</span>
              </span>
              <span className="text-zinc-400">PHYSICAL VERLET</span>
            </div>
          </div>
        </div>

        {/* Right Verification Signal Overlays */}
        <div className="flex-1 flex flex-col justify-between w-full max-w-lg z-10">
          {/* Top Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
            {SIGNALS.map((s, i) => {
              const Icon = s.icon;
              const isSelected = activeIdx === i;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-white/10 text-white border border-white/20 shadow-lg"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Signal Details */}
          <div className="min-h-[160px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded border"
                  style={{
                    color: active.color,
                    borderColor: `${active.color}40`,
                    background: `${active.color}15`,
                  }}
                >
                  {active.badge}
                </span>
                <span className="text-xs font-mono text-zinc-400">{active.stat}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mt-3 font-sans tracking-tight">
                {active.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-3 leading-relaxed">
                {active.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFICATION ATTRIBUTES ATTESTED
              </span>
              <span>CLOSED-LOOP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
