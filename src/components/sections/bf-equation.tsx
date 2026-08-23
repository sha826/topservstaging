import { equation } from "@/lib/bf-content";

/**
 * The category visual: brand creates demand, performance captures demand,
 * together they build market dominance. The simplest expression of what we
 * sell, used on the home page and the BrandFormance page. No tactics listed.
 */
export function BfEquation() {
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {equation.map((row, i) => (
        <div
          key={row.term}
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-lg border px-6 py-5 ${
            i === 2 ? "border-brand bg-brand/10" : "border-border bg-card"
          }`}
        >
          <span className={`display text-3xl md:text-4xl ${i === 2 ? "text-brand" : ""}`}>
            {i === 2 && <span className="mr-3 text-muted-foreground">=</span>}
            {row.term}
          </span>
          <span className="text-lg text-muted-foreground">{row.does}</span>
        </div>
      ))}
    </div>
  );
}
