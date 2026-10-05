import { permanentRedirect } from "next/navigation";

/**
 * The hub is not a page. It lands on Overview; the sub nav carries the rest.
 *
 * Permanent (308), not temporary: the hub URL is never going to resolve to a
 * page of its own, so search engines should consolidate any signal it has onto
 * Overview rather than keep checking back. 308 is Next's permanent redirect
 * and Google treats it exactly like a 301; it differs only in preserving the
 * request method. The same code the rest of the 301 map emits, see
 * next.config.ts.
 */
export default function ProgramsPricingIndex() {
  permanentRedirect("/programs-pricing/overview");
}
