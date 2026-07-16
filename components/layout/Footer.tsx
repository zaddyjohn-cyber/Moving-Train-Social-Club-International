"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";

const FacebookIcon = ({ size=16 }:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ size=16 }:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterX = ({ size=16 }:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YoutubeIcon = ({ size=16 }:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const footerLinks = {
  organisation: [
    { label:"About",        href:"/about" },
    { label:"Our History",  href:"/history" },
    { label:"Leadership",   href:"/leadership" },
    { label:"Journal",      href:"/blog" },
    { label:"Achievements", href:"/achievements" },
    { label:"Events",       href:"/events" },
  ],
  membership: [
    { label:"Why Join",        href:"/why-join" },
    { label:"Apply to Join",   href:"/membership" },
    { label:"Member Directory",href:"/members" },
    { label:"Member Login",    href:"/login" },
    { label:"Gallery",         href:"/gallery" },
  ],
  legal: [
    { label:"Privacy Policy",       href:"/privacy" },
    { label:"Terms of Use",         href:"/terms" },
    { label:"Photo & Media Consent",href:"/media-consent" },
    { label:"Contact",              href:"/contact" },
  ],
};

const socials = [
  { icon:FacebookIcon,  href:siteConfig.social.facebook,  label:"Facebook" },
  { icon:InstagramIcon, href:siteConfig.social.instagram, label:"Instagram" },
  { icon:TwitterX,      href:siteConfig.social.twitter,   label:"X / Twitter" },
  { icon:YoutubeIcon,   href:siteConfig.social.youtube,   label:"YouTube" },
];

const linkStyle: React.CSSProperties = {
  color:"var(--steel)", fontSize:"0.875rem",
  transition:"color 0.2s", display:"block",
  padding:"0.2rem 0",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" style={{
      background:"linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-dark) 100%)",
      borderTop:"1px solid rgba(213,165,59,0.12)",
      position:"relative", overflow:"hidden",
    }}>
      {/* Decorative top band */}
      <div style={{
        height:"2px",
        background:"linear-gradient(90deg, transparent 0%, rgba(213,165,59,0.4) 25%, rgba(242,210,140,0.8) 50%, rgba(213,165,59,0.4) 75%, transparent 100%)",
      }}/>

      {/* Motto band */}
      <div style={{
        background:"linear-gradient(135deg, rgba(213,165,59,0.05), rgba(0,200,255,0.02))",
        borderBottom:"1px solid rgba(213,165,59,0.1)",
        padding:"clamp(1rem,3vw,1.75rem) clamp(1rem,4vw,2rem)",
        textAlign:"center",
      }}>
        {/* Ornament */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", marginBottom:"0.625rem" }}>
          <div style={{ width:"clamp(30px,5vw,60px)", height:"1px", background:"linear-gradient(90deg,transparent,rgba(213,165,59,0.45))" }}/>
          <div style={{ width:6, height:6, background:"var(--gold)", transform:"rotate(45deg)" }}/>
          <div style={{ width:"clamp(30px,5vw,60px)", height:"1px", background:"linear-gradient(90deg,rgba(213,165,59,0.45),transparent)" }}/>
        </div>
        <p style={{
          fontFamily:"'Cinzel',Georgia,serif",
          fontSize:"clamp(0.8rem,2vw,1.05rem)",
          color:"var(--gold)", margin:0, letterSpacing:"0.06em",
          maxWidth:"100%",
        }}>
          "{siteConfig.motto}"
        </p>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"clamp(2.5rem,6vw,4.5rem) clamp(1rem,4vw,2rem)" }}>
        <div className="footer-grid" style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))",
          gap:"clamp(2rem,4vw,3.5rem)",
          marginBottom:"clamp(2rem,5vw,3.5rem)",
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.125rem" }}>
              <div style={{
                width:50, height:50, borderRadius:"50%",
                border:"1px solid rgba(213,165,59,0.35)",
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(213,165,59,0.06)", overflow:"hidden",
                boxShadow:"0 0 20px rgba(213,165,59,0.1)", flexShrink:0,
              }}>
                <img src="/images/logo.gif" alt={siteConfig.logo.alt} width={42} height={42} style={{objectFit:"contain"}}/>
              </div>
              <div>
                <span style={{ fontFamily:"'Cinzel',Georgia,serif", fontWeight:700, fontSize:"0.85rem", color:"var(--gold)", display:"block", lineHeight:1.25 }}>
                  {siteConfig.shortName}
                </span>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:"0.65rem", color:"var(--steel)", letterSpacing:"0.08em" }}>
                  Est. {siteConfig.founded}
                </span>
              </div>
            </Link>
            <p style={{ color:"var(--steel)", fontSize:"0.855rem", lineHeight:1.7, marginBottom:"1.25rem", maxWidth:"260px" }}>
              {siteConfig.description}
            </p>
            {/* Socials */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
              {socials.map(({ icon:Icon, href, label }) => href ? (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{
                    width:38, height:38, borderRadius:"9px",
                    border:"1px solid rgba(213,165,59,0.18)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"var(--steel)", transition:"all 0.22s",
                  }}
                  onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.color="var(--gold)"; el.style.borderColor="rgba(213,165,59,0.5)"; el.style.background="rgba(213,165,59,0.08)"; el.style.transform="translateY(-2px)"; }}
                  onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.color="var(--steel)"; el.style.borderColor="rgba(213,165,59,0.18)"; el.style.background="transparent"; el.style.transform="none"; }}
                ><Icon size={15}/></a>
              ) : null)}
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email"
                  style={{
                    width:38, height:38, borderRadius:"9px",
                    border:"1px solid rgba(213,165,59,0.18)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"var(--steel)", transition:"all 0.22s",
                  }}
                  onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.color="var(--gold)"; el.style.borderColor="rgba(213,165,59,0.5)"; el.style.background="rgba(213,165,59,0.08)"; el.style.transform="translateY(-2px)"; }}
                  onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.color="var(--steel)"; el.style.borderColor="rgba(213,165,59,0.18)"; el.style.background="transparent"; el.style.transform="none"; }}
                ><Mail size={15}/></a>
              )}
            </div>
          </div>

          {/* Organisation */}
          <div>
            <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.125rem" }}>
              Organisation
            </h3>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {footerLinks.organisation.map((l) => (
                <li key={l.label}><Link href={l.href} style={linkStyle}
                  onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.color="var(--ivory)")}
                  onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.color="var(--steel)")}
                >{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.125rem" }}>
              Membership
            </h3>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {footerLinks.membership.map((l) => (
                <li key={l.label}><Link href={l.href} style={linkStyle}
                  onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.color="var(--ivory)")}
                  onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.color="var(--steel)")}
                >{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.125rem" }}>
              Information
            </h3>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {footerLinks.legal.map((l) => (
                <li key={l.label}><Link href={l.href} style={linkStyle}
                  onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.color="var(--ivory)")}
                  onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.color="var(--steel)")}
                >{l.label}</Link></li>
              ))}
            </ul>
            {siteConfig.contact.email && (
              <div style={{ marginTop:"1.25rem" }}>
                <p style={{ fontSize:"0.7rem", color:"rgba(170,182,197,0.5)", marginBottom:"0.3rem", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Space Grotesk',system-ui,sans-serif" }}>
                  Contact
                </p>
                <a href={`mailto:${siteConfig.contact.email}`}
                  style={{ color:"var(--gold)", fontSize:"0.855rem", display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <Mail size={13}/>{siteConfig.contact.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:"1px solid rgba(213,165,59,0.08)",
          paddingTop:"1.75rem",
          display:"flex", flexWrap:"wrap", gap:"0.875rem",
          alignItems:"center", justifyContent:"space-between",
        }}>
          <p style={{ color:"rgba(170,182,197,0.5)", fontSize:"0.78rem", margin:0 }}>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p style={{
            color:"rgba(170,182,197,0.35)", fontSize:"0.7rem", margin:0,
            fontFamily:"'Cinzel',Georgia,serif", letterSpacing:"0.06em",
          }}>
            {siteConfig.philosophy}
          </p>
        </div>
      </div>

      {/* Corner glow */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:0, right:0,
        width:"300px", height:"300px",
        background:"radial-gradient(circle at 100% 100%, rgba(213,165,59,0.05), transparent 70%)",
        pointerEvents:"none",
      }}/>
    </footer>
  );
}
