"use client";

// Animated "live" visuals for Notable Contributions.
// Each visual depicts its specific contribution:
//   dues     — 12 monthly bars being paid in, one by one
//   registry — a certificate drawing itself, then the CAC seal stamps in
//   video    — a live Zoom-style meeting grid with voice bars and REC light
//   network  — data streaming along arcs between global nodes
//   scroll   — constitution lines being written with a cursor
//   founding — a timeline growing from 2020, member dots joining in

const mono = "'Space Grotesk', ui-monospace, monospace";

/* ── 1. Dues — 12 monthly bars fill in gold ─────────────────── */
function DuesVisual() {
  const bars = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      <text x="16" y="22" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2">
        MONTHLY DUES · ALL MEMBERS
      </text>
      <text x="384" y="22" fill="#F2D28C" fontSize="11" fontFamily={mono} fontWeight="700" textAnchor="end">
        12/12 PAID
      </text>
      {bars.map((_, i) => {
        const h = 38 + (i % 3) * 9 + (i % 2) * 5;
        return (
          <g key={i}>
            <rect
              x={20 + i * 30} y={100 - h} width={18} height={h} rx={3}
              fill="url(#duesGrad)"
              style={{
                transformOrigin: `${29 + i * 30}px 100px`,
                animation: `cvGrow 0.5s ease ${0.15 + i * 0.18}s both, cvBarPulse 4s ease-in-out ${2.5 + i * 0.1}s infinite`,
              }}
            />
            <text x={29 + i * 30} y={112} fill="rgba(170,182,197,0.45)" fontSize="7" fontFamily={mono} textAnchor="middle">
              {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
            </text>
          </g>
        );
      })}
      <line x1="16" y1="100" x2="384" y2="100" stroke="rgba(213,165,59,0.25)" strokeWidth="1" />
      <defs>
        <linearGradient id="duesGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#B8861E" />
          <stop offset="60%" stopColor="#D5A53B" />
          <stop offset="100%" stopColor="#F2D28C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── 2. Registry — certificate draws, seal stamps ───────────── */
function RegistryVisual() {
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      {/* Certificate */}
      <rect x="70" y="14" width="200" height="92" rx="6" fill="rgba(213,165,59,0.04)"
        stroke="#D5A53B" strokeWidth="1.5"
        strokeDasharray="584" style={{ animation: "cvDraw 2s ease 0.2s both" }} />
      <rect x="80" y="24" width="180" height="72" rx="3" fill="none"
        stroke="rgba(213,165,59,0.3)" strokeWidth="0.75"
        strokeDasharray="504" style={{ animation: "cvDraw 2s ease 0.5s both" }} />
      {/* Text lines */}
      {[40, 52, 64, 76].map((y, i) => (
        <rect key={y} x="92" y={y} width={i === 0 ? 110 : 140 - i * 18} height="4" rx="2"
          fill={i === 0 ? "rgba(242,210,140,0.6)" : "rgba(170,182,197,0.3)"}
          style={{ transformOrigin: "92px 0px", animation: `cvWrite 0.6s ease ${1 + i * 0.3}s both` }} />
      ))}
      {/* Seal stamps in */}
      <g style={{ transformOrigin: "310px 60px", animation: "cvStamp 0.45s cubic-bezier(0.34,1.56,0.64,1) 2.4s both" }}>
        <circle cx="310" cy="60" r="30" fill="rgba(213,165,59,0.08)" stroke="#D5A53B" strokeWidth="1.5" />
        <circle cx="310" cy="60" r="23" fill="none" stroke="rgba(213,165,59,0.45)" strokeWidth="0.75" strokeDasharray="3 3" />
        <text x="310" y="56" fill="#F2D28C" fontSize="9" fontFamily={mono} fontWeight="700" textAnchor="middle" letterSpacing="1">CAC</text>
        <text x="310" y="68" fill="#D5A53B" fontSize="7" fontFamily={mono} fontWeight="700" textAnchor="middle" letterSpacing="0.5">REGISTERED</text>
      </g>
      <circle cx="310" cy="60" r="30" fill="none" stroke="#F2D28C" strokeWidth="1"
        style={{ transformOrigin: "310px 60px", animation: "cvSealRing 2.5s ease-out 2.9s infinite" }} />
      <text x="16" y="22" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2"
        writingMode="tb" transform="rotate(0)">
      </text>
    </svg>
  );
}

/* ── 3. Video — live meeting grid with voice bars ───────────── */
function VideoVisual() {
  const tiles = [
    { x: 24,  y: 30 }, { x: 118, y: 30 }, { x: 212, y: 30 },
    { x: 24,  y: 72 }, { x: 118, y: 72 }, { x: 212, y: 72 },
  ];
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      <text x="16" y="20" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2">
        INTERNATIONAL MEETING
      </text>
      {/* REC light */}
      <circle cx="330" cy="16" r="4" fill="#E5484D" style={{ animation: "cvBlink 1.2s ease-in-out infinite" }} />
      <text x="340" y="20" fill="rgba(229,72,77,0.9)" fontSize="10" fontFamily={mono} fontWeight="700">LIVE</text>
      {/* Participant tiles */}
      {tiles.map(({ x, y }, i) => (
        <g key={i} style={{ animation: `cvFadeIn 0.4s ease ${0.2 + i * 0.15}s both` }}>
          <rect x={x} y={y} width={86} height={36} rx={5}
            fill="rgba(16,36,58,0.9)" stroke={i === 1 ? "rgba(0,200,255,0.6)" : "rgba(213,165,59,0.22)"} strokeWidth="1" />
          <circle cx={x + 16} cy={y + 18} r={8} fill="rgba(213,165,59,0.18)" stroke="rgba(213,165,59,0.5)" strokeWidth="0.75" />
          {/* Voice bars */}
          {[0, 1, 2, 3].map((b) => (
            <rect key={b}
              x={x + 34 + b * 9} y={y + 10} width={4} height={16} rx={2}
              fill={i === 1 ? "#00C8FF" : "#D5A53B"}
              opacity={i === 1 ? 0.9 : 0.55}
              style={{
                transformOrigin: `${x + 36 + b * 9}px ${y + 18}px`,
                animation: `cvVoice ${0.6 + (b % 3) * 0.25}s ease-in-out ${b * 0.12 + i * 0.07}s infinite alternate`,
              }} />
          ))}
        </g>
      ))}
      <text x="330" y="112" fill="rgba(170,182,197,0.55)" fontSize="9" fontFamily={mono} textAnchor="middle">
        42 MONTHS SPONSORED
      </text>
    </svg>
  );
}

/* ── 4. Network — data streams along arcs between nodes ─────── */
function NetworkVisual() {
  const nodes = [
    { x: 50,  y: 82, label: "LAGOS" },
    { x: 160, y: 40, label: "ROME" },
    { x: 265, y: 72, label: "LONDON" },
    { x: 355, y: 45, label: "NEW YORK" },
  ];
  const arcs = [
    "M50,82 Q105,20 160,40", "M160,40 Q212,95 265,72",
    "M265,72 Q310,20 355,45", "M50,82 Q200,118 355,45",
  ];
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      <text x="16" y="20" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2">
        GLOBAL LINK · ALWAYS ON
      </text>
      {arcs.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(213,165,59,0.18)" strokeWidth="1" />
          <path d={d} fill="none" stroke="#00C8FF" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="10 130"
            style={{ animation: `cvFlow 2.6s linear ${i * 0.6}s infinite` }} />
        </g>
      ))}
      {nodes.map(({ x, y, label }, i) => (
        <g key={label}>
          <circle cx={x} cy={y} r={5} fill="#D5A53B"
            style={{ transformOrigin: `${x}px ${y}px`, animation: `cvNodePulse 2s ease-in-out ${i * 0.4}s infinite` }} />
          <circle cx={x} cy={y} r={10} fill="none" stroke="rgba(213,165,59,0.35)" strokeWidth="1"
            style={{ transformOrigin: `${x}px ${y}px`, animation: `cvSealRing 2s ease-out ${i * 0.4}s infinite` }} />
          <text x={x} y={y + 22} fill="rgba(170,182,197,0.6)" fontSize="7.5" fontFamily={mono} textAnchor="middle" letterSpacing="1">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── 5. Scroll — constitution writes itself ─────────────────── */
function ScrollVisual() {
  const lines = [
    { w: 150, label: "ARTICLE I — THE BROTHERHOOD" },
    { w: 210 }, { w: 190 }, { w: 205 }, { w: 120 },
  ];
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      <rect x="60" y="10" width="280" height="100" rx="6" fill="rgba(213,165,59,0.04)"
        stroke="rgba(213,165,59,0.3)" strokeWidth="1" />
      <text x="200" y="30" fill="#F2D28C" fontSize="10" fontFamily={mono} fontWeight="700" textAnchor="middle" letterSpacing="2">
        THE CONSTITUTION
      </text>
      <line x1="90" y1="38" x2="310" y2="38" stroke="rgba(213,165,59,0.3)" strokeWidth="0.75" />
      {lines.map((l, i) => (
        <rect key={i} x="90" y={48 + i * 12} width={l.w} height="4.5" rx="2"
          fill={i === 0 ? "rgba(242,210,140,0.55)" : "rgba(170,182,197,0.3)"}
          style={{
            transformOrigin: "90px 0px",
            animation: `cvWrite 0.9s ease ${0.3 + i * 0.55}s both`,
          }} />
      ))}
      {/* Writing cursor */}
      <rect x="90" y="46" width="2" height="8" fill="#F2D28C"
        style={{ animation: "cvCursor 3.05s steps(5) 0.3s both, cvBlink 0.8s step-end 3.4s infinite" }} />
      {/* Four quills = four drafters */}
      <text x="352" y="104" fill="rgba(213,165,59,0.7)" fontSize="9" fontFamily={mono} textAnchor="end">
        ✎ ×4
      </text>
    </svg>
  );
}

/* ── 6. Founding — timeline grows from 2020, members join ───── */
function FoundingVisual() {
  const dots = Array.from({ length: 6 });
  return (
    <svg viewBox="0 0 400 120" width="100%" style={{ display: "block" }} aria-hidden="true">
      <text x="16" y="20" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2">
        THE FIRST INVITATION · 2020
      </text>
      {/* Timeline */}
      <line x1="30" y1="70" x2="370" y2="70" stroke="rgba(213,165,59,0.5)" strokeWidth="1.5"
        strokeDasharray="340" style={{ animation: "cvDraw 1.8s ease 0.2s both" }} />
      {/* Founder spark */}
      <circle cx="30" cy="70" r="7" fill="#F2D28C"
        style={{ transformOrigin: "30px 70px", animation: "cvStamp 0.4s ease 0.1s both, cvNodePulse 2.5s ease-in-out 1s infinite" }} />
      <text x="30" y="94" fill="rgba(242,210,140,0.8)" fontSize="8" fontFamily={mono} textAnchor="middle" fontWeight="700">
        UBANI
      </text>
      {/* Member dots joining */}
      {dots.map((_, i) => (
        <g key={i}>
          <circle cx={85 + i * 48} cy="70" r="5" fill="#D5A53B"
            style={{ transformOrigin: `${85 + i * 48}px 70px`, animation: `cvStamp 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.7 + i * 0.3}s both` }} />
          <circle cx={85 + i * 48} cy="70" r="10" fill="none" stroke="rgba(213,165,59,0.3)" strokeWidth="0.75"
            style={{ transformOrigin: `${85 + i * 48}px 70px`, animation: `cvSealRing 2.4s ease-out ${1 + i * 0.3}s infinite` }} />
        </g>
      ))}
      <text x="370" y="94" fill="rgba(170,182,197,0.6)" fontSize="8" fontFamily={mono} textAnchor="end" letterSpacing="1"
        style={{ animation: "cvFadeIn 0.6s ease 2.6s both" }}>
        → THE MOVING TRAIN
      </text>
      <text x="200" y="112" fill="rgba(170,182,197,0.45)" fontSize="8" fontFamily={mono} textAnchor="middle">
        COMMITTEE OF FRIENDS → INTERNATIONAL BROTHERHOOD
      </text>
    </svg>
  );
}

/* ── Shared keyframes ───────────────────────────────────────── */
export function ContributionVisualStyles() {
  return (
    <style>{`
      @keyframes cvGrow      { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      @keyframes cvBarPulse  { 0%,100% { opacity: 1; } 50% { opacity: 0.75; } }
      @keyframes cvDraw      { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
      @keyframes cvWrite     { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      @keyframes cvStamp     { from { transform: scale(2.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @keyframes cvSealRing  { from { transform: scale(1); opacity: 0.7; } to { transform: scale(1.8); opacity: 0; } }
      @keyframes cvBlink     { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
      @keyframes cvFadeIn    { from { opacity: 0; } to { opacity: 1; } }
      @keyframes cvVoice     { from { transform: scaleY(0.25); } to { transform: scaleY(1); } }
      @keyframes cvFlow      { from { stroke-dashoffset: 140; } to { stroke-dashoffset: 0; } }
      @keyframes cvNodePulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }
      @keyframes cvCursor    { from { transform: translate(0px, 0px); } to { transform: translate(120px, 48px); } }
      @media (prefers-reduced-motion: reduce) {
        svg [style*="animation"] { animation: none !important; opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  );
}

export const contributionVisuals: Record<string, React.ReactNode> = {
  coins:    <DuesVisual />,
  registry: <RegistryVisual />,
  video:    <VideoVisual />,
  network:  <NetworkVisual />,
  scroll:   <ScrollVisual />,
  sprout:   <FoundingVisual />,
};
