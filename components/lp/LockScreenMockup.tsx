/**
 * Écran verrouillé d'iPhone en HTML/CSS : notification du food truck +
 * carte de fidélité Comeback. Nom de camion fictif, volontairement générique.
 */

export const DEMO_TRUCK = "Le Camion Gourmand";
export const DEMO_NOTIFICATION = "Aujourd'hui 11 h 30, place du Marché. Menu du jour : burger maison.";

function TruckGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6.5" width="11" height="9.5" rx="1.5" />
      <path d="M14 10h3.5L20 13v3h-6" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
    </svg>
  );
}

/** La notification seule, telle qu'elle arrive sur l'écran verrouillé. */
export function NotificationBubble({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl bg-white/90 p-3 text-left shadow-card ring-1 ring-ink/5 backdrop-blur ${className}`}>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf-700 text-gold-400">
        <TruckGlyph />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-bold text-ink">{DEMO_TRUCK}</span>
          <span className="text-[11px] text-ink-soft">maintenant</span>
        </span>
        <span className="block text-[13px] leading-snug text-ink">{DEMO_NOTIFICATION}</span>
      </span>
    </div>
  );
}

export function LockScreenMockup() {
  return (
    <div className="mx-auto w-[270px] sm:w-[300px]" role="img" aria-label={`Écran verrouillé d'un téléphone : notification de ${DEMO_TRUCK} et sa carte de fidélité dans le Wallet`}>
      <div className="rounded-[3rem] bg-ink p-[10px] shadow-card-lg ring-1 ring-black/20">
        <div className="relative aspect-[390/812] overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-leaf-900 via-leaf-800 to-leaf-950">
          <div className="absolute left-1/2 top-2.5 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />

          {/* Heure de l'écran verrouillé */}
          <div className="pt-12 text-center text-white">
            <p className="text-[12px] font-medium text-leaf-100">vendredi 14 juin</p>
            <p className="font-display text-[56px] font-semibold leading-none tracking-tight">10:52</p>
          </div>

          <NotificationBubble className="mx-3 mt-6" />

          {/* Carte de fidélité */}
          <div className="mx-3 mt-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 p-4 text-ink shadow-card-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold">{DEMO_TRUCK}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/70">Carte de fidélité</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-gold-400">
                <TruckGlyph />
              </span>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {Array.from({ length: 10 }).map((_, i) =>
                i < 7 ? (
                  <span key={i} className="flex aspect-square items-center justify-center rounded-full bg-ink">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                      <path d="M4 8.5 6.5 11 12 5" fill="none" stroke="#FFC44E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : (
                  <span key={i} className="aspect-square rounded-full border-2 border-dashed border-ink/35" />
                ),
              )}
            </div>
            <p className="mt-3 text-[11px] font-medium">7/10 · le 10e menu est offert</p>
          </div>

          <p className="mx-auto mt-3 w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium text-white">
            Apple Wallet et Google Wallet
          </p>
        </div>
      </div>
    </div>
  );
}
