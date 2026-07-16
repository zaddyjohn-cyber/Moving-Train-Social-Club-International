import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy of the ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      <section style={{ padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Legal</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "2.5rem" }}>Privacy Policy</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              {
                heading: "1. Introduction",
                body: `The ${siteConfig.name} ("the Club", "we", "us", or "our") is committed to protecting the privacy and personal data of our members, applicants, and website visitors. This Privacy Policy explains how we collect, use, and protect information in connection with this website and club activities.`,
              },
              {
                heading: "2. Information We Collect",
                body: "We may collect personal information including your name, email address, telephone number, country of residence, occupation, and photographs when you submit a membership application, create a member profile, upload photographs, or contact us through the website. We collect only the information necessary for the stated purpose.",
              },
              {
                heading: "3. How We Use Your Information",
                body: "Information is used to process membership applications, maintain the member directory, communicate club news and events, enable the photo gallery, provide member dashboard functionality, and administer club finances. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
              },
              {
                heading: "4. Photographs and Media",
                body: "Photographs uploaded to the website are subject to the Club's Photo and Media Consent Policy. Members retain rights over their own images and may request removal or visibility changes at any time by contacting the administrator. Photographs will not be published without the uploader's consent to the Club's consent terms.",
              },
              {
                heading: "5. Member Directory",
                body: "Public member profiles display only information that members have explicitly approved for public display. Private details — including personal phone numbers, home addresses, financial records, and family information — are never displayed publicly. Members may control their profile visibility through the member dashboard.",
              },
              {
                heading: "6. Data Security",
                body: "We implement appropriate technical and organisational measures to protect personal data, including secure authentication, encrypted storage, and role-based access controls. Members should not share their login credentials with others.",
              },
              {
                heading: "7. Data Retention",
                body: "We retain personal data for as long as membership is active and for a reasonable period thereafter. Members may request deletion of their personal data by contacting the Club administration.",
              },
              {
                heading: "8. Your Rights",
                body: "You have the right to access, correct, update, or delete your personal information held by the Club. You may also request that photographs in which you appear be removed or restricted in visibility. To exercise these rights, please contact us.",
              },
              {
                heading: "9. Contact",
                body: siteConfig.contact.email
                  ? `For privacy enquiries, please contact us at ${siteConfig.contact.email}.`
                  : "For privacy enquiries, please use the Contact page.",
              },
              {
                heading: "10. Changes to This Policy",
                body: "We may update this Privacy Policy from time to time. Changes will be published on this page. Continued use of the website following an update constitutes acceptance of the revised policy.",
              },
            ].map((section) => (
              <div key={section.heading}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.0625rem", color: "var(--ivory)", marginBottom: "0.875rem" }}>
                  {section.heading}
                </h2>
                <p style={{ color: "var(--steel)", fontSize: "0.9375rem", lineHeight: 1.8, margin: 0, maxWidth: "100%" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(213,165,59,0.1)" }}>
            <p style={{ color: "rgba(90,80,65,0.5)", fontSize: "0.8rem" }}>
              Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
