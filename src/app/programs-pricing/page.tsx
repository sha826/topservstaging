import { redirect } from "next/navigation";

/** The hub lands on Overview; the sub navigation carries the rest. */
export default function ProgramsPricingIndex() {
  redirect("/programs-pricing/overview");
}
