import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin-auth";
import { login } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm py-16">
      <p className="label-mono text-brand">Team access</p>
      <h1 className="display mt-3 text-4xl">Admin login</h1>
      <form action={login} className="mt-8 grid gap-4">
        <label htmlFor="admin-password" className="text-sm font-semibold">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
        />
        {error && (
          <p role="alert" className="text-sm text-destructive">
            Wrong password. Try again.
          </p>
        )}
        <Button type="submit" size="lg" className="justify-self-start text-base">
          Sign in
        </Button>
      </form>
    </div>
  );
}
