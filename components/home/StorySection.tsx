"use client";

import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { founderMembers, notableContributions } from "@/lib/mock-data";
import { contributionVisuals, ContributionVisualStyles } from "@/components/home/ContributionVisuals";
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

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

const stats = [
  { target: 6,    suffix: "",  label: "Founders",  duration: 1200 },
  { target: 2020, suffix: "",  label: "Founded",   duration: 2200 },
  { target: 6,    suffix: "+", label: "Countries", duration: 1400 },
];

function AnimatedStat({ target, suffix, label, duration, started }: {
  target: number; suffix: string; label: string; duration: number; started: boolean;
}) {
  const count = useCountUp(target, duration, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
        fontWeight: 700,
        color: "var(--gold-light)",
        lineHeight: 1,
        marginBottom: "0.3rem",
        fontVariantNumeric: "tabular-nums",
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(170,182,197,0.7)",
      }}>
        {label}
      </div>
    </div>
  );
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
          className="story-intro-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
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

          {/* Visual panel — image + quote overlay + counting stats */}
          <div
            style={{
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.9s ease 0.2s",
              position: "relative",
            }}
          >
            <div style={{
              borderRadius: "20px",
              border: "1px solid rgba(213,165,59,0.25)",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(213,165,59,0.08)",
            }}>
              {/* Photo */}
              <img
                src="/images/our-brothers-keeper.jpg"
                alt="Our Brother's Keeper — Moving Train members"
                style={{ width: "100%", height: "auto", display: "block" }}
              />

              {/* Dark overlay — stronger at bottom for text legibility */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(5,10,24,0.25) 0%, rgba(5,10,24,0.55) 45%, rgba(5,10,24,0.92) 100%)",
              }} aria-hidden="true"/>

              {/* Quote overlaid on photo */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1.75rem 1.75rem 0",
              }}>
                <div aria-hidden="true" style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "2.5rem", color: "rgba(242,210,140,0.35)",
                  lineHeight: 1, marginBottom: "0.5rem", userSelect: "none",
                }}>"</div>
                <blockquote style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--ivory)", lineHeight: 1.45,
                  margin: "0 0 1.25rem", border: "none", padding: 0,
                }}>
                  {siteConfig.philosophy}
                </blockquote>
              </div>
            </div>

            {/* Stats row — sits below image, outside the overflow:hidden */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.5rem",
              marginTop: "0.875rem",
              padding: "1.25rem 1rem",
              background: "rgba(16,36,58,0.9)",
              border: "1px solid rgba(213,165,59,0.15)",
              borderRadius: "14px",
            }}>
              {stats.map((s) => (
                <AnimatedStat key={s.label} {...s} started={introVisible} />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .story-intro-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
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

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))",
              gap: "1.25rem",
              alignItems: "stretch",
            }}>
              {notableContributions.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "linear-gradient(150deg, rgba(16,36,58,0.92) 0%, rgba(8,20,38,0.92) 100%)",
                    border: "1px solid rgba(213,165,59,0.12)",
                    borderRadius: "16px",
                    padding: "1.625rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    position: "relative",
                    overflow: "hidden",
                    opacity: contributionsVisible ? 1 : 0,
                    transform: contributionsVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${0.05 + i * 0.07}s, transform 0.5s ease ${0.05 + i * 0.07}s, border-color 0.25s, box-shadow 0.25s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.32)";
                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 18px rgba(213,165,59,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.12)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Top edge light */}
                  <div aria-hidden="true" style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.3), transparent)",
                  }}/>
                  {/* Animated visual — depicts this specific contribution */}
                  <div aria-hidden="true" style={{
                    background: "rgba(3,7,17,0.75)",
                    border: "1px solid rgba(213,165,59,0.12)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}>
                    {contributionVisuals[(item as typeof item & { icon?: string }).icon ?? ""] ?? contributionVisuals.coins}
                  </div>
                  {/* Member */}
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "var(--gold)", margin: 0, lineHeight: 1.5,
                  }}>
                    {item.member}
                  </p>
                  {/* Contribution text */}
                  <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>
                    {item.contribution}
                  </p>
                </div>
              ))}
            </div>
            <ContributionVisualStyles />
          </div>
        </div>
      </section>
    </>
  );
}
