"use client";

import { Button } from "@/components/ui/button";

/** Client-side CSV download of the rows the server already fetched. */
export function ExportCsv({
  rows,
  filename,
}: {
  rows: Record<string, unknown>[];
  filename: string;
}) {
  function download() {
    if (rows.length === 0) return;
    const cols = Object.keys(rows[0]);
    const esc = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button type="button" variant="outline" onClick={download} disabled={rows.length === 0}>
      Export CSV
    </Button>
  );
}
