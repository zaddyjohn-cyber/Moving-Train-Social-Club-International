"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const countries = siteConfig.presenceCountries.map((c) => ({
      name: c.name,
      x: (c.lng + 180) / 360,
      y: (90 - c.lat) / 180,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const r  = Math.min(W, H) * 0.38;

      // Globe base
      const g1 = ctx.createRadialGradient(cx - r*0.15, cy - r*0.2, r*0.1, cx, cy, r);
      g1.addColorStop(0, "rgba(15,35,70,0.9)");
      g1.addColorStop(0.6,"rgba(7,18,37,0.85)");
      g1.addColorStop(1, "rgba(3,7,17,0.95)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.fillStyle = g1; ctx.fill();

      // Glow
      const g2 = ctx.createRadialGradient(cx, cy, r*0.9, cx, cy, r*1.3);
      g2.addColorStop(0, "rgba(213,165,59,0.08)");
      g2.addColorStop(0.5,"rgba(213,165,59,0.03)");
      g2.addColorStop(1, "rgba(0,200,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r*1.3, 0, Math.PI*2);
      ctx.fillStyle = g2; ctx.fill();

      // Latitude rings
      for (let lat = -60; lat <= 60; lat += 30) {
        const lr = (lat*Math.PI)/180;
        const ry = Math.sin(lr)*r, rx = Math.cos(lr)*r;
        if (rx <= 0) continue;
        ctx.beginPath(); ctx.ellipse(cx, cy+ry, rx, rx*0.15, 0, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(213,165,59,0.07)"; ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Meridians
      for (let i = 0; i < 6; i++) {
        const angle = (i/6)*Math.PI + t*0.003;
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle);
        ctx.beginPath(); ctx.ellipse(0,0,r*0.12,r,0,0,Math.PI*2);
        ctx.strokeStyle = "rgba(213,165,59,0.05)"; ctx.lineWidth = 0.5; ctx.stroke();
        ctx.restore();
      }

      // Outer ring
      ctx.beginPath(); ctx.arc(cx,cy,r+2,0,Math.PI*2);
      ctx.strokeStyle = "rgba(213,165,59,0.22)"; ctx.lineWidth = 1; ctx.stroke();

      // Orbit ring
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(t*0.008);
      ctx.beginPath(); ctx.ellipse(0,0,r*1.18,r*0.35,0,0,Math.PI*2);
      ctx.strokeStyle = "rgba(213,165,59,0.14)"; ctx.lineWidth = 1;
      ctx.setLineDash([4,8]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();

      // Project countries
      const proj = countries.map((c) => {
        const angle = (t*0.005 + c.x*Math.PI*2) % (Math.PI*2);
        const lat   = (0.5 - c.y)*Math.PI;
        return {
          ...c,
          projX: cx + Math.sin(angle)*Math.cos(lat)*r,
          projY: cy - Math.sin(lat)*r,
          depth: Math.cos(angle)*Math.cos(lat),
        };
      });

      // Arcs
      const vis = proj.filter(c => c.depth > 0);
      vis.forEach((a,i) => vis.forEach((b,j) => {
        if (j<=i) return;
        const mx=(a.projX+b.projX)/2, my=(a.projY+b.projY)/2-40;
        const p=((t*0.015+i*0.5+j*0.3)%3)/3;
        ctx.beginPath(); ctx.moveTo(a.projX,a.projY); ctx.quadraticCurveTo(mx,my,b.projX,b.projY);
        ctx.strokeStyle="rgba(213,165,59,0.07)"; ctx.lineWidth=0.8; ctx.stroke();
        const d=Math.hypot(b.projX-a.projX,b.projY-a.projY);
        if(d>20){
          const tx=a.projX+(b.projX-a.projX)*p;
          const ty=a.projY+(b.projY-a.projY)*p-Math.sin(p*Math.PI)*40;
          ctx.beginPath(); ctx.arc(tx,ty,2,0,Math.PI*2);
          ctx.fillStyle="rgba(0,200,255,0.75)"; ctx.fill();
        }
      }));

      // Dots
      proj.forEach(c => {
        if(c.depth<-0.2) return;
        const alpha=Math.max(0,c.depth)*0.8+0.2;
        const pulse=1+Math.sin(t*0.05+c.x*5)*0.25;
        ctx.beginPath(); ctx.arc(c.projX,c.projY,4*pulse,0,Math.PI*2);
        ctx.fillStyle=`rgba(213,165,59,${alpha*0.9})`; ctx.fill();
        ctx.beginPath(); ctx.arc(c.projX,c.projY,9*pulse,0,Math.PI*2);
        ctx.fillStyle=`rgba(213,165,59,${alpha*0.1})`; ctx.fill();
      });

      // Orbiting train
      const ta=t*0.012;
      const tx=cx+Math.cos(ta)*r*1.18, ty=cy+Math.sin(ta)*r*0.35;
      ctx.beginPath(); ctx.arc(tx,ty,5.5,0,Math.PI*2);
      ctx.fillStyle="rgba(0,200,255,0.92)"; ctx.fill();
      for(let t2=1;t2<=6;t2++){
        const pa=ta-t2*0.08;
        const px=cx+Math.cos(pa)*r*1.18, py=cy+Math.sin(pa)*r*0.35;
        ctx.beginPath(); ctx.arc(px,py,3.5-t2*0.4,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,200,255,${0.5-t2*0.07})`; ctx.fill();
      }

      t++; animRef.current=requestAnimationFrame(draw);
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) { animRef.current = requestAnimationFrame(draw); }
    else { draw(); cancelAnimationFrame(animRef.current); }

    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.8 }}/>
  );
}

export default function CinematicHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t); }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 60% 40%, #0A1A3A 0%, #050A18 60%, #030711 100%)",
      }}
    >
      {/* Geo texture */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M50 50v-6h-3v6h-6v3h6v6h3v-6h6v-3h-6zm0-44V0h-3v6h-6v3h6v6h3V9h6V6h-6zM6 50v-6H3v6H-3v3h6v6h3v-6h6v-3H6zM6 6V0H3v6H-3v3h6v6h3V9h6V6H6z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}/>

      {/* Diagonal gold lines SVG */}
      <svg aria-hidden="true" style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        pointerEvents:"none", zIndex:1,
      }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gl1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D5A53B" stopOpacity="0"/>
            <stop offset="25%" stopColor="#F2D28C" stopOpacity="0.75"/>
            <stop offset="55%" stopColor="#D5A53B" stopOpacity="0.88"/>
            <stop offset="80%" stopColor="#F2D28C" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#D5A53B" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="gl2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D5A53B" stopOpacity="0"/>
            <stop offset="25%" stopColor="#F2D28C" stopOpacity="0.7"/>
            <stop offset="60%" stopColor="#D5A53B" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#D5A53B" stopOpacity="0"/>
          </linearGradient>
          <filter id="gg"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Top-left bands */}
        <g filter="url(#gg)">
          <polygon points="-60,118 560,118 620,148 -60,148" fill="url(#gl1)" opacity="0.9"/>
          <polygon points="-60,126 560,126 620,138 -60,138" fill="#F2D28C" opacity="0.22"/>
        </g>
        <polygon points="-60,158 480,158 540,175 -60,175" fill="url(#gl1)" opacity="0.5"/>
        {/* Bottom-right bands */}
        <g filter="url(#gg)">
          <polygon points="880,752 1500,752 1500,782 880,782" fill="url(#gl2)" opacity="0.9"/>
          <polygon points="880,760 1500,760 1500,772 880,772" fill="#F2D28C" opacity="0.22"/>
        </g>
        <polygon points="960,792 1500,792 1500,808 960,808" fill="url(#gl2)" opacity="0.5"/>
        {/* Dot trails */}
        {Array.from({length:16},(_,i)=>(
          <circle key={`a${i}`} cx={100+i*28} cy={208+(i%3)*8} r={i%4===0?2.5:1.5} fill="#D5A53B" opacity={0.12+(i%3)*0.08}/>
        ))}
        {Array.from({length:13},(_,i)=>(
          <circle key={`b${i}`} cx={140+i*28} cy={228+(i%2)*6} r={1.5} fill="#F2D28C" opacity={0.1+(i%2)*0.06}/>
        ))}
        {Array.from({length:16},(_,i)=>(
          <circle key={`c${i}`} cx={960+i*28} cy={700+(i%3)*7} r={i%4===0?2.5:1.5} fill="#D5A53B" opacity={0.12+(i%3)*0.08}/>
        ))}
        {Array.from({length:13},(_,i)=>(
          <circle key={`d${i}`} cx={1000+i*28} cy={718+(i%2)*6} r={1.5} fill="#F2D28C" opacity={0.1+(i%2)*0.06}/>
        ))}
        {/* Sparkles */}
        {[{x:58,y:66,s:14,w:1.5},{x:1382,y:832,s:12,w:1.5},{x:1412,y:430,s:9,w:1.2},{x:700,y:52,s:8,w:1}].map(({x,y,s,w},i)=>(
          <g key={i} filter="url(#gg)" transform={`translate(${x},${y})`} className="animate-sparkle">
            <line x1={0} y1={-s} x2={0} y2={s} stroke="#F2D28C" strokeWidth={w} opacity="0.9"/>
            <line x1={-s} y1={0} x2={s} y2={0} stroke="#F2D28C" strokeWidth={w} opacity="0.9"/>
            <line x1={-s*.55} y1={-s*.55} x2={s*.55} y2={s*.55} stroke="#F2D28C" strokeWidth={w*.55} opacity="0.5"/>
            <line x1={s*.55} y1={-s*.55} x2={-s*.55} y2={s*.55} stroke="#F2D28C" strokeWidth={w*.55} opacity="0.5"/>
            <circle cx={0} cy={0} r={w+0.5} fill="#F2D28C" opacity="1"/>
          </g>
        ))}
      </svg>

      {/* Logo GIF — right side on desktop, top on mobile */}
      <div className="hero-logo-right" style={{
        position:"absolute", right:"2%", top:"50%", transform:"translateY(-50%)",
        width:"clamp(280px,42vw,580px)", height:"clamp(280px,42vw,580px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        filter:"drop-shadow(0 0 60px rgba(213,165,59,0.3)) drop-shadow(0 0 120px rgba(213,165,59,0.12))",
        zIndex:1,
      }}>
        <img src="/images/logo.gif" alt={siteConfig.logo.alt}
          style={{ width:"100%", height:"100%", objectFit:"contain" }}
          className="animate-glow"
        />
      </div>

      {/* Vignette */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        background:"linear-gradient(90deg, rgba(5,10,24,0.97) 0%, rgba(5,10,24,0.72) 45%, rgba(5,10,24,0.15) 100%)",
      }}/>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:0, left:0, right:0, height:"240px", zIndex:2, pointerEvents:"none",
        background:"linear-gradient(to bottom, transparent, rgba(3,7,17,0.95))",
      }}/>

      {/* Content */}
      <div style={{
        position:"relative", zIndex:3,
        width:"100%", maxWidth:"1280px", margin:"0 auto",
        padding:"0 clamp(1rem,4vw,2rem)",
        paddingTop:"clamp(5rem,10vw,7rem)",
        paddingBottom:"clamp(4rem,8vw,6rem)",
        display:"flex", flexDirection:"column",
      }}>
        {/* Mobile: logo goes here (hidden on desktop via CSS override) */}
        <div aria-hidden="true" className="mobile-hero-logo" style={{ display:"none" }}/>

        <div style={{ maxWidth:"640px" }}>
          {/* Logo badge */}
          <div style={{
            display:"flex", alignItems:"center", gap:"0.875rem",
            marginBottom:"2rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transition:"all 0.7s ease 0.1s",
          }}>
            <div style={{
              width:52, height:52, borderRadius:"50%",
              border:"1.5px solid rgba(213,165,59,0.45)",
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(213,165,59,0.07)", overflow:"hidden",
              boxShadow:"0 0 24px rgba(213,165,59,0.18)",
            }}>
              <img src="/images/logo.gif" alt="" aria-hidden="true" width={44} height={44} style={{objectFit:"contain"}}/>
            </div>
            <div>
              <p style={{
                fontFamily:"'Space Grotesk',system-ui,sans-serif",
                fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:"var(--gold)", margin:0,
              }}>{siteConfig.abbreviation}</p>
              <p style={{ fontFamily:"'Cinzel',Georgia,serif", fontSize:"0.78rem", color:"var(--steel)", margin:0, lineHeight:1.3 }}>
                Est. {siteConfig.founded}
              </p>
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{
            display:"flex", alignItems:"center", gap:"0.6rem",
            marginBottom:"1rem",
            opacity: loaded ? 1 : 0,
            transition:"opacity 0.7s ease 0.2s",
          }}>
            <div style={{ width:28, height:"1.5px", background:"linear-gradient(90deg,transparent,var(--gold))" }}/>
            <span style={{
              fontFamily:"'Space Grotesk',system-ui,sans-serif",
              fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.22em",
              textTransform:"uppercase", color:"var(--gold)",
            }}>International Brotherhood</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily:"'Cinzel',Georgia,serif",
            fontWeight:800,
            fontSize:"clamp(2rem,5.5vw,3.75rem)",
            lineHeight:1.08,
            color:"#F6F3EA",
            marginBottom:"1.5rem",
            textWrap:"balance",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition:"all 0.8s ease 0.25s",
          }}>
            United by<br/>
            Brotherhood.{" "}
            <span style={{
              background:"linear-gradient(135deg,#D5A53B 0%,#F2D28C 40%,#D5A53B 70%,#F2D28C 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              Driven
            </span>{" "}
            <span style={{
              background:"linear-gradient(135deg,#F2D28C 0%,#D5A53B 50%,#F2D28C 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>by Purpose.</span>
          </h1>

          {/* Tagline */}
          <p style={{
            color:"#AAB6C5",
            fontSize:"clamp(0.95rem,1.5vw,1.1rem)",
            lineHeight:1.8,
            marginBottom:"2.25rem",
            maxWidth:"52ch",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transition:"all 0.8s ease 0.38s",
          }}>
            {siteConfig.description}
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{
            display:"flex", flexWrap:"wrap", gap:"0.875rem", marginBottom:"2.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transition:"all 0.8s ease 0.5s",
          }}>
            <Link href="/about" className="btn-gold">
              Discover Our Story
              <ArrowRight size={15}/>
            </Link>
            <Link href="/members" className="btn-ghost-gold">
              Meet the Brotherhood
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-stat-row" style={{
            display:"flex", flexWrap:"wrap", gap:"clamp(1.25rem,3vw,2.5rem)",
            opacity: loaded ? 1 : 0,
            transition:"opacity 0.8s ease 0.65s",
          }}>
            {[
              { value:"₦48M+", label:"Member Benefits" },
              { value:"3",     label:"Chairmen" },
              { value:"2026",  label:"1st Convention" },
            ].map(({ value, label }) => (
              <div key={label} style={{ display:"flex", flexDirection:"column", gap:"0.2rem" }}>
                <span style={{
                  fontFamily:"'Cinzel',Georgia,serif", fontWeight:700,
                  fontSize:"clamp(1.2rem,2.5vw,1.6rem)", color:"var(--gold-light)",
                  lineHeight:1,
                }}>{value}</span>
                <span style={{
                  fontFamily:"'Space Grotesk',system-ui,sans-serif",
                  fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.12em",
                  textTransform:"uppercase", color:"rgba(170,182,197,0.6)",
                }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll CTA */}
      <a href="#story" aria-label="Scroll to explore" style={{
        position:"absolute", bottom:"1.75rem", left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem",
        color:"rgba(170,182,197,0.45)", zIndex:4, transition:"color 0.2s",
        minHeight:0, minWidth:0,
      }}
        onMouseEnter={(e)=>((e.currentTarget as HTMLElement).style.color="var(--gold)")}
        onMouseLeave={(e)=>((e.currentTarget as HTMLElement).style.color="rgba(170,182,197,0.45)")}
      >
        <span style={{
          fontFamily:"'Space Grotesk',system-ui,sans-serif",
          fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase",
        }}>Explore</span>
        <ChevronDown size={18} style={{ animation:"float 2.2s ease-in-out infinite" }}/>
      </a>

      {/* Mobile: stacked layout override */}
      <style>{`
        @media (max-width: 767px) {
          .hero-logo-right {
            position: relative !important;
            right: auto !important; top: auto !important;
            transform: none !important;
            width: clamp(180px, 60vw, 260px) !important;
            height: clamp(180px, 60vw, 260px) !important;
            margin: 0 auto 1.75rem !important;
            order: -1;
          }
          section[aria-label="Hero"] > div[style*="zIndex: 3"] {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          section[aria-label="Hero"] > div[style*="zIndex: 3"] > div {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          section[aria-label="Hero"] h1 { font-size: clamp(1.75rem, 8vw, 2.4rem) !important; }
          section[aria-label="Hero"] p   { max-width: 100%; }
          section[aria-label="Hero"] > div[style*="zIndex: 3"] > div > div[style*="left: 0"] { display: none; }
        }
      `}</style>
    </section>
  );
}
