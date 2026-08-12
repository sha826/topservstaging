"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, makeSessionToken } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  let ok = expected.length > 0 && password.length === expected.length;
  if (ok) {
    try {
      ok = timingSafeEqual(Buffer.from(password), Buffer.from(expected));
    } catch {
      ok = false;
    }
  }
  if (!ok) redirect("/admin/login?error=1");

  const token = makeSessionToken();
  (await cookies()).set(ADMIN_COOKIE, token.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: token.maxAge,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
