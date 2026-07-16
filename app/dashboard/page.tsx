"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { User, Image as ImageIcon, Bell, Settings, Shield, Upload, Calendar, ArrowRight } from "lucide-react";


export default function DashboardPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      {/* Demo notice */}
      <div style={{ background: "rgba(213,165,59,0.05)", borderBottom: "1px solid rgba(213,165,59,0.15)", padding: "0.875rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", color: "rgba(0,200,255,0.7)", margin: 0 }}>
          <strong>Demo Mode:</strong> Connect Supabase credentials to enable live member authentication and data.
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Welcome Back</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "0.5rem" }}>
            Member Dashboard
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "0.9375rem" }}>
            Manage your profile, photographs, and account settings.
          </p>
        </div>

        {/* Profile completion */}
        <div style={{ background: "rgba(16,36,58,0.85)", border: "1px solid rgba(213,165,59,0.2)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                Profile Completion
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, minWidth: "200px", height: "6px", background: "rgba(213,165,59,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "35%", height: "100%", background: "linear-gradient(90deg, #D5A53B, #F2D28C)", borderRadius: "3px" }} />
                </div>
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--gold-light)", fontWeight: 700 }}>35%</span>
              </div>
            </div>
            <Link href="/dashboard/profile" className="btn-ghost-gold" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}>
              Complete Profile <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
          {[
            { icon: <User size={22} />, label: "Edit Profile", href: "/dashboard/profile", desc: "Update your personal information" },
            { icon: <Upload size={22} />, label: "Upload Photos", href: "/dashboard/photos", desc: "Share photographs with the brotherhood" },
            { icon: <ImageIcon size={22} />, label: "My Gallery", href: "/dashboard/gallery", desc: "View and manage your uploaded photos" },
            { icon: <Bell size={22} />, label: "Notifications", href: "#", desc: "Announcements and club updates" },
            { icon: <Calendar size={22} />, label: "Events", href: "/events", desc: "Upcoming club events and conventions" },
            { icon: <Settings size={22} />, label: "Settings", href: "#", desc: "Account and privacy preferences" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  background: "rgba(16,36,58,0.75)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  transition: "all 0.25s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.3)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(213,165,59,0.12)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ color: "var(--gold)" }}>{action.icon}</div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.9375rem", color: "var(--ivory)", margin: "0 0 0.25rem" }}>{action.label}</p>
                  <p style={{ color: "var(--steel)", fontSize: "0.8rem", margin: 0, maxWidth: "100%" }}>{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Announcements placeholder */}
        <div style={{ background: "rgba(16,36,58,0.60)", border: "1px solid rgba(213,165,59,0.1)", borderRadius: "16px", padding: "2rem" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Club Announcements
          </h2>
          <div style={{ padding: "2rem", textAlign: "center", borderRadius: "10px", background: "rgba(0,0,0,0.2)" }}>
            <Bell size={28} style={{ color: "rgba(170,182,197,0.30)", marginBottom: "0.875rem" }} />
            <p style={{ color: "rgba(170,182,197,0.50)", fontSize: "0.875rem" }}>
              No announcements at this time. Connect Supabase to load live club announcements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
