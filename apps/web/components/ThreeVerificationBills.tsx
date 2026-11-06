"use client";

import React from "react";
import { FoldingBill } from "./FoldingBill";
import { motion } from "framer-motion";

interface VerificationSignal {
  title: string;
  desc: string;
  badge: string;
  icon: string;
  color: string;
}

const SIGNALS: VerificationSignal[] = [
  {
    title: "Reputation Network",
    desc: "Past colleagues provide structured, accountable testimony tied to observable outcomes. Not endorsements — verified relational signal.",
    badge: "RELATIONAL GRAPH",
    icon: "🤝",
    color: "#00ff41",
  },
  {
    title: "Apprenticeship Market",
    desc: "Skip evaluation. Go straight to a 1-2 week paid trial. Real work, real environment. Outcome feeds your portable record.",
    badge: "DIRECT TRIAL",
    icon: "💼",
    color: "#ffffff",
  },
  {
    title: "Outcome Tracking",
    desc: "Post-hire performance data. Which simulation signals predicted success at your company? We close the loop.",
    badge: "FEEDBACK LOOP",
    icon: "📈",
    color: "#38bdf8",
  },
];

export function ThreeVerificationBills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto my-8">
      {SIGNALS.map((signal, i) => (
        <motion.div
          key={signal.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="relative flex flex-col items-center justify-center rounded-2xl bg-[#040810]/70 border border-white/10 hover:border-white/25 transition-all p-3 shadow-2xl overflow-hidden group"
          style={{ minHeight: "260px" }}
        >
          {/* 3D Folding Glass Cloth Simulation */}
          <div className="relative flex items-center justify-center w-full h-[240px]">
            <FoldingBill width={330} height={220} stiffness={42} settle={0} />

            {/* Signal Text Overlaid Directly On Top of the Glass Bill */}
            <div
              className="absolute inset-4 pointer-events-none flex flex-col justify-between z-10"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.8)",
              }}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between">
                <span className="text-2xl select-none filter drop-shadow">{signal.icon}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider"
                  style={{
                    color: signal.color,
                    background: "rgba(0, 0, 0, 0.7)",
                    borderColor: `${signal.color}60`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {signal.badge}
                </span>
              </div>

              {/* Middle: Title & Description */}
              <div className="my-auto py-2">
                <h3
                  className="text-base font-extrabold uppercase tracking-wide font-sans text-white mb-1.5"
                  style={{
                    textShadow: `0 0 12px ${signal.color}50, 0 2px 6px rgba(0,0,0,0.9)`,
                  }}
                >
                  {signal.title}
                </h3>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed line-clamp-3">
                  {signal.desc}
                </p>
              </div>

              {/* Bottom: Interactive Indicator */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400/90 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DRAG / FOLD BILL
                </span>
                <span style={{ color: signal.color }}>VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
