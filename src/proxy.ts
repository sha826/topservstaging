import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canonicalHost, noindexHeader } from "@/lib/site-config";

/**
 * Keep every host that is not the real domain out of search.
 *
 * The app answers on more than 1 hostname: the Vercel deployment URL, any
 * preview deployment, and localhost. Without this, the moment the real domain
 * launches, those become full duplicate copies of the site in Google.
 *
 * The page metadata says index/follow because that is the intent for the real
 * domain. This header overrides it everywhere else: Google treats X-Robots-Tag
 * exactly like the meta tag, and when the 2 disagree the stricter one wins. So
 * the real domain stays indexable, every other host does not, and connecting
 * the domain flips it with no code change and nothing to remember.
 *
 * A noindex only works if the page can be fetched, so robots.txt keeps
 * crawling allowed on purpose. See the note in src/app/robots.ts.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  // www 301s to the apex at the DNS layer, but accept it so the redirect hop
  // is never served as noindex.
  const isCanonical = host === canonicalHost || host === `www.${canonicalHost}`;

  if (!isCanonical) {
    response.headers.set("X-Robots-Tag", noindexHeader);
  }

  return response;
}

export const config = {
  // Everything except the build's immutable JS and CSS chunks, which are never
  // indexable anyway. Images and documents stay covered.
  matcher: ["/((?!_next/static).*)"],
};
