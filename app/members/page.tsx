"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { currentExecutives, founderMembers, chairmanshipTimeline } from "@/lib/mock-data";


// Combine known members into a display list (no fabricated data)
function buildMemberList() {
  const known: { id: string; name: string; slug: string; positions: string[]; badges: string[] }[] = [];

  const founderSet = new Set(founderMembers.map((f) => f.slug));
  const chairSet = new Set(chairmanshipTimeline.map((c) => c.slug));
  const currentSet = new Set(currentExecutives.map((e) => e.slug));

  // Combine unique members across sources
  const allSlugs = new Map<string, { name: string; positions: string[]; badges: string[] }>();

  founderMembers.forEach((m) => {
    allSlugs.set(m.slug, { name: m.name, positions: [], badges: ["Founder"] });
  });

  chairmanshipTimeline.forEach((c) => {
    const existing = allSlugs.get(c.slug) ?? { name: c.name, positions: [], badges: [] };
    existing.positions.push(c.title);
    if (!existing.badges.includes("Pioneer")) existing.badges.push("Pioneer");
    allSlugs.set(c.slug, existing);
  });

  currentExecutives.forEach((e) => {
    const existing = allSlugs.get(e.slug) ?? { name: e.name, positions: [], badges: [] };
    existing.positions.push(e.position);
    if (!existing.badges.includes("Current Executive")) existing.badges.push("Current Executive");
    allSlugs.set(e.slug, existing);
  });

  // Add additional named members from pioneer executives not already in list
  const { pioneerExecutives } = require("@/lib/mock-data");
  (pioneerExecutives as { id: string; name: string; slug: string; position: string }[]).forEach((e) => {
    const existing = allSlugs.get(e.slug) ?? { name: e.name, positions: [], badges: [] };
    if (!existing.positions.includes(e.position)) existing.positions.push(e.position);
    if (!existing.badges.includes("Pioneer")) existing.badges.push("Pioneer");
    allSlugs.set(e.slug, existing);
  });

  allSlugs.forEach((data, slug) => {
    known.push({ id: slug, slug, ...data });
  });

  return known.sort((a, b) => a.name.localeCompare(b.name));
}

export default function MembersPage() {
  const members = buildMemberList();

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

      {/* Notice */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem 2rem",
        }}
      >
        <div
          style={{
            background: "rgba(213,165,59,0.05)",
            border: "1px solid rgba(184,134,30,0.18)",
            borderRadius: "10px",
            padding: "1rem 1.5rem",
          }}
        >
          <p style={{ color: "rgba(170,182,197,0.75)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0, maxWidth: "100%" }}>
            <strong style={{ color: "var(--gold)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600 }}>Member Profiles:</strong>{" "}
            Only names and roles explicitly documented in the club's records are displayed. Full profile
            pages will be populated as members provide and consent to information. Private details are never
            displayed publicly.
          </p>
        </div>
      </div>

      {/* Members grid */}
      <section aria-label="Member directory" style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "rgba(170,182,197,0.55)",
              marginBottom: "2rem",
              letterSpacing: "0.05em",
            }}
          >
            Showing {members.length} verified member records
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {members.map((member) => (
              <article
                key={member.id}
                style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "16px",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.3)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.12)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(213,165,59,0.12) 0%, rgba(213,165,59,0.07) 100%)",
                      border: "1.5px solid rgba(213,165,59,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "1rem", color: "var(--gold)",
                      flexShrink: 0,
                    }}
                  >
                    {member.name.split(" ").filter((w) => w !== "Mr.").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--ivory)",
                        margin: 0,
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {member.name}
                    </h2>
                    {member.positions.length > 0 && (
                      <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", color: "var(--gold)", margin: "0.2rem 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {member.positions[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        ...(badge === "Current Executive"
                          ? { background: "rgba(213,165,59,0.08)", border: "1px solid rgba(184,134,30,0.22)", color: "var(--gold)" }
                          : badge === "Founder"
                          ? { background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.25)", color: "var(--gold)" }
                          : { background: "rgba(174,184,198,0.06)", border: "1px solid rgba(174,184,198,0.15)", color: "var(--steel)" }),
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Profile link */}
                <Link
                  href={`/members/${member.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--gold)",
                    marginTop: "auto",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.55rem")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.35rem")}
                >
                  View Profile →
                </Link>
              </article>
            ))}
          </div>

          {/* Note about more members */}
          <div
            style={{
              marginTop: "3rem",
              textAlign: "center",
              padding: "2.5rem",
              background: "rgba(16,36,58,0.60)",
              border: "1px solid rgba(213,165,59,0.1)",
              borderRadius: "16px",
            }}
          >
            <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: "50ch", margin: "0 auto 1.25rem" }}>
              Additional member profiles will be added as the organisation grows and as members
              provide and consent to their information.
            </p>
            <Link href="/membership" className="btn-gold">
              Apply to Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
