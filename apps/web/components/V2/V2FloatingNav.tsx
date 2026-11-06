"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Terminal, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

export function V2FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-5 py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-[#060b14]/85 backdrop-blur-2xl border-emerald-500/25 shadow-2xl shadow-black/80"
            : "bg-[#060b14]/40 backdrop-blur-md border-white/5"
        }`}
      >
        {/* Brand Mark + Subtitle */}
        <Link href="/v2" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors shadow-lg shadow-emerald-950/50">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-widest text-white font-mono">
                PRAXIS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v2.4
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              SOVEREIGN VERIFICATION FABRIC
            </span>
          </div>
        </Link>

        {/* Center Nav Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a
            href="#hero"
            className="hover:text-emerald-400 transition-colors tracking-wider"
          >
            01 // CORE
          </a>
          <a
            href="#install"
            className="hover:text-emerald-400 transition-colors tracking-wider"
          >
            02 // TERMINAL
          </a>
          <a
            href="#telemetry"
            className="hover:text-emerald-400 transition-colors tracking-wider flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            03 // 360° PROCTOR
          </a>
          <a
            href="#sandbox"
            className="hover:text-emerald-400 transition-colors tracking-wider"
          >
            04 // LITMUS PROOF
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            Classic UI
          </Link>
          <Link
            href="/select-domain"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-4 py-1.5 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 font-semibold"
          >
            <span>Launch Sim</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
