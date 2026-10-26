import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LpCTA } from "@/components/lp/LpCTA";
import { StickyCTA } from "@/components/lp/StickyCTA";
import { ProofSlot } from "@/components/lp/ProofSlot";
import { CTA_REASSURANCE } from "@/lib/links";
import { plans, formatPlanPrice, TRIAL_DAYS } from "@/content/pricing";

/* ============================================================
   Textes à caler sur la pub (message match) : modifier ici.
   ============================================================ */
const HERO_TITLE = "Vos clients reviennent plus souvent à votre camion.";
const HERO_SUBTITLE =
  "Votre carte de fidélité dans leur téléphone. En un clic, ils reçoivent votre plat du jour et vos offres sur leur écran verrouillé.";
const FINAL_TITLE = "Votre prochain service peut déjà être plein.";

/* Preuve réelle : chiffres relevés sur la caisse du food truck, transmis par
   le gérant, qui accepte d'être cité par son prénom (sans son commerce). */
const PROOF = {
  figure: "+18 %",
  label: "de chiffre d'affaires en 2 mois",
  who: "Alexandre, gérant d'un food truck",
  source: "Chiffres relevés sur sa caisse",
};

const proPlan = plans.find((p) => p.name === "Pro") ?? plans[0];
const PRO_PRICE = formatPlanPrice(proPlan.price);

const steps = [
  { title: "On crée votre carte ensemble", text: "Au téléphone, 10 minutes, à vos couleurs." },
  { title: "Vos clients scannent au camion", text: "L'affiche avec QR code est prête à imprimer. La carte va dans leur Wallet, sans appli." },
  { title: "Vous les faites revenir en un clic", text: "Plat du jour, nouveauté, offre : le message arrive sur leur écran verrouillé." },
];

const moments: { when: string; title: string; text: string; notif: string }[] = [
  {
    when: "Vous sortez un nouveau plat",
    title: "Tout le monde le sait dans la minute",
    text: "Pas au hasard d'un post Instagram que la moitié de vos clients ne verra jamais.",
    notif: "Nouveau cette semaine : le burger chèvre miel. Venez le goûter !",
  },
  {
    when: "Le service est calme",
    title: "Un message, et le camion se remplit",
    text: "Une heure creuse ? Un dessert offert pour les 20 prochains, envoyé en deux clics.",
    notif: "Jusqu'à 14 h : dessert offert avec votre menu. Montrez votre carte.",
  },
  {
    when: "Un client ne revient plus",
    title: "La relance part toute seule",
    text: "Pas venu depuis trois semaines ? Il reçoit un petit avantage pour revenir, sans que vous y pensiez.",
    notif: "Ça fait longtemps ! Votre boisson est offerte cette semaine.",
  },
  {
    when: "La saison reprend",
    title: "Vous ne repartez pas de zéro",
    text: "Le premier jour, tous vos habitués reçoivent un message. Ils savent tout de suite que vous êtes de retour.",
    notif: "On est de retour ! Ouverture ce mardi midi, on vous attend.",
  },
];

const receiptLines: { label: string; value: string }[] = [
  { label: "Installation avec vous au téléphone", value: "offerte" },
  { label: "Carte Apple Wallet et Google Wallet", value: "incluse" },
  { label: "Affiche QR code prête à imprimer", value: "incluse" },
  { label: "Relances automatiques", value: "incluses" },
  { label: `${TRIAL_DAYS} premiers jours`, value: "0 €" },
];

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

const guarantees: { icon: IconName; text: string }[] = [
  { icon: "smartphone", text: "Aucune appli à télécharger" },
  { icon: "card", text: "Apple Wallet et Google Wallet" },
  { icon: "download", text: "Vos données exportables" },
  { icon: "leaf", text: "Conçu en France" },
];

/* ---------- Petits composants de la page ---------- */

function Reassurance({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return <p className={`text-sm ${dark ? "text-leaf-100" : "text-ink-soft"} ${className}`}>{CTA_REASSURANCE}</p>;
}

/** Talon de ticket : la preuve d'Alexandre, découpée comme un ticket de caisse. */
function ProofStub({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative flex items-center gap-4 rounded-2xl border-2 border-dashed border-leaf-300 bg-white px-4 py-3 sm:px-5 ${className}`}
    >
      <span className="shrink-0 whitespace-nowrap font-display text-[2.1rem] font-extrabold leading-none tracking-tight text-ember-700 sm:text-[2.6rem]">
        {PROOF.figure}
      </span>
      <figcaption className="leading-tight">
        <span className="block font-semibold text-ink">{PROOF.label}</span>
        <span className="block text-sm text-ink-soft">
          {PROOF.who}. {PROOF.source}.
        </span>
      </figcaption>
    </figure>
  );
}

function Notification({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/95 p-3.5 text-left shadow-card-lg">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf-700 text-gold-400">
        <Icon name="truck" className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-bold text-ink">Votre camion</span>
          <span className="text-[11px] text-ink-soft">maintenant</span>
        </span>
        <span className="block text-[14px] leading-snug text-ink">{text}</span>
      </span>
    </div>
  );
}

/* ---------- Page ---------- */

export default function LandingFoodTruck() {
  return (
    <>
      <header>
        <Container className="flex h-14 items-center">
          <Logo />
        </Container>
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section className="overflow-hidden pb-14 lg:pb-20">
          <Container className="grid items-center gap-10 pt-3 sm:pt-8 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pt-10">
            <div>
              <h1 className="font-display text-[2.15rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.1rem]">
                {HERO_TITLE}
              </h1>
              <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft sm:text-xl">{HERO_SUBTITLE}</p>

              <ProofStub className="mt-5 max-w-md" />

              <div id="hero-cta" className="mt-5 flex flex-col items-stretch gap-2 sm:items-start">
                <LpCTA position="lp-ft-hero" className="w-full sm:w-auto" />
                <Reassurance className="text-center sm:text-left" />
              </div>
            </div>

            {/* Visuel : le camion et sa carte, posés sur un grand aplat moutarde */}
            <div className="relative">
              <div className="absolute inset-x-[-1rem] bottom-0 top-[14%] rounded-[2.5rem] bg-gold-400 sm:inset-x-0 lg:-right-24 lg:left-6" aria-hidden="true" />
              <Image
                src="/foodtruck-hero.webp"
                alt="Un food truck et, à côté, un téléphone qui affiche sa carte de fidélité avec un QR code et des tampons"
                width={720}
                height={572}
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="relative mx-auto h-auto w-full max-w-[620px] pb-4"
              />
            </div>
          </Container>
        </section>

        {/* ===== 3 étapes ===== */}
        <section className="border-y border-ink/10 bg-white py-16 sm:py-20" aria-labelledby="etapes">
          <Container>
            <h2 id="etapes" className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Prêt avant votre prochain service
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="relative sm:pr-6">
                  <span className="font-display text-6xl font-extrabold leading-none text-gold-500" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-col items-stretch gap-2 sm:items-start">
              <LpCTA position="lp-ft-steps" className="w-full sm:w-auto" />
              <Reassurance className="text-center sm:text-left" />
            </div>
          </Container>
        </section>

        {/* ===== Les moments où ça rapporte ===== */}
        <section className="dot-grid-dark bg-leaf-950 py-16 text-white sm:py-24" aria-labelledby="moments">
          <Container>
            <h2 id="moments" className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Un message sur leur écran verrouillé, et ils reviennent
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-leaf-100">
              Gratuit et sans limite de messages, comme un SMS à tous vos clients que vous ne payez pas.
            </p>

            <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {moments.map((m) => (
                <article key={m.when} className="grid gap-4">
                  <Notification text={m.notif} />
                  <div>
                    <p className="text-sm font-semibold text-gold-400">{m.when}</p>
                    <h3 className="mt-1 font-display text-xl font-bold">{m.title}</h3>
                    <p className="mt-1.5 text-leaf-100">{m.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-12 max-w-2xl text-leaf-100">
              En plus : des mini-jeux (roue, carte à gratter) joués avec les points, et le parrainage pour que vos
              clients fassent venir leurs amis.
            </p>
          </Container>
        </section>

        {/* ===== Prix : le ticket de caisse ===== */}
        <section className="py-16 sm:py-24" aria-labelledby="prix">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 id="prix" className="font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
                Le prix d&apos;un menu par mois
              </h2>
              <p className="mt-4 max-w-md text-lg text-ink-soft">
                Ailleurs, une carte de fidélité digitale coûte souvent 25 à 40 € par mois. Chez nous, l&apos;installation
                est faite avec vous, au téléphone.
              </p>
              <p className="mt-4 max-w-md text-ink-soft">
                On vous demande une carte bancaire pour que votre programme continue sans coupure si ça marche. Rien
                n&apos;est prélevé pendant {TRIAL_DAYS} jours.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 font-semibold text-ink">
                <Icon name="truck" className="h-5 w-5 text-leaf-700" />
                Plusieurs camions ? Un seul compte pour tous.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm -rotate-1">
              <div className="receipt bg-white px-6 pb-8 pt-7 shadow-card-lg">
                <p className="text-center font-display text-lg font-bold">Comeback</p>
                <p className="text-center text-sm text-ink-soft">Votre ticket</p>
                <ul className="mt-5 space-y-2.5 border-t border-dashed border-ink/25 pt-5 text-[15px]">
                  {receiptLines.map((l) => (
                    <li key={l.label} className="flex items-baseline gap-2">
                      <span className="text-ink">{l.label}</span>
                      <span className="flex-1 border-b border-dotted border-ink/25" aria-hidden="true" />
                      <span className="font-semibold text-leaf-700">{l.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-dashed border-ink/25 pt-5">
                  <p className="text-sm text-ink-soft">Ensuite, à partir de</p>
                  <p className="font-display text-6xl font-extrabold leading-none tracking-tight text-ink">
                    {PRO_PRICE}&nbsp;€
                    <span className="ml-1 text-xl font-bold text-ink-soft">/mois</span>
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">Résiliable en un clic. {proPlan.description}</p>
                </div>
              </div>
            </div>
          </Container>
          <Container className="mt-12 flex flex-col items-stretch gap-2 sm:items-center">
            <LpCTA position="lp-ft-price" className="w-full sm:w-auto" />
            <Reassurance className="text-center" />
          </Container>
        </section>

        {/* ===== Fondateur ===== */}
        <section className="bg-cream-2 py-16 sm:py-20" aria-labelledby="fondateur">
          <Container className="max-w-3xl">
            <h2 id="fondateur" className="sr-only">
              Qui vous accompagne
            </h2>
            <figure>
              <blockquote className="font-display text-2xl font-semibold leading-snug text-ink sm:text-[2rem]">
                «&nbsp;Chaque food truck qui démarre, je l&apos;installe moi-même au téléphone. Si vous avez une question,
                c&apos;est moi qui réponds.&nbsp;»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-700 font-display text-lg font-bold text-white" aria-hidden="true">
                  AL
                </span>
                <span>
                  <span className="block font-semibold text-ink">Arsène Lecoq</span>
                  <span className="block text-sm text-ink-soft">Fondateur de Comeback</span>
                </span>
              </figcaption>
            </figure>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {guarantees.map((g) => (
                <li key={g.text} className="flex flex-col gap-2 text-sm font-medium text-ink">
                  <Icon name={g.icon} className="h-6 w-6 text-leaf-700" />
                  {g.text}
                </li>
              ))}
            </ul>
            <ProofSlot />
          </Container>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-16 sm:py-20" aria-labelledby="faq">
          <Container className="max-w-3xl">
            <h2 id="faq" className="mb-8 font-display text-3xl font-bold tracking-tight sm:text-[2.6rem]">
              Vos questions
            </h2>
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {faq.map((item, i) => (
                <details key={item.question} className="group/faq" open={i === 0}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base sm:text-lg">{item.question}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-100 text-ink transition-transform duration-300 group-open/faq:rotate-45" aria-hidden="true">
                      <svg viewBox="0 0 16 16" className="h-4 w-4">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="pb-6 text-ink-soft sm:text-lg">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ===== CTA final ===== */}
        <section id="cta-final" className="dot-grid-dark bg-leaf-950 py-16 text-white sm:py-24" aria-labelledby="final">
          <Container className="max-w-3xl text-center">
            <h2 id="final" className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {FINAL_TITLE}
            </h2>
            <p className="mt-5 text-lg text-leaf-100">
              2 minutes pour créer votre compte, puis on vous appelle pour installer votre carte.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <LpCTA position="lp-ft-final" className="w-full sm:w-auto" />
              <Reassurance dark />
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-leaf-950 pb-28 pt-6 text-sm text-leaf-100 md:pb-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
