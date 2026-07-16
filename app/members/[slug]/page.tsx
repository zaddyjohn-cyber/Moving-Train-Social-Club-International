import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { currentExecutives, pioneerExecutives, chairmanshipTimeline, founderMembers, notableContributions } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";

// Build a lookup of all known members
function getMemberBySlug(slug: string) {
  const allMembers = new Map<string, { name: string; positions: string[]; badges: string[]; contributions: string[] }>();

  const add = (s: string, name: string, position?: string, badge?: string) => {
    const m = allMembers.get(s) ?? { name, positions: [], badges: [], contributions: [] };
    if (position && !m.positions.includes(position)) m.positions.push(position);
    if (badge && !m.badges.includes(badge)) m.badges.push(badge);
    allMembers.set(s, m);
  };

  founderMembers.forEach((m) => add(m.slug, m.name, undefined, "Founder"));
  chairmanshipTimeline.forEach((c) => add(c.slug, c.name, c.title, "Pioneer"));
  currentExecutives.forEach((e) => add(e.slug, e.name, e.position, "Current Executive"));
  pioneerExecutives.forEach((e) => add(e.slug, e.name, e.position, "Pioneer"));

  notableContributions.forEach((c) => {
    c.member.split(",").map((s) => s.trim()).forEach((namePart) => {
      allMembers.forEach((m, s) => {
        if (m.name.includes(namePart.replace("Mr. ", "").split(" ")[0]) && namePart.includes("Mr.")) {
          m.contributions.push(c.contribution);
        }
      });
    });
  });

  return allMembers.get(slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return { title: "Member Not Found" };
  return {
    title: member.name,
    description: `Profile of ${member.name} — a member of the ${siteConfig.name}.`,
  };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) {
    return (
      <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>Member Not Found</h1>
          <p style={{ color: "var(--steel)", marginBottom: "2rem" }}>This profile does not exist or has not yet been published.</p>
          <Link href="/members" className="btn-ghost-gold"><ArrowLeft size={16} /> Return to Directory</Link>
        </div>
      </div>
    );
  }

  const isCurrent = member.badges.includes("Current Executive");
  const isFounder = member.badges.includes("Founder");

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      {/* Back link */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link
          href="/members"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
        >
          <ArrowLeft size={16} /> Member Directory
        </Link>
      </div>

      {/* Profile hero */}
      <section style={{ padding: "3rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              background: "rgba(11,26,48,0.9)",
              border: `1px solid ${isCurrent ? "rgba(213,165,59,0.35)" : "rgba(213,165,59,0.15)"}`,
              borderRadius: "20px",
              padding: "3rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              alignItems: "flex-start",
              boxShadow: isCurrent ? "0 0 40px rgba(213,165,59,0.06)" : "none",
            }}
          >
            {/* Avatar */}
            <div
              aria-hidden="true"
              style={{
                width: 120, height: 120, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, rgba(213,165,59,0.15) 0%, rgba(184,134,30,0.08) 100%)",
                border: "2px solid rgba(213,165,59,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "2rem", color: "var(--gold)",
                boxShadow: "0 0 24px rgba(213,165,59,0.1)",
              }}
            >
              {member.name.split(" ").filter((w) => !["Hon.", "Mr.", "Mrs.", "Chief", "High", "Dr.", "Engr.", "Nze"].includes(w)).slice(0, 2).map((w) => w[0]).join("")}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                {member.badges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      padding: "0.25rem 0.875rem",
                      borderRadius: "999px",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      ...(badge === "Current Executive"
                        ? { background: "rgba(184,134,30,0.08)", border: "1px solid rgba(0,200,255,0.25)", color: "var(--gold)" }
                        : badge === "Founder"
                        ? { background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.3)", color: "var(--gold)" }
                        : { background: "rgba(174,184,198,0.06)", border: "1px solid rgba(174,184,198,0.15)", color: "var(--steel)" }),
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--ivory)", marginBottom: "0.5rem" }}>
                {member.name}
              </h1>

              {member.positions.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {member.positions.map((pos) => (
                    <span key={pos} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--gold)", fontWeight: 600 }}>
                      {pos}
                    </span>
                  ))}
                </div>
              )}

              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "rgba(213,165,59,0.04)",
                  border: "1px solid rgba(213,165,59,0.1)",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.75, margin: 0, fontStyle: "italic", maxWidth: "100%" }}>
                  Profile details will be added soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributions (if any documented) */}
      {member.contributions.length > 0 && (
        <section style={{ padding: "2rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", marginBottom: "1.5rem" }}>
              Contributions to the Brotherhood
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {member.contributions.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(16,36,58,0.75)",
                    borderLeft: "3px solid rgba(213,165,59,0.4)",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "0 10px 10px 0",
                  }}
                >
                  <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 4rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/members" className="btn-ghost-gold"><ArrowLeft size={16} /> All Members</Link>
      </div>
    </div>
  );
}
