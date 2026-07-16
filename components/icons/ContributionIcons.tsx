// Crafted gold line-art icons for Notable Contributions.
// Each is drawn on a 48x48 grid with a shared metallic-gold gradient.

const GoldDefs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F2D28C" />
      <stop offset="45%" stopColor="#D5A53B" />
      <stop offset="100%" stopColor="#B8861E" />
    </linearGradient>
  </defs>
);

const base = {
  width: 30,
  height: 30,
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Stacked coins — dues paid for all members */
export const CoinsIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg1" />
    <g stroke="url(#cg1)">
      <ellipse cx="18" cy="14" rx="11" ry="4.5" />
      <path d="M7 14v7c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5v-7" />
      <path d="M7 21v7c0 2.5 4.9 4.5 11 4.5 2 0 3.9-.2 5.5-.6" />
      <ellipse cx="32" cy="30" rx="9" ry="3.8" />
      <path d="M23 30v6c0 2.1 4 3.8 9 3.8s9-1.7 9-3.8v-6" />
      <path d="M14.5 13.5h7" strokeWidth="1.5" />
    </g>
  </svg>
);

/** Classical institution building — CAC registration */
export const RegistryIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg2" />
    <g stroke="url(#cg2)">
      <path d="M6 18L24 8l18 10" />
      <path d="M9 18v18M17 18v18M24 18v18M31 18v18M39 18v18" />
      <path d="M6 36h36" />
      <path d="M4 41h40" />
      <circle cx="24" cy="13.5" r="1.6" fill="url(#cg2)" stroke="none" />
    </g>
  </svg>
);

/** Video camera — Zoom sponsorship */
export const VideoIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg3" />
    <g stroke="url(#cg3)">
      <rect x="5" y="14" width="24" height="20" rx="4" />
      <path d="M29 21l12-6v18l-12-6" />
      <circle cx="13" cy="21" r="2.4" />
      <path d="M10 29h10" strokeWidth="1.5" />
    </g>
  </svg>
);

/** Globe with orbit links — international comms infrastructure */
export const NetworkGlobeIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg4" />
    <g stroke="url(#cg4)">
      <circle cx="24" cy="24" r="13" />
      <ellipse cx="24" cy="24" rx="13" ry="5.5" />
      <path d="M24 11v26M11.8 19h24.4M11.8 29h24.4" strokeWidth="1.4" />
      <circle cx="40" cy="12" r="2.4" fill="url(#cg4)" stroke="none" />
      <circle cx="8" cy="37" r="2.4" fill="url(#cg4)" stroke="none" />
      <path d="M34 15.5 38 13M13.5 33.5 10 36" strokeWidth="1.6" />
    </g>
  </svg>
);

/** Unfurled scroll with seal — first constitution */
export const ScrollIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg5" />
    <g stroke="url(#cg5)">
      <path d="M14 8h22a4 4 0 0 1 4 4v2a4 4 0 0 1-4-4H14a4 4 0 0 0-4 4v22" />
      <path d="M10 36a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V14" />
      <path d="M17 18h14M17 24h14M17 30h8" strokeWidth="1.5" />
      <circle cx="32" cy="33" r="3.2" />
      <path d="M32 36.2V40" strokeWidth="1.5" />
    </g>
  </svg>
);

/** Hand raising a sprout — proposed the club's formation */
export const SproutIcon = () => (
  <svg {...base} aria-hidden="true">
    <GoldDefs id="cg6" />
    <g stroke="url(#cg6)">
      <path d="M24 30V18" />
      <path d="M24 20c0-6-4-9-10-9 0 6 4 9 10 9z" />
      <path d="M24 24c0-5 3.5-8 9-8 0 5-3.5 8-9 8z" />
      <path d="M10 36c3-2.5 6-3.5 9-3h7c2 0 3 1 3 2s-1 2-3 2h-5" />
      <path d="M31 37l7-3c1.5-.6 3 0 3.4 1.4.3 1.2-.3 2.3-1.6 2.9L30 42c-2 .8-4.5.8-6.5 0L18 40h-8" />
    </g>
  </svg>
);

export const contributionIcons: Record<string, React.ReactNode> = {
  coins:    <CoinsIcon />,
  registry: <RegistryIcon />,
  video:    <VideoIcon />,
  network:  <NetworkGlobeIcon />,
  scroll:   <ScrollIcon />,
  sprout:   <SproutIcon />,
};
