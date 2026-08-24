import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getType } from "@/lib/content-types";
import { TypeComposer } from "@/components/admin/type-composer";

export const dynamic = "force-dynamic";

export default async function NewContentItemPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  await requireAdmin();
  const { type: typeKey } = await params;
  const type = getType(typeKey);
  if (!type) notFound();

  return (
    <div>
      <h1 className="display text-4xl">New {type.label.toLowerCase()}</h1>
      <div className="mt-8">
        <TypeComposer type={type} />
      </div>
    </div>
  );
}
