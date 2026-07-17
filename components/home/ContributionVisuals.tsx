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
    <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "16/9" }}>
      {/* Background video */}
      <video
        src="/images/monthly-dues.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Overlay — just dark enough for SVG legibility */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(3,7,17,0.28)" }} />
      {/* Animated bar chart SVG on top */}
      <svg
        viewBox="0 0 400 120"
        width="100%"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
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
              <text x={29 + i * 30} y={112} fill="rgba(242,210,140,0.7)" fontSize="7" fontFamily={mono} textAnchor="middle">
                {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
              </text>
            </g>
          );
        })}
        <line x1="16" y1="100" x2="384" y2="100" stroke="rgba(213,165,59,0.35)" strokeWidth="1" />
        <defs>
          <linearGradient id="duesGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#B8861E" />
            <stop offset="60%" stopColor="#D5A53B" />
            <stop offset="100%" stopColor="#F2D28C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── 2. Registry — certificate draws, seal stamps ───────────── */
function RegistryVisual() {
  return (
    <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "10px" }}>
      <img
        src="/images/CAC.jpg"
        alt="CAC Registration Certificate"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
      />
    </div>
  );
}

/* ── 3. Video — live meeting grid with people on camera ─────── */
function VideoVisual() {
  return (
    <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "10px" }}>
      <img
        src="/images/zoom.jpg"
        alt="International Meeting"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
      />
    </div>
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
    <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "16/9" }}>
      {/* Background video */}
      <video
        src="/images/global-link.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Overlay — just dark enough for SVG legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(3,7,17,0.28)",
      }} />
      {/* Animated network SVG on top */}
      <svg
        viewBox="0 0 400 120"
        width="100%"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <text x="16" y="20" fill="#D5A53B" fontSize="10" fontFamily={mono} fontWeight="700" letterSpacing="2">
          GLOBAL LINK · ALWAYS ON
        </text>
        {arcs.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(213,165,59,0.25)" strokeWidth="1" />
            <path d={d} fill="none" stroke="#00C8FF" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="10 130"
              style={{ animation: `cvFlow 2.6s linear ${i * 0.6}s infinite` }} />
          </g>
        ))}
        {nodes.map(({ x, y, label }, i) => (
          <g key={label}>
            <circle cx={x} cy={y} r={5} fill="#D5A53B"
              style={{ transformOrigin: `${x}px ${y}px`, animation: `cvNodePulse 2s ease-in-out ${i * 0.4}s infinite` }} />
            <circle cx={x} cy={y} r={10} fill="none" stroke="rgba(213,165,59,0.45)" strokeWidth="1"
              style={{ transformOrigin: `${x}px ${y}px`, animation: `cvSealRing 2s ease-out ${i * 0.4}s infinite` }} />
            <text x={x} y={y + 22} fill="rgba(242,210,140,0.8)" fontSize="7.5" fontFamily={mono} textAnchor="middle" letterSpacing="1">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── 5. Scroll — constitution writes itself ─────────────────── */
function ScrollVisual() {
  return (
    <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "10px" }}>
      <video
        src="/images/writing.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ── 6. Founding — timeline grows from 2020, members join ───── */
function FoundingVisual() {
  return (
    <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "10px" }}>
      <img
        src="/images/invite.jpg"
        alt="The First Invitation · 2020"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
      />
    </div>
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
      @keyframes cvBreathe   { from { transform: translateY(0px) scale(1); } to { transform: translateY(0.8px) scale(1.015); } }
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
