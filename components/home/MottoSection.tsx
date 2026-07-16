"use client";

import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function MottoSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Club motto"
      style={{
        position: "relative",
        padding: "8rem 1.5rem",
        background: "var(--navy)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Track lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(213,165,59,${0.04 + i * 0.02}), transparent)`,
            transform: `translateY(${(i - 2) * 18}px)`,
          }}
        />
      ))}

      {/* Moving light (train headlight effect) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "-10%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)",
          transform: "translateY(-50%)",
          animation: "trainLight 8s linear infinite",
        }}
      />

      <style>{`
        @keyframes trainLight {
          from { left: -10%; }
          to   { left: 110%; }
        }
      `}</style>

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(213,165,59,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
        <p
          className="eyebrow"
          style={{
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          Our Motto
        </p>

        <blockquote
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            lineHeight: 1.25,
            color: "var(--ivory)",
            margin: "0 0 2.5rem",
            border: "none",
            padding: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.2s",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #D5A53B 0%, #F2D28C 35%, #D5A53B 65%, #F2D28C 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmerGold 5s linear infinite",
            }}
          >
            "{siteConfig.motto}"
          </span>
        </blockquote>

        <p
          style={{
            color: "var(--steel)",
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            marginBottom: "3rem",
            maxWidth: "55ch",
            margin: "0 auto 3rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.45s",
          }}
        >
          The name Moving Train is not a metaphor — it is a commitment. This brotherhood
          does not stall. It does not retreat. It carries every member forward, together,
          without exception.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <Link href="/membership" className="btn-gold">
            Board the Train
          </Link>
          <Link href="/about" className="btn-ghost-gold">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
