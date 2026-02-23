export function LogoIcon({ className = "", color = "#080808" }: { className?: string; color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" fill="none" className={className}>
      <rect x="29" y="0" width="27" height="22" rx="8" fill={color} />
      <rect x="16" y="26" width="54" height="24" rx="8" fill={color} />
      <rect x="0" y="54" width="86" height="28" rx="9" fill={color} />
    </svg>
  );
}

export function LogoFull({ className = "", color = "#080808" }: { className?: string; color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 104" fill="none" className={className}>
      <rect x="37" y="4" width="27" height="22" rx="8" fill={color} />
      <rect x="24" y="30" width="54" height="24" rx="8" fill={color} />
      <rect x="8" y="58" width="86" height="28" rx="9" fill={color} />
      <text x="120" y="70" fontFamily="'Plus Jakarta Sans', Helvetica, Arial, sans-serif" fontWeight="700" fontSize="50" letterSpacing="-1" fill={color}>Groundwork</text>
    </svg>
  );
}
