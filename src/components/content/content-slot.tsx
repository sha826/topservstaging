import { listItems } from "@/lib/content-store";
import { getType, splitList } from "@/lib/content-types";

/**
 * Placement slot: pages pull published content by type; the content never
 * knows about routing. Renderers per type live here; adding a type's
 * renderer makes it mountable anywhere.
 */
export async function ContentSlot({
  type: typeKey,
  heading,
  tag,
  limit,
}: {
  type: string;
  heading?: string;
  /** Placement filter: only items tagged with this value render here. */
  tag?: string;
  limit?: number;
}) {
  const type = getType(typeKey);
  if (!type) return null;
  const items = await listItems(type.key, true, { tag, limit });
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

  if (typeKey === "project_update") {
    return (
      <section aria-label={type.labelPlural} className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          {heading && (
            <>
              <p className="label-mono text-brand">Recent work</p>
              <h2 className="display mt-3 text-4xl">{heading}</h2>
            </>
          )}
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const photos: string[] = (() => {
                try {
                  const a = JSON.parse(p.payload.photos || "[]");
                  return Array.isArray(a) ? a : [];
                } catch {
                  return [];
                }
              })();
              return (
                <li key={p.id} className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                  {photos[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photos[0]} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="label-mono text-ink-faint">{p.payload.location}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug">{p.payload.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.payload.description}</p>
                    <p className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {splitList(p.payload.services ?? "").map((s) => (
                        <span key={s} className="rounded-full border border-brand/40 px-2.5 py-0.5 text-xs text-brand">
                          {s}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  if (typeKey === "press_release") {
    return (
      <section aria-label={type.labelPlural}>
        <div className="mx-auto max-w-3xl px-5 py-14">
          {heading && <h2 className="display text-4xl">{heading}</h2>}
          <ul className="mt-8 grid gap-6">
            {items
              .slice()
              .sort((a, b) => (b.payload.date ?? "").localeCompare(a.payload.date ?? ""))
              .map((r) => (
                <li key={r.id} className="rounded-lg border border-border bg-card p-7">
                  <p className="label-mono text-ink-faint">{r.payload.date}</p>
                  <h3 className="mt-2 text-2xl font-bold leading-snug">{r.payload.title}</h3>
                  {r.payload.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.payload.imageUrl} alt="" loading="lazy" className="mt-4 aspect-[2/1] w-full rounded-md border border-border object-cover" />
                  )}
                  <div className="mt-4 grid gap-3 text-base leading-relaxed text-muted-foreground">
                    {(r.payload.body ?? "").split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  {r.payload.documentUrl && (
                    <a href={r.payload.documentUrl} className="label-mono mt-4 inline-block text-brand underline underline-offset-2">
                      Download document
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  }

  if (typeKey === "banner") {
    const b = items[0];
    return (
      <div role="region" aria-label="Announcement" className="border-b border-brand/30 bg-brand/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center text-sm">
          <span className="font-semibold">{b.payload.message}</span>
          {b.payload.linkUrl && (
            <a href={b.payload.linkUrl} className="text-brand underline underline-offset-2">
              {b.payload.linkLabel || "Learn more"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return null;
}
