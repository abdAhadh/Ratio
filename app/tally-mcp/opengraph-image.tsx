import { ImageResponse } from "next/og";

/*
 * OG image for /tally-mcp specifically.
 *
 * Next.js convention: an opengraph-image.tsx co-located inside a route folder
 * overrides the root /opengraph-image.tsx for that route only. So this file
 * is used ONLY when sharing https://tryratio.io/tally-mcp; the rest of the
 * site continues to use app/opengraph-image.tsx.
 *
 * Mirrors the rendered page: cream background, "Powered by Ratio" lockup
 * top-left, the chip, the headline pairing Tally Prime with Claude and
 * ChatGPT (with their brand marks inline), and the Tally Prime wordmark
 * underneath.
 */

export const alt = "Connect Tally Prime to Claude and ChatGPT, free MCP connector by Ratio";
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
          padding: "56px 80px",
          fontFamily: "sans-serif",
          color: "#1A1A2E",
          position: "relative",
        }}
      >
        {/* Powered by Ratio (top-left) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6B6B80",
              fontWeight: 500,
            }}
          >
            Powered by
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Ratio mark (rounded dark square with white asterisk-like glyph) */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.974 35C5.361 35 0 29.639 0 23.026V11.974C0 5.361 5.361 0 11.974 0H23.026C29.639 0 35 5.361 35 11.974V23.026C35 29.639 29.639 35 23.026 35H11.974Z"
                fill="#1A1A2E"
              />
              <path
                d="M13.7021 15.125C16.7591 13.666 19.1901 11.156 20.5521 8.05396C19.6631 7.11996 18.5061 6.45296 17.2611 6.05296L16.5941 5.82996C16.5441 5.92696 16.5131 6.03296 16.5051 6.14096C15.4371 9.16696 13.2571 11.612 10.3231 12.991C8.27605 13.97 6.76405 15.749 6.05205 17.885L5.83105 18.551C5.92705 18.601 6.03305 18.631 6.14105 18.64C6.98705 18.951 7.83105 19.352 8.63205 19.842C9.78905 17.78 11.5621 16.13 13.7021 15.125ZM26.6031 15.304C24.9401 17.826 22.6161 19.841 19.8851 21.131C17.6181 22.199 15.8821 24.2 15.0821 26.602L14.8591 27.358C15.7231 28.124 16.7391 28.699 17.8401 29.048L18.5061 29.271C18.5571 29.174 18.5871 29.068 18.5961 28.959C19.6631 25.934 21.8431 23.488 24.7781 22.11C26.8241 21.131 28.3811 19.352 29.0491 17.216L29.2711 16.55C28.3371 16.283 27.4471 15.837 26.6031 15.304ZM13.0791 25.047C14.1871 22.37 16.2471 20.199 18.8621 18.952C21.2641 17.796 23.2651 16.018 24.6441 13.838C23.6211 12.859 22.7761 11.747 22.1541 10.413C20.4881 13.459 17.9041 15.903 14.7701 17.396C12.9461 18.241 11.4781 19.709 10.5881 21.488C11.5671 22.423 12.3681 23.579 12.9901 24.868L13.0791 25.047Z"
                fill="white"
              />
            </svg>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
              Ratio
            </span>
          </div>
        </div>

        {/* Chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            gap: 10,
            marginTop: 48,
            padding: "10px 22px",
            background: "rgba(26, 26, 46, 0.05)",
            border: "1px solid rgba(26, 26, 46, 0.1)",
            borderRadius: 999,
            fontSize: 22,
            color: "#1A1A2E",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#16A34A",
            }}
          />
          <span>Free, setup in under 30 minutes</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 30,
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
            textAlign: "center",
            color: "#1A1A2E",
          }}
        >
          <div style={{ display: "flex" }}>Connect your Tally Prime</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 8,
            }}
          >
            <span>to</span>
            {/* Claude (Anthropic) brand asterisk */}
            <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
                fill="#D97757"
              />
            </svg>
            <span>Claude</span>
            <span>&amp;</span>
            {/* ChatGPT (OpenAI) brand mark */}
            <svg
              width="60"
              height="60"
              viewBox="-0.171 0.482 41.142 40.034"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                fill="#0F0F0F"
              />
            </svg>
            <span>ChatGPT</span>
          </div>
        </div>

        {/* Subhead */}
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            fontSize: 24,
            color: "#6B6B80",
            marginTop: 28,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          A free, copy-paste MCP server guide. Works with Tally Prime on desktop and on cloud.
        </div>

        {/* URL footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontSize: 18,
            color: "#6B6B80",
            fontWeight: 500,
            display: "flex",
          }}
        >
          tryratio.io/tally-mcp
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
