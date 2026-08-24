import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getType } from "@/lib/content-types";
import { getItem, listVersions } from "@/lib/content-store";
import { restoreContentVersion } from "@/app/admin/content/actions";
import { TypeComposer } from "@/components/admin/type-composer";

export const dynamic = "force-dynamic";

export default async function EditContentItemPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  await requireAdmin();
  const { type: typeKey, id } = await params;
  const type = getType(typeKey);
  if (!type) notFound();
  const item = await getItem(id);
  if (!item || item.type !== type.key) notFound();
  const versions = await listVersions(id);

  return (
    <div>
      <h1 className="display text-4xl">Edit {type.label.toLowerCase()}</h1>
      <div className="mt-8">
        <TypeComposer type={type} item={item} />
      </div>

      {versions.length > 0 && (
        <div className="mt-12 max-w-2xl border-t border-border pt-6">
          <p className="label-mono text-ink-faint">Version history (one-click rollback)</p>
          <ul className="mt-3 grid gap-2">
            {versions.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">
                  {String(v.saved_at ?? "").slice(0, 16).replace("T", " ")} · was {v.status} · by {v.saved_by}
                </span>
                <form action={restoreContentVersion}>
                  <input type="hidden" name="item_id" value={id} />
                  <input type="hidden" name="version_id" value={String(v.id)} />
                  <input type="hidden" name="type" value={type.key} />
                  <Button type="submit" variant="outline" size="sm">
                    Restore
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
