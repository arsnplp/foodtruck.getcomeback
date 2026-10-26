"use client";

import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { trackMetaLead } from "@/lib/metaPixel";
import { buildSignupUrl } from "@/lib/forwardParams";
import { CTA_LABEL, SIGNUP_URL } from "@/lib/links";

type LpCTAProps = {
  /** Position pour l'analytics : "lp-ft-hero", "lp-ft-steps"… */
  position: string;
  size?: "md" | "lg" | "xl";
  className?: string;
};

/**
 * Le TrialCTA de la landing : même libellé, même couleur, même destination
 * que sur getcomeback.fr, avec en plus les UTM et le fbclid de la pub
 * transmis à l'inscription (plan=free toujours conservé).
 */
export function LpCTA({ position, size = "xl", className = "" }: LpCTAProps) {
  const [href, setHref] = useState(SIGNUP_URL);

  useEffect(() => {
    setHref(buildSignupUrl(window.location.search));
  }, []);

  return (
    <a
      href={href}
      className={buttonClasses("primary", size, `lp-cta min-h-11 ${className}`)}
      onClick={() => {
        trackEvent("cta_click", { position });
        trackMetaLead(position);
      }}
    >
      {CTA_LABEL}
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0">
        <path
          d="M3 10h13m-5-5 5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
