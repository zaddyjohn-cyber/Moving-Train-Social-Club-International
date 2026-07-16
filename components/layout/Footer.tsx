"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";

// Inline SVG social icons (lucide-react doesn't include brand icons)
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterX = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const footerLinks = {
  organisation: [
    { label: "About", href: "/about" },
    { label: "Our History", href: "/history" },
    { label: "Leadership", href: "/leadership" },
    { label: "Achievements", href: "/achievements" },
    { label: "Events", href: "/events" },
  ],
  membership: [
    { label: "Why Join", href: "/why-join" },
    { label: "Apply to Join", href: "/membership" },
    { label: "Member Directory", href: "/members" },
    { label: "Member Login", href: "/login" },
    { label: "Gallery", href: "/gallery" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Photo & Media Consent", href: "/media-consent" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: TwitterX, href: siteConfig.social.twitter, label: "X / Twitter" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--navy-mid)",
        borderTop: "1px solid rgba(213,165,59,0.12)",
        paddingTop: "5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Motto band */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(213,165,59,0.06) 0%, rgba(0,200,255,0.03) 100%)",
          borderTop: "1px solid rgba(213,165,59,0.12)",
          borderBottom: "1px solid rgba(213,165,59,0.12)",
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "var(--gold)",
            margin: 0,
            letterSpacing: "0.08em",
            maxWidth: "100%",
          }}
        >
          "{siteConfig.motto}"
        </p>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1px solid rgba(213,165,59,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(213,165,59,0.06)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/logo.gif"
                  alt={siteConfig.logo.alt}
                  width={44}
                  height={44}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--gold)",
                  lineHeight: 1.3,
                }}
              >
                {siteConfig.shortName}
              </span>
            </Link>
            <p
              style={{
                color: "var(--steel)",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
                maxWidth: "280px",
              }}
            >
              {siteConfig.description}
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {socials.map(({ icon: Icon, href, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      border: "1px solid rgba(213,165,59,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--steel)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.5)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--steel)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.2)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ) : null
              )}
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label="Email"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    border: "1px solid rgba(213,165,59,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--steel)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--steel)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Organisation links */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Organisation
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {footerLinks.organisation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--steel)", fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership links */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Membership
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {footerLinks.membership.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--steel)", fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Information
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--steel)", fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {siteConfig.contact.email && (
              <div style={{ marginTop: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--steel)", marginBottom: "0.25rem" }}>Contact</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  style={{ color: "var(--gold)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Mail size={14} />
                  {siteConfig.contact.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(213,165,59,0.1)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              color: "var(--steel)",
              fontSize: "0.8rem",
              margin: 0,
              maxWidth: "100%",
            }}
          >
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p
            style={{
              color: "rgba(170,182,197,0.55)",
              fontSize: "0.75rem",
              margin: 0,
              fontFamily: "'Cinzel', Georgia, serif",
              letterSpacing: "0.05em",
            }}
          >
            {siteConfig.philosophy}
          </p>
        </div>
      </div>
    </footer>
  );
}
