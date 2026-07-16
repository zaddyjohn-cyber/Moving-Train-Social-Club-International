import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { achievements } from "@/lib/mock-data";
import AchievementCounters from "@/components/home/AchievementCounters";

export const metadata: Metadata = {
  title: "Achievements",
  description: `The financial and community achievements of the ${siteConfig.name} since its founding in 2020.`,
};

export default function AchievementsPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 50% 50%, rgba(240,234,220,0.5) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Proof of Purpose</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Our Achievements
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "55ch", margin: "0 auto" }}>
            From a small Committee of Friends to an international brotherhood — the Moving Train has
            delivered tangible support, meaningful investment, and historic milestones.
          </p>
        </div>
      </section>

      {/* Animated counters */}
      <AchievementCounters />

      {/* Detailed breakdown */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>What the Numbers Mean</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Brotherhood in Practice
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {achievements.map((a) => (
              <div
                key={a.id}
                style={{
                  background: "rgba(255,252,246,0.92)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderLeft: "3px solid rgba(213,165,59,0.5)",
                  borderRadius: "0 16px 16px 0",
                  padding: "2rem 2.25rem",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div style={{ minWidth: "160px" }}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "2rem", color: "var(--gold-light)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                    {a.display}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                    {a.label}
                  </h3>
                  <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Convention */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "rgba(11,26,48,0.9)", border: "1px solid rgba(213,165,59,0.3)", borderRadius: "20px", padding: "3rem", textAlign: "center", boxShadow: "0 0 48px rgba(213,165,59,0.05)" }}>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "4rem", color: "rgba(213,165,59,0.12)", lineHeight: 1, marginBottom: "1rem" }}>2026</div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Historic Milestone</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
              First International Convention
            </h2>
            <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.8, maxWidth: "52ch", margin: "0 auto 2rem" }}>
              In 2026, the {siteConfig.name} successfully hosted its first International Convention — a
              landmark achievement that marked the organisation's transition from a circle of friends
              to a fully international brotherhood with global reach.
            </p>
            <Link href="/events" className="btn-ghost-gold">View Events</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy)", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
            Join the Brotherhood That Delivers
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            These achievements are the result of members who showed up — consistently, generously, and with purpose.
            Become part of what is built next.
          </p>
          <Link href="/membership" className="btn-gold">Apply to Join</Link>
        </div>
      </section>
    </div>
  );
}
