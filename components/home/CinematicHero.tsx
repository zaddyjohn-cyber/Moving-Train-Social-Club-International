"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";

// Canvas-based animated globe with country connection arcs
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const handleResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Country positions (simplified 2D projection from lat/lng)
    const countries = siteConfig.presenceCountries.map((c) => ({
      name: c.name,
      // Equirectangular projection
      x: (c.lng + 180) / 360,
      y: (90 - c.lat) / 180,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) * 0.38;

      // Globe base — deep sphere
      const globeGrad = ctx.createRadialGradient(cx - r * 0.15, cy - r * 0.2, r * 0.1, cx, cy, r);
      globeGrad.addColorStop(0, "rgba(15,35,70,0.9)");
      globeGrad.addColorStop(0.6, "rgba(7,18,37,0.85)");
      globeGrad.addColorStop(1, "rgba(5,10,24,0.9)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.25);
      glowGrad.addColorStop(0, "rgba(0,200,255,0.08)");
      glowGrad.addColorStop(0.5, "rgba(213,165,59,0.04)");
      glowGrad.addColorStop(1, "rgba(0,200,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Latitude rings
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const ry = Math.sin(latRad) * r;
        const rx = Math.cos(latRad) * r;
        if (rx <= 0) continue;
        ctx.beginPath();
        ctx.ellipse(cx, cy + ry, rx, rx * 0.15, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(213,165,59,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Meridian rings (rotating)
      for (let i = 0; i < 6; i++) {
        const angle = ((i / 6) * Math.PI) + (t * 0.003);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.12, r, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(213,165,59,0.05)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(213,165,59,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating track ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.008);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.18, r * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,200,255,0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Country dots — project lat/lng onto sphere
      const projectedCountries = countries.map((c) => {
        const angle = (t * 0.005 + c.x * Math.PI * 2) % (Math.PI * 2);
        const lat = (0.5 - c.y) * Math.PI;
        const projX = cx + Math.sin(angle) * Math.cos(lat) * r;
        const projY = cy - Math.sin(lat) * r;
        const depth = Math.cos(angle) * Math.cos(lat); // -1 to 1, positive = facing us
        return { ...c, projX, projY, depth, angle };
      });

      // Draw connection arcs (only between visible dots)
      const visible = projectedCountries.filter((c) => c.depth > 0);
      visible.forEach((a, i) => {
        visible.forEach((b, j) => {
          if (j <= i) return;
          const mx = (a.projX + b.projX) / 2;
          const my = (a.projY + b.projY) / 2 - 40;
          const prog = ((t * 0.015 + i * 0.5 + j * 0.3) % 3) / 3; // 0-1 travel
          ctx.beginPath();
          ctx.moveTo(a.projX, a.projY);
          ctx.quadraticCurveTo(mx, my, b.projX, b.projY);
          ctx.strokeStyle = "rgba(213,165,59,0.08)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Travelling spark
          const pathLen = Math.hypot(b.projX - a.projX, b.projY - a.projY);
          if (pathLen > 20) {
            const tx2 = a.projX + (b.projX - a.projX) * prog;
            const ty2 = a.projY + (b.projY - a.projY) * prog - Math.sin(prog * Math.PI) * 40;
            ctx.beginPath();
            ctx.arc(tx2, ty2, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,200,255,0.7)";
            ctx.fill();
          }
        });
      });

      // Country dots
      projectedCountries.forEach((c) => {
        if (c.depth < -0.2) return; // hidden behind globe
        const alpha = Math.max(0, c.depth) * 0.8 + 0.2;
        const pulse = 1 + Math.sin(t * 0.05 + c.x * 5) * 0.25;
        ctx.beginPath();
        ctx.arc(c.projX, c.projY, 4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(213,165,59,${alpha * 0.9})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(c.projX, c.projY, 8 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(213,165,59,${alpha * 0.12})`;
        ctx.fill();
      });

      // Orbiting train dot
      const trainAngle = t * 0.012;
      const trainX = cx + Math.cos(trainAngle) * r * 1.18;
      const trainY = cy + Math.sin(trainAngle) * r * 0.35;
      ctx.beginPath();
      ctx.arc(trainX, trainY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,200,255,0.9)";
      ctx.fill();
      // Trail
      for (let t2 = 1; t2 <= 5; t2++) {
        const ta = trainAngle - t2 * 0.08;
        const tx3 = cx + Math.cos(ta) * r * 1.18;
        const ty3 = cy + Math.sin(ta) * r * 0.35;
        ctx.beginPath();
        ctx.arc(tx3, ty3, 3 - t2 * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,255,${0.5 - t2 * 0.08})`;
        ctx.fill();
      }

      // Particles
      for (let p = 0; p < 20; p++) {
        const pa = (p / 20) * Math.PI * 2 + t * 0.002;
        const pr = r * (0.5 + ((Math.sin(p * 3.7 + t * 0.01) + 1) * 0.3));
        const px = cx + Math.cos(pa) * pr;
        const py = cy + Math.sin(pa) * pr * 0.6;
        const d = Math.hypot(px - cx, py - cy);
        if (d < r) {
          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(213,165,59,${0.1 + Math.sin(p + t * 0.03) * 0.1})`;
          ctx.fill();
        }
      }

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      animRef.current = requestAnimationFrame(draw);
    } else {
      // Draw one static frame
      draw();
      cancelAnimationFrame(animRef.current);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.85,
      }}
    />
  );
}

export default function CinematicHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 60% 50%, #0A1A3A 0%, #050A18 65%)",
      }}
    >
      {/* African geo background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Globe canvas — right side */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(360px, 55vw, 700px)",
          height: "clamp(360px, 55vw, 700px)",
          opacity: 0.9,
        }}
      >
        <GlobeCanvas />
        {/* Logo centred over the globe */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(160px, 22vw, 280px)",
            height: "clamp(160px, 22vw, 280px)",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(213,165,59,0.25), 0 0 20px rgba(213,165,59,0.15)",
          }}
        >
          <Image
            src="/images/logo.svg"
            alt={siteConfig.logo.alt}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Cinematic vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(5,10,24,0.95) 0%, rgba(5,10,24,0.7) 50%, rgba(5,10,24,0.2) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, transparent, var(--navy))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              marginBottom: "2.5rem",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: "1.5px solid rgba(213,165,59,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(213,165,59,0.06)",
                overflow: "hidden",
                boxShadow: "0 0 24px rgba(213,165,59,0.2)",
              }}
            >
              <Image
                src="/images/logo.svg"
                alt={siteConfig.logo.alt}
                width={52}
                height={52}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  margin: 0,
                }}
              >
                {siteConfig.abbreviation}
              </p>
              <p
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.8rem",
                  color: "var(--steel)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Est. {siteConfig.founded}
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.1,
              color: "var(--ivory)",
              marginBottom: "1.5rem",
              textWrap: "balance",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            United by Brotherhood.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D5A53B 0%, #F2D28C 50%, #D5A53B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Driven by Purpose.
            </span>
            <br />
            Always Moving Forward.
          </h1>

          {/* Body copy */}
          <p
            style={{
              color: "var(--steel)",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              maxWidth: "56ch",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.35s",
            }}
          >
            {siteConfig.description}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.5s",
            }}
          >
            <Link href="/about" className="btn-gold">
              Discover Our Story
              <ArrowRight size={16} />
            </Link>
            <Link href="/members" className="btn-ghost-gold">
              Meet the Brotherhood
            </Link>
          </div>

          {/* Secondary text */}
          <p
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "0.8rem",
              color: "rgba(174,184,198,0.6)",
              letterSpacing: "0.08em",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
            }}
          >
            Founded {siteConfig.founded} · Connected across nations · Moving forward together
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#story"
        aria-label="Scroll to explore"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(174,184,198,0.4)",
          zIndex: 3,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(174,184,198,0.4)")}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Explore
        </span>
        <ChevronDown size={20} style={{ animation: "float 2s ease-in-out infinite" }} />
      </a>
    </section>
  );
}
