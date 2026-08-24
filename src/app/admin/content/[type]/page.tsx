import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getType } from "@/lib/content-types";
import { listItems } from "@/lib/content-store";
import { deleteContentItem } from "@/app/admin/content/actions";

export const dynamic = "force-dynamic";

export default async function ContentTypeListPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const { type: typeKey } = await params;
  const sp = await searchParams;
  const type = getType(typeKey);
  if (!type) notFound();
  const items = await listItems(type.key);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-4xl">{type.labelPlural}</h1>
        <Button asChild>
          <Link href={`/admin/content/${type.key}/new`}>New {type.label.toLowerCase()}</Link>
        </Button>
      </div>
      {(sp.saved || sp.deleted || sp.restored) && (
        <p role="status" className="mt-4 rounded-md border border-brand/40 bg-brand/10 px-4 py-2.5 text-sm text-brand">
          {sp.saved ? "Saved." : sp.deleted ? "Deleted." : "Version restored."}
        </p>
      )}
      <ul className="mt-8 grid gap-3">
        {items.length === 0 && (
          <li className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No {type.labelPlural.toLowerCase()} yet.
          </li>
        )}
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{item.payload[type.titleKey] ?? "(untitled)"}</p>
              <p className="label-mono mt-1 text-ink-faint">
                {item.status === "published" ? "Published" : "Draft"} · updated {item.updated_at.slice(0, 16).replace("T", " ")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/content/${type.key}/${item.id}`}>Edit</Link>
              </Button>
              <form action={deleteContentItem}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="type" value={type.key} />
                <Button type="submit" variant="outline" size="sm" className="text-destructive hover:border-destructive">
                  Delete
                </Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
