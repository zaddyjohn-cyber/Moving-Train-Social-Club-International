"use client";

import { useRef, useEffect, useState } from "react";
import { chairmanshipTimeline } from "@/lib/mock-data";

function TimelineNode({
  item,
  index,
}: {
  item: (typeof chairmanshipTimeline)[number];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s ease ${index * 0.15}s`,
        width: "100%",
        maxWidth: "360px",
      }}
    >
      {/* Node dot */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: item.endDate === null
            ? "linear-gradient(135deg, #D5A53B 0%, #F2D28C 100%)"
            : "rgba(213,165,59,0.12)",
          border: item.endDate === null ? "none" : "1px solid rgba(213,165,59,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: item.endDate === null ? "0 0 24px rgba(213,165,59,0.3)" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: item.endDate === null ? "#050A18" : "var(--gold)",
          }}
        >
          {index + 1}
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          background: "rgba(16,36,58,0.85)",
          border: `1px solid ${item.endDate === null ? "rgba(213,165,59,0.35)" : "rgba(213,165,59,0.12)"}`,
          borderRadius: "12px",
          padding: "1.5rem",
          width: "100%",
          boxShadow: item.endDate === null ? "0 0 32px rgba(213,165,59,0.08)" : "none",
        }}
      >
        {(item as typeof item & { photo?: string }).photo && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(213,165,59,0.4)", boxShadow: "0 0 20px rgba(213,165,59,0.20)" }}>
              <img src={(item as typeof item & { photo?: string }).photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>
        )}
        {item.endDate === null && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.25rem 0.75rem",
              background: "rgba(213,165,59,0.1)",
              border: "1px solid rgba(213,165,59,0.3)",
              borderRadius: "999px",
              marginBottom: "0.875rem",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold)",
                animation: "pulseGold 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Current Chairman
            </span>
          </div>
        )}
        <h3
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 600,
            fontSize: "1.0625rem",
            color: "var(--ivory)",
            marginBottom: "0.25rem",
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          {item.title}
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(170,182,197,0.65)",
            marginBottom: "0.875rem",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {item.period}
        </p>
        <p
          style={{
            color: "var(--steel)",
            fontSize: "0.875rem",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "100%",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function TimelineRail() {
  return (
    <section
      aria-labelledby="timeline-title"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Track line visual */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(213,165,59,0.15), rgba(213,165,59,0.3), rgba(213,165,59,0.15), transparent)",
          transform: "translateX(-50%)",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Leadership Legacy</p>
          <h2
            id="timeline-title"
            style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}
          >
            Chairmanship Timeline
          </h2>
          <p
            style={{
              color: "var(--steel)",
              fontSize: "1.0625rem",
              maxWidth: "48ch",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Three chairmen have led the Moving Train since its founding — each building upon
            the legacy of those who came before.
          </p>
        </div>

        {/* Timeline nodes */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            justifyContent: "center",
          }}
        >
          {chairmanshipTimeline.map((item, i) => (
            <TimelineNode key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
