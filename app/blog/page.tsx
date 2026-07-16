import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "The Moving Train Journal | Brotherhood Chronicles",
  description: `Stories, insights, and reflections from the ${siteConfig.name} — a global brotherhood built on integrity, welfare, and forward momentum.`,
  openGraph: {
    title: "The Moving Train Journal",
    description: "Stories, insights and reflections from the Great Moving Train Social Club International.",
    type: "website",
  },
};

const categoryColors: Record<string, string> = {
  History:    "rgba(213,165,59,0.15)",
  Philosophy: "rgba(0,200,255,0.12)",
  Milestones: "rgba(213,165,59,0.18)",
  Welfare:    "rgba(100,200,120,0.12)",
  Community:  "rgba(180,100,220,0.12)",
  Governance: "rgba(213,165,59,0.12)",
  Events:     "rgba(0,200,255,0.15)",
};
const categoryText: Record<string, string> = {
  History:    "#F2D28C",
  Philosophy: "#00C8FF",
  Milestones: "#D5A53B",
  Welfare:    "#72C48A",
  Community:  "#C084FC",
  Governance: "#D5A53B",
  Events:     "#00C8FF",
};

const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
const rest = blogPosts.filter((p) => p.slug !== featured.slug);

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>

      {/* ── Hero ── */}
      <section style={{
        padding: "5rem 1.5rem 3.5rem",
        background: "radial-gradient(ellipse at 60% 0%, rgba(10,26,58,0.7) 0%, var(--navy) 70%)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Brotherhood Chronicles</p>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
            marginBottom: "1.25rem", fontSize: "clamp(2rem, 5vw, 3.25rem)",
          }}>
            The Moving Train{" "}
            <span style={{
              background: "linear-gradient(135deg,#D5A53B,#F2D28C,#D5A53B)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Journal</span>
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.8, maxWidth: "58ch" }}>
            Stories, reflections, and insights from inside one of the most purposeful
            Nigerian brotherhoods in the world — written for members, by the movement.
          </p>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section style={{ padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Featured Story</p>
          <Link href={`/blog/${featured.slug}`} style={{ display: "block", textDecoration: "none" }}>
            <article className="featured-post-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              background: "rgba(16,36,58,0.9)",
              border: "1px solid rgba(213,165,59,0.18)",
              borderRadius: "20px",
              overflow: "hidden",
              transition: "border-color 0.25s, box-shadow 0.25s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.45)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 60px rgba(0,0,0,0.5), 0 0 30px rgba(213,165,59,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                <img src={featured.coverImage} alt={featured.coverAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, transparent 60%, rgba(16,36,58,0.5) 100%)",
                }}/>
                <span style={{
                  position: "absolute", top: "1rem", left: "1rem",
                  padding: "0.3rem 0.8rem",
                  background: categoryColors[featured.category] ?? "rgba(213,165,59,0.15)",
                  color: categoryText[featured.category] ?? "var(--gold)",
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  borderRadius: "999px", border: "1px solid rgba(213,165,59,0.2)",
                }}>
                  {featured.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "2.5rem 2.25rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                  <span style={{ color: "rgba(170,182,197,0.55)", fontSize: "0.78rem", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {featured.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "rgba(170,182,197,0.55)", fontSize: "0.78rem", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    <Clock size={12}/> {featured.readTime} min read
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", lineHeight: 1.25, margin: 0,
                }}>
                  {featured.title}
                </h2>
                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.5rem" }}>
                  Read Full Story <ArrowRight size={14}/>
                </div>
              </div>
            </article>
          </Link>
          <style>{`
            @media (max-width: 767px) {
              .featured-post-grid {
                grid-template-columns: 1fr !important;
              }
              .featured-post-grid > div:first-child {
                aspect-ratio: 16/9 !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "2rem" }}>All Stories</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%), 1fr))",
            gap: "1.5rem",
          }}>
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
                <article style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.1)",
                  borderRadius: "16px", overflow: "hidden",
                  display: "flex", flexDirection: "column", height: "100%",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.35)";
                    el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(213,165,59,0.06)";
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.1)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Cover */}
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    <img src={post.coverImage} alt={post.coverAlt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(16,36,58,0.6) 100%)" }}/>
                    <span style={{
                      position: "absolute", top: "0.75rem", left: "0.75rem",
                      padding: "0.25rem 0.65rem",
                      background: categoryColors[post.category] ?? "rgba(213,165,59,0.15)",
                      color: categoryText[post.category] ?? "var(--gold)",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                      borderRadius: "999px", backdropFilter: "blur(6px)",
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "1.375rem 1.5rem 1.625rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <span style={{ color: "rgba(170,182,197,0.5)", fontSize: "0.72rem", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                        {post.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "rgba(170,182,197,0.5)", fontSize: "0.72rem", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                        <Clock size={11}/> {post.readTime} min
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
                      fontSize: "1rem", lineHeight: 1.35, margin: 0,
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ color: "var(--steel)", fontSize: "0.86rem", lineHeight: 1.7, margin: 0, flex: 1, maxWidth: "100%" }}>
                      {post.excerpt.slice(0, 130)}…
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.25rem" }}>
                      Read More <ArrowRight size={12}/>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
