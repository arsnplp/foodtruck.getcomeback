import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Tout le sous-domaine est la landing des pubs : on la garde hors des
 * moteurs de recherche, mais on laisse passer les robots de Meta qui
 * vérifient la page de destination des annonces et génèrent les aperçus.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["facebookexternalhit", "Facebot", "meta-externalagent"], allow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
  };
}
