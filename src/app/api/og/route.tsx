import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

const GREEN = "#9ED844";
const BLUE = "#3D9BD9";
const BG = "#0C0E12";

export async function GET(req: NextRequest) {
  // Clamp params: unbounded strings force multi-KB Satori layouts per request.
  const title = (
    req.nextUrl.searchParams.get("title") ||
    "Video-First Marketing for Home Service Companies"
  ).slice(0, 140);
  const eyebrow = (req.nextUrl.searchParams.get("eyebrow") || "TopServ Digital").slice(0, 60);

  try {
    return renderCard(title, eyebrow);
  } catch (e) {
    console.error("OG image render failed:", e);
    return new Response("OG image unavailable", { status: 500 });
  }
}

function renderCard(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: BG,
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage: `linear-gradient(rgba(14,125,193,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(14,125,193,0.7) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-140px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BLUE}35 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "56px 64px",
            height: "100%",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              marginTop: "18px",
              fontSize: title.length > 60 ? "52px" : "64px",
              fontWeight: 800,
              color: "#F5F3EF",
              lineHeight: 1.08,
              maxWidth: "1000px",
              display: "flex",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(245,243,239,0.14)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <div style={{ color: BLUE, fontSize: "26px", fontWeight: 800, letterSpacing: "1px" }}>
                TOPSERV
              </div>
              <div style={{ color: GREEN, fontSize: "26px", fontWeight: 800, letterSpacing: "1px" }}>
                DIGITAL
              </div>
            </div>
            <div style={{ color: "rgba(245,243,239,0.45)", fontSize: "18px" }}>
              topservdigital.com
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
