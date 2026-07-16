"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Mail, CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<typeof form>({ fullName: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = { fullName: "", email: "", subject: "", message: "" };
    if (!form.fullName.trim()) e.fullName = "Name is required.";
    if (!form.email.includes("@")) e.email = "Valid email required.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (form.message.trim().length < 10) e.message = "Please include a message.";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const submit = () => { if (validate()) setSent(true); };

  const fieldStyle = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(11,26,48,0.8)", border: "1px solid rgba(213,165,59,0.2)",
    borderRadius: "8px", color: "var(--ivory)",
    fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.9375rem",
    outline: "none",
  };
  const labelStyle = {
    display: "block", fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
    color: "var(--steel)", marginBottom: "0.5rem",
  };

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      <section style={{ padding: "6rem 1.5rem 4rem", background: "radial-gradient(ellipse at 40% 50%, rgba(10,26,58,0.7) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Get in Touch</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.5rem" }}>Contact Us</h1>
          <p style={{ color: "var(--steel)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "58ch" }}>
            Have a question about the {siteConfig.name}? We welcome enquiries from potential
            members and those interested in learning more about the brotherhood.
          </p>
        </div>
      </section>

      <section style={{ padding: "3rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Contact info */}
          <div>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", marginBottom: "2rem" }}>
              Reach Us
            </h2>
            {siteConfig.contact.email && (
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(213,165,59,0.08)", border: "1px solid rgba(213,165,59,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--steel)", marginBottom: "0.25rem" }}>Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} style={{ color: "var(--gold)", fontSize: "0.9375rem" }}>{siteConfig.contact.email}</a>
                </div>
              </div>
            )}
            <div style={{ marginTop: "3rem", padding: "1.75rem", background: "rgba(11,26,48,0.7)", border: "1px solid rgba(213,165,59,0.12)", borderRadius: "14px" }}>
              <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1rem", color: "var(--ivory)", marginBottom: "0.875rem" }}>
                Looking to join?
              </p>
              <p style={{ color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: "100%" }}>
                If you are interested in membership, please complete our formal application form
                rather than using the contact form.
              </p>
              <a href="/membership" className="btn-ghost-gold" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}>
                Membership Application
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                <CheckCircle size={48} style={{ color: "var(--gold)", marginBottom: "1.5rem" }} />
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>Message Received</h2>
                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  Thank you for reaching out. We will be in touch as soon as possible.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Full Name", field: "fullName" as const, type: "text", placeholder: "Your full name" },
                  { label: "Email Address", field: "email" as const, type: "email", placeholder: "your@email.com" },
                  { label: "Subject", field: "subject" as const, type: "text", placeholder: "What is this regarding?" },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label htmlFor={field} style={labelStyle}>{label}</label>
                    <input
                      id={field} type={type} value={form[field]} placeholder={placeholder}
                      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                      style={{ ...fieldStyle, borderColor: errors[field] ? "#f87171" : "rgba(213,165,59,0.2)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(213,165,59,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = errors[field] ? "#f87171" : "rgba(213,165,59,0.2)")}
                    />
                    {errors[field] && <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message" rows={5} value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Your message…"
                    style={{ ...fieldStyle, resize: "vertical", borderColor: errors.message ? "#f87171" : "rgba(213,165,59,0.2)" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(213,165,59,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? "#f87171" : "rgba(213,165,59,0.2)")}
                  />
                  {errors.message && <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors.message}</p>}
                </div>
                <button type="button" onClick={submit} className="btn-gold">
                  Send Message <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
