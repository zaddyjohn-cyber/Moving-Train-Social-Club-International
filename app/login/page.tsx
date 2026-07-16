"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    if (!email.includes("@")) newErrors.email = "Please enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (newErrors.email || newErrors.password) { setErrors(newErrors); return; }
    setIsLoading(true);
    // Demo mode: no real auth
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setLoginError("Authentication is in demo mode. Connect Supabase credentials to enable live login.");
  };

  const fieldStyle = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(11,26,48,0.8)", border: "1px solid rgba(213,165,59,0.2)",
    borderRadius: "8px", color: "var(--ivory)",
    fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.9375rem",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center, #0A1A3A 0%, #050A18 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
        position: "relative",
      }}
    >
      {/* Geo background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D5A53B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.875rem" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(213,165,59,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(213,165,59,0.06)", overflow: "hidden", boxShadow: "0 0 24px rgba(213,165,59,0.15)" }}>
              <Image src="/images/logo.svg" alt={siteConfig.logo.alt} width={56} height={56} style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--gold)", lineHeight: 1.3, textAlign: "center" }}>
              {siteConfig.shortName}
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(11,26,48,0.9)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "20px", padding: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.5rem", color: "var(--ivory)", marginBottom: "0.5rem", textAlign: "center" }}>
            Member Login
          </h1>
          <p style={{ color: "rgba(174,184,198,0.5)", fontSize: "0.875rem", textAlign: "center", marginBottom: "2rem" }}>
            Sign in to access your member dashboard
          </p>

          {loginError && (
            <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "8px", padding: "0.875rem 1rem", marginBottom: "1.5rem" }}>
              <p style={{ color: "#fca5a5", fontSize: "0.875rem", lineHeight: 1.6, margin: 0, maxWidth: "100%" }}>{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} noValidate>
            <div>
              <label htmlFor="email" style={{ display: "block", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--steel)", marginBottom: "0.5rem" }}>
                Email Address
              </label>
              <input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" autoComplete="email"
                style={{ ...fieldStyle, borderColor: errors.email ? "#f87171" : "rgba(213,165,59,0.2)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(213,165,59,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = errors.email ? "#f87171" : "rgba(213,165,59,0.2)")}
              />
              {errors.email && <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" style={{ display: "block", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--steel)", marginBottom: "0.5rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password" type={showPw ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...fieldStyle, paddingRight: "2.75rem", borderColor: errors.password ? "#f87171" : "rgba(213,165,59,0.2)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(213,165,59,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = errors.password ? "#f87171" : "rgba(213,165,59,0.2)")}
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "var(--steel)", cursor: "pointer", padding: "0.25rem" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors.password}</p>}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link href="/forgot-password" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", color: "var(--gold)", opacity: 0.8 }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold"
              style={{ justifyContent: "center", opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Signing in…" : (<><LogIn size={16} /> Sign In</>)}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "rgba(174,184,198,0.5)", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
            Not yet a member?
          </p>
          <Link href="/membership" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>
            Apply to Join <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
