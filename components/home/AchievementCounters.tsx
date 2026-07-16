"use client";

import { useEffect, useRef, useState } from "react";
import { achievements } from "@/lib/mock-data";
import { TrendingUp, Heart, Users, Gift, Star } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  welfare: <Heart size={20} />,
  family: <Users size={20} />,
  celebration: <Gift size={20} />,
  investment: <TrendingUp size={20} />,
  milestone: <Star size={20} />,
};

function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, started]);

  return count;
}

function AchievementCard({ achievement }: { achievement: typeof achievements[number] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(achievement.value, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatCount = (n: number) => {
    if (achievement.category === "milestone") return n.toString();
    if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(0)} M+`;
    if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
    return `₦${n.toLocaleString()}`;
  };

  return (
    <div
      ref={ref}
      style={{
        background: "rgba(11,26,48,0.8)",
        border: "1px solid rgba(213,165,59,0.12)",
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: "0.1s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.35)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 24px rgba(213,165,59,0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "10px",
          background: "rgba(213,165,59,0.1)",
          border: "1px solid rgba(213,165,59,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--gold)",
        }}
      >
        {iconMap[achievement.category] ?? <TrendingUp size={20} />}
      </div>

      {/* Stat */}
      <div>
        <div
          aria-live="polite"
          aria-label={`${achievement.label}: ${achievement.display}`}
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "var(--gold-light)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            marginBottom: "0.25rem",
          }}
        >
          {visible ? formatCount(count) : "—"}
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.75rem",
          }}
        >
          {achievement.label}
        </div>
        <p
          style={{
            color: "var(--steel)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "100%",
          }}
        >
          {achievement.description}
        </p>
      </div>
    </div>
  );
}

export default function AchievementCounters() {
  return (
    <section
      id="achievements-preview"
      aria-labelledby="achievements-title"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--navy-mid)",
        position: "relative",
      }}
    >
      {/* Subtle geo overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Our Impact</p>
          <h2
            id="achievements-title"
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              color: "var(--ivory)",
              marginBottom: "1rem",
            }}
          >
            Brotherhood in Numbers
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
            Since 2020, the Moving Train has put meaning behind its philosophy — delivering
            real support, real investment, and real presence in every member's life.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>

        {/* Bottom note */}
        <p
          style={{
            textAlign: "center",
            color: "rgba(174,184,198,0.45)",
            fontSize: "0.8rem",
            marginTop: "3rem",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          All figures represent the period from the club's founding in 2020 to date.
        </p>
      </div>
    </section>
  );
}
