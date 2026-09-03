import type { ReactNode } from "react";
import { PMasthead } from "@/components/programs/p-masthead";
import { PSubnav } from "@/components/programs/p-subnav";

/**
 * The Programs and Pricing hub.
 *
 * Build Spec v2 section 3: this is a navigation hub, not a page. 5 pages in
 * a fixed order that walk a prospect from understanding to investment to
 * proof, with the sub navigation persisting across all of them. The masthead
 * is deliberately not an h1: each of the 5 pages carries its own, and the
 * masthead changes per page so it stops repeating itself above them.
 */
export default function ProgramsPricingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PMasthead />
      <PSubnav />
      {children}
    </>
  );
}
