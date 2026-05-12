# Chat Widget

A floating chat bubble for the bottom-right of the page that opens an in-page chat panel, captures the visitor's question + contact details conversationally, and posts the full transcript to a Slack channel via an incoming webhook.

Used on tryratio.io to capture inbound leads. Self-contained — you can copy this folder + the matching API route into any Next.js project.

## What's in here

| File | Role |
|---|---|
| `index.tsx` | The React component itself. Client component. |
| `README.md` | This file. |

## What lives outside this folder (but is part of the same feature)

| File | Role |
|---|---|
| `../../app/api/chat/route.ts` | The API route that validates the payload and posts to Slack. |

## Requirements

- **React 18+**
- **Next.js 13+** (App Router) — only because the API route uses `route.ts` route handlers. The component itself runs anywhere.
- **`framer-motion`** — used for message-bubble entrance/exit animations.
- **Tailwind CSS** — uses utility classes throughout. Expects `cream`, `navy`, `navy-light`, `border`, `text-secondary` theme tokens (see `app/globals.css`). To use elsewhere, either replicate those tokens or swap them for stock colours.

## Required environment variable

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Same variable the `/api/demo-submission` route uses. Set on Vercel under the project's Environment Variables. For local dev, pull production values with:

```bash
vercel env pull --environment=production .env.local
```

## Mount it

Import and drop into the root layout so it appears on every page:

```tsx
// app/layout.tsx
import { ChatWidget } from "@/components/chat-widget";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

## How the conversation works

```
Visitor opens panel and sends a message
        │
        ▼
Bot acknowledges and asks for name + email
        │
        ▼
Visitor replies with details (any natural format)
        │
        ▼
Widget extracts email via regex; remainder is the name
        │
        ├─── email missing ──► bot re-prompts ("I didn't catch an email...")
        │
        ▼
Full transcript POSTs to /api/chat → Slack
        │
        ▼
Bot confirms with "Thanks! I've shared your details with the team."
        │
        ▼
Contact info cached in localStorage; returning visitors skip the details step.
```

Mobile: the widget is hidden below the `md` breakpoint (768px) — by design. Add `block md:block` to enable on all viewports.

## Slack message format

Lands in the channel with a header that distinguishes it from form submissions:

```
💬 Chat Conversation
─────────────────
Name:                       Email:
John Doe                    john@example.com
─────────────────
Transcript
  John Doe: I need help with the Tally connector
  Abdul (bot): I'll get back to you in the next 30 mins. Meanwhile…
  John Doe: John Doe, john@example.com
─────────────────
Submitted via on-site chat widget · /tally-mcp
```

## Customising

The most-likely-to-change values are constants at the top of `index.tsx`:

| Constant | Purpose |
|---|---|
| `AVATAR_SRC` | Path to the host's photo. Place a square image in `/public`. |
| `HOST_NAME` | Display name in the panel header and hover tooltip. |
| `HOST_INITIALS` | Fallback when the photo fails to load. |
| `BOT_DETAIL_REQUEST` | First bot reply after the initial visitor message. |
| `BOT_NEED_EMAIL` | Re-prompt when the visitor's reply has no email. |
| `BOT_THANK_YOU` | Confirmation after Slack delivery succeeds. |
| `BOT_ACK_RETURNING` | Confirmation for returning visitors. |
| `POST_USER_PAUSE_MS` | Pause before the typing indicator appears. |
| `TYPING_DURATION_MS` | How long the typing dots show. |
| `STORAGE_KEY` | localStorage key for cached contact info. |
| `EMAIL_RE` | Regex used to extract the email from the visitor's reply. |

## Re-using outside this repo

1. Copy this folder (`components/chat-widget/`) into your repo.
2. Copy the API route (`app/api/chat/route.ts`) into the same relative path.
3. Install peer dependencies: `npm install framer-motion`
4. Set `SLACK_WEBHOOK_URL` in your environment.
5. Drop a square photo at `/public/<your-name>.jpg` and update `AVATAR_SRC` + `HOST_NAME` + `HOST_INITIALS` at the top of `index.tsx`.
6. Mount `<ChatWidget />` in your root layout.

The component is intentionally untyped beyond what's necessary, and uses only first-party Next.js and Tailwind features (plus framer-motion for animation) so it should drop in cleanly.
