import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "TopServ",
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0C0E12",
    theme_color: "#0E7DC1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
