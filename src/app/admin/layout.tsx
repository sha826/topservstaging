import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/admin-auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/agent", label: "Agent" },
  { href: "/admin/conversations", label: "Conversations" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/leads", label: "Leads" },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();

  return (
    <div className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10">
      {authed && (
        <nav
          aria-label="Admin"
          className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-4"
        >
          <span className="display text-2xl">
            TopServ <span className="text-brand">Admin</span>
          </span>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label-mono -my-2 py-3 text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="label-mono text-ink-faint transition-colors hover:text-brand"
            >
              Log out
            </button>
          </form>
        </nav>
      )}
      {children}
    </div>
  );
}
