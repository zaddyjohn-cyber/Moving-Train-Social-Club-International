import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { coreValues } from "@/lib/mock-data";
import { ArrowRight, Users, Globe, Heart, Shield, TrendingUp, Scale, ArrowRightCircle, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Club",
  description: `Learn about the ${siteConfig.name} — our mission, philosophy, core values, and what makes this brotherhood unique.`,
};

const iconComponents: Record<string, React.ReactNode> = {
  users: <Users size={20} />, shield: <Shield size={20} />, globe: <Globe size={20} />,
  scale: <Scale size={20} />, "trending-up": <TrendingUp size={20} />, heart: <Heart size={20} />,
  "arrow-right-circle": <ArrowRightCircle size={20} />, landmark: <Landmark size={20} />,
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section
        aria-labelledby="about-title"
        style={{
          padding: "6rem 1.5rem 5rem",
          background: "radial-gradient(ellipse at 70% 50%, rgba(10,26,58,0.8) 0%, var(--navy) 65%)",
          position: "relative",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Who We Are</p>
          <h1
            id="about-title"
            style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}
          >
            About the <span style={{ background: "linear-gradient(135deg, #D5A53B, #F2D28C, #D5A53B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Moving Train</span>
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "62ch" }}>
            The {siteConfig.name} is a global brotherhood founded on the conviction that genuine
            friendship — the kind that shows up in life's most difficult and most joyful moments —
            is one of the most powerful forces in the world.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/history" className="btn-gold">Our Full History <ArrowRight size={16} /></Link>
            <Link href="/membership" className="btn-ghost-gold">Apply to Join</Link>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section aria-labelledby="mission-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { label: "Our Mission", title: "Brotherhood in Action", body: `The ${siteConfig.name} exists to ensure that no member faces life's journey alone. We provide financial support, emotional solidarity, and a global network of trusted friends — built on values that endure across borders, distances, and decades.` },
              { label: "Our Philosophy", title: siteConfig.philosophy, body: `This is not a slogan. It is the principle that governs how every member behaves toward their brothers. When one member suffers, the brotherhood responds. When one succeeds, the brotherhood celebrates. This is what "Our Brother's Keeper" means in practice.` },
              { label: "Our Character", title: "Progressive by Nature", body: `The name "Moving Train" was chosen deliberately. A train does not pause for convenience. It moves forward — gathering momentum, carrying everyone on board, refusing to leave any brother behind. This is the character of the organisation.` },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(255,252,246,0.82)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "16px",
                  padding: "2rem 1.75rem",
                }}
              >
                <p className="eyebrow" style={{ marginBottom: "0.875rem" }}>{item.label}</p>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "var(--ivory)", marginBottom: "1rem" }}>{item.title}</h3>
                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section aria-labelledby="values-about-title" style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>What We Stand For</p>
            <h2 id="values-about-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {coreValues.map((v) => (
              <div
                key={v.id}
                style={{
                  background: "rgba(11,26,48,0.6)",
                  border: "1px solid rgba(213,165,59,0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>{iconComponents[v.icon]}</div>
                <div>
                  <h4 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.9375rem", color: "var(--ivory)", margin: "0 0 0.5rem" }}>{v.title}</h4>
                  <p style={{ color: "var(--steel)", fontSize: "0.8375rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Presence */}
      <section aria-labelledby="presence-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Global Reach</p>
          <h2 id="presence-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Across Continents
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "58ch", margin: "0 auto 2.5rem" }}>
            The Moving Train has members and a growing presence across Africa, Europe, and North America —
            a reflection of the Nigerian diaspora's reach and the universal appeal of brotherhood.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center", marginBottom: "3rem" }}>
            {siteConfig.presenceCountries.map((c) => (
              <span
                key={c.code}
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "rgba(255,252,246,0.92)",
                  border: "1px solid rgba(213,165,59,0.2)",
                  borderRadius: "999px",
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--steel)",
                }}
              >
                {c.name}
              </span>
            ))}
          </div>
          <Link href="/history" className="btn-gold">
            Explore Our History <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
