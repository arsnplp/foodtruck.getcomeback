/**
 * Emplacement réservé aux vrais témoignages de food trucks.
 * Rien n'est affiché tant que la liste est vide : n'y mettre que des
 * témoignages réels, avec l'accord écrit du commerçant.
 */
export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  city: string;
};

export const testimonials: Testimonial[] = [];

export function ProofSlot({ items = testimonials }: { items?: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {items.map((t) => (
        <figure key={t.name} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
          <blockquote className="text-ink">« {t.quote} »</blockquote>
          <figcaption className="mt-4 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{t.name}</span>, {t.business} · {t.city}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
