"use client";

import Link from "next/link";
import { Users, Image as ImageIcon, FileText, MessageSquare, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Shield } from "lucide-react";


const stats = [
  { label: "Total Members", value: "—", icon: <Users size={20} />, href: "/admin/members", note: "Connect Supabase to load live counts" },
  { label: "Pending Profiles", value: "—", icon: <Clock size={20} />, href: "/admin/members", note: "" },
  { label: "Photos Awaiting Approval", value: "—", icon: <ImageIcon size={20} />, href: "/admin/gallery", note: "" },
  { label: "Published Gallery Images", value: "—", icon: <CheckCircle size={20} />, href: "/admin/gallery", note: "" },
  { label: "Membership Applications", value: "—", icon: <FileText size={20} />, href: "/admin/applications", note: "" },
  { label: "Contact Messages", value: "—", icon: <MessageSquare size={20} />, href: "#", note: "" },
  { label: "Upcoming Events", value: "—", icon: <Calendar size={20} />, href: "/admin/events", note: "" },
  { label: "Active Announcements", value: "—", icon: <TrendingUp size={20} />, href: "#", note: "" },
];

const quickActions = [
  { label: "Manage Members", desc: "Create, edit, activate, and manage member profiles", href: "/admin/members", icon: <Users size={20} /> },
  { label: "Gallery Moderation", desc: "Approve, reject, and manage uploaded photographs", href: "/admin/gallery", icon: <ImageIcon size={20} /> },
  { label: "Membership Applications", desc: "Review and process membership applications", href: "/admin/applications", icon: <FileText size={20} /> },
  { label: "Manage Events", desc: "Create and manage club events and conventions", href: "/admin/events", icon: <Calendar size={20} /> },
  { label: "Content Management", desc: "Update homepage content, history, and announcements", href: "/admin/content", icon: <TrendingUp size={20} /> },
];

export default function AdminDashboardPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      {/* Demo notice */}
      <div style={{ background: "rgba(248,113,113,0.06)", borderBottom: "1px solid rgba(248,113,113,0.15)", padding: "0.875rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", color: "rgba(248,113,113,0.7)", margin: 0 }}>
          <strong>Demo Mode:</strong> Admin functions require Supabase connection and administrator authentication.
          This page is protected in production — do not expose to public users.
        </p>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "8px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171" }}>
                <Shield size={16} />
              </div>
              <p className="eyebrow">Administrator</p>
            </div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "rgba(16,36,58,0.85)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ color: "var(--gold)" }}>{stat.icon}</div>
                </div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "var(--gold-light)", marginBottom: "0.25rem", fontVariantNumeric: "tabular-nums" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--steel)" }}>
                  {stat.label}
                </div>
                {stat.note && (
                  <p style={{ color: "rgba(170,182,197,0.45)", fontSize: "0.7rem", marginTop: "0.5rem", margin: "0.5rem 0 0", maxWidth: "100%" }}>{stat.note}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Administration
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "rgba(16,36,58,0.75)",
                    border: "1px solid rgba(213,165,59,0.12)",
                    borderRadius: "14px",
                    padding: "1.75rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>{action.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.9375rem", color: "var(--ivory)", margin: "0 0 0.375rem" }}>{action.label}</h3>
                    <p style={{ color: "var(--steel)", fontSize: "0.8125rem", lineHeight: 1.6, margin: 0, maxWidth: "100%" }}>{action.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Audit log placeholder */}
        <div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Recent Activity Log
          </h2>
          <div style={{ background: "rgba(16,36,58,0.60)", border: "1px solid rgba(213,165,59,0.1)", borderRadius: "14px", padding: "3rem", textAlign: "center" }}>
            <AlertCircle size={28} style={{ color: "rgba(170,182,197,0.30)", marginBottom: "1rem" }} />
            <p style={{ color: "rgba(170,182,197,0.45)", fontSize: "0.875rem" }}>
              Audit log requires Supabase connection. Administrative actions will be recorded here when live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
