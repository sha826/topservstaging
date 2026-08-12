"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function Wordmark() {
  return (
    <Link href="/" className="flex items-center" aria-label="TopServ Digital — home">
      <Image
        src="/images/topserv-logo.png"
        alt="TopServ Digital"
        width={110}
        height={84}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${siteConfig.company.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            <Phone className="size-4 text-brand" aria-hidden />
            {siteConfig.company.phoneDisplay}
          </a>
          <Button asChild>
            <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${siteConfig.company.phone}`}
                className="mt-2 flex items-center gap-2 px-3 py-2 text-base font-semibold"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                {siteConfig.company.phoneDisplay}
              </a>
              <Button asChild size="lg" className="mt-4">
                <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
