import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** proof = réassurance avec coche verte ; soft = pill neutre */
  variant?: "proof" | "soft" | "gold";
  className?: string;
};

export function Badge({ children, variant = "proof", className = "" }: BadgeProps) {
  const styles = {
    proof: "bg-leaf-50 text-leaf-800 ring-1 ring-leaf-200",
    soft: "bg-ink/5 text-ink-soft ring-1 ring-ink/10",
    gold: "bg-gold-100 text-gold-700 ring-1 ring-gold-300",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${styles} ${className}`}
    >
      {variant === "proof" && (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-leaf-600" aria-hidden="true">
          <path
            d="M3 8.5 6.5 12 13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {children}
    </span>
  );
}
