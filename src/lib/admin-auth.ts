import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "topserv_admin";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function sign(exp: number): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHmac("sha256", secret).update(String(exp)).digest("hex");
}

/** HMAC-signed session token: "<expiryMs>.<signature>". */
export function makeSessionToken(): { value: string; maxAge: number } {
  const exp = Date.now() + SESSION_SECONDS * 1000;
  return { value: `${exp}.${sign(exp)}`, maxAge: SESSION_SECONDS };
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() || !sig) return false;
  const expected = sign(exp);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** Server-component guard: bounce unauthenticated visitors to the login. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
