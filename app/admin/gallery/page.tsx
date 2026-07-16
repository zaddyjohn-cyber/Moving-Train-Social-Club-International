import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle, X, Clock, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery Moderation — Admin",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)" }}>
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: "rgba(170,182,197,0.40)" }}>/</span>
          <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--gold)" }}>Gallery</span>
        </div>

        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "2.5rem" }}>
          Gallery Moderation
        </h1>

        {/* Status tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[
            { label: "Pending Review", icon: <Clock size={14} />, count: 0, active: true },
            { label: "Approved", icon: <CheckCircle size={14} />, count: 0 },
            { label: "Rejected", icon: <X size={14} />, count: 0 },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1.25rem",
                background: tab.active ? "rgba(213,165,59,0.1)" : "rgba(11,26,48,0.6)",
                border: `1px solid ${tab.active ? "rgba(213,165,59,0.35)" : "rgba(213,165,59,0.1)"}`,
                borderRadius: "999px",
                color: tab.active ? "var(--gold)" : "var(--steel)",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              {tab.icon} {tab.label}
              <span style={{ background: "rgba(213,165,59,0.15)", padding: "0 0.5rem", borderRadius: "999px", fontSize: "0.7rem" }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Queue placeholder */}
        <div style={{ background: "rgba(16,36,58,0.60)", border: "1px dashed rgba(213,165,59,0.15)", borderRadius: "14px", padding: "5rem 2rem", textAlign: "center" }}>
          <ImageIcon size={40} style={{ color: "rgba(213,165,59,0.2)", marginBottom: "1.5rem" }} />
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "rgba(28,22,16,0.4)", marginBottom: "1rem" }}>
            No Pending Uploads
          </h2>
          <p style={{ color: "rgba(170,182,197,0.45)", fontSize: "0.875rem", maxWidth: "40ch", margin: "0 auto" }}>
            When members upload photographs, they will appear here for review.
            Connect Supabase to enable live moderation.
          </p>
        </div>
      </div>
    </div>
  );
}
