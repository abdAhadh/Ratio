import { ImageResponse } from "next/og";

export const alt = "Ratio: Upgrade your ERP with AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FBF7F1",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#1A1A2E",
          position: "relative",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1A1A2E",
              color: "#FBF7F1",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Ratio
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginTop: 80,
            padding: "10px 18px",
            background: "rgba(26, 26, 46, 0.05)",
            border: "1px solid rgba(26, 26, 46, 0.1)",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 500,
            color: "#1A1A2E",
          }}
        >
          Built for CFOs outgrowing their ERPs
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>Upgrade your ERP with</div>
          <div style={{ display: "flex" }}>AI agents.</div>
        </div>

        {/* Subhead */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 28,
            color: "#6B6B80",
            marginTop: 32,
            lineHeight: 1.4,
            maxWidth: 960,
          }}
        >
          <div style={{ display: "flex" }}>
            AI agents that sit on top of your existing ERP to automate finance ops.
          </div>
          <div style={{ display: "flex" }}>
            Scale your finance team without scaling headcount.
          </div>
        </div>

        {/* Footer URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 22,
            color: "#6B6B80",
            fontWeight: 500,
            display: "flex",
          }}
        >
          tryratio.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
