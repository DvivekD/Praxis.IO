"use client";

import React from "react";
import { Plate } from "./kit/react/draw";
import { StretchArt } from "./test-rig/art";
import { readoutOf, PULLED } from "./test-rig/rig";
import "./kit/iso.css";
import "./test-rig/stretch.css";

export function PraxisAnatomyRig() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2">
          SYS.ANATOMY // AUTONOMOUS BENCHMARK RIG
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans">
          Physical Telemetry & Cognitive Stress Rig
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-2xl mx-auto mt-3 leading-relaxed">
          The Praxis cognitive testing apparatus: precision dual guide rails, spring-tensioned carriage, and live micrometer gauge measuring real-time candidate reasoning under procedural load.
        </p>
      </div>

      {/* Isometric Anatomy Plate Figure */}
      <div className="iso w-full flex justify-center">
        <Plate
          fig="RIG 01"
          title="Cognitive Stress & AST Lean"
          hint="Drag probe along micron rail ↔"
          readout="STRESS 42.0 N · LEAN 1.2 mm · GAZE 99.8%"
          keys={[
            { mark: "raised", label: "Candidate Execution Core" },
            { mark: "dotted", label: "Deterministic Equilibrium" },
            { mark: "edge", label: "Chaos Injection Vector" },
          ]}
          caption={`A mechanical test apparatus representing the procedural simulation engine: a spring-tensioned carriage on precision guide rods, an optical probe riding the measurement rail, and a high-precision dial indicator reading cognitive lean (${readoutOf(PULLED).split("lean ")[1]}) and recovery latency in real time.`}
        >
          <StretchArt />
        </Plate>
      </div>
    </section>
  );
}
