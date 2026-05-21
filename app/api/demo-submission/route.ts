import { NextResponse } from "next/server";

/**
 * Receives a Request Demo form submission and posts it to Slack.
 *
 * The Slack incoming-webhook URL lives only in the SLACK_WEBHOOK_URL
 * environment variable and is read here, server-side — it is never sent to
 * or referenced by the browser.
 */
export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    const webhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
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
            { type: "mrkdwn", text: `*Name:*\n${name || "-"}` },
            { type: "mrkdwn", text: `*Email:*\n${email || "-"}` },
            { type: "mrkdwn", text: `*Phone:*\n${phone || "-"}` },
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
            {
              type: "mrkdwn",
              text: "Submitted via the Ratio Request Demo page",
            },
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
      return NextResponse.json(
        { error: "Failed to send to Slack" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
