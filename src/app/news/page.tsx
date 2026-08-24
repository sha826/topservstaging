import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentSlot } from "@/components/content/content-slot";
import { listItems } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "News and Announcements",
  description:
    "Press releases, announcements, and company news from TopServ Digital, the home of BrandFormance.",
  alternates: { canonical: "/news" },
};

// Content-slot host: admin saves revalidate instantly, timer bounds the rest.
export const revalidate = 300;

export default async function NewsPage() {
  const hasNews = (await listItems("press_release", true, { limit: 1 })).length > 0;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "News", href: "/news" },
        ]}
      />
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Media room</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              News<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Press releases, announcements, and what's new at TopServ Digital.
            </p>
          </Reveal>
        </div>
      </section>
      {hasNews ? (
        <ContentSlot type="press_release" />
      ) : (
        <div className="mx-auto max-w-3xl px-5 py-16 text-center text-muted-foreground">
          Nothing published yet. Check back soon.
        </div>
      )}
    </>
  );
}
