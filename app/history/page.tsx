import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { founderMembers, chairmanshipTimeline, notableContributions } from "@/lib/mock-data";
import { contributionIcons } from "@/components/icons/ContributionIcons";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our History",
  description: `The story of how the ${siteConfig.name} was founded in Italy in 2020 and grew into a global brotherhood.`,
};

export default function HistoryPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section
        style={{
          padding: "6rem 1.5rem 4rem",
          background: "radial-gradient(ellipse at 30% 60%, rgba(8,20,38,0.50) 0%, var(--navy) 65%)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Where We Came From</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            The History of the Moving Train
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "60ch" }}>
            Every great institution begins with a moment. For the {siteConfig.name}, that moment
            came in 2020 — when six friends chose to transform their friendship into a lifelong commitment.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section aria-labelledby="origin-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>2020 — Italy</p>
          <h2 id="origin-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "2rem" }}>
            How It Began
          </h2>

          {[
            {
              heading: "Six Friends in Italy",
              body: `The story of the ${siteConfig.name} begins with six close friends living in Italy: Mr. Chinedu Okafor, Mr. Chinatu Ubani, Mr. John Matthew, Mr. Nnamdi Muodukwu, Mr. Chuks Ikwuakolam Omumu, and Mr. Daniel Anyaeri. Though some later moved to Germany and one returned to Nigeria, their friendship remained a constant — a bond that distance could not weaken.`,
            },
            {
              heading: "The Defining Moment",
              body: `In 2020, the passing of Mr. Daniel Anyaeri's mother became the defining moment in the history of what would become the Moving Train. In the face of grief, Mr. Chinatu Ubani contacted the other friends and made a proposal: let us form a Committee of Friends — a structured commitment to providing financial and emotional support to one another in life's most significant moments. The proposal was met with unanimous agreement.`,
            },
            {
              heading: "The Committee Grows",
              body: `As the committee took shape, Mr. Chinatu Ubani extended invitations to two additional members: Mr. Bertrand Chekwube Ugorji and Mr. Samson Ndenojuo. What had begun as a group of six became a small but committed circle with a shared sense of purpose. The Committee of Friends was forming its character.`,
            },
            {
              heading: "The Name That Chose Them",
              body: `The name "Moving Train" was chosen with deliberate intention. A train is not stationary. It moves forward regardless of the terrain — accumulating momentum, carrying all passengers together, leaving no one behind. It is a symbol of collective progress, of unstoppable motion, and of the kind of brotherhood that does not pause when the road is difficult. The motto that followed — "The Moving Train Never Stops Moving Forward" — was not aspirational. It was a declaration.`,
            },
            {
              heading: "From Committee to Club",
              body: `What began as a temporary Committee of Friends gradually developed into a permanent international organisation. The club was registered with the Corporate Affairs Commission of Nigeria, a constitution was drafted, executive positions were established, and the Moving Train formally became an institution. The six founders had built something that would outlast any single season of their lives.`,
            },
          ].map((section, i) => (
            <div
              key={i}
              style={{
                marginBottom: "3rem",
                paddingLeft: "1.75rem",
                borderLeft: "2px solid rgba(213,165,59,0.2)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "4px",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 8px rgba(213,165,59,0.4)",
                }}
              />
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "var(--ivory)", marginBottom: "0.875rem" }}>
                {section.heading}
              </h3>
              <p style={{ color: "var(--steel)", lineHeight: 1.85, margin: 0, maxWidth: "100%" }}>{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section aria-labelledby="founders-history-title" style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>The Beginning</p>
            <h2 id="founders-history-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              The Six Founding Members
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {founderMembers.map((m) => (
              <div
                key={m.id}
                style={{
                  background: "rgba(16,36,58,0.75)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "12px",
                  padding: "1.5rem 1.25rem",
                  textAlign: "center",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "rgba(213,165,59,0.1)",
                    border: "1px solid rgba(213,165,59,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 0.875rem",
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontWeight: 700, fontSize: "1rem", color: "var(--gold)",
                  }}
                >
                  {m.name.split(" ").filter((w) => w !== "Mr.").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.875rem", color: "var(--ivory)", margin: "0 0 0.4rem", lineHeight: 1.35 }}>
                  {m.name}
                </p>
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(213,165,59,0.08)", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                  Founder
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairmanship Timeline */}
      <section aria-labelledby="chairs-history-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Leadership Since 2020</p>
            <h2 id="chairs-history-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Chairmanship History
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {chairmanshipTimeline.map((chair, i) => (
              <div
                key={chair.id}
                style={{
                  background: "rgba(16,36,58,0.85)",
                  border: `1px solid ${chair.endDate === null ? "rgba(213,165,59,0.35)" : "rgba(213,165,59,0.1)"}`,
                  borderLeft: "3px solid rgba(213,165,59,0.5)",
                  borderRadius: "0 12px 12px 0",
                  padding: "1.75rem 2rem",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.875rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.0625rem", color: "var(--ivory)", margin: "0 0 0.25rem" }}>{chair.name}</h3>
                    <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", margin: 0 }}>{chair.title}</p>
                  </div>
                  {chair.endDate === null && (
                    <span style={{ padding: "0.25rem 0.75rem", background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.3)", borderRadius: "999px", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                      Current
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.8rem", color: "rgba(170,182,197,0.55)", marginBottom: "0.75rem", fontVariantNumeric: "tabular-nums" }}>{chair.period}</p>
                <p style={{ color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>{chair.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable contributions */}
      <section aria-labelledby="contrib-history-title" style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Built by Many Hands</p>
            <h2 id="contrib-history-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>Notable Contributions</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
            gap: "1.25rem",
            alignItems: "stretch",
          }}>
            {notableContributions.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "linear-gradient(150deg, rgba(16,36,58,0.92) 0%, rgba(8,20,38,0.92) 100%)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "16px",
                  padding: "1.625rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.3), transparent)",
                }}/>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "14px", flexShrink: 0,
                    background: "radial-gradient(circle at 30% 25%, rgba(213,165,59,0.16), rgba(213,165,59,0.05))",
                    border: "1px solid rgba(213,165,59,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 14px rgba(0,0,0,0.35), 0 0 12px rgba(213,165,59,0.08)",
                  }}>
                    {contributionIcons[(item as typeof item & { icon?: string }).icon ?? ""] ?? contributionIcons.coins}
                  </div>
                  <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", margin: 0, lineHeight: 1.5 }}>{item.member}</p>
                </div>
                <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>{item.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
            Be Part of the Continuing Story
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            The Moving Train does not stop. It carries each new member forward — adding their
            story to a history that grows more meaningful with every chapter.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/membership" className="btn-gold">Apply to Join <ArrowRight size={16} /></Link>
            <Link href="/leadership" className="btn-ghost-gold">Meet the Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
