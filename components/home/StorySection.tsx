"use client";

import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { founderMembers, notableContributions } from "@/lib/mock-data";
import Link from "next/link";

function useVisible(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function StorySection() {
  const { ref: introRef, visible: introVisible } = useVisible(0.15);
  const { ref: foundersRef, visible: foundersVisible } = useVisible(0.1);
  const { ref: contributionsRef, visible: contributionsVisible } = useVisible(0.1);

  return (
    <>
      {/* ── Introduction ── */}
      <section
        id="story"
        aria-labelledby="intro-title"
        style={{
          padding: "7rem 1.5rem",
          background: "var(--navy-mid)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Side accent line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: "10%",
            bottom: "10%",
            width: "3px",
            background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
            opacity: 0.4,
          }}
        />

        <div
          ref={introRef}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div
            style={{
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.9s ease",
            }}
          >
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Our Beginning</p>
            <h2
              id="intro-title"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                color: "var(--ivory)",
                marginBottom: "1.5rem",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              More Than a Club.
              <br />
              A Brotherhood Without Borders.
            </h2>
            <p
              style={{
                color: "var(--steel)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
                maxWidth: "100%",
              }}
            >
              What began in Italy with six close friends has grown into something far greater
              than any of them imagined. The {siteConfig.name} is a living testament to what
              happens when friendship is treated as a sacred responsibility.
            </p>
            <p
              style={{
                color: "var(--steel)",
                lineHeight: 1.8,
                marginBottom: "2rem",
                maxWidth: "100%",
              }}
            >
              In 2020, when one of their own faced the grief of losing a mother, the others
              responded — not with sympathy from afar, but with a proposal: let us build
              something that ensures no brother ever faces life's hardest moments alone. That
              proposal became the Moving Train.
            </p>
            <Link href="/history" className="btn-ghost-gold">
              Read the Full Story
            </Link>
          </div>

          {/* Visual panel */}
          <div
            style={{
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.9s ease 0.2s",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(16,36,58,0.85)",
                border: "1px solid rgba(213,165,59,0.2)",
                borderRadius: "20px",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              {/* Quote */}
              <div
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "3rem",
                  color: "rgba(213,165,59,0.2)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  userSelect: "none",
                }}
                aria-hidden="true"
              >
                "
              </div>
              <blockquote
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.375rem)",
                  color: "var(--ivory)",
                  lineHeight: 1.5,
                  marginBottom: "1.5rem",
                  border: "none",
                  padding: 0,
                  margin: "0 0 1.5rem",
                }}
              >
                {siteConfig.philosophy}
              </blockquote>
              <p
                style={{
                  color: "var(--steel)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  marginBottom: "1.75rem",
                  maxWidth: "100%",
                }}
              >
                No member should face life's challenges alone. This is not a rule — it is the
                spirit that animates everything the Moving Train does.
              </p>

              {/* Stats strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                  borderTop: "1px solid rgba(213,165,59,0.12)",
                  paddingTop: "1.75rem",
                }}
              >
                {[
                  { value: "6", label: "Founders" },
                  { value: "2020", label: "Founded" },
                  { value: "6+", label: "Countries" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--gold-light)",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--steel)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #story [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── Founders ── */}
      <section
        aria-labelledby="founders-title"
        style={{
          padding: "6rem 1.5rem",
          background: "var(--navy)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            ref={foundersRef}
            style={{
              opacity: foundersVisible ? 1 : 0,
              transform: foundersVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>The Six Who Started It</p>
              <h2
                id="founders-title"
                style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}
              >
                The Founding Members
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
                Six friends, living in Italy, whose bond of friendship became the foundation
                of an international organisation.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {founderMembers.map((member, i) => (
                <div
                  key={member.id}
                  style={{
                    background: "rgba(16,36,58,0.75)",
                    border: "1px solid rgba(213,165,59,0.1)",
                    borderRadius: "12px",
                    padding: "1.5rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.875rem",
                    textAlign: "center",
                    opacity: foundersVisible ? 1 : 0,
                    transform: foundersVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${0.1 + i * 0.08}s`,
                  }}
                >
                  {/* Initials avatar */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(213,165,59,0.15) 0%, rgba(213,165,59,0.07) 100%)",
                      border: "1px solid rgba(213,165,59,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Cinzel', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--gold)",
                    }}
                  >
                    {member.name.split(" ").filter((w) => w !== "Mr.").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--ivory)",
                        margin: "0 0 0.25rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {member.name}
                    </p>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.7rem",
                        color: "var(--gold)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "rgba(213,165,59,0.08)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        display: "inline-block",
                      }}
                    >
                      Founder
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Notable Contributions ── */}
      <section
        aria-labelledby="contributions-title"
        style={{
          padding: "5rem 1.5rem",
          background: "var(--navy-mid)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            ref={contributionsRef}
            style={{
              opacity: contributionsVisible ? 1 : 0,
              transform: contributionsVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>Members Who Shaped the Club</p>
              <h2
                id="contributions-title"
                style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}
              >
                Notable Contributions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {notableContributions.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(16,36,58,0.82)",
                    border: "1px solid rgba(213,165,59,0.1)",
                    borderRadius: "14px",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.125rem",
                    opacity: contributionsVisible ? 1 : 0,
                    transform: contributionsVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.5s ease ${0.05 + i * 0.07}s`,
                  }}
                >
                  {/* Emoji icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: "12px", flexShrink: 0,
                    background: "rgba(213,165,59,0.07)",
                    border: "1px solid rgba(213,165,59,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem", lineHeight: 1,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}>
                    {(item as typeof item & { emoji?: string }).emoji ?? "⭐"}
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.72rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--gold)", marginBottom: "0.375rem",
                    }}>
                      {item.member}
                    </p>
                    <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>
                      {item.contribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
