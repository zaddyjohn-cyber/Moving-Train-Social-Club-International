"use client";

import Link from "next/link";
import { currentExecutives } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

function LeadershipCard({ exec }: { exec: (typeof currentExecutives)[number] }) {
  return (
    <div
      style={{
        background: "rgba(11,26,48,0.8)",
        border: "1px solid rgba(213,165,59,0.12)",
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.35)";
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(213,165,59,0.12)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Avatar placeholder */}
      <div
        aria-hidden="true"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(213,165,59,0.15) 0%, rgba(0,200,255,0.08) 100%)",
          border: "1.5px solid rgba(213,165,59,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontFamily: "'Cinzel', Georgia, serif",
          fontWeight: 700,
          color: "var(--gold)",
          flexShrink: 0,
        }}
      >
        {exec.name.split(" ").slice(-1)[0][0]}
      </div>

      {/* Position badge */}
      <div
        style={{
          padding: "0.25rem 0.875rem",
          background: "rgba(213,165,59,0.08)",
          border: "1px solid rgba(213,165,59,0.2)",
          borderRadius: "999px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {exec.position}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontWeight: 600,
          fontSize: "1rem",
          color: "var(--ivory)",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {exec.name}
      </h3>

      <p
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: "0.75rem",
          color: "rgba(174,184,198,0.5)",
          margin: 0,
          letterSpacing: "0.06em",
        }}
      >
        Current Executive
      </p>
    </div>
  );
}

export default function LeadershipSection() {
  return (
    <section
      aria-labelledby="leadership-home-title"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--navy-mid)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.875rem" }}>Who Leads Us</p>
            <h2
              id="leadership-home-title"
              style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", margin: 0 }}
            >
              Current Executive Officers
            </h2>
          </div>
          <Link
            href="/leadership"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--gold)",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.75rem")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "0.5rem")}
          >
            View Leadership History <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {currentExecutives.map((exec) => (
            <LeadershipCard key={exec.id} exec={exec} />
          ))}
        </div>
      </div>
    </section>
  );
}
