// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SITE CONFIGURATION
// Change name, motto, contacts, colours, and social links here only.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Great Moving Train Social Club International",
  shortName: "Moving Train",
  abbreviation: "GMTSCI",
  motto: "The Moving Train Never Stops Moving Forward.",
  philosophy: "Our Brother's Keeper.",

  tagline: "United by Brotherhood. Driven by Purpose. Always Moving Forward.",

  description:
    "An international family committed to supporting one another, strengthening our communities, building lasting prosperity, and ensuring that no brother faces life's journey alone.",

  metaDescription:
    "Discover the Great Moving Train Social Club International, a global brotherhood built on friendship, unity, accountability, welfare support, financial empowerment, and continuous progress.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gmtsci.org",

  founded: 2020,

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@gmtsci.org",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  },

  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
    twitter: process.env.NEXT_PUBLIC_TWITTER ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  },

  logo: {
    src: "/images/logo.png",
    alt: "Great Moving Train Social Club International Logo",
    width: 80,
    height: 80,
  },

  // Countries where the club has presence
  presenceCountries: [
    { name: "Nigeria", code: "NG", lat: 9.082, lng: 8.6753 },
    { name: "Italy", code: "IT", lat: 41.8719, lng: 12.5674 },
    { name: "Germany", code: "DE", lat: 51.1657, lng: 10.4515 },
    { name: "France", code: "FR", lat: 46.2276, lng: 2.2137 },
    { name: "United Kingdom", code: "GB", lat: 55.3781, lng: -3.436 },
    { name: "United States", code: "US", lat: 37.0902, lng: -95.7129 },
  ],

  palette: {
    navyDeep: "#050A18",
    navyMid: "#071225",
    gold: "#D5A53B",
    goldLight: "#F2D28C",
    cyan: "#00C8FF",
    steel: "#AEB8C6",
    ivory: "#F6F3EA",
  },
} as const;

export type SiteConfig = typeof siteConfig;
