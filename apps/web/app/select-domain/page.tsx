"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCOPE_DEFINITIONS } from "../../lib/services/problemBank";

const DOMAIN_CARDS = [
  {
    id: "engineering",
    title: "Software Engineering",
    icon: "💻",
    accent: "#00ff41",
    desc: "Debug a critical concurrency double-charge race condition in an authentic Linux terminal & IDE.",
  },
  {
    id: "sales",
    title: "Sales & Commercial",
    icon: "📞",
    accent: "#f59e0b",
    desc: "Conduct a live call with Sam Jenkins (Nordic Goods) to save a $250k enterprise renewal.",
  },
  {
    id: "product",
    title: "Product Management",
    icon: "📋",
    accent: "#818cf8",
    desc: "Triage executive emails, manage sprint backlog, and design checkout A/B experiments.",
  },
  {
    id: "data",
    title: "Data & Analytics",
    icon: "📊",
    accent: "#06b6d4",
    desc: "Investigate why DAU dropped 18% using SQL, repair failing ETL DAGs, and build BI reports.",
  },
  {
    id: "sre",
    title: "SRE & Incident Ops",
    icon: "🚨",
    accent: "#ef4444",
    desc: "Take command of an active Sev-1 war room, diagnose 42% 5xx errors, and execute a 1-click rollback.",
  },
  {
    id: "support",
    title: "Customer Support",
    icon: "🎧",
    accent: "#10b981",
    desc: "Resolve 120-ticket backlog, inspect payment ledger, and execute unified batch escalation.",
  },
  {
    id: "brand",
    title: "Brand & Social Crisis",
    icon: "📱",
    accent: "#ec4899",
    desc: "Defuse a viral social backlash, compose executive statements, and swing public sentiment positive.",
  },
];

export default function SelectDomainPage() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string>("engineering");
  const [selectedSubEnv, setSelectedSubEnv] = useState<number>(1);
  const [customProblem, setCustomProblem] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("praxis_custom_company_problems");
      if (stored) {
        const list = JSON.parse(stored);
        if (list && list.length > 0) {
          setCustomProblem(list[0]);
          return;
        }
      }
      const defaultProblem = {
        id: "nordic-3ds-demo",
        companyName: "Nordic Goods",
        rawTitle: "Mobile 3DS Checkout Timeout",
        domain: "engineering",
        redefinedTitle: "Nordic Goods // Mobile 3DS Handshake Deadlock",
        incidentOverview:
          "During peak mobile checkout, iOS Safari shoppers get stuck on blank 3D Secure modal handshakes. The payment gateway webhook never fires, thread saturation reaches 98.4%, and 42,000 active sessions are dropped. Estimated revenue exposure: $380,000.",
        blastRadius: "42,000 active sessions // $380K revenue risk",
        subEnvironments: [
          {
            subEnv: 1,
            title: "01 — Live Infrastructure & Telemetry Triage",
            envType: "Remote Linux Terminal",
            problemStatement:
              "Inspect aura-prod-app-04 via SSH, grep system logs for 3DS gateway timeouts, and identify thread starvation.",
          },
        ],
        observerPersonaPrompt:
          "You are the Lead SRE observing this candidate solving Nordic Goods' Mobile 3DS outage. Evaluate their structured debugging and tool utilization.",
      };
      setCustomProblem(defaultProblem);
      localStorage.setItem("praxis_custom_company_problems", JSON.stringify([defaultProblem]));
      localStorage.setItem("praxis_active_custom_problem", JSON.stringify(defaultProblem));
    } catch {}
  }, []);

  const activeScopeDef = SCOPE_DEFINITIONS[selectedDomain] || SCOPE_DEFINITIONS.engineering;

  const handleLaunch = (domainId: string, subEnvNum: number = 1) => {
    router.push(`/seeker/dashboard?domain=${domainId}&subEnv=${subEnvNum}`);
  };

  const handleLaunchCompanyProblem = (prob: any) => {
    try {
      localStorage.setItem("praxis_active_custom_problem", JSON.stringify(prob));
    } catch {}
    router.push(`/simulation/custom-${prob.id || "comp"}?domain=${prob.domain || "engineering"}&subEnv=1&customProblem=1&skin=ide`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f8fafc",
        fontFamily: "'JetBrains Mono', monospace",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Swiss Multi-Point Ambient Glass Glow Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Luminous cyan gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "15%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 65%)",
            filter: "blur(140px)",
          }}
        />
        {/* Violet ambient backlight */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            right: "5%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 60%)",
            filter: "blur(150px)",
          }}
        />
        {/* Subtle emerald ground glow */}
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            left: "30%",
            width: "45vw",
            height: "45vw",
            background: "radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, transparent 65%)",
            filter: "blur(130px)",
          }}
        />
      </div>

      {/* Swiss Top Navigation Bar with Clickable ASCII PRAXIS Logo */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(3, 7, 18, 0.5)",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 14px",
            background: "rgba(10, 16, 28, 0.75)",
            border: "1px solid rgba(0, 255, 65, 0.35)",
            borderRadius: 8,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 0 rgba(0, 255, 65, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00ff41";
            e.currentTarget.style.boxShadow =
              "inset 0 1px 0 0 rgba(0, 255, 65, 0.4), 0 12px 30px rgba(0, 255, 65, 0.35)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.35)";
            e.currentTarget.style.boxShadow =
              "inset 0 1px 0 0 rgba(0, 255, 65, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6)";
            e.currentTarget.style.transform = "none";
          }}
          title="Return to Praxis Landing Page"
        >
          <pre
            style={{
              margin: 0,
              fontSize: 8,
              lineHeight: 1.1,
              color: "#00ff41",
              fontFamily: "'JetBrains Mono', monospace",
              textShadow: "0 0 8px rgba(0, 255, 65, 0.6)",
              userSelect: "none",
              letterSpacing: "-0.5px",
            }}
          >
{`  ┌───┐
 ┌┘ P └┐
┌┘ R A X └┐
│  I S .  │
└┐ I O ┌┘
 └┐ . ┌┘
  └───┘`}
          </pre>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "2px", lineHeight: 1 }}>
                PRAXIS
              </span>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 6px",
                  background: "rgba(0, 255, 65, 0.15)",
                  color: "#00ff41",
                  borderRadius: 4,
                  fontWeight: 700,
                  border: "1px solid rgba(0, 255, 65, 0.3)",
                  letterSpacing: "0.5px",
                }}
              >
                ASCII.NAV
              </span>
            </div>
            <span style={{ fontSize: 9.5, color: "#94a3b8", letterSpacing: "0.5px", marginTop: 2 }}>
              &lt; RETURN_TO_HOME
            </span>
          </div>
        </Link>

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#f59e0b",
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            padding: "5px 12px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
          AURA COMMERCE // 7 SCOPES × 3 SUB-ENVIRONMENTS (21 ARENAS)
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1260, margin: "0 auto", padding: "36px 32px 100px" }}>
        {/* Swiss International Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 12,
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "4px 14px",
              borderRadius: 20,
            }}
          >
            <span>STEP 01</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>OPERATIONAL ARENA SELECTION</span>
          </div>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 900,
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textTransform: "none",
            }}
          >
            Choose Your Operational Arena
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#94a3b8",
              margin: "0 auto",
              maxWidth: 720,
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Select any of the 7 professional scopes below. Each scope provides 3 authentic, interactive sub-environments with live systems, real data, and real-time behavioral telemetry.
          </p>
        </div>

        {/* Featured Live Company-Submitted Challenge Card - Swiss Glass */}
        {customProblem && (
          <div
            style={{
              background: "rgba(10, 20, 36, 0.65)",
              border: "1px solid rgba(0, 255, 65, 0.35)",
              borderRadius: 16,
              padding: "24px 28px",
              marginBottom: 36,
              boxShadow: "inset 0 1px 0 0 rgba(0, 255, 65, 0.2), 0 20px 50px rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 10,
                    padding: "3px 10px",
                    background: "#00ff41",
                    color: "#030712",
                    fontWeight: 800,
                    borderRadius: 4,
                    letterSpacing: "0.08em",
                  }}
                >
                  LIVE COMPANY BOUNTY
                </span>
                <span style={{ fontSize: 12, color: "#00ff41", fontWeight: 700 }}>
                  {customProblem.companyName || "Nordic Goods"}
                </span>
                {customProblem.blastRadius && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 4,
                      color: "#cbd5e1",
                    }}
                  >
                    {customProblem.blastRadius}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                {customProblem.redefinedTitle || customProblem.rawTitle}
              </h2>
              <p style={{ fontSize: 13.5, color: "#94a3b8", margin: 0, lineHeight: 1.6, maxWidth: 840 }}>
                {customProblem.incidentOverview}
              </p>
            </div>

            <button
              onClick={() => handleLaunchCompanyProblem(customProblem)}
              style={{
                padding: "13px 26px",
                background: "linear-gradient(135deg, #00ff41 0%, #10b981 100%)",
                color: "#030712",
                fontWeight: 800,
                fontSize: 12.5,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 24px rgba(0, 255, 65, 0.35)",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 255, 65, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 255, 65, 0.35)";
              }}
            >
              LAUNCH COMPANY CHALLENGE →
            </button>
          </div>
        )}

        {/* 7 Scope Selector Cards Grid - Swiss Glass */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 36,
          }}
        >
          {DOMAIN_CARDS.map((card) => {
            const isSelected = selectedDomain === card.id;
            return (
              <button
                key={card.id}
                onClick={() => {
                  setSelectedDomain(card.id);
                  setSelectedSubEnv(1);
                }}
                style={{
                  padding: "18px 14px",
                  borderRadius: 14,
                  border: isSelected ? `1.5px solid ${card.accent}` : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isSelected
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(10, 16, 28, 0.45)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: isSelected
                    ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 12px 32px ${card.accent}30`
                    : "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 8px 20px rgba(0, 0, 0, 0.4)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(10, 16, 28, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "none";
                  }
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: isSelected ? `${card.accent}20` : "rgba(255, 255, 255, 0.04)",
                    border: isSelected ? `1px solid ${card.accent}60` : "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    boxShadow: isSelected ? `0 0 14px ${card.accent}40` : "none",
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? "#ffffff" : "#cbd5e1",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: isSelected ? card.accent : "#64748b",
                    padding: "2px 8px",
                    borderRadius: 12,
                    background: isSelected ? `${card.accent}15` : "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  3 Sub-Envs
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Showcase & 3 Sub-Environments - Swiss Glass Master Container */}
        <div
          style={{
            background: "rgba(10, 16, 30, 0.65)",
            border: `1px solid ${activeScopeDef.accent}45`,
            borderRadius: 20,
            padding: "36px 32px",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 28px 70px rgba(0, 0, 0, 0.7), 0 0 35px ${activeScopeDef.accent}15`,
            backdropFilter: "blur(28px) saturate(190%)",
            WebkitBackdropFilter: "blur(28px) saturate(190%)",
          }}
        >
          {/* Active Scope Title Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: 24,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: activeScopeDef.accent,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: activeScopeDef.accent,
                    boxShadow: `0 0 10px ${activeScopeDef.accent}`,
                  }}
                />
                SCOPE SPECIFICATION // {activeScopeDef.label.toUpperCase()}
              </div>
              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#fff",
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {activeScopeDef.projectTitle}
              </h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, maxWidth: 840, lineHeight: 1.65 }}>
                {activeScopeDef.projectOverview}
              </p>
            </div>

            <button
              onClick={() => handleLaunch(selectedDomain, selectedSubEnv)}
              style={{
                padding: "13px 28px",
                background: activeScopeDef.accent,
                color: "#030712",
                fontWeight: 800,
                fontSize: 13,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 8px 24px ${activeScopeDef.accent}40`,
                letterSpacing: "0.02em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${activeScopeDef.accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `0 8px 24px ${activeScopeDef.accent}40`;
              }}
            >
              <span>LAUNCH ACTIVE SCOPE</span>
              <span>→</span>
            </button>
          </div>

          {/* 3 Sub-Environments Grid - Swiss Glass Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {activeScopeDef.subEnvironments.map((sub) => {
              const isSubSelected = selectedSubEnv === sub.subEnv;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubEnv(sub.subEnv)}
                  style={{
                    padding: 24,
                    borderRadius: 14,
                    border: isSubSelected
                      ? `1.5px solid ${activeScopeDef.accent}`
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isSubSelected
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.02)",
                    boxShadow: isSubSelected
                      ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 16px 36px ${activeScopeDef.accent}20`
                      : "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 8px 20px rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubSelected) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubSelected) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "none";
                    }
                  }}
                >
                  <div>
                    {/* Top Row: Pill Badge and Environment Skin */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: isSubSelected ? `${activeScopeDef.accent}25` : "rgba(255, 255, 255, 0.08)",
                          color: isSubSelected ? activeScopeDef.accent : "#cbd5e1",
                          letterSpacing: "0.06em",
                        }}
                      >
                        SUB-ENV 0{sub.subEnv}
                      </span>
                      <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>
                        {sub.envType}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 10px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {sub.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 16px" }}>
                      {sub.description}
                    </p>

                    {/* Problem Statement Inner Glass Box */}
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.35)",
                        padding: "14px 16px",
                        borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: 12,
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                        marginBottom: 20,
                      }}
                    >
                      <strong style={{ color: activeScopeDef.accent, fontWeight: 700 }}>Problem: </strong>
                      {sub.problemStatement}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(selectedDomain, sub.subEnv);
                    }}
                    style={{
                      width: "100%",
                      padding: "11px",
                      background: isSubSelected
                        ? activeScopeDef.accent
                        : "rgba(255, 255, 255, 0.05)",
                      color: isSubSelected ? "#030712" : "#ffffff",
                      fontWeight: 800,
                      fontSize: 12,
                      borderRadius: 8,
                      border: isSubSelected
                        ? `1px solid ${activeScopeDef.accent}`
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                      letterSpacing: "0.03em",
                      transition: "all 0.2s ease",
                      boxShadow: isSubSelected ? `0 6px 18px ${activeScopeDef.accent}40` : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubSelected) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubSelected) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }
                    }}
                  >
                    <span>ENTER SUB-ENV 0{sub.subEnv}</span>
                    <span>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
