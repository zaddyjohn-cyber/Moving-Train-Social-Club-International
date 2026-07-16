"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { membershipBenefits } from "@/lib/mock-data";
import { ArrowRight, Users, Globe, Heart, TrendingUp, Scale, Calendar } from "lucide-react";


const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={28} />, globe: <Globe size={28} />,
  "heart-handshake": <Heart size={28} />, "trending-up": <TrendingUp size={28} />,
  scale: <Scale size={28} />, calendar: <Calendar size={28} />,
};

const welfareSupport = [
  "Weddings", "Birthdays", "Housewarmings", "Chieftaincy celebrations",
  "Bereavement", "Family emergencies", "Major life milestones",
];

export default function WhyJoinPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 60% 50%, rgba(10,26,58,0.8) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Membership</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Why Join the Moving Train?
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "60ch", marginBottom: "2rem" }}>
            Membership in the {siteConfig.name} is not a transaction. It is a lifelong commitment to
            a brotherhood that will stand with you in every season of life — supporting, celebrating,
            and moving forward together.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/membership" className="btn-gold">Apply to Join <ArrowRight size={16} /></Link>
            <Link href="/about" className="btn-ghost-gold">About the Club</Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>What Membership Offers</p>
            <h2 id="benefits-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>Six Pillars of Brotherhood</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px,100%), 1fr))", gap: "1.5rem" }}>
            {membershipBenefits.map((benefit, i) => (
              <div
                key={benefit.id}
                style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.32)";
                  el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(213,165,59,0.07)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.12)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                {(benefit as typeof benefit & { image?: string }).image && (
                  <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                    <img
                      src={(benefit as typeof benefit & { image?: string }).image}
                      alt={benefit.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                    {/* Gold overlay tint */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 40%, rgba(16,36,58,0.75) 100%)",
                    }}/>
                    {/* Number badge */}
                    <span style={{
                      position: "absolute", top: "0.75rem", right: "0.75rem",
                      fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.8rem", fontWeight: 700,
                      color: "rgba(242,210,140,0.7)",
                      background: "rgba(5,10,24,0.65)", backdropFilter: "blur(6px)",
                      padding: "0.2rem 0.55rem", borderRadius: "6px",
                      border: "1px solid rgba(213,165,59,0.2)",
                    }}>0{i + 1}</span>
                  </div>
                )}
                {/* Text */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "9px",
                      background: "rgba(213,165,59,0.08)", border: "1px solid rgba(213,165,59,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold)", flexShrink: 0,
                    }}>
                      {iconMap[benefit.icon] ?? <Users size={20} />}
                    </div>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, fontSize: "1rem", color: "var(--ivory)", margin: 0, lineHeight: 1.3 }}>
                      {benefit.title}
                    </h3>
                  </div>
                  <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welfare detail */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>Welfare Support</p>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
                Present in Life's Most Important Moments
              </h2>
              <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "100%" }}>
                Members in good standing may receive meaningful financial and emotional support during
                significant life events. The brotherhood shows up — not with words, but with presence.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {welfareSupport.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "0.5rem 1.125rem",
                    background: "rgba(16,36,58,0.85)",
                    border: "1px solid rgba(213,165,59,0.15)",
                    borderRadius: "999px",
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--steel)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "rgba(11,26,48,0.9)", border: "1px solid rgba(213,165,59,0.2)", borderRadius: "20px", padding: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Eligibility</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
              Who May Apply
            </h2>
            <p style={{ color: "var(--steel)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "100%" }}>
              Membership is open to Nigerians living in Nigeria and abroad who share the club's core
              values of integrity, respect, unity, responsibility, and mutual support.
            </p>
            <ul style={{ listStyle: "none", margin: "0 0 2rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Nigerian nationality", "Commitment to the club's values", "Willingness to participate actively", "A six-month probationary period upon admission", "Subject to club review and approval"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                  <span style={{ color: "var(--steel)", fontSize: "0.9375rem" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/membership" className="btn-gold">
              Begin Your Application <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
