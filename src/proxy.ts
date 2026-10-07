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
  // Trailing slashes are normalised here rather than by Next, which is what
  // skipTrailingSlashRedirect in next.config.ts turns off. 2 reasons: Next
  // answers 308 where every other permanent redirect on this site answers
  // 301, and it lands on the stripped path, so a path that redirects again
  // costs a 2nd hop. /programs-pricing/ was the case that showed it, taking
  // 308 to /programs-pricing and then 301 to Overview. Resolving the hub
  // here makes it 1 hop.
  const { pathname, search } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const stripped = pathname.slice(0, -1);
    const target =
      stripped === "/programs-pricing" ? "/programs-pricing/overview" : stripped;
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 301);
  }

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
