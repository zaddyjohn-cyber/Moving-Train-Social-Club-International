import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { blogPosts, getBlogPost, getRelatedPosts, type ContentBlock } from "@/lib/blog-data";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | GMTSCI Journal`,
    description: post.metaDescription,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.dateISO,
      authors: [post.author],
      images: [{ url: post.coverImage, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={i} style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.85, marginBottom: "1.5rem", maxWidth: "100%" }}>
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) return (
        <h2 key={i} style={{
          fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", lineHeight: 1.2,
          marginTop: "2.75rem", marginBottom: "1rem",
          paddingBottom: "0.625rem",
          borderBottom: "1px solid rgba(213,165,59,0.15)",
        }}>
          {block.text}
        </h2>
      );
      return (
        <h3 key={i} style={{
          fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
          fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.3,
          marginTop: "2rem", marginBottom: "0.75rem",
        }}>
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote key={i} style={{
          margin: "2rem 0",
          padding: "1.5rem 1.75rem",
          background: "rgba(213,165,59,0.05)",
          borderLeft: "3px solid var(--gold)",
          borderRadius: "0 12px 12px 0",
          position: "relative",
        }}>
          <div aria-hidden="true" style={{
            fontFamily: "'Cinzel', Georgia, serif", fontSize: "3rem",
            color: "rgba(213,165,59,0.18)", lineHeight: 1, marginBottom: "0.5rem",
          }}>"</div>
          <p style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
            fontSize: "clamp(1rem, 1.8vw, 1.1875rem)", lineHeight: 1.6,
            margin: 0, maxWidth: "100%", fontStyle: "italic",
          }}>
            {block.text}
          </p>
          {block.attribution && (
            <footer style={{
              marginTop: "0.875rem",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--gold)",
            }}>
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} style={{ listStyle: "none", margin: "0 0 1.75rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {block.items.map((item, j) => (
            <li key={j} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div aria-hidden="true" style={{
                width: 6, height: 6, borderRadius: "50%", background: "var(--gold)",
                flexShrink: 0, marginTop: "0.6rem",
              }}/>
              <span style={{ color: "var(--steel)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "100%" }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "divider":
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2.5rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(213,165,59,0.15)" }}/>
          <div style={{ width: 7, height: 7, background: "var(--gold)", transform: "rotate(45deg)", flexShrink: 0 }}/>
          <div style={{ flex: 1, height: 1, background: "rgba(213,165,59,0.15)" }}/>
        </div>
      );
    default:
      return null;
  }
}

const categoryText: Record<string, string> = {
  History:    "#F2D28C",
  Philosophy: "#00C8FF",
  Milestones: "#D5A53B",
  Welfare:    "#72C48A",
  Community:  "#C084FC",
  Governance: "#D5A53B",
  Events:     "#00C8FF",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug, 3);

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>

      {/* ── Cover Hero ── */}
      <div style={{ position: "relative", height: "clamp(280px, 45vw, 520px)", overflow: "hidden" }}>
        <img src={post.coverImage} alt={post.coverAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(5,10,24,0.35) 0%, rgba(5,10,24,0.7) 60%, rgba(5,10,24,0.97) 100%)",
        }}/>
        {/* Breadcrumb */}
        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link href="/blog" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            color: "rgba(242,210,140,0.8)", fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(242,210,140,0.8)"; }}
          >
            <ArrowLeft size={13}/> Journal
          </Link>
          <span style={{ color: "rgba(170,182,197,0.4)", fontSize: "0.65rem" }}>›</span>
          <span style={{ color: "rgba(170,182,197,0.6)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.72rem" }}>
            {post.category}
          </span>
        </div>
        {/* Category + meta overlaid at bottom of cover */}
        <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem", maxWidth: "820px", margin: "0 auto" }}>
          <span style={{
            display: "inline-block", marginBottom: "0.875rem",
            padding: "0.3rem 0.875rem",
            background: "rgba(5,10,24,0.6)", backdropFilter: "blur(8px)",
            color: categoryText[post.category] ?? "var(--gold)",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            borderRadius: "999px", border: "1px solid rgba(213,165,59,0.25)",
          }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* ── Article ── */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Title + meta */}
        <header style={{ padding: "2.5rem 0 2rem", borderBottom: "1px solid rgba(213,165,59,0.12)" }}>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)",
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "1.5rem",
          }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem 2rem", alignItems: "center" }}>
            <div>
              <p style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.8rem", fontWeight: 700, color: "var(--ivory)", margin: "0 0 0.15rem",
              }}>
                {post.author}
              </p>
              <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(170,182,197,0.6)", margin: 0 }}>
                {post.authorRole}
              </p>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(213,165,59,0.15)" }}/>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(170,182,197,0.6)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.78rem" }}>
                <Calendar size={13}/> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(170,182,197,0.6)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.78rem" }}>
                <Clock size={13}/> {post.readTime} min read
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <article
          style={{ padding: "2.5rem 0" }}
          itemScope itemType="https://schema.org/Article"
        >
          <meta itemProp="headline" content={post.title}/>
          <meta itemProp="datePublished" content={post.dateISO}/>
          <meta itemProp="author" content={post.author}/>
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Tags */}
        <div style={{ paddingBottom: "2.5rem", borderTop: "1px solid rgba(213,165,59,0.12)", paddingTop: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.625rem" }}>
            <Tag size={14} style={{ color: "var(--gold)", flexShrink: 0 }}/>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                padding: "0.28rem 0.75rem",
                background: "rgba(213,165,59,0.07)",
                border: "1px solid rgba(213,165,59,0.15)",
                borderRadius: "999px",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.7rem", color: "var(--steel)", letterSpacing: "0.05em",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author card */}
        <div style={{
          margin: "0 0 4rem",
          padding: "1.75rem",
          background: "rgba(16,36,58,0.85)",
          border: "1px solid rgba(213,165,59,0.12)",
          borderRadius: "16px",
          display: "flex", alignItems: "center", gap: "1.25rem",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, rgba(213,165,59,0.2), rgba(213,165,59,0.08))",
            border: "1.5px solid rgba(213,165,59,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--gold)",
          }}>
            MT
          </div>
          <div>
            <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.9rem", color: "var(--ivory)", margin: "0 0 0.25rem", fontWeight: 600 }}>
              {post.author}
            </p>
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.78rem", color: "var(--steel)", margin: "0 0 0.5rem" }}>
              {post.authorRole}
            </p>
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.78rem", color: "rgba(170,182,197,0.55)", margin: 0, maxWidth: "100%" }}>
              Official communications from the {siteConfig.name}, sharing the stories, milestones, and reflections of a global brotherhood in motion.
            </p>
          </div>
        </div>
      </div>

      {/* ── Related Posts ── */}
      <section style={{ padding: "0 1.5rem 6rem", background: "var(--navy-mid)", paddingTop: "3.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <p className="eyebrow">Continue Reading</p>
            <Link href="/blog" style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--gold)", transition: "gap 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.65rem"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.4rem"; }}
            >
              All stories <ArrowRight size={13}/>
            </Link>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%), 1fr))",
            gap: "1.25rem",
          }}>
            {related.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{ display: "block", textDecoration: "none" }}>
                <article style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.1)",
                  borderRadius: "14px", overflow: "hidden",
                  transition: "border-color 0.25s, transform 0.25s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.32)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.1)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={rp.coverImage} alt={rp.coverAlt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: categoryText[rp.category] ?? "var(--gold)" }}>
                      {rp.category}
                    </span>
                    <h4 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", fontSize: "0.9375rem", lineHeight: 1.35, margin: "0.5rem 0 0.625rem" }}>
                      {rp.title}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--gold)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Read <ArrowRight size={11}/>
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
