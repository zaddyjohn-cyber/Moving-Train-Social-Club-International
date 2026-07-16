"use client";

import { useRef, useEffect, useState } from "react";
import { coreValues } from "@/lib/mock-data";
import { Users, Shield, Globe, Scale, TrendingUp, Heart, ArrowRightCircle, Landmark } from "lucide-react";

const iconComponents: Record<string, React.ReactNode> = {
  users: <Users size={22} />,
  shield: <Shield size={22} />,
  globe: <Globe size={22} />,
  scale: <Scale size={22} />,
  "trending-up": <TrendingUp size={22} />,
  heart: <Heart size={22} />,
  "arrow-right-circle": <ArrowRightCircle size={22} />,
  landmark: <Landmark size={22} />,
};

function ValueCard({ value, index }: { value: (typeof coreValues)[number]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "rgba(11,26,48,0.6)",
        border: "1px solid rgba(213,165,59,0.1)",
        borderRadius: "14px",
        padding: "1.75rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        transition: `all 0.6s ease ${index * 0.06}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.3)";
        el.style.transform = "translateY(-4px)";
        el.style.background = "rgba(15,30,55,0.8)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.1)";
        el.style.transform = "translateY(0)";
        el.style.background = "rgba(11,26,48,0.6)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
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
        {iconComponents[value.icon] ?? <Shield size={22} />}
      </div>
      <h3
        style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontWeight: 600,
          fontSize: "1.0625rem",
          color: "var(--ivory)",
          margin: 0,
        }}
      >
        {value.title}
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
        {value.description}
      </p>
    </div>
  );
}

export default function CoreValues() {
  return (
    <section
      aria-labelledby="values-title"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--navy)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>What Guides Us</p>
          <h2
            id="values-title"
            style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}
          >
            The Principles of the Brotherhood
          </h2>
          <p
            style={{
              color: "var(--steel)",
              fontSize: "1.0625rem",
              maxWidth: "50ch",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            These are not aspirations. They are the commitments that every member upholds
            — the rails upon which the Moving Train travels.
          </p>
        </div>

        {/* Values grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {coreValues.map((v, i) => (
            <ValueCard key={v.id} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
