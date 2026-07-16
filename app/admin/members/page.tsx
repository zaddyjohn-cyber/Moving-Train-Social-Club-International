import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserPlus, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Members — Admin",
  robots: { index: false, follow: false },
};

export default function AdminMembersPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)" }}>
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: "rgba(170,182,197,0.40)" }}>/</span>
          <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--gold)" }}>Members</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>Member Management</h1>
          <button type="button" className="btn-gold" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <UserPlus size={16} /> Invite Member
          </button>
        </div>

        {/* Search / filter bar */}
        <div style={{ background: "rgba(16,36,58,0.85)", border: "1px solid rgba(213,165,59,0.12)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--steel)" }} />
            <input
              type="search" placeholder="Search members…"
              style={{
                width: "100%", padding: "0.625rem 0.875rem 0.625rem 2.5rem",
                background: "rgba(5,10,24,0.6)", border: "1px solid rgba(213,165,59,0.15)",
                borderRadius: "8px", color: "var(--ivory)",
                fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.875rem", outline: "none",
              }}
            />
          </div>
          <select style={{ padding: "0.625rem 1rem", background: "rgba(5,10,24,0.6)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "8px", color: "var(--steel)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", outline: "none" }}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Former</option>
            <option>Archived</option>
          </select>
          <select style={{ padding: "0.625rem 1rem", background: "rgba(5,10,24,0.6)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "8px", color: "var(--steel)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", outline: "none" }}>
            <option>All Roles</option>
            <option>Chairman</option>
            <option>Executive</option>
            <option>Pioneer</option>
            <option>Founder</option>
          </select>
        </div>

        {/* Table placeholder */}
        <div style={{ background: "rgba(16,36,58,0.75)", border: "1px solid rgba(213,165,59,0.12)", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }} role="table">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(213,165,59,0.12)" }}>
                  {["Name", "Position", "Status", "Country", "Joined", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--steel)", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ padding: "4rem", textAlign: "center" }}>
                    <p style={{ color: "rgba(170,182,197,0.45)", fontSize: "0.875rem" }}>
                      Member data loads from Supabase. Connect credentials to manage live records.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
