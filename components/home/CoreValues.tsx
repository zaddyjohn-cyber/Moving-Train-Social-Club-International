"use client";

import { useRef, useEffect, useState } from "react";
import { coreValues } from "@/lib/mock-data";
import { Users, Shield, Globe, Scale, TrendingUp, Heart, ArrowRightCircle, Landmark } from "lucide-react";

const iconComponents: Record<string, React.ReactNode> = {
  users:               <Users size={20} />,
  shield:              <Shield size={20} />,
  globe:               <Globe size={20} />,
  scale:               <Scale size={20} />,
  "trending-up":       <TrendingUp size={20} />,
  heart:               <Heart size={20} />,
  "arrow-right-circle":<ArrowRightCircle size={20} />,
  landmark:            <Landmark size={20} />,
};

type ValueItem = (typeof coreValues)[number] & { image?: string; video?: string };

function ValueCard({ value, index }: { value: ValueItem; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hasMedia = !!(value.image || value.video);

  return (
    <div
      ref={ref}
      style={{
        background: "rgba(16,36,58,0.85)",
        border: "1px solid rgba(213,165,59,0.1)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s, border-color 0.25s, box-shadow 0.25s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.32)";
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 36px rgba(0,0,0,0.5), 0 0 18px rgba(213,165,59,0.07)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.1)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Media — image or video */}
      {hasMedia && (
        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", position: "relative", flexShrink: 0 }}>
          {value.video ? (
            <video
              src={value.video}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          ) : (
            <img
              src={value.image}
              alt={value.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          )}
          {/* Dark gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 35%, rgba(16,36,58,0.72) 100%)",
          }}/>
          {/* Icon badge in corner */}
          <div style={{
            position: "absolute", top: "0.625rem", left: "0.625rem",
            width: 34, height: 34, borderRadius: "8px",
            background: "rgba(5,10,24,0.7)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(213,165,59,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--gold)",
          }}>
            {iconComponents[value.icon] ?? <Shield size={20} />}
          </div>
        </div>
      )}

      {/* Text content */}
      <div style={{ padding: "1.25rem 1.375rem", display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1 }}>
        {/* Title row — icon if no media */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {!hasMedia && (
            <div style={{
              width: 40, height: 40, borderRadius: "10px", flexShrink: 0,
              background: "rgba(213,165,59,0.08)", border: "1px solid rgba(213,165,59,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--gold)",
            }}>
              {iconComponents[value.icon] ?? <Shield size={20} />}
            </div>
          )}
          <h3 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 600, fontSize: "1rem",
            color: "var(--ivory)", margin: 0, lineHeight: 1.25,
          }}>
            {value.title}
          </h3>
        </div>
        <p style={{
          color: "var(--steel)", fontSize: "0.875rem",
          lineHeight: 1.7, margin: 0, maxWidth: "100%",
        }}>
          {value.description}
        </p>
      </div>
    </div>
  );
}

export default function CoreValues() {
  return (
    <section
      aria-labelledby="values-title"
      style={{ padding: "6rem 1.5rem", background: "var(--navy)", position: "relative" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem", justifyContent: "center" }}>What Guides Us</p>
          <h2 id="values-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>
            The Principles of the Brotherhood
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", maxWidth: "50ch", margin: "0 auto", lineHeight: 1.7 }}>
            These are not aspirations. They are the commitments that every member upholds
            — the rails upon which the Moving Train travels.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
          gap: "1.25rem",
        }}>
          {(coreValues as ValueItem[]).map((v, i) => (
            <ValueCard key={v.id} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
