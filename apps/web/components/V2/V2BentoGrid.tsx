"use client";

import { useState } from "react";
import { Watcher } from "./Watcher";
import { ToastStack } from "./ToastStack";
import { Particles } from "./Particles";
import {
  Eye,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Radio,
  Camera,
  Smartphone,
} from "lucide-react";

export function V2BentoGrid() {
  const [activeEyeStyle, setActiveEyeStyle] = useState<"Slant" | "Dots" | "Squares">("Dots");

  return (
    <section id="telemetry" className="relative py-28 max-w-6xl mx-auto px-6 w-full">
      {/* Section Line Header (Archon style) */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-emerald-500/20 pb-4 mb-12">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">03 // OBSERVABILITY & LITMUS PROOFS</span>
        </div>
        <span className="hidden sm:inline text-zinc-400 tracking-wider">
          BOUNDED EXECUTION · DETERMINISTIC REPLAY · ZERO FRAUD
        </span>
      </div>

      {/* Bento Grid Layout (Asymmetric, Anti-slop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: 360° AI Proctor (Span 7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#060b13]/80 border border-emerald-500/25 p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-black/80 group">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top Meta */}
          <div>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>360° AI PROCTOR ACTIVE</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-emerald-400 font-bold">INTEGRITY: 100%</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-4 font-sans tracking-tight">
              Real-Time Gaze & Secondary Device Radar
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-2 max-w-md">
              Tracks facial gaze angles at 120Hz while WebRTC P2P streams candidate rear blindspots
              from any smartphone browser without software downloads.
            </p>
          </div>

          {/* Interactive Watcher Protagonist */}
          <div className="my-8 flex flex-col items-center justify-center relative">
            <div className="relative p-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center">
              <Watcher follow={75} bounce={35} eyes={activeEyeStyle} size={110} />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Poke the observer or move your pointer to test gaze reaction
            </span>
          </div>

          {/* Dual-Cam Status Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-500/15">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
              <Camera className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-[11px] font-mono leading-tight">
                <div className="text-white font-semibold">Front Cam Telemetry</div>
                <div className="text-emerald-400/80">Gaze: Center (0.0°)</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
              <Smartphone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="text-[11px] font-mono leading-tight">
                <div className="text-white font-semibold">Rear 360° P2P</div>
                <div className="text-cyan-400/80">Paired · Zero-Install</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Live Incident & Telemetry Stream (Span 5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#060b13]/80 border border-emerald-500/25 p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-black/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>LIVE AUDIT FEED</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-4 font-sans tracking-tight">
              Adaptive Telemetry Stack
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-2">
              Spring-physics notification cards. Hover to fan out into full audit log; dismiss or retry in real-time.
            </p>
          </div>

          {/* Interactive ToastStack Container */}
          <div className="my-6 flex items-center justify-center min-h-[220px]">
            <ToastStack peek={16} gap={12} corner={18} />
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-emerald-500/15 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <span>HOVER TO EXPAND STACK</span>
            <span className="text-emerald-400">AUTO-REPLENISH ON</span>
          </div>
        </div>

        {/* Card 3: Cryptographic Litmus Proof Sandbox (Span 12 cols / full width) */}
        <div id="sandbox" className="lg:col-span-12 rounded-3xl bg-[#060b13]/80 border border-emerald-500/25 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-black/80">
          {/* Left Text & Controls */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>CRYPTOGRAPHIC CONSENSUS</span>
            </div>
            <h3 className="text-3xl font-bold text-white mt-4 font-sans tracking-tight">
              Zero-Knowledge Proof Topology
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-3 leading-relaxed">
              Every code execution, AST modification, and terminal test passes through a
              deterministic circom circuit. Click the particle field to trigger verification shockwaves
              and morph between topological proof states.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Groth16 SNARK Proof generation under 850ms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tamper-proof ed25519 signature verified on-chain</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Deterministic replay: zero hallucinations</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Particles Canvas */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-2xl shadow-emerald-950/40">
              <Particles shape="Circle" reach={80} force={60} grain="Fine" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 mt-3">
              Click canvas to blast shockwave & morph shape (Circle → Square → Flower)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
