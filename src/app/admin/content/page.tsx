import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getEnabledTypes } from "@/lib/content-types";
import { listItems } from "@/lib/content-store";

export const dynamic = "force-dynamic";

/** Content hub: every registered type this site enables, with counts. */
export default async function ContentIndexPage() {
  await requireAdmin();
  const types = getEnabledTypes();
  const counts = await Promise.all(types.map(async (t) => (await listItems(t.key)).length));

  return (
    <div>
      <h1 className="display text-4xl">Content</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Structured content types from the site registry. Each type renders in
        its designated places on the site; publishing notifies the SEO team.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {types.map((t, i) => (
          <li key={t.key}>
            <Link
              href={`/admin/content/${t.key}`}
              className="flex h-full flex-col gap-1 rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand"
            >
              <span className="display text-2xl">{t.labelPlural}</span>
              <span className="text-sm text-muted-foreground">{t.description}</span>
              <span className="label-mono mt-3 text-ink-faint">
                {counts[i]} item{counts[i] === 1 ? "" : "s"} · {t.publishMode === "instant" ? "instant publish" : "review required"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
