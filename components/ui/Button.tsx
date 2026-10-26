import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "light";
type Size = "md" | "lg" | "xl";

/* btn-anim : pastille de remplissage au survol (voir globals.css),
   adaptée du composant « Interactive Hover Button » de magicui (21st.dev). */
const base =
  "btn-anim group relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-600 active:scale-[0.96]";

const variants: Record<Variant, string> = {
  primary: "bg-gold-500 text-ink shadow-cta hover:-translate-y-0.5 hover:shadow-card-lg [--btn-fill:var(--color-gold-600)]",
  dark: "bg-leaf-700 text-white hover:-translate-y-0.5 [--btn-fill:var(--color-leaf-800)]",
  ghost: "border border-ink/15 bg-transparent text-ink hover:border-leaf-300 [--btn-fill:var(--color-leaf-50)]",
  light: "bg-white text-leaf-800 hover:-translate-y-0.5 shadow-card [--btn-fill:var(--color-leaf-50)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

/** Classes partagées — utilisées aussi par CTALink (version trackée). */
export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  className = "",
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const cls = buttonClasses(variant, size, className);
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
