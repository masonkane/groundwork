export default function LogoPreview() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", padding: "60px 40px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: "#080808" }}>Logo Icon Variations</h1>
      <p style={{ fontSize: 14, color: "#666", marginBottom: 60 }}>Same Groundwork wordmark. 5 icon options. Pick a number.</p>

      {/* 1. Foundation Block */}
      <Section name="1. Foundation Block" desc="Single solid block with upward extension. Strong base, upward momentum.">
        <svg viewBox="0 0 86 86" fill="none" width="86" height="86">
          <rect x="0" y="24" width="86" height="62" rx="12" fill="#080808" />
          <rect x="28" y="0" width="30" height="44" rx="8" fill="#080808" />
        </svg>
        <svg viewBox="0 0 600 104" fill="none" width="500" height="90">
          <rect x="8" y="28" width="82" height="62" rx="12" fill="#080808" />
          <rect x="34" y="4" width="30" height="44" rx="8" fill="#080808" />
          <text x="115" y="72" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill="#080808">Groundwork</text>
        </svg>
      </Section>

      {/* 2. Stacked Layers */}
      <Section name="2. Stacked Layers" desc="Four horizontal bars, top two narrower. Layers of foundation being laid.">
        <svg viewBox="0 0 86 86" fill="none" width="86" height="86">
          <rect x="24" y="6" width="38" height="12" rx="6" fill="#080808" />
          <rect x="12" y="26" width="62" height="12" rx="6" fill="#080808" />
          <rect x="0" y="48" width="86" height="14" rx="7" fill="#080808" />
          <rect x="0" y="70" width="86" height="16" rx="8" fill="#080808" />
        </svg>
        <svg viewBox="0 0 600 104" fill="none" width="500" height="90">
          <rect x="32" y="10" width="38" height="12" rx="6" fill="#080808" />
          <rect x="20" y="30" width="62" height="12" rx="6" fill="#080808" />
          <rect x="8" y="52" width="86" height="14" rx="7" fill="#080808" />
          <rect x="8" y="74" width="86" height="16" rx="8" fill="#080808" />
          <text x="115" y="72" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill="#080808">Groundwork</text>
        </svg>
      </Section>

      {/* 3. Corner Bracket */}
      <Section name="3. Corner Bracket" desc="Bold L-shaped bracket. Structural, architectural, minimal.">
        <svg viewBox="0 0 86 86" fill="none" width="86" height="86">
          <path d="M4 4 H20 V66 H82 V82 H4 Z" fill="#080808" rx="4" />
        </svg>
        <svg viewBox="0 0 600 104" fill="none" width="500" height="90">
          <path d="M8 8 H24 V70 H86 V86 H8 Z" fill="#080808" />
          <text x="115" y="72" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill="#080808">Groundwork</text>
        </svg>
      </Section>

      {/* 4. Grid Foundation */}
      <Section name="4. Grid Foundation" desc="2x2 grid of rounded squares. Modular, systematic, building blocks.">
        <svg viewBox="0 0 86 86" fill="none" width="86" height="86">
          <rect x="0" y="0" width="38" height="38" rx="10" fill="#080808" />
          <rect x="48" y="0" width="38" height="38" rx="10" fill="#080808" />
          <rect x="0" y="48" width="38" height="38" rx="10" fill="#080808" />
          <rect x="48" y="48" width="38" height="38" rx="10" fill="#080808" />
        </svg>
        <svg viewBox="0 0 600 104" fill="none" width="500" height="90">
          <rect x="8" y="10" width="38" height="38" rx="10" fill="#080808" />
          <rect x="54" y="10" width="38" height="38" rx="10" fill="#080808" />
          <rect x="8" y="56" width="38" height="38" rx="10" fill="#080808" />
          <rect x="54" y="56" width="38" height="38" rx="10" fill="#080808" />
          <text x="115" y="72" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill="#080808">Groundwork</text>
        </svg>
      </Section>

      {/* 5. Abstract G */}
      <Section name="5. Abstract G" desc="Geometric G letterform. Bold, ownable, doubles as a monogram.">
        <svg viewBox="0 0 86 86" fill="none" width="86" height="86">
          <path d="M43 0 C19.3 0 0 19.3 0 43 C0 66.7 19.3 86 43 86 C56 86 67.5 80 75 70.5 L75 43 L47 43 L47 55 L62 55 L62 64 C57 69.5 50.5 73 43 73 C26.4 73 13 59.6 13 43 C13 26.4 26.4 13 43 13 C53 13 61.7 18 67 25.5 L77.5 17 C70 7 57.5 0 43 0 Z" fill="#080808" />
        </svg>
        <svg viewBox="0 0 600 104" fill="none" width="500" height="90">
          <g transform="translate(8, 4) scale(0.96)">
            <path d="M43 0 C19.3 0 0 19.3 0 43 C0 66.7 19.3 86 43 86 C56 86 67.5 80 75 70.5 L75 43 L47 43 L47 55 L62 55 L62 64 C57 69.5 50.5 73 43 73 C26.4 73 13 59.6 13 43 C13 26.4 26.4 13 43 13 C53 13 61.7 18 67 25.5 L77.5 17 C70 7 57.5 0 43 0 Z" fill="#080808" />
          </g>
          <text x="115" y="72" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill="#080808">Groundwork</text>
        </svg>
      </Section>
    </div>
  );
}

function Section({ name, desc, children }: { name: string; desc: string; children: React.ReactNode }) {
  const svgs = Array.isArray(children) ? children : [children];
  return (
    <div style={{ marginBottom: 80, borderBottom: "1px solid #E5E5E5", paddingBottom: 60 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#080808", marginBottom: 4 }}>{name}</h2>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div>
          <p style={{ fontSize: 11, color: "#999", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Icon</p>
          {svgs[0]}
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#999", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Full Logo</p>
          {svgs[1]}
        </div>
      </div>
    </div>
  );
}
