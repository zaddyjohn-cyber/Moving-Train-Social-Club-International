// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — used in demo mode (no Supabase credentials)
// Only names and facts explicitly provided in the source documents are used.
// ─────────────────────────────────────────────────────────────────────────────

export const founderMembers = [
  { id: "1", name: "Hon. Chinedu Okafor", slug: "chinedu-okafor" },
  { id: "2", name: "Hon. Chinatu Ubani", slug: "chinatu-ubani" },
  { id: "3", name: "Hon. John Matthew", slug: "john-matthew" },
  { id: "4", name: "Hon. Nnamdi Muodukwu", slug: "nnamdi-muodukwu" },
  { id: "5", name: "Hon. Chuks Ikwuakolam Omumu", slug: "chuks-ikwuakolam-omumu" },
  { id: "6", name: "Hon. Daniel Anyaeri", slug: "daniel-anyaeri" },
];

export const currentExecutives = [
  {
    id: "ex-1",
    name: "Hon. Bond Peter Njoku",
    slug: "bond-peter-njoku",
    position: "Chairman",
    photo: "/images/members/bond-peter-njoku.jpg",
    isCurrent: true,
  },
  {
    id: "ex-2",
    name: "Hon. Herbert Chuks Ekweogu",
    slug: "herbert-chuks-ekweogu",
    photo: "/images/members/herbert-chuks-ekweogu.jpg",
    position: "Vice Chairman",
    isCurrent: true,
  },
  {
    id: "ex-3",
    name: "Hon. John Matthew",
    slug: "john-matthew",
    photo: "/images/members/john-matthew.jpg",
    position: "Secretary",
    isCurrent: true,
  },
  {
    id: "ex-4",
    name: "Hon. Obinna Aladum",
    slug: "obinna-aladum",
    photo: "/images/members/obinna-aladum.jpg",
    position: "Financial Secretary",
    isCurrent: true,
  },
  {
    id: "ex-5",
    name: "High Chief Emmanuel Henry Okoh",
    slug: "emmanuel-henry-okoh",
    position: "Treasurer",
    isCurrent: true,
  },
  {
    id: "ex-6",
    name: "Hon. Chinatu Ubani",
    slug: "chinatu-ubani",
    photo: "/images/members/chinatu-ubani.jpg",
    position: "Public Relations Officer",
    isCurrent: true,
  },
];

export const pioneerExecutives = [
  {
    id: "pe-1",
    name: "Chief Bethrand Chekwube Ugorji",
    slug: "bertrand-chekwube-ugorji",
    position: "Chairman",
    isPioneer: true,
  },
  {
    id: "pe-2",
    name: "Hon. Obinna Aladum",
    slug: "obinna-aladum",
    position: "Vice Chairman",
    isPioneer: true,
  },
  {
    id: "pe-3",
    name: "Hon. Chinedu Okafor",
    slug: "chinedu-okafor",
    position: "Secretary",
    isPioneer: true,
  },
  {
    id: "pe-4",
    name: "Hon. Nnamdi Muodukwu",
    slug: "nnamdi-muodukwu",
    position: "Financial Secretary",
    isPioneer: true,
  },
  {
    id: "pe-5",
    name: "High Chief Emmanuel Henry Okoh",
    slug: "emmanuel-henry-okoh",
    position: "Treasurer",
    isPioneer: true,
  },
  {
    id: "pe-6",
    name: "Hon. John Matthew",
    slug: "john-matthew",
    position: "Public Relations Officer",
    isPioneer: true,
  },
];

export const chairmanshipTimeline = [
  {
    id: "ch-1",
    name: "Chief Bethrand Chekwube Ugorji",
    slug: "bertrand-chekwube-ugorji",
    title: "Pioneer Chairman",
    period: "October 2020 — December 31, 2022",
    startDate: "2020-10-01",
    endDate: "2022-12-31",
    description:
      "Founding chairman who led the organisation from its inception as a Committee of Friends into a structured international club. Paid one full year of monthly dues on behalf of all members during the club's inaugural year.",
  },
  {
    id: "ch-2",
    name: "Hon. Ejiro Efejedia",
    slug: "ejiro-efejedia",
    title: "Second Chairman",
    period: "January 29, 2023 — April 30, 2023",
    startDate: "2023-01-29",
    endDate: "2023-04-30",
    description:
      "Served as the second chairman of the organisation during a period of continued growth and development.",
  },
  {
    id: "ch-3",
    name: "Hon. Bond Peter Njoku",
    slug: "bond-peter-njoku",
    photo: "/images/members/bond-peter-njoku.jpg",
    title: "Third Chairman",
    period: "May 28, 2023 — Present",
    startDate: "2023-05-28",
    endDate: null,
    description:
      "Current chairman who continues to lead the organisation with distinction, overseeing its growth into a fully international brotherhood.",
  },
];

export const achievements = [
  {
    id: "ach-1",
    label: "Member Welfare & Benefits",
    value: 10000000,
    prefix: "₦",
    suffix: "+",
    display: "₦10 Million+",
    description: "Distributed in member welfare support and benefits since founding.",
    category: "welfare",
  },
  {
    id: "ach-2",
    label: "Christmas Appreciation Gifts",
    value: 3000000,
    prefix: "₦",
    suffix: "+",
    display: "₦3 Million+",
    description: "Distributed as Christmas appreciation gifts to members' wives.",
    category: "family",
  },
  {
    id: "ach-3",
    label: "Birthday Benefits & Appreciation",
    value: 15000000,
    prefix: "₦",
    suffix: "+",
    display: "₦15 Million+",
    description: "Distributed in birthday benefits and member appreciation milestones.",
    category: "celebration",
  },
  {
    id: "ach-4",
    label: "Club Investment Initiatives",
    value: 20000000,
    prefix: "₦",
    suffix: "+",
    display: "₦20 Million+",
    description: "Invested in collective club financial and investment initiatives.",
    category: "investment",
  },
  {
    id: "ach-5",
    label: "First International Convention",
    value: 2026,
    prefix: "",
    suffix: "",
    display: "2026",
    description: "First International Convention successfully hosted, marking a historic milestone.",
    category: "milestone",
  },
];

export const coreValues = [
  {
    id: "v-1",
    title: "Brotherhood",
    description:
      "A lifelong bond between men who celebrate one another's successes and stand together through every challenge.",
    icon: "users",
    image: "/images/values/brotherhood.jpg",
  },
  {
    id: "v-2",
    title: "Trust",
    description:
      "The foundation upon which every relationship in the organisation is built — earned through consistency and character.",
    icon: "shield",
    image: "/images/values/trust.jpg",
  },
  {
    id: "v-3",
    title: "Unity",
    description:
      "Across nations and distances, members move as one — connected by shared values and genuine commitment.",
    icon: "globe",
    image: "/images/values/unity.jpg",
  },
  {
    id: "v-4",
    title: "Accountability",
    description:
      "Every member and leader answers to the brotherhood — transparent, honest, and answerable in all things.",
    icon: "scale",
    image: "/images/values/accountability.jpg",
  },
  {
    id: "v-5",
    title: "Empowerment",
    description:
      "Financial literacy, disciplined investment, and collective wealth creation are central to the club's mission.",
    icon: "trending-up",
    video: "/images/values/empowerment.mp4",
  },
  {
    id: "v-6",
    title: "Compassion",
    description:
      "No brother faces illness, bereavement, or hardship alone. Practical and emotional support is always present.",
    icon: "heart",
    image: "/images/values/compassion.jpg",
  },
  {
    id: "v-7",
    title: "Progress",
    description:
      "Like the train that gives us our name, the organisation moves continuously forward — never settling, never stopping.",
    icon: "arrow-right-circle",
    image: "/images/values/progress.png",
  },
  {
    id: "v-8",
    title: "Legacy",
    description:
      "The brotherhood is built to endure — creating meaning, opportunity, and belonging for generations to come.",
    icon: "landmark",
    image: "/images/values/legacy.png",
  },
];

export const notableContributions = [
  {
    member: "Chief Bethrand Chekwube Ugorji",
    icon: "coins",
    contribution:
      "Paid one full year of monthly dues on behalf of all members during the club's inaugural year, ensuring the organisation's financial stability from its very beginning.",
  },
  {
    member: "Hon. Chinedu Okafor",
    icon: "registry",
    contribution:
      "Facilitated the club's registration with the Corporate Affairs Commission of Nigeria, giving the organisation its formal legal standing.",
  },
  {
    member: "Hon. John Matthew",
    icon: "video",
    contribution:
      "Sponsored the club's Zoom subscription for three and a half years, enabling consistent international meetings across continents.",
  },
  {
    member: "Chief Bethrand Chekwube Ugorji",
    icon: "network",
    contribution:
      "Subsequently assumed responsibility for the Zoom subscription, ensuring the continuation of the club's international communication infrastructure.",
  },
  {
    member: "Hon. Obinna Aladum, Hon. John Matthew, High Chief Emmanuel Henry Okoh & Hon. Chuks Ikwuakolam Omumu",
    icon: "scroll",
    contribution:
      "Collaborated to draft the club's first constitution, providing the governance framework that continues to guide the organisation.",
  },
  {
    member: "Hon. Chinatu Ubani",
    icon: "sprout",
    contribution:
      "Proposed the formation of the Committee of Friends in 2020 and later invited additional members, laying the groundwork for what became the Moving Train.",
  },
];

export const membershipBenefits = [
  {
    id: "b-1",
    title: "Lifelong Brotherhood",
    description:
      "A trusted network of responsible and dependable individuals who celebrate your successes and provide genuine support during difficult periods.",
    icon: "users",
    image: "/images/why-join/lifelong-brotherhood.png",
  },
  {
    id: "b-2",
    title: "International Family",
    description:
      "Connection to a global network of members living across Nigeria, Europe, and the Americas — relationships that cross borders.",
    icon: "globe",
    image: "/images/why-join/international-family.png",
  },
  {
    id: "b-3",
    title: "Strong Welfare Support",
    description:
      "Members in good standing receive meaningful support during weddings, birthdays, bereavements, housewarmings, and other major life milestones.",
    icon: "heart-handshake",
    image: "/images/why-join/strong-welfare-support.png",
  },
  {
    id: "b-4",
    title: "Financial Empowerment",
    description:
      "The club encourages wealth creation, disciplined financial management, investment, and member-focused financial initiatives.",
    icon: "trending-up",
    image: "/images/why-join/financial-empowerment.png",
  },
  {
    id: "b-5",
    title: "Transparency & Good Governance",
    description:
      "A written constitution, elected leadership, financial accountability, and democratic decision-making ensure every member's voice matters.",
    icon: "scale",
    image: "/images/why-join/transparency-governance.png",
  },
  {
    id: "b-6",
    title: "Networking & Social Events",
    description:
      "International conventions, family gatherings, cultural celebrations, professional networking, and leadership opportunities await every member.",
    icon: "calendar",
    image: "/images/why-join/networking-social-events.png",
  },
];

export const galleryAlbums = [
  {
    id: "alb-1",
    title: "First International Convention 2026",
    slug: "international-convention-2026",
    description:
      "A historic milestone — the club's first International Convention, bringing members together from across the globe.",
    coverPlaceholder: true,
    imageCount: 0,
    year: 2026,
  },
  {
    id: "alb-2",
    title: "Brotherhood Meetings",
    slug: "brotherhood-meetings",
    description:
      "Regular gatherings — virtual and in-person — that keep the Moving Train connected and moving forward.",
    coverPlaceholder: true,
    imageCount: 0,
    year: 2024,
  },
  {
    id: "alb-3",
    title: "Member Celebrations",
    slug: "member-celebrations",
    description:
      "Birthdays, weddings, housewarmings, chieftaincy celebrations — moments that the brotherhood shares together.",
    coverPlaceholder: true,
    imageCount: 0,
    year: 2024,
  },
];
