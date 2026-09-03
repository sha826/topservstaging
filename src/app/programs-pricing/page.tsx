import { redirect } from "next/navigation";

/** The hub is not a page. It lands on Overview; the sub nav carries the rest. */
export default function ProgramsPricingIndex() {
  redirect("/programs-pricing/overview");
}
