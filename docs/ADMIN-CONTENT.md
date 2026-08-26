# Admin Content System (TopServ site)

How non-blog content is managed on topservdigital.com through the admin
panel. **Scope: this system exists for the TopServ Digital website only.**
It is not a product, not a template, and not built for any client site.
If the underlying tech is ever reused for something client-facing, that
is a separate future project with its own spec.

## What it does

The admin panel (`/admin/content`) manages structured content types
beyond the blog: testimonials, team members, project updates, press
releases, and timed banners. Each type gets a generated form, validation,
version snapshots with one-click restore, and publish notifications to
the SEO team (notify, don't gate).

## The moving parts

- **Registry** (`src/lib/content-types.ts`): every type is defined once —
  fields, validation rules, tag fields, publish behavior. The composer
  form, the validator, and the page renderers are all driven by these
  definitions, so adding a type is one registry entry plus one renderer.
- **Site config** (`SITE_MANIFEST` in the same file): which types the
  site enables and the site's vocabularies — the services list and the
  service zones. Vocabulary-backed fields (services performed, zones)
  resolve to these values, never free text, per Build Spec v2 §11:
  a project update's location is a Zone select, and updates tagged with
  services/zones surface automatically on the matching pages.
- **Store** (`src/lib/content-store.ts`): Supabase `content_items` +
  `content_versions`. Every save snapshots the previous state; publishes
  email the SEO department (`SEO_NOTIFY_EMAIL`, falling back to
  `LEAD_EMAIL_TO`).
- **Composer** (`src/components/admin/type-composer.tsx`): the generic
  admin form generated from a type's field specs (text, textarea, select,
  multiselect chips, image uploads, dates). Multiselect values are stored
  pipe-delimited because vocabulary values contain commas ("Frisco, TX").
- **Slots** (`src/components/content/content-slot.tsx`): pages pull
  published items by type and tag. Mounted today: team + testimonials on
  `/about`, project updates on industry pages (tagged by trade), press
  releases on `/news`, the banner in the root layout. Slot-host pages
  revalidate every 5 minutes.

## Editorial rules (Build Spec v2 §11)

- Project updates are the priority type: proof-of-work inside a target
  zone, published at cadence for the SEO team.
- Location is always a Zone from the site vocabulary, never typed text.
- Business identity fields (phone, address, legal name) are not editable
  through this panel; they live in `src/lib/site-config.ts` under
  engineering control, because tracking numbers and NAP consistency
  depend on them.
- Testimonials are first-party quotes. Third-party platform reviews are
  never hand-entered here.

## Not in scope

Client logins, client-facing editing, multi-site manifests, shared
engines, template families, or any "backbone for client sites" framing.
This repo serves topservdigital.com, full stop.
