"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plate, Solid, Line, Dots } from "./kit/react/draw";
import {
  CHASSIS,
  BLADE_01,
  BLADE_02,
  BLADE_03,
  BLADE_04,
  BLADES_META,
} from "./infra-geometry";
import "./kit/iso.css";

export function PraxisAnatomyRig() {
  const [activeBlade, setActiveBlade] = useState<number>(0);
  const [hoveredBlade, setHoveredBlade] = useState<number | null>(null);

  const selectedIndex = hoveredBlade !== null ? hoveredBlade : activeBlade;
  const meta = BLADES_META[selectedIndex];

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-950/20 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYS.INFRA // DISTRIBUTED SIMULATION CLUSTER
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans">
          Autonomous Infrastructure & Telemetry Rig
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-2xl mx-auto mt-3 leading-relaxed">
          The physical and distributed systems powering Praxis: four interconnected compute blades managing real-time candidate ingestion, procedural incident mutation, multi-agent AI observers, and cryptographic verification.
        </p>
      </div>

      {/* Blade Selector Navigation Tabs */}
      <div className="w-full flex flex-wrap justify-center gap-2 mb-6 font-mono text-xs">
        {BLADES_META.map((blade) => {
          const isActive = selectedIndex === blade.id;
          return (
            <button
              key={blade.id}
              onClick={() => setActiveBlade(blade.id)}
              onMouseEnter={() => setHoveredBlade(blade.id)}
              onMouseLeave={() => setHoveredBlade(null)}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                  : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                }`}
              />
              <span className="font-bold">{blade.tag}:</span>
              <span>{blade.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Isometric Anatomy Plate Figure */}
      <div className="iso w-full flex justify-center">
        <Plate
          fig="SYS.INFRA // ISO-01"
          title="Distributed Simulation Cluster"
          hint="Click or hover any blade to isolate pipeline ↔"
          readout={meta.readout}
          keys={[
            { mark: "lit", label: "Active Subsystem" },
            { mark: "raised", label: "Compute Blades" },
            { mark: "dim", label: "100Gbps Optical Bus" },
          ]}
          caption={`A modular server chassis representing the Praxis distributed runtime: candidate ingestion gateway, procedural incident mutation engine, multi-agent reasoning array, and zero-knowledge verification ledger interconnected across a synchronized optical telemetry backplane.`}
        >
          <div className="relative w-full overflow-hidden select-none">
            <svg
              className="iso-svg cursor-pointer"
              viewBox="0 0 800 410"
              role="img"
              aria-label="Praxis Distributed Infrastructure Simulation Cluster"
            >
              {/* ── 1. MASTER SERVER CHASSIS & BACKPLANE ── */}
              <g key="chassis-layer">
                <Solid paths={CHASSIS.slab} tone="mid" crease="faint" />
                <Dots points={CHASSIS.mountingHoles} size={1.2} tone="hi" />
                {CHASSIS.bayGrooves.map((d, i) => (
                  <Line key={i} d={d} tone="lo" dashed />
                ))}
                {/* Optical Interconnect Bus Rails */}
                <Line d={CHASSIS.opticalBusPrimary} tone="green" flow />
                <Line d={CHASSIS.opticalBusSecondary} tone="lo" />
                {CHASSIS.busTaps.map((d, i) => (
                  <Line key={i} d={d} tone={selectedIndex === i ? "green" : "lo"} />
                ))}
                <Line d={CHASSIS.chassisTicks} tone="faint" />
              </g>

              {/* ── 2. BLADE 01: INGESTION & 360 PROCTOR GATEWAY ── */}
              <g
                key="blade-01"
                onClick={() => setActiveBlade(0)}
                onMouseEnter={() => setHoveredBlade(0)}
                onMouseLeave={() => setHoveredBlade(null)}
                className="transition-opacity duration-300"
                opacity={selectedIndex === 0 ? 1 : 0.75}
              >
                <Solid
                  paths={BLADE_01.body}
                  tone={selectedIndex === 0 ? "hi" : "mid"}
                  lit={selectedIndex === 0}
                  crease="faint"
                />
                {/* Turret Dual-Sensor */}
                <Solid paths={BLADE_01.turret} tone={selectedIndex === 0 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_01.turretLens} tone={selectedIndex === 0 ? "hi" : "lo"} lit={selectedIndex === 0} />
                <Line d={BLADE_01.turretRing} tone={selectedIndex === 0 ? "green" : "mid"} />
                {/* Gaze Vector Ray */}
                <Line d={BLADE_01.gazeRay} tone={selectedIndex === 0 ? "green" : "lo"} dotted={selectedIndex !== 0} />
                <circle
                  cx={BLADE_01.gazeTarget[0]}
                  cy={BLADE_01.gazeTarget[1]}
                  r={selectedIndex === 0 ? 3 : 2}
                  className={selectedIndex === 0 ? "fill-emerald-400 animate-pulse" : "fill-zinc-600"}
                />
                {/* Fiber I/O Ports */}
                <Solid paths={BLADE_01.portL} tone="lo" crease="faint" />
                <Solid paths={BLADE_01.portR} tone="lo" crease="faint" />
                {/* Side Ventilation */}
                {BLADE_01.ventLines.map((d, i) => (
                  <Line key={i} d={d} tone="faint" />
                ))}
                {/* Top LEDs */}
                <Dots points={BLADE_01.leds} size={0.9} tone={selectedIndex === 0 ? "hi" : "mid"} pulse />
              </g>

              {/* ── 3. BLADE 02: PROCEDURAL INCIDENT MUTATION CORE ── */}
              <g
                key="blade-02"
                onClick={() => setActiveBlade(1)}
                onMouseEnter={() => setHoveredBlade(1)}
                onMouseLeave={() => setHoveredBlade(null)}
                className="transition-opacity duration-300"
                opacity={selectedIndex === 1 ? 1 : 0.75}
              >
                <Solid
                  paths={BLADE_02.body}
                  tone={selectedIndex === 1 ? "hi" : "mid"}
                  lit={selectedIndex === 1}
                  crease="faint"
                />
                {/* CPU Heatspreader & Fins */}
                <Solid paths={BLADE_02.cpuSlab} tone={selectedIndex === 1 ? "hi" : "mid"} crease="faint" />
                {BLADE_02.fins.map((fin, i) => (
                  <Solid key={i} paths={fin} tone={selectedIndex === 1 ? "hi" : "lo"} crease="faint" />
                ))}
                {/* Chaos Injector Module */}
                <Solid paths={BLADE_02.chaosBlock} tone="mid" crease="faint" />
                <Solid paths={BLADE_02.chaosDiode} tone={selectedIndex === 1 ? "hi" : "lo"} lit={selectedIndex === 1} />
                {/* Circuit Traces */}
                {BLADE_02.busTraces.map((d, i) => (
                  <Line key={i} d={d} tone={selectedIndex === 1 ? "green" : "lo"} />
                ))}
                <Dots points={BLADE_02.leds} size={0.9} tone={selectedIndex === 1 ? "hi" : "mid"} pulse />
              </g>

              {/* ── 4. BLADE 03: MULTI-AGENT AI OBSERVER ARRAY ── */}
              <g
                key="blade-03"
                onClick={() => setActiveBlade(2)}
                onMouseEnter={() => setHoveredBlade(2)}
                onMouseLeave={() => setHoveredBlade(null)}
                className="transition-opacity duration-300"
                opacity={selectedIndex === 2 ? 1 : 0.75}
              >
                <Solid
                  paths={BLADE_03.body}
                  tone={selectedIndex === 2 ? "hi" : "mid"}
                  lit={selectedIndex === 2}
                  crease="faint"
                />
                {/* Three Neural Accelerator Dies */}
                <Solid paths={BLADE_03.coreA} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_03.coreB} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_03.coreC} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                {/* Reasoning Beacon Column */}
                <Solid paths={BLADE_03.beacon} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Line d={BLADE_03.beaconRing} tone={selectedIndex === 2 ? "green" : "lo"} />
                <circle
                  cx={BLADE_03.beaconCore[0]}
                  cy={BLADE_03.beaconCore[1]}
                  r={selectedIndex === 2 ? 3.5 : 2}
                  className={selectedIndex === 2 ? "fill-emerald-400 animate-ping" : "fill-zinc-600"}
                />
                {/* Neural Bus Lines */}
                {BLADE_03.neuralBusLines.map((d, i) => (
                  <Line key={i} d={d} tone={selectedIndex === 2 ? "green" : "lo"} />
                ))}
                <Dots points={BLADE_03.leds} size={0.9} tone={selectedIndex === 2 ? "hi" : "mid"} pulse />
              </g>

              {/* ── 5. BLADE 04: CRYPTOGRAPHIC VERIFIER & LEDGER ── */}
              <g
                key="blade-04"
                onClick={() => setActiveBlade(3)}
                onMouseEnter={() => setHoveredBlade(3)}
                onMouseLeave={() => setHoveredBlade(null)}
                className="transition-opacity duration-300"
                opacity={selectedIndex === 3 ? 1 : 0.75}
              >
                <Solid
                  paths={BLADE_04.body}
                  tone={selectedIndex === 3 ? "hi" : "mid"}
                  lit={selectedIndex === 3}
                  crease="faint"
                />
                {/* Vault Enclave */}
                <Solid paths={BLADE_04.vault} tone={selectedIndex === 3 ? "hi" : "mid"} crease="faint" />
                {/* Merkle Tree Conduit */}
                {BLADE_04.merkleTree.map((d, i) => (
                  <Line key={i} d={d} tone={selectedIndex === 3 ? "green" : "lo"} />
                ))}
                <Dots points={BLADE_04.merkleNodes} size={1.1} tone={selectedIndex === 3 ? "hi" : "mid"} pulse />
                {/* ZK Cell & Tamper Stripe */}
                <Solid paths={BLADE_04.zkCell} tone={selectedIndex === 3 ? "hi" : "lo"} lit={selectedIndex === 3} />
                <Line d={BLADE_04.zkSeal} tone={selectedIndex === 3 ? "green" : "lo"} />
                <Line d={BLADE_04.sealLine} tone="faint" dashed />
                <Dots points={BLADE_04.leds} size={0.9} tone={selectedIndex === 3 ? "hi" : "mid"} pulse />
              </g>
            </svg>
          </div>
        </Plate>
      </div>

      {/* Subsystem Telemetry & Telemetry Feed Card */}
      <div className="w-full mt-4 p-5 bg-zinc-950/90 border border-zinc-800 rounded-lg font-mono text-zinc-300 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800/80 gap-3">
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              {meta.tag} // ACTIVE SUBSYSTEM
            </div>
            <div className="text-base sm:text-lg font-bold text-white tracking-tight">
              {meta.title}
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700/60 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">TELEMETRY: OPTIMAL</span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
          {meta.summary}
        </p>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          {meta.metrics.map((m, i) => (
            <div key={i} className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{m.label}</span>
              <span className="text-sm font-bold text-emerald-400 mt-1">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Subsystem Live Diagnostic Log */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-[11px] text-zinc-400 overflow-x-auto">
          <span className="text-emerald-500 font-bold select-none">&gt;</span>
          <span className="text-zinc-300">{meta.log}</span>
          <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-1" />
        </div>
      </div>
    </section>
  );
}
