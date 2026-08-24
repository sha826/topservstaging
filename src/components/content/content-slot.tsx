import { listItems } from "@/lib/content-store";
import { getType } from "@/lib/content-types";

/**
 * Placement slot (concept doc, layer 4): pages pull published content by
 * type; the content never knows about routing. Renderers per type live
 * here; adding a type's renderer makes it mountable anywhere.
 */
export async function ContentSlot({
  type: typeKey,
  heading,
}: {
  type: string;
  heading?: string;
}) {
  const type = getType(typeKey);
  if (!type) return null;
  const items = await listItems(type.key, true);
  if (items.length === 0) return null;

  if (typeKey === "testimonial") {
    return (
      <section aria-label={type.labelPlural} className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          {heading && (
            <>
              <p className="label-mono text-brand">{type.labelPlural}</p>
              <h2 className="display mt-3 text-4xl">{heading}</h2>
            </>
          )}
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <li key={t.id} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                <blockquote className="text-base leading-relaxed">
                  &ldquo;{t.payload.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-center gap-3 pt-5">
                  {t.payload.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.payload.photoUrl} alt="" className="size-10 rounded-full border border-border object-cover" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{t.payload.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {[t.payload.role, t.payload.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  {t.payload.rating && (
                    <span className="ml-auto text-sm text-brand" aria-label={`${t.payload.rating} stars`}>
                      {"★".repeat(Number(t.payload.rating) || 0)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (typeKey === "team_member") {
    return (
      <section aria-label={type.labelPlural} className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          {heading && (
            <>
              <p className="label-mono text-brand">{type.labelPlural}</p>
              <h2 className="display mt-3 text-4xl">{heading}</h2>
            </>
          )}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((m) => (
              <li key={m.id} className="rounded-lg border border-border bg-card p-6 text-center">
                {m.payload.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.payload.photoUrl} alt={m.payload.name} className="mx-auto size-24 rounded-full border border-border object-cover" />
                )}
                <p className="mt-4 font-semibold">{m.payload.name}</p>
                <p className="text-sm text-brand">{m.payload.role}</p>
                {m.payload.bio && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.payload.bio}</p>
                )}
                {m.payload.certifications && (
                  <p className="label-mono mt-3 text-ink-faint">{m.payload.certifications}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return null;
}
