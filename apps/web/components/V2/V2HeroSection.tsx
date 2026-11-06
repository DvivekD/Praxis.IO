"use client";

import { useState } from "react";
import Link from "next/link";
import { AsciiWake } from "./AsciiWake";
import { Terminal, Copy, Check, ShieldCheck, ArrowRight, Activity, Cpu } from "lucide-react";

interface TerminalCommand {
  label: string;
  command: string;
  note: string;
  badge: string;
}

const COMMANDS: Record<string, TerminalCommand> = {
  candidate: {
    label: "Candidate CLI",
    command: "pnpm dlx @praxis/cli run --domain engineering",
    note: "Instant sandbox · WebAssembly container · No local Docker required",
    badge: "BENCHMARK RUNNER",
  },
  proctor: {
    label: "360° Proctor",
    command: "curl -fsSL https://praxis.run/telemetry/360 | bash",
    note: "Dual-cam P2P pairing · Front gaze vector + rear room surveillance",
    badge: "ZERO-CHEAT PROTOCOL",
  },
  verifier: {
    label: "ZK Verifier",
    command: "praxis verify --proof ./proof_10482.json --snark groth16",
    note: "Zero-knowledge proof verification · On-chain tamperproof stamp",
    badge: "CRYPTOGRAPHIC ATTESTATION",
  },
};

export function V2HeroSection() {
  const [activeTab, setActiveTab] = useState<"candidate" | "proctor" | "verifier">("candidate");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMMANDS[activeTab].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[130vh] pt-32 pb-24 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Architectural Grid & Radial Phosphor Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(0,255,65,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Meta Header (Archon style) */}
      <div className="relative max-w-6xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-emerald-500/15 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="tracking-widest uppercase text-emerald-400 font-semibold">
            THE SOVEREIGN BENCHMARK FABRIC
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            KERNEL v2.4.0
          </span>
          <span className="hidden sm:inline text-zinc-400">
            360° TELEMETRY SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Main Hero Stage */}
      <div className="relative max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center">
        {/* Left Architectural Stage Guide (Archon wireframe line) */}
        <div className="hidden lg:block absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-emerald-500/25 to-transparent pointer-events-none">
          <div className="absolute top-1/4 -left-1 w-2.5 h-px bg-emerald-400" />
          <div className="absolute top-1/2 -left-1 w-2.5 h-px bg-emerald-400" />
          <div className="absolute top-3/4 -left-1 w-2.5 h-px bg-emerald-400" />
          <span className="absolute top-1/3 -left-2 -rotate-90 origin-left text-[9px] font-mono text-emerald-500/60 tracking-widest uppercase">
            GAZE_VECTOR // 120HZ
          </span>
        </div>

        {/* Right Architectural Stage Guide */}
        <div className="hidden lg:block absolute right-8 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-emerald-500/25 to-transparent pointer-events-none">
          <div className="absolute top-1/4 -right-1 w-2.5 h-px bg-emerald-400" />
          <div className="absolute top-1/2 -right-1 w-2.5 h-px bg-emerald-400" />
          <div className="absolute top-3/4 -right-1 w-2.5 h-px bg-emerald-400" />
          <span className="absolute top-2/3 -right-2 rotate-90 origin-right text-[9px] font-mono text-emerald-500/60 tracking-widest uppercase">
            ZK_SNARK // ED25519
          </span>
        </div>

        {/* Visual Protagonist: AsciiWake Centered with Layered Depth */}
        <div className="relative w-full flex flex-col items-center">
          {/* AsciiWake Canvas Layer */}
          <div className="relative z-10 my-[-20px] transition-transform duration-500 hover:scale-105">
            <AsciiWake size={9} reach={55} trail={1.4} pull={45} />
          </div>

          {/* Statement Headline */}
          <div className="relative z-20 text-center max-w-3xl mt-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
              PROOF OF REAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-400 drop-shadow-[0_0_35px_rgba(0,255,65,0.4)]">
                HUMAN EXECUTION.
              </span>
            </h1>
            <p className="mt-5 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-mono leading-relaxed">
              Deterministic sandbox benchmarks. Resumable micro-incidents.
              360° dual-device AI proctoring with zero-knowledge proof attestation.
            </p>

            {/* Direct CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/select-domain"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm font-mono tracking-wide shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>ENTER SIMULATION RUNNER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/company/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a101d] hover:bg-[#10192e] text-zinc-200 border border-emerald-500/30 font-mono text-sm tracking-wide transition-all hover:border-emerald-500/60"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>ENTERPRISE PORTAL</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom: Interactive Kernel Boot Terminal (#install - Archon pattern) */}
      <div id="install" className="relative max-w-3xl mx-auto px-6 w-full mt-16 z-20">
        <div className="rounded-2xl bg-[#060b13]/90 border border-emerald-500/30 shadow-2xl shadow-black/90 backdrop-blur-2xl overflow-hidden">
          {/* Terminal Title Bar with OS / Mode Tabs */}
          <div className="px-5 py-3 border-b border-emerald-500/20 bg-black/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
              <span className="ml-3 text-[11px] font-mono text-zinc-400">
                BOOT THE RUNTIME
              </span>
            </div>

            {/* Platform / Mode Tabs with Sliding Indicator */}
            <div className="flex items-center bg-black/60 p-1 rounded-lg border border-white/5 text-[11px] font-mono">
              {(Object.keys(COMMANDS) as (keyof typeof COMMANDS)[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === tab
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {COMMANDS[tab].label}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Command Row */}
          <div className="p-5 flex items-center justify-between gap-4 font-mono text-sm bg-black/50">
            <div className="flex items-center gap-3 overflow-x-auto text-zinc-200">
              <span className="text-emerald-400 select-none font-bold">$</span>
              <code className="text-emerald-300 font-semibold selection:bg-emerald-500 selection:text-black">
                {COMMANDS[activeTab].command}
              </code>
            </div>

            {/* Copy Button with Morphing Checkmark */}
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                copied
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                  : "bg-white/5 border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Foot Note */}
          <div className="px-5 py-2.5 bg-[#04080e] border-t border-emerald-500/15 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>{COMMANDS[activeTab].note}</span>
            <span className="text-emerald-400/90 font-medium tracking-wider">
              {COMMANDS[activeTab].badge}
            </span>
          </div>
        </div>

        {/* Scroll Handoff Hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SCROLL TO EXPLORE 360° OBSERVABILITY & ZK VERIFICATION ↓</span>
        </div>
      </div>
    </section>
  );
}
