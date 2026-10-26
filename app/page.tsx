import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon, IconTile, type IconName } from "@/components/ui/Icon";
import { LpCTA } from "@/components/lp/LpCTA";
import { StickyCTA } from "@/components/lp/StickyCTA";
import { ProofSlot } from "@/components/lp/ProofSlot";
import { LockScreenMockup, NotificationBubble } from "@/components/lp/LockScreenMockup";
import { CTA_REASSURANCE } from "@/lib/links";
import { plans, formatPlanPrice, TRIAL_DAYS } from "@/content/pricing";

/* ============================================================
   Textes à caler sur la pub (message match) : modifier ici.
   ============================================================ */
const HERO_TITLE = "Prévenez tous vos clients de votre emplacement du jour.";
const HERO_SUBTITLE =
  "Votre carte de fidélité dans leur téléphone. En un clic, ils reçoivent votre emplacement et votre menu du jour sur leur écran verrouillé.";
const FINAL_TITLE = "Votre prochain service peut déjà être plein.";

const proPlan = plans.find((p) => p.name === "Pro") ?? plans[0];
const PRO_PRICE = formatPlanPrice(proPlan.price);

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "On crée votre carte ensemble", text: "Au téléphone, 10 minutes, à vos couleurs." },
  {
    icon: "qr",
    title: "Vos clients scannent au camion",
    text: "L'affiche avec QR code est prête à imprimer. La carte s'ajoute au Wallet, sans appli.",
  },
  {
    icon: "send",
    title: "Vous les prévenez en un clic",
    text: "Emplacement du jour, menu, offre : ils reçoivent tout sur leur écran verrouillé.",
  },
];

const moments: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "mapPin",
    title: "Vous changez d'emplacement",
    text: "Mardi au marché, jeudi devant la zone d'activité. Vos clients savent où vous trouver, sans chercher sur Instagram.",
  },
  {
    icon: "calendar",
    title: "La saison reprend",
    text: "Le premier jour, tous vos habitués reçoivent un message. Vous ne repartez pas de zéro.",
  },
  {
    icon: "repeat",
    title: "Un client ne revient plus",
    text: "Pas venu depuis trois semaines ? Une relance part toute seule, avec un petit avantage.",
  },
  {
    icon: "clock",
    title: "Le service est calme",
    text: "Une heure creuse ? Un message, un dessert offert, et le camion se remplit.",
  },
];

const guarantees = ["Apple Wallet et Google Wallet", "Aucune appli à télécharger", "Données exportables", "Conçu en France"];

const faq = [
  {
    question: "Mes clients doivent-ils télécharger une application ?",
    answer:
      "Non. Ils scannent le QR code au camion et la carte s'ajoute dans Apple Wallet ou Google Wallet, déjà installés sur leur téléphone.",
  },
  {
    question: "Combien de temps pour démarrer ?",
    answer:
      "2 minutes pour créer votre compte. Ensuite on vous appelle et on configure votre carte avec vous en 10 minutes. Elle est active le jour même.",
  },
  {
    question: "Pourquoi une carte bancaire pour l'essai ?",
    answer: `Pour que votre programme continue sans coupure si ça marche. Rien n'est prélevé pendant ${TRIAL_DAYS} jours, et vous pouvez résilier en un clic avant la fin.`,
  },
  {
    question: "Je peux arrêter quand je veux ?",
    answer: "Oui. Vous résiliez en un clic depuis votre compte, sans engagement et sans frais.",
  },
];

function Reassurance({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return <p className={`text-sm ${dark ? "text-leaf-100" : "text-ink-soft"} ${className}`}>{CTA_REASSURANCE}</p>;
}

function CTABlock({ position, center = true }: { position: string; center?: boolean }) {
  return (
    <div className={`mt-10 flex flex-col gap-2 ${center ? "items-center text-center" : "items-start"}`}>
      <LpCTA position={position} className="w-full sm:w-auto" />
      <Reassurance />
    </div>
  );
}

export default function LandingFoodTruck() {
  return (
    <>
      {/* En-tête minimal : logo seul, pas de navigation */}
      <header className="border-b border-ink/5">
        <Container className="flex h-14 items-center">
          <Logo />
          <span className="sr-only">Comeback, carte de fidélité pour food truck</span>
        </Container>
      </header>

      <main>
        {/* ===== 1. Hero ===== */}
        <section className="relative overflow-hidden">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
          <Container className="relative grid items-center gap-10 pb-14 pt-5 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-20 lg:pt-16">
            <div>
              {/* Mobile : la notification est visible dès le premier écran */}
              <NotificationBubble className="mb-5 lg:hidden" />

              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-leaf-50 px-3 py-1 text-sm font-semibold text-leaf-800 ring-1 ring-leaf-200">
                <Icon name="truck" className="h-4 w-4" />
                Pour les food trucks
              </p>
              <h1 className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
                {HERO_TITLE}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{HERO_SUBTITLE}</p>

              <div id="hero-cta" className="mt-6 flex flex-col items-stretch gap-2 sm:items-start">
                <LpCTA position="lp-ft-hero" className="w-full sm:w-auto" />
                <Reassurance className="text-center sm:text-left" />
              </div>
              <p className="mt-4 hidden text-sm text-ink-soft sm:block">
                2 minutes pour créer votre compte, puis on vous appelle pour installer votre carte.
              </p>
            </div>

            <div className="lg:justify-self-end">
              <LockScreenMockup />
            </div>
          </Container>
        </section>

        {/* ===== 2. Comment ça marche ===== */}
        <section className="bg-cream-2 py-16 sm:py-20" aria-labelledby="etapes">
          <Container>
            <h2 id="etapes" className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt en 3 étapes
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="group rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
                  <div className="flex items-center gap-3">
                    <IconTile name={s.icon} />
                    <span className="font-display text-sm font-bold text-ember-700">Étape {i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
            <CTABlock position="lp-ft-steps" />
          </Container>
        </section>

        {/* ===== 3. Les moments où ça rapporte ===== */}
        <section className="py-16 sm:py-20" aria-labelledby="moments">
          <Container>
            <h2 id="moments" className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Les moments où ça vous ramène du monde
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-ink-soft">
              Chaque message arrive sur l&apos;écran verrouillé de vos clients. Gratuit et sans limite, comme un SMS
              que vous ne payez pas.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {moments.map((m) => (
                <article key={m.title} className="group flex gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
                  <IconTile name={m.icon} tone="gold" />
                  <div>
                    <h3 className="font-display text-lg font-bold">{m.title}</h3>
                    <p className="mt-1.5 text-ink-soft">{m.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-ink-soft">
              En bonus : des mini-jeux (roue, carte à gratter) joués avec les points, et le parrainage pour que vos
              clients fassent venir leurs amis.
            </p>
          </Container>
        </section>

        {/* ===== 4. Ce que ça coûte ===== */}
        <section className="bg-cream-2 py-16 sm:py-20" aria-labelledby="prix">
          <Container className="max-w-3xl text-center">
            <h2 id="prix" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ce que ça vous coûte
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-ink">
              <strong>{TRIAL_DAYS} jours gratuits. 0 € aujourd&apos;hui.</strong> Ensuite à partir de{" "}
              <strong>
                {PRO_PRICE} € par mois
              </strong>
              , résiliable en un clic.
            </p>
            <p className="mt-4 text-ink-soft">
              On vous demande une carte pour que votre programme continue sans coupure si ça marche. Rien n&apos;est
              prélevé pendant {TRIAL_DAYS} jours.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-ink shadow-card ring-1 ring-ink/5">
              <Icon name="truck" className="h-5 w-5 text-leaf-700" />
              Plusieurs camions ? Un seul compte pour tous.
            </p>
            <CTABlock position="lp-ft-price" />
          </Container>
        </section>

        {/* ===== 5. Le fondateur ===== */}
        <section className="py-16 sm:py-20" aria-labelledby="fondateur">
          <Container className="max-w-3xl">
            <h2 id="fondateur" className="sr-only">
              Le fondateur
            </h2>
            <figure className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8">
              <blockquote className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                «&nbsp;Chaque food truck qui démarre, je l&apos;installe moi-même au téléphone. Si vous avez une question,
                c&apos;est moi qui réponds.&nbsp;»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-700 font-display text-lg font-bold text-white" aria-hidden="true">
                  AL
                </span>
                <span>
                  <span className="block font-semibold text-ink">Arsène Lecoq</span>
                  <span className="block text-sm text-ink-soft">Fondateur de Comeback</span>
                </span>
              </figcaption>
            </figure>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {guarantees.map((g) => (
                <li key={g} className="inline-flex items-center gap-1.5 rounded-full bg-leaf-50 px-3 py-1.5 text-sm font-medium text-leaf-800 ring-1 ring-leaf-200">
                  <Icon name="checkCircle" className="h-4 w-4 text-leaf-600" />
                  {g}
                </li>
              ))}
            </ul>
            <ProofSlot />
          </Container>
        </section>

        {/* ===== 6. FAQ ===== */}
        <section className="bg-cream-2 py-16 sm:py-20" aria-labelledby="faq">
          <Container className="max-w-3xl">
            <h2 id="faq" className="mb-8 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Vos questions
            </h2>
            <div className="divide-y divide-ink/10 rounded-3xl bg-white shadow-card ring-1 ring-ink/5">
              {faq.map((item, i) => (
                <details key={item.question} className="group/faq" open={i === 0}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink transition-colors hover:bg-leaf-50/50 sm:px-8 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base sm:text-lg">{item.question}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700 ring-1 ring-leaf-200 transition-transform duration-300 group-open/faq:rotate-45" aria-hidden="true">
                      <svg viewBox="0 0 16 16" className="h-4 w-4">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-ink-soft sm:px-8 sm:text-lg">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ===== 7. CTA final ===== */}
        <section id="cta-final" className="dot-grid-dark bg-leaf-950 py-16 text-white sm:py-24" aria-labelledby="final">
          <Container className="max-w-3xl text-center">
            <h2 id="final" className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {FINAL_TITLE}
            </h2>
            <p className="mt-4 text-lg text-leaf-100">
              2 minutes pour créer votre compte, puis on vous appelle pour installer votre carte.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <LpCTA position="lp-ft-final" className="w-full sm:w-auto" />
              <Reassurance dark />
            </div>
          </Container>
        </section>
      </main>

      {/* Pied de page minimal */}
      <footer className="bg-leaf-950 pb-24 pt-2 text-sm text-leaf-100 md:pb-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-6">
          <span>© {new Date().getFullYear()} Comeback</span>
          <a href="https://getcomeback.fr/mentions-legales" className="py-2 underline-offset-4 hover:underline">
            Mentions légales
          </a>
          <a href="https://getcomeback.fr/politique-confidentialite" className="py-2 underline-offset-4 hover:underline">
            Confidentialité
          </a>
        </Container>
      </footer>

      <StickyCTA />
    </>
  );
}
