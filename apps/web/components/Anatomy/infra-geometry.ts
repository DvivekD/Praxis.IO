import {
  circleRing,
  extrude,
  iso,
  onTop,
  pathOf,
  slabOf,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
  type Projection,
  type SolidPaths,
} from "./kit/iso-kit";

export const PROJECTION: Projection = {
  origin: [400, 205],
  scale: 0.96,
  azimuth: 45,
  elevation: 30,
};

const P = PROJECTION;

const pt = (p: Point3): Flat => iso(p, P);
const seg = (a: Point3, b: Point3): string => pathOf([pt(a), pt(b)]);
const rectLines = (p1: Point3, p2: Point3, p3: Point3, p4: Point3): string =>
  pathOf([pt(p1), pt(p2), pt(p3), pt(p4)], true);

// ── 1. MASTER CHASSIS & BACKPLANE ───────────────────────────────────────────
export const CHASSIS = {
  slab: slabOf({ x: -210, y: -80, w: 420, d: 165, r: 8 }, 0, 10, P, 6, 1),
  mountingHoles: [
    pt([-198, -68, 10.1]),
    pt([198, -68, 10.1]),
    pt([198, 73, 10.1]),
    pt([-198, 73, 10.1]),
    pt([-60, 73, 10.1]),
    pt([60, 73, 10.1]),
  ] as Flat[],
  bayGrooves: [
    pathOf([pt([-176, -65, 10.2]), pt([-104, -65, 10.2]), pt([-104, 55, 10.2]), pt([-176, 55, 10.2])], true),
    pathOf([pt([-83, -65, 10.2]), pt([-11, -65, 10.2]), pt([-11, 55, 10.2]), pt([-83, 55, 10.2])], true),
    pathOf([pt([11, -65, 10.2]), pt([83, -65, 10.2]), pt([83, 55, 10.2]), pt([11, 55, 10.2])], true),
    pathOf([pt([104, -65, 10.2]), pt([176, -65, 10.2]), pt([176, 55, 10.2]), pt([104, 55, 10.2])], true),
  ],
  opticalBusPrimary: pathOf([pt([-190, 62, 10.3]), pt([190, 62, 10.3])]),
  opticalBusSecondary: pathOf([pt([-190, 70, 10.3]), pt([190, 70, 10.3])]),
  busTaps: [
    pathOf([pt([-140, 55, 10.3]), pt([-140, 62, 10.3])]),
    pathOf([pt([-47, 55, 10.3]), pt([-47, 62, 10.3])]),
    pathOf([pt([47, 55, 10.3]), pt([47, 62, 10.3])]),
    pathOf([pt([140, 55, 10.3]), pt([140, 62, 10.3])]),
  ],
  chassisTicks: Array.from({ length: 15 }, (_, i) => {
    const x = -190 + i * (380 / 14);
    return seg([x, 75, 10.1], [x, 78, 10.1]);
  }).join(""),
};

// ── 2. BLADE 01: INGESTION & 360 PROCTOR GATEWAY (X: -140) ──────────────────
export const BLADE_01 = {
  center: pt([-140, -5, 30]),
  body: slabOf({ x: -174, y: -63, w: 68, d: 116, r: 4 }, 10, 20, P, 6, 1),
  // Turret base cylinder
  turret: extrude(circleRing(-140, -22, 16, 24), 30, 16, P, { convex: true }),
  turretLens: extrude(circleRing(-140, -22, 10, 24), 46, 5, P, { convex: true }),
  turretRing: onTop(circleRing(-140, -22, 13, 24), 51.1, P, true),
  // Gaze vector tracking line
  gazeRay: pathOf([pt([-140, -22, 51.2]), pt([-165, -45, 62])]),
  gazeTarget: pt([-165, -45, 62]),
  // Dual fiber ports
  portL: extrude(circleRing(-150, 45, 3.5, 16), 30, 6, P, { convex: true }),
  portR: extrude(circleRing(-130, 45, 3.5, 16), 30, 6, P, { convex: true }),
  // Side cooling vents
  ventLines: [
    seg([-174.1, -40, 16], [-174.1, 30, 16]),
    seg([-174.1, -40, 20], [-174.1, 30, 20]),
    seg([-174.1, -40, 24], [-174.1, 30, 24]),
  ],
  // Top status LEDs
  leds: [
    pt([-155, 10, 30.2]),
    pt([-155, 18, 30.2]),
    pt([-155, 26, 30.2]),
  ] as Flat[],
};

// ── 3. BLADE 02: PROCEDURAL INCIDENT MUTATION CORE (X: -47) ─────────────────
export const BLADE_02 = {
  center: pt([-47, -5, 30]),
  body: slabOf({ x: -81, y: -63, w: 68, d: 116, r: 4 }, 10, 18, P, 6, 1),
  // Central CPU Heatspreader
  cpuSlab: slabOf({ x: -67, y: -45, w: 40, d: 48, r: 2 }, 28, 10, P, 4, 0.5),
  // 5 parallel cooling fins
  fins: [
    slabOf({ x: -65, y: -43, w: 36, d: 4, r: 1 }, 38, 12, P, 2),
    slabOf({ x: -65, y: -33, w: 36, d: 4, r: 1 }, 38, 12, P, 2),
    slabOf({ x: -65, y: -23, w: 36, d: 4, r: 1 }, 38, 12, P, 2),
    slabOf({ x: -65, y: -13, w: 36, d: 4, r: 1 }, 38, 12, P, 2),
    slabOf({ x: -65, y: -3, w: 36, d: 4, r: 1 }, 38, 12, P, 2),
  ],
  // Chaos Injector Module (front-deck)
  chaosBlock: slabOf({ x: -60, y: 15, w: 26, d: 24, r: 2 }, 28, 8, P, 4),
  chaosDiode: extrude(circleRing(-47, 27, 4.5, 16), 36, 4, P, { convex: true }),
  // Traces
  busTraces: [
    pathOf([pt([-47, 5, 28.2]), pt([-47, 15, 28.2])]),
    pathOf([pt([-47, 39, 28.2]), pt([-47, 51, 28.2])]),
    pathOf([pt([-32, -20, 28.2]), pt([-22, -20, 28.2]), pt([-22, 20, 28.2]), pt([-34, 20, 28.2])]),
  ],
  leds: [
    pt([-62, 38, 28.2]),
    pt([-55, 38, 28.2]),
    pt([-39, 38, 28.2]),
  ] as Flat[],
};

// ── 4. BLADE 03: MULTI-AGENT AI OBSERVER ARRAY (X: +47) ─────────────────────
export const BLADE_03 = {
  center: pt([47, -5, 30]),
  body: slabOf({ x: 13, y: -63, w: 68, d: 116, r: 4 }, 10, 18, P, 6, 1),
  // Three neural accelerator packages
  coreA: slabOf({ x: 20, y: -50, w: 22, d: 24, r: 2 }, 28, 7, P, 4), // Stakeholder
  coreB: slabOf({ x: 51, y: -50, w: 22, d: 24, r: 2 }, 28, 7, P, 4), // Tech Lead
  coreC: slabOf({ x: 36, y: -18, w: 22, d: 24, r: 2 }, 28, 7, P, 4), // Anticheat Sentinel
  // Beacon Pillar (representing the central reasoning bus)
  beacon: extrude(circleRing(47, 25, 9, 24), 28, 20, P, { convex: true }),
  beaconRing: onTop(circleRing(47, 25, 11, 24), 48.1, P, true),
  beaconCore: pt([47, 25, 49]),
  // Reasoning interconnect traces
  neuralBusLines: [
    pathOf([pt([31, -38, 35.1]), pt([47, -26, 30.1]), pt([62, -38, 35.1])]),
    pathOf([pt([47, -26, 30.1]), pt([47, -18, 35.1])]),
    pathOf([pt([47, 6, 28.2]), pt([47, 16, 28.2])]),
    pathOf([pt([47, 34, 28.2]), pt([47, 50, 28.2])]),
  ],
  leds: [
    pt([22, 10, 28.2]),
    pt([22, 18, 28.2]),
    pt([22, 26, 28.2]),
    pt([72, 10, 28.2]),
    pt([72, 18, 28.2]),
    pt([72, 26, 28.2]),
  ] as Flat[],
};

// ── 5. BLADE 04: CRYPTOGRAPHIC VERIFIER & LEDGER (X: +140) ──────────────────
export const BLADE_04 = {
  center: pt([140, -5, 30]),
  body: slabOf({ x: 106, y: -63, w: 68, d: 116, r: 4 }, 10, 20, P, 6, 1),
  // Vault enclosure block
  vault: slabOf({ x: 116, y: -52, w: 48, d: 58, r: 4 }, 30, 16, P, 4, 0.8),
  // Merkle tree circuit on vault roof
  merkleTree: [
    // Root
    seg([140, -42, 46.2], [140, -32, 46.2]),
    // Branch 1
    seg([140, -32, 46.2], [128, -20, 46.2]),
    seg([140, -32, 46.2], [152, -20, 46.2]),
    // Branch 2
    seg([128, -20, 46.2], [124, -8, 46.2]),
    seg([128, -20, 46.2], [132, -8, 46.2]),
    seg([152, -20, 46.2], [148, -8, 46.2]),
    seg([152, -20, 46.2], [156, -8, 46.2]),
  ],
  merkleNodes: [
    pt([140, -42, 46.3]),
    pt([128, -20, 46.3]),
    pt([152, -20, 46.3]),
    pt([124, -8, 46.3]),
    pt([132, -8, 46.3]),
    pt([148, -8, 46.3]),
    pt([156, -8, 46.3]),
  ] as Flat[],
  // ZK-attestation cell (front deck)
  zkCell: extrude(circleRing(140, 28, 10, 6), 30, 10, P, { convex: true }),
  zkSeal: onTop(circleRing(140, 28, 6, 16), 40.2, P, true),
  // Tamper evident stripe
  sealLine: seg([116.1, -10, 38], [163.9, -10, 38]),
  leds: [
    pt([120, 45, 30.2]),
    pt([128, 45, 30.2]),
    pt([152, 45, 30.2]),
    pt([160, 45, 30.2]),
  ] as Flat[],
};

export const BLADES_META = [
  {
    id: 0,
    tag: "BLADE 01",
    shortName: "Ingestion Gateway",
    title: "Multimodal Telemetry & 360° Proctor Gateway",
    summary:
      "Captures candidate WebRTC dual video (front webcam + rear P2P mobile phone), low-latency audio stream, and real-time gaze vector trajectories.",
    readout: "STREAM 1080P/60 · P2P OK · GAZE 99.8% · JITTER 1.8ms",
    metrics: [
      { label: "P2P Latency", value: "14 ms", good: true },
      { label: "Gaze Drift", value: "0.04°", good: true },
      { label: "VAD Confidence", value: "99.2%", good: true },
      { label: "Cheat Flags", value: "0 DETECTED", good: true },
    ],
    log: "[INGEST] Session #8F3A stream synchronized. Dual P2P cameras locked at 60fps.",
  },
  {
    id: 1,
    tag: "BLADE 02",
    shortName: "Procedural Engine",
    title: "Procedural Incident Mutation Core",
    summary:
      "Dynamically mutates real-world historical production incidents, git commit graphs, and syntax trees so no two candidates ever face identical problem spaces.",
    readout: "SEED #8F3A-PROD · ENTROPY 0.942 · AST DRIFT 1.2mm · FORK OK",
    metrics: [
      { label: "Graph Mutation", value: "PROCEDURAL", good: true },
      { label: "Branch Entropy", value: "0.942", good: true },
      { label: "Container Spin", value: "320 ms", good: true },
      { label: "Chaos Vector", value: "SEEDED #4", good: true },
    ],
    log: "[MUTATION] Git fork complete. Seeding memory leak chaos in worker thread 3.",
  },
  {
    id: 2,
    tag: "BLADE 03",
    shortName: "AI Observer Array",
    title: "Multi-Agent AI Observer & Reasoning Mesh",
    summary:
      "Autonomous AI observer array simulating executive stakeholders, technical leads, and anticheat sentinels to analyze reasoning trajectory and AST lean.",
    readout: "OBSERVERS 3/3 SYNC · REASONING 4.8k T/S · FIDELITY 99.4%",
    metrics: [
      { label: "Observer Cores", value: "3 ACTIVE", good: true },
      { label: "Reasoning Bus", value: "4.8k T/s", good: true },
      { label: "Behavioral Score", value: "94 / 100", good: true },
      { label: "AST Lean Drift", value: "1.2 mm", good: true },
    ],
    log: "[OBSERVER] Tech-Lead Agent observing CLI debugging steps. AST lean stable.",
  },
  {
    id: 3,
    tag: "BLADE 04",
    shortName: "Crypto Verifier",
    title: "Cryptographic Settlement & Verifiable Ledger",
    summary:
      "Generates zero-knowledge performance attestations and commits candidate problem-solving track records into an immutable Merkle verification ledger.",
    readout: "MERKLE 0x7E...4B91 · ZK-PROOF OK · ATTESTED · IMMUTABLE",
    metrics: [
      { label: "Merkle Root", value: "0x7E4B...91A", good: true },
      { label: "ZK-Stark Time", value: "420 ms", good: true },
      { label: "Credential", value: "ATTESTED", good: true },
      { label: "Ledger State", value: "FINALIZED", good: true },
    ],
    log: "[VERIFIER] Merkle root committed. Portable cryptographic credential minted.",
  },
];
