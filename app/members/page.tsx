"use client";

import Link from "next/link";
import { currentMembers } from "@/lib/mock-data";

export default function MembersPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 50% 60%, rgba(8,20,38,0.50) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Our Brotherhood</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Member Directory
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "54ch", margin: "0 auto" }}>
            The names listed here represent the men who have built — and continue to build —
            the Moving Train. Member profiles are displayed with consent and contain only
            approved information.
          </p>
        </div>
      </section>

      {/* Members grid */}
      <section aria-label="Member directory" style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(170,182,197,0.55)",
            marginBottom: "2rem",
            letterSpacing: "0.05em",
          }}>
            Showing {currentMembers.length} verified member records
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px,100%), 1fr))", gap: "1.25rem" }}>
            {currentMembers.map((member) => (
              <article
                key={member.id}
                style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.4)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(213,165,59,0.07)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.12)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Portrait */}
                {member.photo ? (
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
                      background: "linear-gradient(to bottom, transparent, rgba(16,36,58,0.85))",
                    }} aria-hidden="true" />
                  </div>
                ) : (
                  <div style={{
                    aspectRatio: "3/4",
                    background: "linear-gradient(135deg, rgba(213,165,59,0.08) 0%, rgba(5,10,24,0.6) 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderBottom: "1px solid rgba(213,165,59,0.1)",
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                      fontSize: "3rem", color: "rgba(213,165,59,0.35)",
                      letterSpacing: "0.05em",
                    }}>
                      {member.name.split(" ").filter((w) => !["Hon.", "Mr.", "Mrs.", "Chief", "Chief.", "High", "Dr.", "Engr.", "Nze"].includes(w)).slice(0, 2).map((w) => w[0]).join("")}
                    </span>
                  </div>
                )}

                {/* Info */}
                <div style={{ padding: "1.25rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  <div>
                    <h2 style={{
                      fontFamily: "'Cinzel', Georgia, serif",
                      fontSize: "0.92rem", fontWeight: 700,
                      color: "var(--ivory)", margin: "0 0 0.3rem", lineHeight: 1.35,
                    }}>
                      {member.name}
                    </h2>
                    <p style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.72rem", color: "var(--gold)",
                      margin: 0, lineHeight: 1.4,
                    }}>
                      {member.position}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    <span style={{
                      padding: "0.18rem 0.55rem", borderRadius: "999px",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                      background: "rgba(213,165,59,0.08)", border: "1px solid rgba(184,134,30,0.22)", color: "var(--gold)",
                    }}>
                      Current Member
                    </span>
                  </div>

                  <Link
                    href={`/members/${member.slug}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.35rem",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.8rem", fontWeight: 600, color: "var(--gold)",
                      marginTop: "auto", transition: "gap 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.55rem")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.35rem")}
                  >
                    View Profile →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{
            marginTop: "3rem", textAlign: "center", padding: "2.5rem",
            background: "rgba(16,36,58,0.60)", border: "1px solid rgba(213,165,59,0.1)", borderRadius: "16px",
          }}>
            <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: "50ch", margin: "0 auto 1.25rem" }}>
              Additional member profiles will be added as members provide and consent to their information.
            </p>
            <Link href="/membership" className="btn-gold">Apply to Join</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
