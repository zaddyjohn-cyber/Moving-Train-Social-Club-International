import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for the ${siteConfig.name} website.`,
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)" }}>
      <section style={{ padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Legal</p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "2.5rem" }}>Terms of Use</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              { heading: "1. Acceptance", body: `By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, members, and administrators of the ${siteConfig.name} website.` },
              { heading: "2. Permitted Use", body: "This website is provided for informational purposes, member services, and club administration. You may not use the website to engage in unlawful activities, distribute harmful content, impersonate other individuals, or violate the privacy of other members." },
              { heading: "3. Member Accounts", body: "Members are responsible for maintaining the confidentiality of their login credentials and for all activities conducted under their account. You must notify the Club immediately if you suspect unauthorised access to your account." },
              { heading: "4. Content and Photographs", body: "Members who upload photographs or other content represent that they have the right to do so and that the content does not infringe upon the rights of any third party. The Club reserves the right to remove content that violates these terms, the Club's constitution, or applicable law." },
              { heading: "5. Intellectual Property", body: `The ${siteConfig.name} name, logo, and website content are the property of the Club. Unauthorised reproduction or use of Club branding, member photographs, or protected content is prohibited.` },
              { heading: "6. Disclaimer of Warranties", body: "This website is provided on an 'as is' basis. The Club makes no warranties regarding the availability, accuracy, or fitness for purpose of this website." },
              { heading: "7. Limitation of Liability", body: "The Club shall not be liable for any loss or damage arising from your use of this website, including loss of data, member information, or any other indirect or consequential loss." },
              { heading: "8. Changes", body: "The Club reserves the right to modify these Terms of Use at any time. Changes will be published on this page. Continued use following publication of changes constitutes acceptance." },
              { heading: "9. Governing Law", body: "These Terms of Use are governed by the laws of the Federal Republic of Nigeria, without prejudice to any applicable law in the country of residence of individual users." },
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
