"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SCOPE_DEFINITIONS } from "../lib/services/problemBank";

export default function JudgeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedScope, setExpandedScope] = useState<string | null>(null);
  const router = useRouter();

  const handleRoute = (domainOrPath: string, isDirectPath: boolean = false, subEnv?: number) => {
    setIsOpen(false);
    if (isDirectPath) {
      router.push(`/${domainOrPath}`);
    } else {
      router.push(`/seeker/dashboard?domain=${domainOrPath}${subEnv ? `&subEnv=${subEnv}` : ""}`);
    }
  };

  const scopes = Object.values(SCOPE_DEFINITIONS);

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Swiss Glass Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 44,
          height: 44,
          background: "rgba(12, 18, 34, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4.5,
          cursor: "pointer",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 12px 32px rgba(0, 0, 0, 0.6)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        title="Operational Arena Navigator (7 Scopes × 3 Sub-Envs)"
      >
        <div style={{ width: 17, height: 2, borderRadius: 1, background: "#fff", transition: "all 0.3s", transform: isOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
        <div style={{ width: 17, height: 2, borderRadius: 1, background: "#fff", transition: "all 0.3s", opacity: isOpen ? 0 : 1 }} />
        <div style={{ width: 17, height: 2, borderRadius: 1, background: "#fff", transition: "all 0.3s", transform: isOpen ? "rotate(-45deg) translate(4.5px, -5px)" : "none" }} />
      </motion.button>

      {/* Swiss Glassmorphic Arena Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 54,
              right: 0,
              background: "rgba(8, 12, 24, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 16,
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minWidth: 340,
              maxHeight: "86vh",
              overflowY: "auto",
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.18), 0 28px 64px rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(28px) saturate(190%)",
              WebkitBackdropFilter: "blur(28px) saturate(190%)",
            }}
          >
            {/* Header: Swiss Typography & Grid Stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 8px 12px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Operational Scopes
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
                  7 Scopes × 3 Sub-Envs
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#f59e0b",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "4px 9px",
                  borderRadius: 20,
                  letterSpacing: "0.05em",
                }}
              >
                21 ARENAS
              </span>
            </div>

            {/* Scope Lists with Glass Cards & Smooth Expand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 4 }}>
              {scopes.map((scope) => {
                const isExpanded = expandedScope === scope.domain;
                return (
                  <div
                    key={scope.domain}
                    style={{
                      borderRadius: 10,
                      background: isExpanded ? "rgba(255, 255, 255, 0.03)" : "transparent",
                      border: isExpanded ? "1px solid rgba(255, 255, 255, 0.07)" : "1px solid transparent",
                      transition: "all 0.2s ease",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", padding: "2px 4px" }}>
                      <button
                        onClick={() => handleRoute(scope.domain)}
                        style={{
                          background: "transparent",
                          border: "none",
                          borderRadius: 8,
                          padding: "8px 10px",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flex: 1,
                          textAlign: "left",
                          cursor: "pointer",
                          color: "#f1f5f9",
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: scope.accent,
                            boxShadow: `0 0 8px ${scope.accent}80`,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1 }}>{scope.label}</span>
                      </button>

                      <button
                        onClick={() => setExpandedScope(isExpanded ? null : scope.domain)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#64748b",
                          fontSize: 11,
                          padding: "8px 10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 6,
                          transition: "transform 0.2s, color 0.2s",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                        title="Toggle sub-environments"
                      >
                        ▼
                      </button>
                    </div>

                    {/* Sub-environments list: Clean Swiss Glass Items */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            padding: "4px 8px 8px 16px",
                            borderLeft: `2px solid ${scope.accent}`,
                            marginLeft: 14,
                            marginBottom: 4,
                          }}
                        >
                          {scope.subEnvironments.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleRoute(scope.domain, false, sub.subEnv)}
                              style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.04)",
                                color: "#cbd5e1",
                                fontSize: 11.5,
                                fontWeight: 500,
                                textAlign: "left",
                                padding: "6px 10px",
                                borderRadius: 6,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "all 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.07)";
                                e.currentTarget.style.borderColor = `${scope.accent}60`;
                                e.currentTarget.style.transform = "translateX(2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.04)";
                                e.currentTarget.style.transform = "none";
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 9.5,
                                  fontWeight: 700,
                                  color: scope.accent,
                                  background: `${scope.accent}15`,
                                  padding: "2px 5px",
                                  borderRadius: 4,
                                }}
                              >
                                0{sub.subEnv}
                              </span>
                              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {sub.title.split("—")[1] ? sub.title.split("—")[1].trim() : sub.title}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Swiss Glass Divider */}
            <div style={{ height: 1, background: "rgba(255, 255, 255, 0.08)", margin: "6px 0" }} />

            {/* Arena Grid Quick Launch */}
            <button
              onClick={() => handleRoute("select-domain", true)}
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.04) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                fontWeight: 700,
                color: "#f59e0b",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 16px rgba(245, 158, 11, 0.25)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span>⚡</span>
              <span style={{ letterSpacing: "-0.01em" }}>Full Arena Selection Grid</span>
            </button>

            {/* Ecosystem Links */}
            <div style={{ fontSize: 9.5, fontWeight: 700, color: "#64748b", padding: "8px 8px 2px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Ecosystem
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { label: "Company Portal", path: "company/dashboard", color: "#e2e8f0" },
                { label: "Verifier Node", path: "verifier/dashboard", color: "#818cf8" },
                { label: "Apprentice Market", path: "market", color: "#34d399" },
                { label: "Candidate Sandbox", path: "seeker/onboarding", color: "#00ff41" },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleRoute(link.path, true)}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: 6,
                    padding: "7px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 500,
                    color: link.color,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  }}
                >
                  <span style={{ opacity: 0.5 }}>›</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
