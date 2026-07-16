"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, LogIn, ChevronDown, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "About",      href: "/about" },
  { label: "History",    href: "/history" },
  { label: "Leadership", href: "/leadership" },
  { label: "Members",    href: "/members" },
  { label: "Journal",    href: "/blog" },
  {
    label: "Explore",
    href: "#",
    children: [
      { label: "Why Join",     href: "/why-join" },
      { label: "Achievements", href: "/achievements" },
      { label: "Gallery",      href: "/gallery" },
      { label: "Events",       href: "/events" },
      { label: "Contact",      href: "/contact" },
    ],
  },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 22, height: 16, position: "relative", cursor: "pointer" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: 0,
            width: i === 1 ? (open ? "100%" : "75%") : "100%",
            height: "1.5px",
            background: "var(--gold)",
            borderRadius: "2px",
            top: i === 0 ? 0 : i === 1 ? "50%" : "100%",
            transform: i === 1 ? "translateY(-50%)" : undefined,
            transition: "all 0.3s ease",
            opacity: open && i === 1 ? 0 : 1,
          }}
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          background: scrolled ? "rgba(3,7,17,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(213,165,59,0.12)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: "1280px", margin: "0 auto",
            padding: "0 clamp(1rem,4vw,2rem)",
            height: "clamp(60px,8vw,72px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              border: "1px solid rgba(213,165,59,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(213,165,59,0.07)",
              overflow: "hidden",
              boxShadow: "0 0 16px rgba(213,165,59,0.12)",
              transition: "box-shadow 0.25s ease",
            }}>
              <img src="/images/logo.gif" alt={siteConfig.logo.alt} width={36} height={36} style={{ objectFit: "contain" }} />
            </div>
            <span className="nav-brand-text" style={{
              fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
              fontSize: "0.82rem", color: "var(--gold)", lineHeight: 1.25, maxWidth: "130px", display: "none",
            }}>
              Moving Train
            </span>
          </Link>

          {/* Desktop nav */}
          <ul role="list" className="desktop-nav" style={{
            display: "flex", alignItems: "center", gap: "0.125rem",
            listStyle: "none", margin: 0, padding: 0,
          }}>
            {navLinks.map((link) => (
              <li key={link.label} style={{ position: "relative" }}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      onBlur={() => setTimeout(() => setOpenDropdown(null), 180)}
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      style={{
                        display: "flex", alignItems: "center", gap: "0.3rem",
                        padding: "0.5rem 0.875rem",
                        background: "transparent", border: "none",
                        color: openDropdown === link.label ? "var(--gold)" : "var(--steel)",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.875rem", fontWeight: 500,
                        cursor: "pointer", borderRadius: "6px",
                        transition: "color 0.2s", minHeight: 0, minWidth: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={(e) => { if (openDropdown !== link.label) e.currentTarget.style.color = "var(--steel)"; }}
                    >
                      {link.label}
                      <ChevronDown size={13} style={{
                        transition: "transform 0.25s",
                        transform: openDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}/>
                    </button>
                    {openDropdown === link.label && (
                      <ul role="menu" style={{
                        position: "absolute", top: "calc(100% + 10px)", left: 0,
                        minWidth: "188px",
                        background: "rgba(5,10,24,0.98)",
                        border: "1px solid rgba(213,165,59,0.18)",
                        borderRadius: "10px", padding: "0.5rem",
                        listStyle: "none", margin: 0,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(213,165,59,0.05) inset",
                        backdropFilter: "blur(20px)",
                      }}>
                        {link.children.map((child) => (
                          <li key={child.label} role="none">
                            <Link href={child.href} role="menuitem" style={{
                              display: "flex", alignItems: "center", gap: "0.5rem",
                              padding: "0.55rem 0.875rem",
                              color: "var(--steel)",
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontSize: "0.875rem", fontWeight: 500,
                              borderRadius: "6px", transition: "color 0.2s, background 0.2s",
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
                              <ChevronRight size={12} style={{ opacity: 0.4 }}/>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={link.href} style={{
                    display: "block", padding: "0.5rem 0.875rem",
                    color: "var(--steel)",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.875rem", fontWeight: 500, borderRadius: "6px",
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

          {/* Right CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
            <Link href="/membership" className="apply-btn btn-gold"
              style={{ padding: "0.45rem 1.125rem", fontSize: "0.78rem", display: "none" }}>
              Apply to Join
            </Link>
            <Link href="/login" style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.45rem 1rem",
              color: "var(--gold)",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.8rem", fontWeight: 600,
              border: "1px solid rgba(213,165,59,0.28)",
              borderRadius: "7px", transition: "all 0.2s",
              minHeight: 0, minWidth: 0,
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.09)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(213,165,59,0.28)";
              }}
            >
              <LogIn size={13}/>
              <span className="desktop-nav" style={{ display: "none" }}>Login</span>
            </Link>

            {/* Hamburger */}
            <button
              className="mobile-hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(213,165,59,0.22)",
                borderRadius: "8px", padding: "0.5rem",
                cursor: "pointer", minHeight: 0, minWidth: 0,
              }}
            >
              <HamburgerIcon open={drawerOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Luxury slide-in drawer */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`mobile-drawer${drawerOpen ? " open" : ""}`}
      >
        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(213,165,59,0.1)",
          background: "rgba(3,7,17,0.5)",
        }}>
          <Link href="/" onClick={closeDrawer} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid rgba(213,165,59,0.35)",
              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(213,165,59,0.07)",
            }}>
              <img src="/images/logo.gif" alt="GMTSCI Logo" width={30} height={30} style={{ objectFit: "contain" }} />
            </div>
            <span style={{
              fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
              fontSize: "0.78rem", color: "var(--gold)", lineHeight: 1.2,
            }}>
              Moving Train
            </span>
          </Link>
          <button
            onClick={closeDrawer}
            aria-label="Close menu"
            style={{
              background: "rgba(213,165,59,0.06)", border: "1px solid rgba(213,165,59,0.18)",
              borderRadius: "8px", padding: "0.45rem",
              color: "var(--steel)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 0, minWidth: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--steel)"; }}
          >
            <X size={18}/>
          </button>
        </div>

        {/* Decorative gold line */}
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.5), rgba(242,210,140,0.8), rgba(213,165,59,0.5), transparent)",
        }}/>

        {/* Nav items */}
        <nav aria-label="Mobile navigation" style={{ padding: "1.5rem" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <div>
                    <button
                      onClick={() => setMobileExpand(mobileExpand === link.label ? null : link.label)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "0.875rem 1rem",
                        background: mobileExpand === link.label ? "rgba(213,165,59,0.07)" : "transparent",
                        border: "1px solid",
                        borderColor: mobileExpand === link.label ? "rgba(213,165,59,0.18)" : "transparent",
                        borderRadius: "10px",
                        color: mobileExpand === link.label ? "var(--gold)" : "var(--ivory)",
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "0.95rem", fontWeight: 600,
                        cursor: "pointer", transition: "all 0.2s",
                        minHeight: 0, minWidth: 0,
                      }}
                    >
                      {link.label}
                      <ChevronDown size={15} style={{
                        transition: "transform 0.25s",
                        transform: mobileExpand === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        color: "var(--gold)", opacity: 0.7,
                      }}/>
                    </button>
                    {mobileExpand === link.label && (
                      <ul style={{
                        listStyle: "none", margin: "0.375rem 0 0.5rem 0", padding: 0,
                        display: "flex", flexDirection: "column", gap: "0.125rem",
                        paddingLeft: "1rem",
                        borderLeft: "1px solid rgba(213,165,59,0.18)",
                        marginLeft: "1.25rem",
                      }}>
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} onClick={closeDrawer} style={{
                              display: "flex", alignItems: "center", gap: "0.5rem",
                              padding: "0.625rem 0.75rem",
                              color: "var(--steel)",
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontSize: "0.9rem", fontWeight: 500,
                              borderRadius: "7px", transition: "color 0.2s",
                            }}>
                              <ChevronRight size={11} style={{ opacity: 0.4, flexShrink: 0 }}/>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={link.href} onClick={closeDrawer} style={{
                    display: "flex", alignItems: "center",
                    padding: "0.875rem 1rem",
                    color: "var(--ivory)",
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: "0.95rem", fontWeight: 600,
                    borderRadius: "10px",
                    border: "1px solid transparent",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(213,165,59,0.06)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{
            margin: "1.5rem 0",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(213,165,59,0.2), transparent)",
          }}/>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/membership" onClick={closeDrawer} className="btn-gold"
              style={{ width: "100%", textAlign: "center", justifyContent: "center" }}>
              Apply to Join
            </Link>
            <Link href="/login" onClick={closeDrawer} className="btn-ghost-gold"
              style={{ width: "100%", textAlign: "center", justifyContent: "center" }}>
              <LogIn size={15}/>
              Member Login
            </Link>
          </div>

          {/* Bottom info */}
          <div style={{
            marginTop: "2rem", padding: "1rem",
            background: "rgba(16,36,58,0.5)",
            border: "1px solid rgba(213,165,59,0.1)",
            borderRadius: "10px",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "0.7rem", color: "rgba(213,165,59,0.6)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Est. {siteConfig.founded}
            </p>
            <p style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "0.65rem", color: "rgba(170,182,197,0.45)",
              letterSpacing: "0.05em", marginTop: "0.25rem",
            }}>
              {siteConfig.philosophy}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
