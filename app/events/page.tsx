import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Conventions",
  description: `Upcoming and past events of the ${siteConfig.name} — international conventions, meetings, and member gatherings.`,
};

const upcomingEvents = [
  {
    id: "u-1",
    title: "Monthly Brotherhood Meeting",
    type: "Virtual Meeting",
    frequency: "Monthly — Last Sunday of every month",
    time: "8:00 PM (WAT) · 7:00 PM (GMT) · 2:00 PM (EST)",
    platform: "Zoom (link shared via WhatsApp)",
    description:
      "The heartbeat of the Moving Train. Every last Sunday of the month, members across all time zones join a live Zoom call to discuss club affairs, share updates, celebrate wins, and hold one another accountable. Attendance is a core membership duty.",
    badge: "Recurring",
    badgeColor: "rgba(0,200,255,0.15)",
    badgeBorder: "rgba(0,200,255,0.3)",
    badgeText: "var(--cyan)",
    icon: "zoom",
  },
  {
    id: "u-2",
    title: "Quarterly Financial Review",
    type: "Internal Meeting",
    frequency: "Quarterly — March, June, September, December",
    time: "Announced via WhatsApp group",
    platform: "Zoom",
    description:
      "Every quarter the Financial Secretary and Treasurer present a full account of dues collected, welfare disbursements, and club funds. Transparency is a founding principle — every member has the right to know the state of the treasury.",
    badge: "Recurring",
    badgeColor: "rgba(0,200,255,0.15)",
    badgeBorder: "rgba(0,200,255,0.3)",
    badgeText: "var(--cyan)",
    icon: "finance",
  },
  {
    id: "u-3",
    title: "2nd International Convention",
    type: "International Convention",
    frequency: "Planned — 2028",
    time: "Date & venue TBC",
    platform: "In-Person",
    description:
      "Building on the success of the inaugural 2026 convention, the second International Convention will bring members together once again — across borders, across time zones, one brotherhood. Location and date to be announced.",
    badge: "Upcoming",
    badgeColor: "rgba(213,165,59,0.1)",
    badgeBorder: "rgba(213,165,59,0.3)",
    badgeText: "var(--gold)",
    icon: "convention",
  },
];

const pastEvents = [
  {
    id: "p-1",
    title: "1st International Convention",
    type: "International Convention",
    date: "2026",
    location: "Nigeria",
    description:
      "A historic first — members of the Moving Train Social Club International gathered in person for the very first time since the club's founding in 2020. Brothers who had known each other only through screens finally stood together. The convention featured the formal reading of the club constitution, an awards ceremony honouring founding contributions, and a celebration dinner that lasted deep into the night.",
    highlights: [
      "Formal ratification of the club constitution",
      "Awards ceremony for founding and notable contributors",
      "First in-person meeting of all six founding members",
      "Members attending from Italy, UK, Nigeria, and beyond",
      "Cultural celebration dinner",
    ],
    featured: true,
  },
  {
    id: "p-2",
    title: "CAC Registration & Legal Inauguration",
    type: "Milestone Event",
    date: "2022",
    location: "Nigeria (Corporate Affairs Commission)",
    description:
      "The Moving Train Social Club International was formally registered with the Corporate Affairs Commission of Nigeria, becoming a recognised legal entity. This milestone — championed by the club's dedicated members — transformed an informal brotherhood into a structured international organisation with legal standing.",
    highlights: [
      "Official CAC registration obtained",
      "Club constitution formally adopted",
      "Legal framework for welfare disbursements established",
    ],
    featured: false,
  },
  {
    id: "p-3",
    title: "Founding & First Meeting",
    type: "Founding Event",
    date: "2020",
    location: "Italy (Virtual)",
    description:
      "Six Nigerian friends living in Italy came together following the passing of a member's mother. The grief of that moment sparked a conversation that would change all of their lives: what if we built something that ensured no brother ever faced life's hardest moments alone? That conversation became the Moving Train Social Club International.",
    highlights: [
      "Six founding members committed to the brotherhood",
      "Core welfare mission established",
      "Name and motto agreed upon",
      "First dues structure proposed",
    ],
    featured: false,
  },
];

const meetingRhythm = [
  {
    title: "Monthly General Meeting",
    schedule: "Last Sunday of every month",
    description: "Full membership Zoom call. Club updates, welfare announcements, member check-ins.",
    icon: <Calendar size={20} />,
  },
  {
    title: "WhatsApp Community",
    schedule: "Always active",
    description: "Day-to-day communication, urgent welfare alerts, event reminders, and brotherhood banter.",
    icon: <Globe size={20} />,
  },
  {
    title: "Quarterly Review",
    schedule: "March · June · September · December",
    description: "Financial transparency session. Treasury report, dues status, and welfare fund overview.",
    icon: <Clock size={20} />,
  },
  {
    title: "Emergency Welfare Call",
    schedule: "As needed",
    description: "When a member faces a crisis — bereavement, medical emergency, hardship — a special session is called within 48 hours.",
    icon: <Users size={20} />,
  },
];

export default function EventsPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>

      {/* Hero */}
      <section style={{
        padding: "6rem 1.5rem 5rem",
        background: "radial-gradient(ellipse at 50% 0%, rgba(213,165,59,0.06) 0%, transparent 60%), var(--navy)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", left: 0, top: "15%", bottom: "15%", width: "3px",
          background: "linear-gradient(to bottom, transparent, var(--gold), transparent)", opacity: 0.35,
        }} />
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Gatherings of the Brotherhood</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>
            Events & Conventions
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.85, maxWidth: "56ch", margin: "0 auto" }}>
            The Moving Train does not only meet online. The brotherhood gathers — monthly on Zoom,
            and when the moment is right, in person across continents. Every event is a reminder
            that the bond is real.
          </p>
        </div>
      </section>

      {/* Meeting Rhythm */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>How We Stay Connected</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Our Meeting Rhythm
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "1rem",
          }}>
            {meetingRhythm.map((item) => (
              <div key={item.title} style={{
                background: "rgba(11,26,48,0.8)",
                border: "1px solid rgba(213,165,59,0.12)",
                borderRadius: "14px",
                padding: "1.75rem 1.5rem",
                display: "flex", flexDirection: "column", gap: "0.875rem",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "10px",
                  background: "rgba(213,165,59,0.08)",
                  border: "1px solid rgba(213,165,59,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--gold)",
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "0.95rem", color: "var(--ivory)", marginBottom: "0.3rem" }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                    {item.schedule}
                  </p>
                  <p style={{ color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section aria-labelledby="upcoming-title" style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>What&apos;s Next</p>
            <h2 id="upcoming-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Upcoming Events
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {upcomingEvents.map((event) => (
              <div key={event.id} style={{
                background: "linear-gradient(150deg, rgba(16,36,58,0.95) 0%, rgba(8,20,38,0.95) 100%)",
                border: "1px solid rgba(213,165,59,0.14)",
                borderRadius: "16px",
                padding: "2rem",
                position: "relative", overflow: "hidden",
              }}>
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.3), transparent)",
                }} />
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "1.5rem" }}>
                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.875rem", borderRadius: "999px",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        background: event.badgeColor, border: `1px solid ${event.badgeBorder}`, color: event.badgeText,
                      }}>{event.badge}</span>
                      <span style={{
                        padding: "0.25rem 0.875rem", borderRadius: "999px",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                        background: "rgba(174,184,198,0.06)", border: "1px solid rgba(174,184,198,0.12)", color: "var(--steel)",
                      }}>{event.type}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", marginBottom: "0.75rem" }}>
                      {event.title}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.82rem", color: "var(--steel)" }}>
                        <Calendar size={13} style={{ color: "var(--gold)", flexShrink: 0 }} /> {event.frequency}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.82rem", color: "var(--steel)" }}>
                        <Clock size={13} style={{ color: "var(--gold)", flexShrink: 0 }} /> {event.time}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.82rem", color: "var(--steel)" }}>
                        <MapPin size={13} style={{ color: "var(--gold)", flexShrink: 0 }} /> {event.platform}
                      </span>
                    </div>
                    <p style={{ color: "var(--steel)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0, maxWidth: "100%" }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "2.5rem", padding: "1.75rem 2rem",
            background: "rgba(213,165,59,0.04)",
            border: "1px solid rgba(213,165,59,0.12)",
            borderRadius: "14px",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem",
          }}>
            <div>
              <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1rem", color: "var(--ivory)", marginBottom: "0.3rem" }}>
                Members receive all event details via WhatsApp
              </p>
              <p style={{ color: "var(--steel)", fontSize: "0.875rem", margin: 0, maxWidth: "100%" }}>
                Zoom links, agenda, and reminders are shared in the members&apos; group before every meeting.
              </p>
            </div>
            <Link href="/membership" className="btn-gold" style={{ whiteSpace: "nowrap" }}>
              Join the Brotherhood <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section aria-labelledby="past-title" style={{ padding: "5rem 1.5rem", background: "var(--navy-mid)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Where We&apos;ve Been</p>
            <h2 id="past-title" style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)" }}>
              Historic Milestones
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {pastEvents.map((event) => (
              <div key={event.id} style={{
                background: "rgba(11,26,48,0.9)",
                border: `1px solid ${event.featured ? "rgba(213,165,59,0.3)" : "rgba(213,165,59,0.1)"}`,
                borderRadius: "18px",
                padding: "2.25rem",
                boxShadow: event.featured ? "0 0 40px rgba(213,165,59,0.05)" : "none",
                position: "relative", overflow: "hidden",
              }}>
                {event.featured && (
                  <div aria-hidden="true" style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.5), transparent)",
                  }} />
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {event.featured && (
                    <span style={{
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.25rem 0.875rem", borderRadius: "999px",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.35)", color: "var(--gold)",
                    }}>
                      <Star size={10} /> Historic Milestone
                    </span>
                  )}
                  <span style={{
                    padding: "0.25rem 0.875rem", borderRadius: "999px",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    background: "rgba(174,184,198,0.06)", border: "1px solid rgba(174,184,198,0.12)", color: "var(--steel)",
                  }}>{event.type}</span>
                </div>

                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.375rem", color: "var(--ivory)", marginBottom: "0.75rem" }}>
                  {event.title}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.82rem", color: "var(--steel)" }}>
                    <Calendar size={13} style={{ color: "var(--gold)" }} /> {event.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.82rem", color: "var(--steel)" }}>
                    <MapPin size={13} style={{ color: "var(--gold)" }} /> {event.location}
                  </span>
                </div>

                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "100%" }}>
                  {event.description}
                </p>

                <div style={{
                  background: "rgba(213,165,59,0.04)",
                  border: "1px solid rgba(213,165,59,0.1)",
                  borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                }}>
                  <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                    Key Highlights
                  </p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {event.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                        <span style={{ color: "var(--gold)", marginTop: "0.2rem", flexShrink: 0 }}>—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--navy)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Be Part of It</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
            Every Meeting Matters
          </h2>
          <p style={{ color: "var(--steel)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "50ch", margin: "0 auto 2.5rem" }}>
            Membership means showing up — on Zoom, on WhatsApp, and when it counts, in person.
            The Moving Train stays moving because every member keeps it on the tracks.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/membership" className="btn-gold">
              Apply to Join <ArrowRight size={15} />
            </Link>
            <Link href="/about" className="btn-ghost-gold">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
