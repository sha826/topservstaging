import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidgetLazy } from "@/components/chat/chat-widget-lazy";
import { TrackPageview } from "@/components/analytics/track-pageview";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ContentSlot } from "@/components/content/content-slot";

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

// resizes-content: Android shrinks the layout viewport for the keyboard, so
// fixed UI (chat panel) stays fully visible while typing.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: The Home of BrandFormance`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name}: The Home of BrandFormance`,
    description: siteConfig.metaDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${bebas.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ContentSlot type="banner" />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidgetLazy />
          <TrackPageview />
        </MotionProvider>
      </body>
    </html>
  );
}
