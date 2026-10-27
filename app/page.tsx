import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { LpCTA } from "@/components/lp/LpCTA";
import { StickyCTA } from "@/components/lp/StickyCTA";
import { ProofSlot } from "@/components/lp/ProofSlot";
import { ScrollFx } from "@/components/lp/ScrollFx";
import { CountUp } from "@/components/lp/CountUp";
import { ProductVideo } from "@/components/lp/ProductVideo";
import { ConsentSettingsLink } from "@/components/lp/ConsentBanner";
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
  /* À remplir avec ses mots exacts, et une photo de son camion sans le nom
     du commerce (ex. "/alexandre-camion.webp"). Vide = non affiché. */
  quote: "",
  photo: "",
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

/* Support : uniquement des engagements réels (installation offerte par
   Arsène, réponse dans la journée par un humain). */
const support: { figure: string; title: string; text: string }[] = [
  {
    figure: "10 min",
    title: "On installe votre carte avec vous",
    text: "Juste après votre inscription, on vous appelle et on règle tout ensemble au téléphone.",
  },
  {
    figure: "1 jour",
    title: "Pour vous répondre, au plus tard",
    text: "Une question ? On vous répond dans la journée. Un vrai humain, pas une IA.",
  },
  {
    figure: "1",
    title: "Seul interlocuteur, toujours le même",
    text: "Pas de centre d'appel. C'est le fondateur lui-même qui vous répond.",
  },
];

/* ---------- Petits composants de la page ---------- */

function Reassurance({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return <p className={`text-sm ${dark ? "text-leaf-100" : "text-ink-soft"} ${className}`}>{CTA_REASSURANCE}</p>;
}

/** Talon de ticket : la preuve d'Alexandre, découpée comme un ticket de caisse. */
function ProofStub({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`lp-stamp relative flex items-center gap-4 rounded-2xl border-2 border-dashed border-leaf-300 bg-white px-4 py-3 sm:px-5 ${className}`}
    >
      {PROOF.photo && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={PROOF.photo} alt="Le food truck d'Alexandre" width={56} height={56} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
      )}
      <span className="shrink-0 whitespace-nowrap font-display text-[2.1rem] font-extrabold leading-none tracking-tight text-ember-700 sm:text-[2.6rem]">
        <CountUp to={18} prefix="+" suffix={"\u00a0%"} />
      </span>
      <figcaption className="leading-tight">
        <span className="block font-semibold text-ink">{PROOF.label}</span>
        <span className="block text-sm text-ink-soft">
          {PROOF.who}. {PROOF.source}.
        </span>
        {PROOF.quote && <q className="mt-1.5 block text-sm italic text-ink">{PROOF.quote}</q>}
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
        <Container wide className="flex h-14 items-center">
          <Logo />
        </Container>
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section className="overflow-hidden pb-14 lg:flex lg:min-h-[calc(100svh-3.5rem)] lg:items-center lg:pb-16">
          <Container wide className="grid items-center gap-10 pt-3 sm:pt-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:pt-4 xl:gap-16">
            <div>
              <p className="only-form mb-4 rounded-2xl bg-leaf-700 px-4 py-3 font-semibold text-white">
                Merci, demande bien reçue ! Dernière étape : créez votre carte en 2 minutes. On vous appelle ensuite pour
                l&apos;installer avec vous.
              </p>
              <h1 className="font-display text-[2.15rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[3.4rem] lg:text-[3.5rem] xl:text-[4.1rem] 2xl:text-[4.5rem]">
                {HERO_TITLE}
              </h1>
              <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-xl lg:mt-6">{HERO_SUBTITLE}</p>

              <ProofStub className="mt-5 max-w-lg lg:mt-7" />

              <div id="hero-cta" className="mt-6 flex lg:mt-8 flex-col items-stretch gap-2 sm:items-start">
                <LpCTA position="lp-ft-hero" className="w-full sm:w-auto" />
                <Reassurance className="text-center sm:text-left" />
              </div>
            </div>

            {/* Visuel : le camion et sa carte, posés sur un grand aplat moutarde */}
            <div className="relative" data-parallax="-0.06">
              <div className="lp-panel absolute inset-x-[-1rem] bottom-0 top-[14%] rounded-[2.5rem] bg-gold-400 sm:inset-x-0 lg:-right-4 lg:left-4" aria-hidden="true" />
              <Image
                src="/foodtruck-hero.webp"
                alt="Un food truck et, à côté, un téléphone qui affiche sa carte de fidélité avec un QR code et des tampons"
                width={720}
                height={572}
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="lp-hero-img relative mx-auto h-auto w-full max-w-[620px] pb-4 lg:max-w-none"
              />
            </div>
          </Container>
        </section>

        {/* ===== 3 étapes ===== */}
        <section className="border-y border-ink/10 bg-white py-16 sm:py-20" aria-labelledby="etapes">
          <Container>
            <h2 id="etapes" data-reveal className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Prêt avant votre prochain service
            </h2>
            <div data-reveal="line" className="mt-10 hidden h-1 rounded-full bg-gold-400 sm:block" aria-hidden="true" />
            <ol className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal style={{ ["--d" as string]: `${i * 180}ms` }} className="relative sm:pr-6">
                  <span data-reveal="stamp" style={{ ["--d" as string]: `${i * 180 + 150}ms` }} className="inline-block font-display text-6xl font-extrabold leading-none text-gold-500" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
            <ProductVideo />
            <div className="mt-12 flex flex-col items-stretch gap-2 sm:items-start">
              <LpCTA position="lp-ft-steps" className="w-full sm:w-auto" />
              <Reassurance className="text-center sm:text-left" />
            </div>
          </Container>
        </section>

        {/* ===== Les moments où ça rapporte ===== */}
        <section className="dot-grid-dark bg-leaf-950 py-16 text-white sm:py-24" aria-labelledby="moments">
          <Container>
            <h2 id="moments" data-reveal className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Un message sur leur écran verrouillé, et ils reviennent
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-leaf-100">
              Gratuit et sans limite de messages, comme un SMS à tous vos clients que vous ne payez pas.
            </p>

            <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {moments.map((m, i) => (
                <article key={m.when} className="grid gap-4">
                  <div data-reveal="notif" style={{ ["--d" as string]: `${(i % 2) * 140}ms` }}>
                    <Notification text={m.notif} />
                  </div>
                  <div data-reveal style={{ ["--d" as string]: `${(i % 2) * 140 + 200}ms` }}>
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
              <h2 id="prix" data-reveal className="font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
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

            <div data-reveal="receipt" className="mx-auto w-full max-w-sm -rotate-1">
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

        {/* ===== Support humain ===== */}
        <section className="bg-cream-2 py-16 sm:py-24" aria-labelledby="support">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div data-reveal>
                <h2 id="support" className="font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  Une vraie personne vous répond. Vite.
                </h2>
                <p className="mt-4 max-w-lg text-lg text-ink-soft">
                  Vous êtes au camion, pas derrière un ordinateur. Alors on fait le plus gros avec vous, et on reste
                  joignable quand vous avez besoin.
                </p>
              </div>

              {/* Carte « appel d'installation » */}
              <figure data-reveal style={{ ["--d" as string]: "150ms" }} className="rounded-[1.75rem] bg-leaf-950 p-6 text-white shadow-card-lg sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-xl font-bold text-ink" aria-hidden="true">
                    AL
                    <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-leaf-950 bg-leaf-400" />
                  </span>
                  <figcaption>
                    <span className="block font-display text-lg font-bold">Arsène Lecoq</span>
                    <span className="block text-sm text-leaf-100">Fondateur de Comeback</span>
                  </figcaption>
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-white">
                  «&nbsp;Chaque food truck qui démarre, je l&apos;installe moi-même au téléphone. Si vous avez une question,
                  c&apos;est moi qui réponds.&nbsp;»
                </blockquote>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-leaf-100">
                  <Icon name="phone" className="h-4 w-4 text-gold-400" />
                  Appel d&apos;installation offert après l&apos;inscription
                </p>
              </figure>
            </div>

            <dl className="mt-14 grid border-t border-ink/15 sm:grid-cols-3">
              {support.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 140}ms` }}
                  className="border-b border-ink/15 py-7 sm:border-b-0 sm:py-8 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
                >
                  <dt>
                    <span className="block font-display text-5xl font-extrabold leading-none tracking-tight text-leaf-700 sm:text-6xl">
                      {item.figure}
                    </span>
                    <span className="mt-3 block font-display text-lg font-bold text-ink">{item.title}</span>
                  </dt>
                  <dd className="mt-1.5 text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
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
            <h2 id="final" data-reveal className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
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
          <ConsentSettingsLink />
        </Container>
      </footer>

      <StickyCTA />
      <ScrollFx />
    </>
  );
}
