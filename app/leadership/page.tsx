import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { currentExecutives, pioneerExecutives, chairmanshipTimeline } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Leadership",
  description: `Meet the current and pioneer executive officers of the ${siteConfig.name}, and explore the full chairmanship history.`,
};

function OfficerCard({ officer, badge }: { officer: { id: string; name: string; position: string }; badge?: string }) {
  return (
    <div
      style={{
        background: "rgba(255,252,246,0.92)",
        border: "1px solid rgba(213,165,59,0.12)",
        borderRadius: "16px",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(213,165,59,0.12) 0%, rgba(184,134,30,0.07) 100%)",
          border: "1.5px solid rgba(213,165,59,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--gold)",
        }}
      >
        {officer.name.split(" ").filter((w) => w !== "Mr.").slice(0, 2).map((w) => w[0]).join("")}
      </div>
      <div
        style={{
          padding: "0.25rem 0.875rem",
          background: "rgba(213,165,59,0.08)",
          border: "1px solid rgba(213,165,59,0.2)",
          borderRadius: "999px",
        }}
      >
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>
          {officer.position}
        </span>
      </div>
      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--ivory)", margin: 0, lineHeight: 1.3 }}>
        {officer.name}
      </h3>
      {badge && (
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.68rem", color: "var(--steel)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 70% 50%, rgba(240,234,220,0.5) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Governance</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Leadership of the Moving Train
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "58ch" }}>
            The {siteConfig.name} is led by elected officers who serve with accountability,
            transparency, and the trust of the brotherhood.
          </p>
        </div>
      </section>

      {/* Current Executives */}
      <section aria-labelledby="current-exec-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <p className="eyebrow">Current Term</p>
              <span style={{ padding: "0.2rem 0.75rem", background: "rgba(184,134,30,0.08)", border: "1px solid rgba(0,200,255,0.25)", borderRadius: "999px", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Active</span>
            </div>
            <h2 id="current-exec-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Current Executive Officers
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {currentExecutives.map((exec) => (
              <OfficerCard key={exec.id} officer={exec} badge="Current Executive" />
            ))}
          </div>
        </div>
      </section>

      {/* Pioneer Executives */}
      <section aria-labelledby="pioneer-exec-title" style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Our Founding Officers</p>
            <h2 id="pioneer-exec-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Pioneer Executive Officers
            </h2>
            <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: "55ch", marginTop: "0.75rem" }}>
              These officers served in the organisation's inaugural executive team, established in October 2020.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {pioneerExecutives.map((exec) => (
              <OfficerCard key={exec.id} officer={exec} badge="Pioneer Executive" />
            ))}
          </div>
        </div>
      </section>

      {/* Chairmanship Timeline */}
      <section aria-labelledby="chair-history-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Since 2020</p>
            <h2 id="chair-history-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Chairmanship History
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {chairmanshipTimeline.map((chair) => (
              <div
                key={chair.id}
                style={{
                  background: "rgba(255,252,246,0.92)",
                  border: `1px solid ${chair.endDate === null ? "rgba(213,165,59,0.4)" : "rgba(213,165,59,0.12)"}`,
                  borderRadius: "16px",
                  padding: "2rem",
                  boxShadow: chair.endDate === null ? "0 0 32px rgba(213,165,59,0.06)" : "none",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.875rem" }}>
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.0625rem", color: "var(--ivory)", margin: 0 }}>{chair.name}</h3>
                  {chair.endDate === null && (
                    <span style={{ padding: "0.25rem 0.75rem", background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.35)", borderRadius: "999px", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                      Current Chairman
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>{chair.title}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(90,80,65,0.55)", marginBottom: "0.875rem" }}>{chair.period}</p>
                <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>{chair.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance note */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Governance</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
            How We Are Governed
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.8, margin: "0 auto" }}>
            The {siteConfig.name} operates through a written constitution, democratically elected leadership,
            regular financial reporting, and established policies. Every decision of consequence is made
            collectively — in the spirit of accountability that the brotherhood demands.
          </p>
        </div>
      </section>
    </div>
  );
}
