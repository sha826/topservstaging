"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Fires one beacon per client-side route change. Admin pages excluded. */
export function TrackPageview() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || last.current === pathname) {
      return;
    }
    last.current = pathname;
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || undefined,
    });
    try {
      const sent = navigator.sendBeacon?.(
        "/api/track",
        new Blob([payload], { type: "application/json" })
      );
      if (!sent) {
        fetch("/api/track", {
          method: "POST",
          body: payload,
          keepalive: true,
          headers: { "Content-Type": "application/json" },
        }).catch(() => {});
      }
    } catch {
      // Beacon is best-effort only.
    }
  }, [pathname]);

  return null;
}
