import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Calendar, MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Conventions",
  description: `Upcoming and past events of the ${siteConfig.name} — international conventions, meetings, and gatherings.`,
};

const pastEvents = [
  {
    id: "e-1",
    title: "First International Convention",
    status: "completed",
    year: "2026",
    description: "A landmark milestone in the history of the Moving Train — the first-ever International Convention, bringing together members from across the globe for fellowship, reflection, and celebration.",
    location: "To be confirmed in club records",
    featured: true,
  },
];

export default function EventsPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 50% 60%, rgba(240,234,220,0.5) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Gatherings</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Events & Conventions
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "54ch", margin: "0 auto" }}>
            The Moving Train does not only meet online. The brotherhood gathers — to celebrate,
            to plan, and to remind one another that the bond is real.
          </p>
        </div>
      </section>

      {/* Past events */}
      <section aria-labelledby="past-events-title" style={{ padding: "4rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Historic Milestones</p>
            <h2 id="past-events-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Past Events
            </h2>
          </div>
          {pastEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: "rgba(11,26,48,0.9)",
                border: "1px solid rgba(213,165,59,0.3)",
                borderRadius: "20px",
                padding: "2.5rem",
                boxShadow: "0 0 40px rgba(213,165,59,0.06)",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {event.featured && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.875rem", background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.3)", borderRadius: "999px", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
                    <Star size={11} /> Historic Milestone
                  </span>
                )}
                <span style={{ padding: "0.25rem 0.875rem", background: "rgba(174,184,198,0.06)", border: "1px solid rgba(174,184,198,0.12)", borderRadius: "999px", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)" }}>
                  Completed
                </span>
              </div>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.5rem", color: "var(--ivory)", marginBottom: "0.75rem" }}>{event.title}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)" }}>
                  <Calendar size={15} /> {event.year}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)" }}>
                  <MapPin size={15} /> {event.location}
                </span>
              </div>
              <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.8, margin: 0, maxWidth: "100%" }}>{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>What&apos;s Next</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>Upcoming Events</h2>
          </div>
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(255,252,246,0.65)", border: "1px dashed rgba(213,165,59,0.15)", borderRadius: "16px" }}>
            <Calendar size={36} style={{ color: "rgba(213,165,59,0.3)", marginBottom: "1.5rem" }} />
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "rgba(246,243,234,0.5)", marginBottom: "1rem" }}>
              Upcoming Events Will Appear Here
            </h3>
            <p style={{ color: "rgba(90,80,65,0.5)", fontSize: "0.875rem", maxWidth: "36ch", margin: "0 auto 2rem" }}>
              Members are notified of upcoming events through the member dashboard and club communications.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/login" className="btn-ghost-gold">Member Login</Link>
              <Link href="/membership" className="btn-gold">Join the Brotherhood</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
