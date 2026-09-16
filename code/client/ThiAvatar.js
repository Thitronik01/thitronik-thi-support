// THI-Maskottchen — freundliches Roboter-Gesicht im THITRONIK-CI.
// Reines SVG (keine Abhängigkeit), skaliert sauber von 18 px (Chat-Bubble) bis
// 56 px (Empty-State). Markenfarben bewusst hartcodiert (Logo-Charakter, soll in
// Light & Dark gleich aussehen). Nutzung: <ThiAvatar size={22} />.
export default function ThiAvatar({ size = 48, className, title = 'THI' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* Antenne */}
      <line x1="24" y1="7" x2="24" y2="12" stroke="#3BA9D3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="5.5" r="2.6" fill="#CE132D" />
      {/* „Ohren" */}
      <rect x="5.5" y="21" width="3" height="8" rx="1.5" fill="#3BA9D3" />
      <rect x="39.5" y="21" width="3" height="8" rx="1.5" fill="#3BA9D3" />
      {/* Kopf */}
      <rect x="9" y="12" width="30" height="26" rx="9" fill="#1D3661" stroke="#3BA9D3" strokeWidth="2" />
      {/* Augen */}
      <rect x="16" y="20" width="5" height="8" rx="2.5" fill="#3BA9D3" />
      <rect x="27" y="20" width="5" height="8" rx="2.5" fill="#3BA9D3" />
      <circle cx="18.5" cy="22.5" r="1" fill="#EAF6FC" />
      <circle cx="29.5" cy="22.5" r="1" fill="#EAF6FC" />
      {/* Lächeln */}
      <path d="M18 31 Q24 35 30 31" stroke="#3BA9D3" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
