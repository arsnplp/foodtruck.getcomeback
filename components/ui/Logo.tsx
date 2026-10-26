/** Logo Comeback : tampon coché + wordmark. `light` pour fonds sombres. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 36 36" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r="16.5"
          fill="none"
          stroke={light ? "#FFC44E" : "#FFAF1F"}
          strokeWidth="1.8"
          strokeDasharray="3.6 3.8"
        />
        <circle cx="18" cy="18" r="12" fill={light ? "#DCEFE2" : "#0B6236"} />
        <path
          d="M12.5 18.5 16 22 24 13.5"
          fill="none"
          stroke={light ? "#0B6236" : "#fff"}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-display text-[1.4rem] font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}
      >
        comeback<span className={light ? "text-gold-400" : "text-gold-600"}>.</span>
      </span>
    </span>
  );
}
