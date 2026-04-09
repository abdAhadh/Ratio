import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone, company, revenue, message } = await request.json();

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const slackMessage = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New Demo Request", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${name || "—"}` },
          { type: "mrkdwn", text: `*Email:*\n${email || "—"}` },
          { type: "mrkdwn", text: `*Phone:*\n+91 ${phone || "—"}` },
          { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
          { type: "mrkdwn", text: `*Revenue/Month:*\n${revenue || "—"}` },
        ],
      },
      ...(message
        ? [
            {
              type: "section",
              text: { type: "mrkdwn", text: `*Message:*\n${message}` },
            },
          ]
        : []),
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Submitted via tryratio.io/demo` },
        ],
      },
    ],
  };

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackMessage),
  });

  if (!slackRes.ok) {
    return NextResponse.json({ error: "Failed to send to Slack" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
