/**
 * The content-type registry: the heart of the client content panel
 * (docs/CLIENT-CONTENT-PANEL.md). Each type is defined once here and the
 * whole engine follows: the admin composer generates its form, the store
 * validates its payload, ContentSlot renders it, and (later) the agent
 * derives one tool per type. Site-specific facts NEVER live here; this
 * file is the shared catalog. Per-site enablement lives in SITE_MANIFEST.
 */

export type FieldKind =
  | "text"
  | "textarea"
  | "image"
  | "images"
  | "select"
  | "multiselect"
  | "url"
  | "date";

export interface FieldSpec {
  key: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  max?: number;
  help?: string;
  options?: string[];
  /** Pull options from the site manifest's vocabulary instead of hardcoding. */
  optionsFrom?: "services" | "serviceAreas";
  rows?: number;
}

export interface ContentTypeDef {
  key: string;
  label: string;
  labelPlural: string;
  description: string;
  /** Field whose value names an item in lists and notifications. */
  titleKey: string;
  fields: FieldSpec[];
  /** instant = publish button live; review = drafts only until an admin publishes. */
  publishMode: "instant" | "review";
  /** Notify the SEO team on publish (the notify-not-gate model). */
  notifyOnPublish: boolean;
  /** Fields whose values become placement tags (multiselects split on comma). */
  tagFields?: string[];
  /** Date field that sets the item's automatic expiry (timed content). */
  expiresField?: string;
}

export const CONTENT_TYPES: Record<string, ContentTypeDef> = {
  testimonial: {
    key: "testimonial",
    label: "Testimonial",
    labelPlural: "Testimonials",
    description: "Customer quotes shown on the site. Keep them verbatim and attributed.",
    titleKey: "author",
    fields: [
      { key: "quote", label: "Quote", kind: "textarea", required: true, max: 600, rows: 4, help: "The customer's words, verbatim." },
      { key: "author", label: "Customer name", kind: "text", required: true, max: 120 },
      { key: "company", label: "Company", kind: "text", max: 120 },
      { key: "role", label: "Role", kind: "text", max: 80 },
      { key: "rating", label: "Rating", kind: "select", options: ["5", "4", "3"], help: "Stars, if the review came with one." },
      { key: "photoUrl", label: "Photo", kind: "image", help: "Optional headshot or job photo." },
    ],
    publishMode: "instant",
    notifyOnPublish: true,
  },
  team_member: {
    key: "team_member",
    label: "Team member",
    labelPlural: "Team members",
    description: "Staff profiles: photos, roles, bios, certifications.",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", kind: "text", required: true, max: 120 },
      { key: "role", label: "Role", kind: "text", required: true, max: 120 },
      { key: "bio", label: "Bio", kind: "textarea", max: 800, rows: 4 },
      { key: "certifications", label: "Certifications", kind: "text", max: 300, help: "Comma separated." },
      { key: "photoUrl", label: "Photo", kind: "image" },
    ],
    publishMode: "instant",
    notifyOnPublish: true,
  },
  project_update: {
    key: "project_update",
    label: "Project update",
    labelPlural: "Project updates",
    description:
      "Job stories with photos. Tagged with services and areas, they appear automatically on the matching pages.",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, max: 160, help: "For example: Full system replacement in Frisco" },
      { key: "description", label: "What was done", kind: "textarea", required: true, max: 1200, rows: 5 },
      { key: "location", label: "Location", kind: "text", required: true, max: 120, help: "City or neighborhood." },
      { key: "services", label: "Services performed", kind: "multiselect", required: true, optionsFrom: "services" },
      { key: "areas", label: "Service areas", kind: "multiselect", optionsFrom: "serviceAreas", help: "Optional area tags for placement." },
      { key: "photos", label: "Photos", kind: "images", help: "Before/after or job photos." },
    ],
    publishMode: "instant",
    notifyOnPublish: true,
    tagFields: ["services", "areas"],
  },
  press_release: {
    key: "press_release",
    label: "Press release",
    labelPlural: "Media room",
    description: "Press releases, public announcements, and news items for the news page.",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, max: 200 },
      { key: "date", label: "Date", kind: "date", required: true },
      { key: "body", label: "Body", kind: "textarea", required: true, max: 8000, rows: 10, help: "Plain text or simple paragraphs." },
      { key: "imageUrl", label: "Image", kind: "image" },
      { key: "documentUrl", label: "Document link", kind: "url", max: 500, help: "Optional downloadable PDF or document URL." },
    ],
    publishMode: "instant",
    notifyOnPublish: true,
  },
  banner: {
    key: "banner",
    label: "Announcement banner",
    labelPlural: "Announcement banners",
    description:
      "Sitewide announcement bar: promotions, holiday closures, emergency notices. Auto-removes at the expiry date.",
    titleKey: "message",
    fields: [
      { key: "message", label: "Message", kind: "text", required: true, max: 200 },
      { key: "linkUrl", label: "Link", kind: "url", max: 300, help: "Optional: where the banner clicks through to." },
      { key: "linkLabel", label: "Link label", kind: "text", max: 40 },
      { key: "expiresAt", label: "Expires", kind: "date", required: true, help: "The banner disappears automatically on this date." },
    ],
    publishMode: "instant",
    notifyOnPublish: true,
    expiresField: "expiresAt",
  },
};

/**
 * The site manifest: which types THIS site enables. Client sites ship
 * their own manifest with more types enabled. Everything else in the
 * engine reads this, never the catalog directly.
 */
export const SITE_MANIFEST = {
  enabledTypes: [
    "testimonial",
    "team_member",
    "project_update",
    "press_release",
    "banner",
  ] as const,
  /** Where publish notifications go (falls back to LEAD_EMAIL_TO). */
  notifyEmailEnv: "SEO_NOTIFY_EMAIL",
  /** This site's vocabulary; client sites ship their own. */
  vocab: {
    services: ["HVAC", "Plumbing", "Roofing", "Electrical", "Garage Door", "Pest Control"],
    serviceAreas: ["Frisco, TX", "Dallas, TX", "Plano, TX", "McKinney, TX"],
  } as Record<string, string[]>,
};

export function resolveOptions(f: FieldSpec): string[] {
  if (f.options) return f.options;
  if (f.optionsFrom) return SITE_MANIFEST.vocab[f.optionsFrom] ?? [];
  return [];
}

export function getEnabledTypes(): ContentTypeDef[] {
  return SITE_MANIFEST.enabledTypes.map((k) => CONTENT_TYPES[k]).filter(Boolean);
}

export function getType(key: string): ContentTypeDef | null {
  return SITE_MANIFEST.enabledTypes.includes(key as (typeof SITE_MANIFEST.enabledTypes)[number])
    ? (CONTENT_TYPES[key] ?? null)
    : null;
}

/** Validate a payload against a type's field specs. Returns clean payload or errors. */
export function validatePayload(
  type: ContentTypeDef,
  raw: Record<string, unknown>
): { payload?: Record<string, string>; errors?: string[] } {
  const errors: string[] = [];
  const payload: Record<string, string> = {};
  for (const f of type.fields) {
    const v = String(raw[f.key] ?? "").trim();
    if (f.required && !v) errors.push(`${f.label} is required.`);
    if (v && f.max && v.length > f.max) errors.push(`${f.label} must be ${f.max} characters or fewer.`);
    if (v && f.kind === "select") {
      const opts = resolveOptions(f);
      if (opts.length && !opts.includes(v)) errors.push(`${f.label} must be one of: ${opts.join(", ")}.`);
    }
    if (v && f.kind === "multiselect") {
      const opts = resolveOptions(f);
      const chosen = v.split(",").map((s) => s.trim()).filter(Boolean);
      if (opts.length && chosen.some((c) => !opts.includes(c))) {
        errors.push(`${f.label} contains values outside: ${opts.join(", ")}.`);
      }
    }
    if (v && f.kind === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(v)) {
      errors.push(`${f.label} must be a date (YYYY-MM-DD).`);
    }
    if (v && f.kind === "images") {
      try {
        const arr = JSON.parse(v);
        if (!Array.isArray(arr) || arr.some((u) => typeof u !== "string" || !/^https?:\/\//.test(u))) {
          errors.push(`${f.label} must be a list of image URLs.`);
        }
      } catch {
        errors.push(`${f.label} must be a list of image URLs.`);
      }
    }
    if (v) payload[f.key] = v.slice(0, f.max ?? (f.kind === "images" ? 8000 : 8000));
  }
  return errors.length ? { errors } : { payload };
}

/** Placement tags derived from the type's tagFields (multiselects split on comma). */
export function deriveTags(type: ContentTypeDef, payload: Record<string, string>): string[] {
  const tags = new Set<string>();
  for (const key of type.tagFields ?? []) {
    for (const t of (payload[key] ?? "").split(",")) {
      const clean = t.trim();
      if (clean) tags.add(clean);
    }
  }
  return [...tags];
}
