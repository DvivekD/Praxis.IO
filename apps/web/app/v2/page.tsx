import type { Metadata } from "next";
import Link from "next/link";
import { PrintGrain } from "../../components/V2/PrintGrain";
import { V2FloatingNav } from "../../components/V2/V2FloatingNav";
import { V2HeroSection } from "../../components/V2/V2HeroSection";
import { V2BentoGrid } from "../../components/V2/V2BentoGrid";
import { Cpu, Terminal, ArrowUpRight, Shield, CheckCircle } from "lucide-react";
import "../../components/V2/v2.css";

export const metadata: Metadata = {
  title: "Praxis v2 — The Sovereign Benchmark & Proctor Fabric",
  description:
    "Deterministic simulation benchmarks, 360° AI dual-cam proctoring, and zero-knowledge cryptographic proof of real human execution.",
};

export default function V2LandingPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black relative selection:font-semibold overflow-x-hidden">
      {/* Tactile Print Grain Canvas Overlay (Archon aesthetic) */}
      <PrintGrain opacity={0.045} />

      {/* Floating Liquid Glass Navigation */}
      <V2FloatingNav />

      {/* Main Hero Cinematic Stage */}
      <main className="relative z-10 flex flex-col">
        <V2HeroSection />
        <V2BentoGrid />

        {/* Section 4: Domain Matrix & Role Switcher */}
        <section className="py-24 max-w-6xl mx-auto px-6 w-full border-t border-emerald-500/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                04 // EVALUATION HORIZONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-sans tracking-tight">
                Deterministic Scopes & Live Outages
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-md">
              Every domain launches an isolated WebAssembly sandbox with simulated active traffic,
              injected chaos engineering events, and automated test suites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "sre",
                title: "Site Reliability",
                desc: "Mitigate live DDoS & database connection pool deadlocks in real-time.",
                badge: "SEV-1 INJECTION",
                href: "/simulation/sre/lobby",
              },
              {
                id: "engineering",
                title: "Full-Stack Eng",
                desc: "Refactor legacy microservices and squash race conditions under AST observation.",
                badge: "CONCURRENCY BUG",
                href: "/simulation/engineering/lobby",
              },
              {
                id: "product",
                title: "Product Execution",
                desc: "Prioritize roadmaps against sudden customer churn telemetry and latency dips.",
                badge: "DYNAMIC KPI MATRIX",
                href: "/simulation/product/lobby",
              },
              {
                id: "sales",
                title: "Enterprise Solutions",
                desc: "Handle objections from stubborn AI buyers with live speech prosody analysis.",
                badge: "VOICE PROSODY EVAL",
                href: "/simulation/sales/lobby",
              },
            ].map((domain) => (
              <Link
                key={domain.id}
                href={domain.href}
                className="group p-6 rounded-2xl bg-[#060b13]/60 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0a1222]/80 transition-all shadow-xl hover:-translate-y-1 duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                      {domain.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {domain.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-2 leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>LAUNCH SANDBOX</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: High-Craft CTA Banner */}
        <section className="py-20 max-w-6xl mx-auto px-6 w-full">
          <div className="rounded-3xl bg-gradient-to-b from-[#0a1424] to-[#040810] border border-emerald-500/30 p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-emerald-950/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,65,0.15),transparent_70%)] pointer-events-none" />

            <span className="relative z-10 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
              OPEN VERIFICATION PROTOCOL
            </span>

            <h2 className="relative z-10 text-3xl sm:text-5xl font-extrabold text-white mt-6 tracking-tight font-sans">
              Experience the Future of Technical Hiring.
            </h2>
            <p className="relative z-10 text-sm font-mono text-zinc-400 max-w-xl mx-auto mt-4 leading-relaxed">
              No multiple choice trivia. No LeetCode leakers. Real working systems evaluated
              under 360° tamper-proof observation.
            </p>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/select-domain"
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm font-mono tracking-wide shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
              >
                START CANDIDATE BENCHMARK
              </Link>
              <Link
                href="/company/dashboard"
                className="px-8 py-3.5 rounded-xl bg-[#0a101d] hover:bg-[#10192e] text-zinc-200 border border-emerald-500/40 text-sm font-mono tracking-wide transition-all"
              >
                RECRUITER DASHBOARD
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Industrial Colophon Footer */}
      <footer className="relative z-10 border-t border-emerald-500/15 py-12 bg-[#03060a]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="text-white font-bold tracking-wider">PRAXIS RUNTIME</span>
            <span className="text-zinc-400">·</span>
            <span>KERNEL v2.4.0</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Root Classic UI
            </Link>
            <Link href="/select-domain" className="hover:text-emerald-400 transition-colors">
              Simulation Scopes
            </Link>
            <Link href="/company/dashboard" className="hover:text-emerald-400 transition-colors">
              Enterprise Portal
            </Link>
          </div>

          <div className="text-[11px] text-zinc-400">
            MIT LICENSE · ZERO VENDOR LOCK-IN · CRYPTOGRAPHICALLY ATTESTED
          </div>
        </div>
      </footer>
    </div>
  );
}
