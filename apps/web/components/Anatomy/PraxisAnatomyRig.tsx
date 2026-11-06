"use client";

import React, { useState } from "react";
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
    <section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 24px",
        maxWidth: 1100,
        margin: "0 auto",
        background: "#000",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Section Header - Matching 6 Steps and SYS.VERIFY exactly */}
      <div style={{ textAlign: "center", marginBottom: 54 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#00ff41",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00ff41",
              boxShadow: "0 0 8px #00ff41",
            }}
          />
          SYS.INFRA // DISTRIBUTED SIMULATION CLUSTER
        </div>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: "1px",
            margin: 0,
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Autonomous Infrastructure & Telemetry Rig
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#888",
            maxWidth: 640,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}
        >
          The physical and distributed systems powering Praxis: four interconnected compute blades managing real-time candidate ingestion, procedural incident mutation, multi-agent AI observers, and cryptographic verification.
        </p>
      </div>

      {/* Cyberpunk Blade Selector Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {BLADES_META.map((blade) => {
          const isActive = selectedIndex === blade.id;
          return (
            <button
              key={blade.id}
              onClick={() => setActiveBlade(blade.id)}
              onMouseEnter={() => setHoveredBlade(blade.id)}
              onMouseLeave={() => setHoveredBlade(null)}
              style={{
                padding: "10px 18px",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: isActive ? "1px solid #00ff41" : "1px solid #222",
                background: isActive ? "rgba(0, 255, 65, 0.1)" : "#050505",
                color: isActive ? "#00ff41" : "#888",
                boxShadow: isActive ? "0 0 15px rgba(0,255,65,0.25)" : "none",
                fontFamily: "var(--anatomy-mono)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: isActive ? "#00ff41" : "#333",
                  boxShadow: isActive ? "0 0 6px #00ff41" : "none",
                }}
              />
              <span style={{ color: isActive ? "#fff" : "#555" }}>[{blade.tag}]</span>
              <span>{blade.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Isometric Anatomy Plate Figure */}
      <div className="iso" style={{ width: "100%", margin: "0 auto" }}>
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
          <div style={{ position: "relative", width: "100%", overflow: "hidden", userSelect: "none" }}>
            <svg
              className="iso-svg"
              viewBox="0 0 800 450"
              role="img"
              aria-label="Praxis Distributed Infrastructure Simulation Cluster"
              style={{ display: "block", width: "100%", height: "auto", cursor: "pointer" }}
            >
              <defs>
                {/* Glow Filter for Active Elements */}
                <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

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
                style={{ transition: "opacity 0.25s", opacity: selectedIndex === 0 ? 1 : 0.65 }}
              >
                <Solid
                  paths={BLADE_01.body}
                  tone={selectedIndex === 0 ? "hi" : "mid"}
                  lit={selectedIndex === 0}
                  crease="faint"
                />
                <Solid paths={BLADE_01.turret} tone={selectedIndex === 0 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_01.turretLens} tone={selectedIndex === 0 ? "hi" : "lo"} lit={selectedIndex === 0} />
                <Line d={BLADE_01.turretRing} tone={selectedIndex === 0 ? "green" : "mid"} />
                <Line d={BLADE_01.gazeRay} tone={selectedIndex === 0 ? "green" : "lo"} dotted={selectedIndex !== 0} />
                <circle
                  cx={BLADE_01.gazeTarget[0]}
                  cy={BLADE_01.gazeTarget[1]}
                  r={selectedIndex === 0 ? 3 : 2}
                  fill={selectedIndex === 0 ? "#00ff41" : "#555"}
                  filter={selectedIndex === 0 ? "url(#emerald-glow)" : undefined}
                />
                <Solid paths={BLADE_01.portL} tone="lo" crease="faint" />
                <Solid paths={BLADE_01.portR} tone="lo" crease="faint" />
                {BLADE_01.ventLines.map((d, i) => (
                  <Line key={i} d={d} tone="faint" />
                ))}
                <Dots points={BLADE_01.leds} size={0.9} tone={selectedIndex === 0 ? "hi" : "mid"} pulse />
              </g>

              {/* ── 3. BLADE 02: PROCEDURAL INCIDENT MUTATION CORE ── */}
              <g
                key="blade-02"
                onClick={() => setActiveBlade(1)}
                onMouseEnter={() => setHoveredBlade(1)}
                onMouseLeave={() => setHoveredBlade(null)}
                style={{ transition: "opacity 0.25s", opacity: selectedIndex === 1 ? 1 : 0.65 }}
              >
                <Solid
                  paths={BLADE_02.body}
                  tone={selectedIndex === 1 ? "hi" : "mid"}
                  lit={selectedIndex === 1}
                  crease="faint"
                />
                <Solid paths={BLADE_02.cpuSlab} tone={selectedIndex === 1 ? "hi" : "mid"} crease="faint" />
                {BLADE_02.fins.map((fin, i) => (
                  <Solid key={i} paths={fin} tone={selectedIndex === 1 ? "hi" : "lo"} crease="faint" />
                ))}
                <Solid paths={BLADE_02.chaosBlock} tone="mid" crease="faint" />
                <Solid paths={BLADE_02.chaosDiode} tone={selectedIndex === 1 ? "hi" : "lo"} lit={selectedIndex === 1} />
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
                style={{ transition: "opacity 0.25s", opacity: selectedIndex === 2 ? 1 : 0.65 }}
              >
                <Solid
                  paths={BLADE_03.body}
                  tone={selectedIndex === 2 ? "hi" : "mid"}
                  lit={selectedIndex === 2}
                  crease="faint"
                />
                <Solid paths={BLADE_03.coreA} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_03.coreB} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_03.coreC} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Solid paths={BLADE_03.beacon} tone={selectedIndex === 2 ? "hi" : "mid"} crease="faint" />
                <Line d={BLADE_03.beaconRing} tone={selectedIndex === 2 ? "green" : "lo"} />
                <circle
                  cx={BLADE_03.beaconCore[0]}
                  cy={BLADE_03.beaconCore[1]}
                  r={selectedIndex === 2 ? 3.5 : 2}
                  fill={selectedIndex === 2 ? "#00ff41" : "#555"}
                  filter={selectedIndex === 2 ? "url(#emerald-glow)" : undefined}
                />
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
                style={{ transition: "opacity 0.25s", opacity: selectedIndex === 3 ? 1 : 0.65 }}
              >
                <Solid
                  paths={BLADE_04.body}
                  tone={selectedIndex === 3 ? "hi" : "mid"}
                  lit={selectedIndex === 3}
                  crease="faint"
                />
                <Solid paths={BLADE_04.vault} tone={selectedIndex === 3 ? "hi" : "mid"} crease="faint" />
                {BLADE_04.merkleTree.map((d, i) => (
                  <Line key={i} d={d} tone={selectedIndex === 3 ? "green" : "lo"} />
                ))}
                <Dots points={BLADE_04.merkleNodes} size={1.1} tone={selectedIndex === 3 ? "hi" : "mid"} pulse />
                <Solid paths={BLADE_04.zkCell} tone={selectedIndex === 3 ? "hi" : "lo"} lit={selectedIndex === 3} />
                <Line d={BLADE_04.zkSeal} tone={selectedIndex === 3 ? "green" : "lo"} />
                <Line d={BLADE_04.sealLine} tone="faint" dashed />
                <Dots points={BLADE_04.leds} size={0.9} tone={selectedIndex === 3 ? "hi" : "mid"} pulse />
              </g>

              {/* ── 6. DIRECT ANATOMICAL LABELS & LEADER LINES ── */}
              {/* Blade 01 Callout */}
              <g key="label-01" onClick={() => setActiveBlade(0)} style={{ cursor: "pointer" }}>
                <polyline
                  points="284,85 240,46 80,46"
                  fill="none"
                  stroke={selectedIndex === 0 ? "#00ff41" : "#333"}
                  strokeWidth="1"
                  strokeDasharray={selectedIndex === 0 ? "none" : "2,2"}
                />
                <circle cx="284" cy="85" r="2.5" fill={selectedIndex === 0 ? "#00ff41" : "#444"} />
                <text
                  x="80"
                  y="36"
                  fill={selectedIndex === 0 ? "#00ff41" : "#888"}
                  fontSize="11"
                  fontFamily="var(--anatomy-mono)"
                  fontWeight="700"
                  letterSpacing="1px"
                >
                  [01] INGESTION GATEWAY
                </text>
                <text
                  x="80"
                  y="48"
                  fill="#555"
                  fontSize="9"
                  fontFamily="var(--anatomy-mono)"
                  letterSpacing="0.5px"
                >
                  P2P WEBRTC // 360° PROCTOR
                </text>
              </g>

              {/* Blade 02 Callout */}
              <g key="label-02" onClick={() => setActiveBlade(1)} style={{ cursor: "pointer" }}>
                <polyline
                  points="364,115 320,24 160,24"
                  fill="none"
                  stroke={selectedIndex === 1 ? "#00ff41" : "#333"}
                  strokeWidth="1"
                  strokeDasharray={selectedIndex === 1 ? "none" : "2,2"}
                />
                <circle cx="364" cy="115" r="2.5" fill={selectedIndex === 1 ? "#00ff41" : "#444"} />
                <text
                  x="160"
                  y="14"
                  fill={selectedIndex === 1 ? "#00ff41" : "#888"}
                  fontSize="11"
                  fontFamily="var(--anatomy-mono)"
                  fontWeight="700"
                  letterSpacing="1px"
                >
                  [02] PROCEDURAL MUTATION CORE
                </text>
                <text
                  x="160"
                  y="26"
                  fill="#555"
                  fontSize="9"
                  fontFamily="var(--anatomy-mono)"
                  letterSpacing="0.5px"
                >
                  AST TREE // CHAOS SEEDING
                </text>
              </g>

              {/* Blade 03 Callout */}
              <g key="label-03" onClick={() => setActiveBlade(2)} style={{ cursor: "pointer" }}>
                <polyline
                  points="445,155 490,44 720,44"
                  fill="none"
                  stroke={selectedIndex === 2 ? "#00ff41" : "#333"}
                  strokeWidth="1"
                  strokeDasharray={selectedIndex === 2 ? "none" : "2,2"}
                />
                <circle cx="445" cy="155" r="2.5" fill={selectedIndex === 2 ? "#00ff41" : "#444"} />
                <text
                  x="494"
                  y="34"
                  fill={selectedIndex === 2 ? "#00ff41" : "#888"}
                  fontSize="11"
                  fontFamily="var(--anatomy-mono)"
                  fontWeight="700"
                  letterSpacing="1px"
                >
                  [03] AI OBSERVER ARRAY
                </text>
                <text
                  x="494"
                  y="46"
                  fill="#555"
                  fontSize="9"
                  fontFamily="var(--anatomy-mono)"
                  letterSpacing="0.5px"
                >
                  REASONING BUS // STAKEHOLDER MESH
                </text>
              </g>

              {/* Blade 04 Callout */}
              <g key="label-04" onClick={() => setActiveBlade(3)} style={{ cursor: "pointer" }}>
                <polyline
                  points="525,195 570,96 730,96"
                  fill="none"
                  stroke={selectedIndex === 3 ? "#00ff41" : "#333"}
                  strokeWidth="1"
                  strokeDasharray={selectedIndex === 3 ? "none" : "2,2"}
                />
                <circle cx="525" cy="195" r="2.5" fill={selectedIndex === 3 ? "#00ff41" : "#444"} />
                <text
                  x="574"
                  y="86"
                  fill={selectedIndex === 3 ? "#00ff41" : "#888"}
                  fontSize="11"
                  fontFamily="var(--anatomy-mono)"
                  fontWeight="700"
                  letterSpacing="1px"
                >
                  [04] CRYPTO VERIFIER LEDGER
                </text>
                <text
                  x="574"
                  y="98"
                  fill="#555"
                  fontSize="9"
                  fontFamily="var(--anatomy-mono)"
                  letterSpacing="0.5px"
                >
                  MERKLE ROOT // ZK ATTESTATION
                </text>
              </g>

              {/* Optical Bus Callout */}
              <g key="label-bus">
                <text
                  x="400"
                  y="410"
                  textAnchor="middle"
                  fill="#00ff41"
                  fontSize="10"
                  fontFamily="var(--anatomy-mono)"
                  fontWeight="700"
                  letterSpacing="2px"
                >
                  ▼ 100Gbps SYNCHRONIZED OPTICAL TELEMETRY BACKPLANE ▼
                </text>
              </g>
            </svg>
          </div>
        </Plate>
      </div>

      {/* High-Contrast Cyberpunk Diagnostic Telemetry Card */}
      <div
        style={{
          marginTop: 24,
          padding: 32,
          border: "1px solid #222",
          background: "#050505",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Neon Emerald Top Accent Bar (matches SYS.VERIFY cards) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#00ff41",
            boxShadow: "0 0 10px rgba(0,255,65,0.4)",
          }}
        />

        {/* Subsystem Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#00ff41",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: 6,
                fontFamily: "var(--anatomy-mono)",
              }}
            >
              [{meta.tag} // ACTIVE SUBSYSTEM]
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 800,
                margin: 0,
                textTransform: "uppercase",
                color: "#fff",
                letterSpacing: "1px",
              }}
            >
              {meta.title}
            </h3>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              border: "1px solid rgba(0, 255, 65, 0.3)",
              background: "rgba(0, 255, 65, 0.05)",
              fontSize: 11,
              fontWeight: 700,
              color: "#00ff41",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "var(--anatomy-mono)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00ff41",
                boxShadow: "0 0 8px #00ff41",
              }}
            />
            TELEMETRY: OPTIMAL
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "#888",
            margin: "0 0 24px",
            lineHeight: 1.7,
            maxWidth: 860,
          }}
        >
          {meta.summary}
        </p>

        {/* 4 Metric Badges in 4-column responsive grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {meta.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                border: "1px solid #1a1a1a",
                background: "#080808",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 8,
                  fontFamily: "var(--anatomy-mono)",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#00ff41",
                  letterSpacing: "0.5px",
                  fontFamily: "var(--anatomy-mono)",
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Live Event Stream Terminal Log */}
        <div
          style={{
            paddingTop: 16,
            borderTop: "1px solid #1a1a1a",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            fontFamily: "var(--anatomy-mono)",
            color: "#00ff41",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#00ff41", fontWeight: 700 }}>&gt;</span>
          <span style={{ color: "#ddd" }}>{meta.log}</span>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 14,
              background: "#00ff41",
              boxShadow: "0 0 6px #00ff41",
            }}
          />
        </div>
      </div>
    </section>
  );
}
