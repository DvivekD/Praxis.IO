"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useState, useEffect } from "react";
import { startSimulationAction } from "../../../actions/eval";
import { SCOPE_DEFINITIONS } from "../../../lib/services/problemBank";

export default function SeekerDashboard() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#030712",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00ff41",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          <div
            style={{
              padding: "24px 36px",
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(0, 255, 65, 0.3)",
              borderRadius: 12,
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00ff41",
                boxShadow: "0 0 10px #00ff41",
              }}
            />
            [ INITIALIZING_CANDIDATE_ASSIGNMENT_PORTAL... ]
          </div>
        </div>
      }
    >
      <SeekerDashboardContent />
    </Suspense>
  );
}

const DEFAULT_COMPANY_PROBLEM = {
  id: "nordic-goods-3ds",
  companyName: "Nordic Goods",
  rawTitle: "Mobile 3DS Checkout Timeout",
  domain: "engineering",
  redefinedTitle: "Nordic Goods // Mobile 3DS Handshake Deadlock",
  incidentOverview:
    "During peak Black Friday mobile checkout, iOS Safari shoppers get stuck on blank 3D Secure modal handshakes. The payment gateway webhook never fires, thread saturation reaches 98.4%, and 42,000 active sessions are dropped. Estimated revenue exposure: $380,000.",
  blastRadius: "42,000 active sessions // $380K revenue risk",
  subEnvironments: [
    {
      subEnv: 1,
      id: "comp-sub-1",
      title: "01 — Live Infrastructure & Telemetry Triage",
      envType: "Linux SSH / Remote Server",
      description:
        "Investigate remote Linux server aura-prod-app-04 via SSH, grep system logs for 3DS gateway timeouts, and identify connection pool starvation.",
      problemStatement:
        "Checkout requests are timing out (>30s) during Black Friday traffic bursts. Inspect remote Linux server aura-prod-app-04 via SSH, check system resource metrics (ps aux, top, free -m), inspect 3DS timeout logs, and isolate connection pool starvation.",
      skinType: "ide",
    },
    {
      subEnv: 2,
      id: "comp-sub-2",
      title: "02 — Network Diagnostics Lab",
      envType: "CLI / Network Tools",
      description:
        "Diagnose DNS resolution and payment gateway handshake drops. Identify whether 3DS callbacks are being dropped at ingress or upstream.",
      problemStatement:
        "Determine whether checkout failures originate from DNS misdirection or payment gateway webhook drops using diagnostic CLI tools (nslookup, dig, curl, nc, ss -s).",
      skinType: "ide",
    },
    {
      subEnv: 3,
      id: "comp-sub-3",
      title: "03 — Code Debugger & Idempotency Patch",
      envType: "IDE / Debugger",
      description:
        "Inspect checkout.ts, reproduce the 3DS verification deadlock, patch the race condition, and run test suite.",
      problemStatement:
        "Fix the race condition in checkout.ts by acquiring atomic order lock before external 3DS charge dispatch.",
      skinType: "ide",
    },
  ],
  observerPersonaPrompt:
    "You are the Lead SRE observing this candidate solving Nordic Goods' Mobile 3DS outage. Evaluate their structured debugging and tool utilization.",
};

function SeekerDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const domainParam = (searchParams.get("domain") || "engineering").toLowerCase();
  const subEnvParam = searchParams.get("subEnv");
  const initialSubEnvNum = Number(subEnvParam) || 1;

  const [currentDomain, setCurrentDomain] = useState<string>(domainParam);
  const [loadingSub, setLoadingSub] = useState<number | null>(null);
  const [challengeSource, setChallengeSource] = useState<"company" | "standard">("company");
  const [companyProblemsList, setCompanyProblemsList] = useState<any[]>([DEFAULT_COMPANY_PROBLEM]);
  const [selectedProblemIdx, setSelectedProblemIdx] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("praxis_custom_company_problems");
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          setCompanyProblemsList(list);
          return;
        }
      }
      localStorage.setItem("praxis_custom_company_problems", JSON.stringify([DEFAULT_COMPANY_PROBLEM]));
      localStorage.setItem("praxis_active_custom_problem", JSON.stringify(DEFAULT_COMPANY_PROBLEM));
    } catch {}
  }, []);

  useEffect(() => {
    if (domainParam) setCurrentDomain(domainParam);
  }, [domainParam]);

  const activeScope = SCOPE_DEFINITIONS[currentDomain] || SCOPE_DEFINITIONS.engineering;
  const activeCompanyProblem = companyProblemsList[selectedProblemIdx] || DEFAULT_COMPANY_PROBLEM;

  const handleLaunchCompanyProblem = (prob: any, subEnvNum: number = 1) => {
    try {
      localStorage.setItem("praxis_active_custom_problem", JSON.stringify(prob));
    } catch {}
    router.push(
      `/simulation/custom-${prob.id || "comp"}?domain=${prob.domain || currentDomain}&subEnv=${subEnvNum}&customProblem=1&skin=ide`
    );
  };

  const handleLaunchSubEnv = async (subEnvNum: number, skinType: string = "ide") => {
    setLoadingSub(subEnvNum);
    try {
      if (challengeSource === "company") {
        handleLaunchCompanyProblem(activeCompanyProblem, subEnvNum);
        return;
      }
      const result = await startSimulationAction(currentDomain, 50, "test-candidate-id", undefined, subEnvNum);
      if (typeof window !== "undefined") {
        localStorage.setItem(`praxis_session_${result.sessionId}`, JSON.stringify(result.state));
      }
      router.push(`/simulation/${result.sessionId}?domain=${currentDomain}&subEnv=${subEnvNum}&skin=${skinType}`);
    } catch (e) {
      console.error("[SEEKER] Launch failed", e);
      setLoadingSub(null);
    }
  };

  const scopeColor = challengeSource === "company" ? "#00ff41" : activeScope.accent;

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
      {/* Multi-Point Ambient Glass Glow Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "15%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 65%)",
            filter: "blur(140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "5%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, transparent 60%)",
            filter: "blur(150px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "25%",
            width: "45vw",
            height: "45vw",
            background: `radial-gradient(circle, ${scopeColor}15 0%, transparent 65%)`,
            filter: "blur(130px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "36px 24px 100px" }}>
        {/* Top Control Bar with Clickable ASCII Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 24,
            marginBottom: 32,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Top Left: Clickable ASCII PRAXIS Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "8px 16px",
              background: "rgba(10, 16, 28, 0.75)",
              border: "1px solid rgba(0, 255, 65, 0.35)",
              borderRadius: 10,
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
            title="Click to return to Praxis Landing Page"
          >
            {/* ASCII Isometric Emblem */}
            <pre
              style={{
                margin: 0,
                fontSize: 8.5,
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
                <span style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: "2px", lineHeight: 1 }}>
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
              <span style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.5px", marginTop: 3 }}>
                &lt; RETURN_TO_HOME
              </span>
            </div>
          </Link>

          {/* Top Right: All Arenas button & Scope Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => router.push("/select-domain")}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              [ ALL_ARENAS ]
            </button>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${scopeColor}40`,
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                color: scopeColor,
                letterSpacing: "0.05em",
                backdropFilter: "blur(12px)",
              }}
            >
              {activeScope.label.toUpperCase()} // 3 SUB-ENVIRONMENTS
            </div>
          </div>
        </div>

        {/* Header Title Bar */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              color: scopeColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: scopeColor,
                boxShadow: `0 0 8px ${scopeColor}`,
              }}
            />
            [ SYS.ACTIVE // AURA COMMERCE SIMULATION ENGINE ]
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            CANDIDATE ASSIGNMENT PORTAL
          </h1>
        </div>

        {/* 7 Scope Switcher Tabs - Glass Segmented Control */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 10,
            }}
          >
            SELECT OPERATIONAL SCOPE (7 TOTAL):
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 8,
              padding: 4,
              background: "rgba(10, 16, 28, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 10,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {Object.keys(SCOPE_DEFINITIONS).map((key) => {
              const scopeDef = SCOPE_DEFINITIONS[key];
              const isSelected = currentDomain === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentDomain(key);
                    router.push(`/seeker/dashboard?domain=${key}`);
                  }}
                  style={{
                    padding: "10px 10px",
                    background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                    color: isSelected ? "#ffffff" : "#94a3b8",
                    border: isSelected ? `1px solid ${scopeDef.accent}` : "1px solid transparent",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: isSelected ? 800 : 600,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono', monospace",
                    boxShadow: isSelected
                      ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 14px ${scopeDef.accent}20`
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.color = "#f1f5f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#94a3b8";
                    }
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: scopeDef.accent,
                      boxShadow: isSelected ? `0 0 6px ${scopeDef.accent}` : "none",
                    }}
                  />
                  <span>{scopeDef.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Challenge Source Switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SELECT CHALLENGE:
            </span>

            {/* Company Bounty Button */}
            <button
              onClick={() => setChallengeSource("company")}
              style={{
                padding: "8px 16px",
                background:
                  challengeSource === "company"
                    ? "linear-gradient(135deg, rgba(0, 255, 65, 0.18) 0%, rgba(0, 255, 65, 0.08) 100%)"
                    : "rgba(255, 255, 255, 0.03)",
                color: challengeSource === "company" ? "#00ff41" : "#94a3b8",
                border: challengeSource === "company" ? "1.5px solid #00ff41" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                fontWeight: 800,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow:
                  challengeSource === "company"
                    ? "inset 0 1px 0 0 rgba(0, 255, 65, 0.3), 0 8px 24px rgba(0, 255, 65, 0.25)"
                    : "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
              }}
            >
              <span>⚡</span>
              <span>{activeCompanyProblem.companyName.toUpperCase()} (COMPANY SUBMITTED)</span>
            </button>

            {/* Standard Benchmark Button */}
            <button
              onClick={() => setChallengeSource("standard")}
              style={{
                padding: "8px 16px",
                background:
                  challengeSource === "standard"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.03)",
                color: challengeSource === "standard" ? "#ffffff" : "#94a3b8",
                border: challengeSource === "standard" ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow:
                  challengeSource === "standard"
                    ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.5)"
                    : "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
              }}
            >
              <span>🏢</span>
              <span>AURA COMMERCE (STANDARD BENCHMARK)</span>
            </button>
          </div>

          {companyProblemsList.length > 1 && challengeSource === "company" && (
            <select
              value={selectedProblemIdx}
              onChange={(e) => setSelectedProblemIdx(Number(e.target.value))}
              style={{
                background: "rgba(10, 16, 28, 0.8)",
                color: "#00ff41",
                border: "1px solid rgba(0, 255, 65, 0.4)",
                padding: "8px 14px",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                outline: "none",
                cursor: "pointer",
                borderRadius: 6,
                backdropFilter: "blur(16px)",
              }}
            >
              {companyProblemsList.map((p, idx) => (
                <option key={idx} value={idx}>
                  {p.companyName}: {p.redefinedTitle || p.rawTitle}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Master Project Brief Card - Glass Container */}
        <div
          style={{
            background: "rgba(10, 16, 30, 0.65)",
            border: `1.5px solid ${scopeColor}40`,
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 32,
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px ${scopeColor}15`,
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: challengeSource === "company" ? "#00ff41" : `${scopeColor}25`,
                    color: challengeSource === "company" ? "#030712" : scopeColor,
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                  }}
                >
                  {challengeSource === "company"
                    ? `⚡ ${activeCompanyProblem.companyName.toUpperCase()} // COMPANY SUBMITTED`
                    : "PROJECT BRIEF"}
                </span>

                {challengeSource === "company" && activeCompanyProblem.blastRadius && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 4,
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {activeCompanyProblem.blastRadius}
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#fff",
                  margin: "4px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {challengeSource === "company"
                  ? activeCompanyProblem.redefinedTitle || activeCompanyProblem.rawTitle
                  : activeScope.projectTitle}
              </h2>
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: scopeColor,
                border: `1px solid ${scopeColor}35`,
                background: `${scopeColor}10`,
                padding: "4px 10px",
                borderRadius: 4,
                letterSpacing: "0.05em",
              }}
            >
              3 SUB-ENVIRONMENTS
            </div>
          </div>

          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6, maxWidth: 900 }}>
            {challengeSource === "company"
              ? activeCompanyProblem.incidentOverview
              : activeScope.projectOverview}
          </p>
        </div>

        {/* 3 Sub-Environments - Interactive Glass Modules */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            &gt; AVAILABLE_SUB_ENVIRONMENTS (CHOOSE ANY TO LAUNCH):
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(challengeSource === "company"
              ? activeCompanyProblem.subEnvironments || activeScope.subEnvironments
              : activeScope.subEnvironments
            ).map((sub: any) => {
              const isLoadingThis = loadingSub === sub.subEnv;
              const cardAccent = scopeColor;

              return (
                <motion.div
                  key={sub.id || sub.subEnv}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  style={{
                    padding: "22px 24px",
                    background: "rgba(10, 16, 30, 0.55)",
                    border: `1px solid rgba(255, 255, 255, 0.08)`,
                    borderRadius: 12,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 12px 32px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                    flexWrap: "wrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cardAccent}70`;
                    e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255, 255, 255, 0.18), 0 16px 40px ${cardAccent}20`;
                    e.currentTarget.style.background = "rgba(12, 20, 38, 0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 12px 32px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.background = "rgba(10, 16, 30, 0.55)";
                  }}
                  onClick={() => handleLaunchSubEnv(sub.subEnv, sub.skinType || "ide")}
                >
                  <div style={{ flex: 1, minWidth: 300 }}>
                    {/* Top Badges */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: `${cardAccent}20`,
                          color: cardAccent,
                          border: `1px solid ${cardAccent}50`,
                          fontWeight: 800,
                          letterSpacing: "0.06em",
                        }}
                      >
                        SUB-ENV 0{sub.subEnv}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#64748b",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "rgba(255, 255, 255, 0.03)",
                        }}
                      >
                        [ {(sub.envType || "CLI / REMOTE TERMINAL").toUpperCase()} ]
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        fontWeight: 800,
                        margin: "0 0 6px",
                      }}
                    >
                      {sub.title}
                    </h3>

                    <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12, lineHeight: 1.5 }}>
                      {sub.description}
                    </div>

                    {/* Problem Statement Box */}
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.35)",
                        padding: "10px 14px",
                        borderRadius: 6,
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: 11.5,
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: cardAccent, fontWeight: 700 }}>Problem Statement: </strong>
                      {sub.problemStatement}
                    </div>
                  </div>

                  {/* Launch Action Column */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 8,
                      minWidth: 160,
                    }}
                  >
                    <button
                      disabled={isLoadingThis}
                      style={{
                        padding: "12px 20px",
                        background: cardAccent,
                        color: "#030712",
                        fontWeight: 900,
                        fontSize: 11.5,
                        borderRadius: 6,
                        border: "none",
                        cursor: isLoadingThis ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "'JetBrains Mono', monospace",
                        boxShadow: `0 6px 20px ${cardAccent}40`,
                        letterSpacing: "0.02em",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoadingThis) {
                          e.currentTarget.style.boxShadow = `0 10px 25px ${cardAccent}60`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoadingThis) {
                          e.currentTarget.style.boxShadow = `0 6px 20px ${cardAccent}40`;
                        }
                      }}
                    >
                      <span>{isLoadingThis ? "INITIALIZING..." : `LAUNCH SUB-ENV 0${sub.subEnv} ▶`}</span>
                    </button>
                    <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>
                      Mode: {(sub.skinType || "ide").toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
