"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "History", href: "/history" },
  { label: "Leadership", href: "/leadership" },
  { label: "Members", href: "/members" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Why Join", href: "/why-join" },
      { label: "Achievements", href: "/achievements" },
      { label: "Gallery", href: "/gallery" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(3,7,17,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(213,165,59,0.12)" : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} — Home`}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(213,165,59,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(213,165,59,0.06)",
              overflow: "hidden",
            }}
          >
            <img
              src="/images/logo.gif"
              alt={siteConfig.logo.alt}
              width={38}
              height={38}
              style={{ objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "var(--gold)",
              lineHeight: 1.2,
              maxWidth: "120px",
              display: "none",
            }}
            className="nav-brand-text"
          >
            Moving Train
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          role="list"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <li key={link.label} style={{ position: "relative" }}>
              {link.children ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.5rem 0.875rem",
                      background: "transparent",
                      border: "none",
                      color: "var(--steel)",
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      borderRadius: "6px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s",
                        transform: openDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <ul
                      role="menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        minWidth: "180px",
                        background: "rgba(7,18,37,0.97)",
                        border: "1px solid rgba(213,165,59,0.2)",
                        borderRadius: "8px",
                        padding: "0.5rem",
                        listStyle: "none",
                        margin: 0,
                        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      {link.children.map((child) => (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            style={{
                              display: "block",
                              padding: "0.5rem 0.875rem",
                              color: "var(--steel)",
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              borderRadius: "5px",
                              transition: "color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                              (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.08)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "var(--steel)";
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "0.5rem 0.875rem",
                    color: "var(--steel)",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    borderRadius: "6px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--steel)")}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <Link
            href="/membership"
            style={{ display: "none" }}
            className="apply-btn"
          >
            <span className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
              Apply to Join
            </span>
          </Link>
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              color: "var(--gold)",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: "1px solid rgba(213,165,59,0.3)",
              borderRadius: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.3)";
            }}
          >
            <LogIn size={14} />
            Login
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="mobile-hamburger"
            style={{
              background: "transparent",
              border: "1px solid rgba(213,165,59,0.25)",
              borderRadius: "6px",
              padding: "0.4rem",
              color: "var(--gold)",
              cursor: "pointer",
              display: "none",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            background: "rgba(5,10,24,0.98)",
            borderTop: "1px solid rgba(213,165,59,0.15)",
            padding: "1.5rem",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <>
                    <span
                      style={{
                        display: "block",
                        padding: "0.75rem 0",
                        color: "var(--gold)",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(213,165,59,0.08)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.625rem 1rem",
                          color: "var(--steel)",
                          fontFamily: "'Manrope', system-ui, sans-serif",
                          fontSize: "0.95rem",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.75rem 0",
                      color: "var(--ivory)",
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(213,165,59,0.08)",
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/membership" onClick={() => setMobileOpen(false)} className="btn-gold" style={{ justifyContent: "center" }}>
              Apply to Join
            </Link>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-ghost-gold" style={{ justifyContent: "center" }}>
              Member Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .apply-btn { display: flex !important; }
          .mobile-hamburger { display: none !important; }
          .nav-brand-text { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
