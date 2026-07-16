"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { generateReference } from "@/lib/utils";
import { CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Background" },
  { id: 3, label: "Your Purpose" },
  { id: 4, label: "Confirmation" },
];

const COUNTRIES = [
  "Nigeria", "Germany", "Italy", "France", "United Kingdom", "United States", "Other"
];

type FormData = {
  fullName: string; email: string; phone: string; whatsapp: string;
  country: string; city: string; nationality: string; occupation: string;
  referringMember: string; reasonForJoining: string;
  brotherhoodMeaning: string; contribution: string;
  agreeValues: boolean; agreePrivacy: boolean;
};

const initial: FormData = {
  fullName: "", email: "", phone: "", whatsapp: "",
  country: "", city: "", nationality: "Nigerian", occupation: "",
  referringMember: "", reasonForJoining: "",
  brotherhoodMeaning: "", contribution: "",
  agreeValues: false, agreePrivacy: false,
};

export default function MembershipPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!form.email.includes("@")) newErrors.email = "A valid email address is required.";
      if (!form.country) newErrors.country = "Country of residence is required.";
      if (!form.city.trim()) newErrors.city = "City is required.";
    }
    if (step === 2) {
      if (!form.occupation.trim()) newErrors.occupation = "Please provide your occupation.";
    }
    if (step === 3) {
      if (form.reasonForJoining.trim().length < 30) newErrors.reasonForJoining = "Please provide a meaningful response (at least 30 characters).";
      if (form.contribution.trim().length < 20) newErrors.contribution = "Please describe your potential contribution.";
    }
    if (step === 4) {
      if (!form.agreeValues) newErrors.agreeValues = "You must agree to the club's values.";
      if (!form.agreePrivacy) newErrors.agreePrivacy = "You must agree to the privacy policy.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (!validate(4)) return;
    const ref = generateReference();
    setRefNumber(ref);
    setSubmitted(true);
  };

  const fieldStyle = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(11,26,48,0.8)", border: "1px solid rgba(213,165,59,0.2)",
    borderRadius: "8px", color: "var(--ivory)",
    fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.9375rem",
    outline: "none", transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block", fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
    color: "var(--steel)", marginBottom: "0.5rem",
  };
  const errorStyle = { color: "#f87171", fontSize: "0.8rem", marginTop: "0.25rem" };

  if (submitted) {
    return (
      <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(213,165,59,0.1)", border: "1px solid rgba(213,165,59,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", color: "var(--gold)" }}>
            <CheckCircle size={32} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1rem" }}>Application Received</h1>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Thank you for your interest in the {siteConfig.name}. Your application has been received and
            will be reviewed by the club's leadership. You will be contacted in due course.
          </p>
          <div style={{ padding: "1.25rem", background: "rgba(11,26,48,0.8)", border: "1px solid rgba(213,165,59,0.2)", borderRadius: "10px", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.75rem", color: "var(--steel)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Reference Number</p>
            <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--gold)", margin: 0 }}>{refNumber}</p>
          </div>
          <p style={{ color: "rgba(174,184,198,0.5)", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Please note that submission does not guarantee acceptance. A six-month probationary period
            applies upon successful admission.
          </p>
          <Link href="/" className="btn-ghost-gold">Return to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      {/* Hero */}
      <section style={{ padding: "5rem 1.5rem 3rem", background: "radial-gradient(ellipse at 50% 50%, rgba(10,26,58,0.7) 0%, var(--navy) 65%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Join the Brotherhood</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "1.25rem" }}>
            Membership Application
          </h1>
          <p style={{ color: "var(--steel)", fontSize: "1.0625rem", lineHeight: 1.8, maxWidth: "56ch", margin: "0 auto" }}>
            Membership in the {siteConfig.name} is open to eligible Nigerians who share our values
            of integrity, respect, unity, and mutual support. Admission is subject to club review.
          </p>
        </div>
      </section>

      {/* Eligibility notice */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 2rem" }}>
        <div style={{ background: "rgba(213,165,59,0.04)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
          <p style={{ color: "rgba(246,243,234,0.65)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, maxWidth: "100%" }}>
            <strong style={{ color: "var(--gold-light)" }}>Please note:</strong> Submitting this application does not guarantee admission.
            A six-month probationary period applies upon successful admission. The club's leadership will
            review your application and contact you.
          </p>
        </div>
      </div>

      {/* Form */}
      <section style={{ padding: "0 1.5rem 6rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem" }}>
            {steps.map((s) => (
              <div key={s.id} style={{ flex: 1 }}>
                <div
                  style={{
                    height: "3px",
                    borderRadius: "999px",
                    background: step >= s.id ? "var(--gold)" : "rgba(213,165,59,0.12)",
                    marginBottom: "0.5rem",
                    transition: "background 0.3s ease",
                  }}
                />
                <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.68rem", color: step >= s.id ? "var(--gold)" : "rgba(174,184,198,0.4)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(11,26,48,0.8)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "16px", padding: "2.5rem" }}>

            {/* Step 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", margin: 0 }}>Personal Details</h2>
                {[
                  { label: "Full Name", field: "fullName" as const, type: "text", placeholder: "Your full legal name" },
                  { label: "Email Address", field: "email" as const, type: "email", placeholder: "your@email.com" },
                  { label: "Phone Number", field: "phone" as const, type: "tel", placeholder: "+1 234 567 8900" },
                  { label: "WhatsApp Number", field: "whatsapp" as const, type: "tel", placeholder: "+1 234 567 8900" },
                  { label: "City", field: "city" as const, type: "text", placeholder: "Your current city" },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label htmlFor={field} style={labelStyle}>{label}</label>
                    <input
                      id={field} type={type} placeholder={placeholder}
                      value={form[field] as string}
                      onChange={(e) => update(field, e.target.value)}
                      style={{ ...fieldStyle, borderColor: errors[field] ? "#f87171" : undefined }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(213,165,59,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = errors[field] ? "#f87171" : "rgba(213,165,59,0.2)")}
                    />
                    {errors[field] && <p style={errorStyle}>{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="country" style={labelStyle}>Country of Residence</label>
                  <select
                    id="country" value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    style={{ ...fieldStyle, borderColor: errors.country ? "#f87171" : undefined }}
                  >
                    <option value="">Select country…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <p style={errorStyle}>{errors.country}</p>}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", margin: 0 }}>Background</h2>
                <div>
                  <label htmlFor="nationality" style={labelStyle}>Nationality</label>
                  <input id="nationality" type="text" value={form.nationality} onChange={(e) => update("nationality", e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="occupation" style={labelStyle}>Occupation *</label>
                  <input id="occupation" type="text" value={form.occupation} onChange={(e) => update("occupation", e.target.value)} placeholder="Your profession or field" style={{ ...fieldStyle, borderColor: errors.occupation ? "#f87171" : undefined }} />
                  {errors.occupation && <p style={errorStyle}>{errors.occupation}</p>}
                </div>
                <div>
                  <label htmlFor="referringMember" style={labelStyle}>Referring Member (if any)</label>
                  <input id="referringMember" type="text" value={form.referringMember} onChange={(e) => update("referringMember", e.target.value)} placeholder="Name of current member who referred you" style={fieldStyle} />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", margin: 0 }}>Your Purpose</h2>
                <div>
                  <label htmlFor="reason" style={labelStyle}>Why do you wish to join? *</label>
                  <textarea id="reason" rows={4} value={form.reasonForJoining} onChange={(e) => update("reasonForJoining", e.target.value)} placeholder="Share your reason for seeking membership…" style={{ ...fieldStyle, resize: "vertical", borderColor: errors.reasonForJoining ? "#f87171" : undefined }} />
                  {errors.reasonForJoining && <p style={errorStyle}>{errors.reasonForJoining}</p>}
                </div>
                <div>
                  <label htmlFor="meaning" style={labelStyle}>What does brotherhood mean to you?</label>
                  <textarea id="meaning" rows={4} value={form.brotherhoodMeaning} onChange={(e) => update("brotherhoodMeaning", e.target.value)} placeholder="In your own words…" style={{ ...fieldStyle, resize: "vertical" }} />
                </div>
                <div>
                  <label htmlFor="contribution" style={labelStyle}>How can you contribute to the club? *</label>
                  <textarea id="contribution" rows={4} value={form.contribution} onChange={(e) => update("contribution", e.target.value)} placeholder="Skills, time, resources, ideas…" style={{ ...fieldStyle, resize: "vertical", borderColor: errors.contribution ? "#f87171" : undefined }} />
                  {errors.contribution && <p style={errorStyle}>{errors.contribution}</p>}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.25rem", color: "var(--ivory)", margin: 0 }}>Confirmation</h2>
                <div style={{ background: "rgba(213,165,59,0.04)", border: "1px solid rgba(213,165,59,0.12)", borderRadius: "10px", padding: "1.5rem" }}>
                  <p style={{ color: "var(--steel)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0, maxWidth: "100%" }}>
                    By submitting this application, you confirm that the information provided is accurate and
                    that you understand admission is subject to review by the club's leadership. You acknowledge
                    that a six-month probationary period applies upon admission, and that submission of this
                    form does not guarantee membership.
                  </p>
                </div>
                {[
                  { field: "agreeValues" as const, label: "I agree to uphold the core values of integrity, respect, unity, responsibility, and mutual support that define the club." },
                  { field: "agreePrivacy" as const, label: "I agree to the Privacy Policy and consent to the club storing and processing my application information." },
                ].map(({ field, label }) => (
                  <div key={field}>
                    <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input
                        type="checkbox" checked={form[field] as boolean}
                        onChange={(e) => update(field, e.target.checked)}
                        style={{ marginTop: "3px", accentColor: "var(--gold)", width: 16, height: 16, flexShrink: 0 }}
                      />
                      <span style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--steel)", lineHeight: 1.65 }}>{label}</span>
                    </label>
                    {errors[field] && <p style={{ ...errorStyle, marginLeft: "1.75rem" }}>{errors[field]}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "2.5rem" }}>
              {step > 1 ? (
                <button type="button" onClick={back} className="btn-ghost-gold">Back</button>
              ) : <div />}
              {step < 4 ? (
                <button type="button" onClick={next} className="btn-gold">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} className="btn-gold">
                  Submit Application <CheckCircle size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
