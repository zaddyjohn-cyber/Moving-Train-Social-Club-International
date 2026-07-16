import type { Metadata } from "next";
import Link from "next/link";
import { galleryAlbums } from "@/lib/mock-data";
import { ArrowLeft, ImageIcon } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const album = galleryAlbums.find((a) => a.slug === slug);
  return { title: album?.title ?? "Gallery Album" };
}

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = galleryAlbums.find((a) => a.slug === slug);

  if (!album) {
    return (
      <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>Album Not Found</h1>
          <Link href="/gallery" className="btn-ghost-gold"><ArrowLeft size={16} /> Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
        <Link href="/gallery" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
        >
          <ArrowLeft size={16} /> Gallery
        </Link>
      </div>

      <section style={{ padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>{album.year}</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>{album.title}</h1>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "60ch" }}>{album.description}</p>
        </div>
      </section>

      <section style={{ padding: "2rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {album.imageCount === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(16,36,58,0.60)", border: "1px dashed rgba(213,165,59,0.15)", borderRadius: "16px" }}>
              <ImageIcon size={48} style={{ color: "rgba(213,165,59,0.2)", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "rgba(246,243,234,0.5)", marginBottom: "1rem" }}>
                Photographs Coming Soon
              </h2>
              <p style={{ color: "rgba(170,182,197,0.50)", fontSize: "0.9375rem", marginBottom: "2rem", maxWidth: "40ch", margin: "0 auto 2rem" }}>
                This album is being prepared. Members can contribute photographs via their dashboard.
              </p>
              <Link href="/login" className="btn-ghost-gold">Upload Photos</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
              {/* Populated by real images from database */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
