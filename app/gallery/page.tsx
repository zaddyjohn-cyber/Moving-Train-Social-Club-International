"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { galleryAlbums } from "@/lib/mock-data";
import { ImageIcon, Lock } from "lucide-react";


export default function GalleryPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 50% 50%, rgba(10,26,58,0.7) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Visual Record</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Brotherhood in Photographs
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "54ch", margin: "0 auto" }}>
            A growing archive of moments that tell the story of the Moving Train —
            from our earliest meetings to international conventions.
          </p>
        </div>
      </section>

      {/* Albums */}
      <section aria-label="Gallery albums" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Notice */}
          <div style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.12)", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "3rem" }}>
            <p style={{ color: "rgba(174,184,198,0.6)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0, maxWidth: "100%" }}>
              <strong style={{ color: "var(--cyan)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600 }}>Photo Policy:</strong>{" "}
              All photographs are reviewed and approved before publication. Members may upload photographs
              via their dashboard. Some albums are available to members only.{" "}
              <Link href="/login" style={{ color: "var(--gold)" }}>Login</Link> to access the full gallery.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {galleryAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/gallery/${album.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <article
                  style={{
                    background: "rgba(11,26,48,0.8)",
                    border: "1px solid rgba(213,165,59,0.12)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.35)";
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(213,165,59,0.12)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Cover placeholder */}
                  <div
                    style={{
                      height: "200px",
                      background: "linear-gradient(135deg, rgba(10,26,58,0.9) 0%, rgba(5,10,24,0.9) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div style={{ color: "rgba(213,165,59,0.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                      <ImageIcon size={32} />
                      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(174,184,198,0.3)" }}>
                        {album.imageCount > 0 ? `${album.imageCount} photos` : "Photos coming soon"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1rem", color: "var(--ivory)", margin: 0, lineHeight: 1.3 }}>
                        {album.title}
                      </h2>
                      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", color: "rgba(174,184,198,0.4)", flexShrink: 0 }}>
                        {album.year}
                      </span>
                    </div>
                    <p style={{ color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0, maxWidth: "100%" }}>
                      {album.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}

            {/* Members-only placeholder */}
            <div
              style={{
                background: "rgba(11,26,48,0.5)",
                border: "1px dashed rgba(213,165,59,0.15)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem 2rem",
                gap: "1rem",
                textAlign: "center",
              }}
            >
              <Lock size={28} style={{ color: "rgba(213,165,59,0.3)" }} />
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1rem", color: "rgba(246,243,234,0.4)", margin: 0 }}>Members-Only Albums</h2>
              <p style={{ color: "rgba(174,184,198,0.4)", fontSize: "0.875rem", margin: 0, maxWidth: "24ch" }}>
                Additional albums are available to logged-in members.
              </p>
              <Link href="/login" className="btn-ghost-gold" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}>
                Member Login
              </Link>
            </div>
          </div>

          {/* Upload CTA for members */}
          <div style={{ marginTop: "3rem", textAlign: "center", padding: "2rem", background: "rgba(11,26,48,0.5)", border: "1px solid rgba(213,165,59,0.1)", borderRadius: "16px" }}>
            <p style={{ color: "var(--steel)", marginBottom: "1.25rem" }}>
              Are you a member? Share your photographs with the brotherhood.
            </p>
            <Link href="/login" className="btn-gold">Upload Photos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
