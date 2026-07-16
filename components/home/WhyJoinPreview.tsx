"use client";

import Link from "next/link";
import { membershipBenefits } from "@/lib/mock-data";
import { ArrowRight, Users, Globe, Heart, TrendingUp, Scale, Calendar } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={24} />,
  globe: <Globe size={24} />,
  "heart-handshake": <Heart size={24} />,
  "trending-up": <TrendingUp size={24} />,
  scale: <Scale size={24} />,
  calendar: <Calendar size={24} />,
};

export default function WhyJoinPreview() {
  return (
    <section
      aria-labelledby="why-join-home-title"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--navy)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Membership</p>
          <h2
            id="why-join-home-title"
            style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}
          >
            Why Join the Moving Train?
          </h2>
          <p
            style={{
              color: "var(--steel)",
              fontSize: "1.0625rem",
              maxWidth: "52ch",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Membership in this organisation is not transactional. It is a lifelong commitment
            to a brotherhood that will stand with you — in success and in difficulty.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          {membershipBenefits.map((benefit, i) => (
            <div
              key={benefit.id}
              style={{
                background: "rgba(16,36,58,0.75)",
                border: "1px solid rgba(213,165,59,0.1)",
                borderRadius: "14px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(213,165,59,0.3)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(213,165,59,0.1)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "12px",
                  background: "rgba(213,165,59,0.08)",
                  border: "1px solid rgba(213,165,59,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  flexShrink: 0,
                }}
              >
                {iconMap[benefit.icon] ?? <Users size={24} />}
              </div>
              <h3
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "var(--ivory)",
                  margin: 0,
                }}
              >
                {benefit.title}
              </h3>
              <p
                style={{
                  color: "var(--steel)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: "100%",
                }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "rgba(170,182,197,0.65)",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            Membership is open to eligible Nigerians living in Nigeria and abroad.
            A six-month probationary period applies.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/membership" className="btn-gold">
              Begin Your Membership Journey
              <ArrowRight size={16} />
            </Link>
            <Link href="/why-join" className="btn-ghost-gold">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
