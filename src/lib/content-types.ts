/**
 * The content-type registry: the heart of the client content panel
 * (docs/CLIENT-CONTENT-PANEL.md). Each type is defined once here and the
 * whole engine follows: the admin composer generates its form, the store
 * validates its payload, ContentSlot renders it, and (later) the agent
 * derives one tool per type. Site-specific facts NEVER live here; this
 * file is the shared catalog. Per-site enablement lives in SITE_MANIFEST.
 */

export type FieldKind = "text" | "textarea" | "image" | "select" | "url";

export interface FieldSpec {
  key: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  max?: number;
  help?: string;
  options?: string[];
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
};

/**
 * The site manifest: which types THIS site enables. Client sites ship
 * their own manifest with more types enabled. Everything else in the
 * engine reads this, never the catalog directly.
 */
export const SITE_MANIFEST = {
  enabledTypes: ["testimonial", "team_member"] as const,
  /** Where publish notifications go (falls back to LEAD_EMAIL_TO). */
  notifyEmailEnv: "SEO_NOTIFY_EMAIL",
};

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
    if (v && f.kind === "select" && f.options && !f.options.includes(v)) {
      errors.push(`${f.label} must be one of: ${f.options.join(", ")}.`);
    }
    if (v) payload[f.key] = v.slice(0, f.max ?? 2000);
  }
  return errors.length ? { errors } : { payload };
}
