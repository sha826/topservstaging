"use client";

import { useEffect } from "react";

/**
 * Rendered by the admin list page on a confirmed save (?saved=1): removes the
 * autosaved draft the form marked as pending, now that it's safely in the
 * database. Submits that bounce (login, errors) never reach here, so their
 * drafts survive for the restore banner.
 */
export function ClearSavedDraft() {
  useEffect(() => {
    try {
      const key = sessionStorage.getItem("tsd-pending-save");
      if (key) {
        localStorage.removeItem(key);
        sessionStorage.removeItem("tsd-pending-save");
      }
    } catch {}
  }, []);
  return null;
}
