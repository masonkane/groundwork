export function LogoIcon({ className = "", color = "#080808" }: { className?: string; color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" className={className}>
      <rect x="187" y="20" width="138" height="108" rx="39" fill={color} />
      <rect x="118" y="162" width="276" height="118" rx="39" fill={color} />
      <rect x="39" y="314" width="434" height="138" rx="44" fill={color} />
    </svg>
  );
}

export function LogoFull({ className = "", color = "#080808" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className="h-7 w-7" color={color} />
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color, letterSpacing: "-0.5px" }}
      >
        Groundwork
      </span>
    </div>
  );
}
