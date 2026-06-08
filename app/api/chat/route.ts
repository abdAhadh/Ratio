import { NextResponse } from "next/server";

/**
 * Chat widget submission relay.
 *
 * Receives the visitor's name + email, the full conversation transcript
 * and the page path. Posts a formatted Slack message to SLACK_WEBHOOK_URL
 * so signup-website readers can pick up live chat leads. Headed with
 * a distinct emoji + label so chat leads are easy to separate from
 * demo-form submissions in the channel.
 */

type Role = "user" | "bot";
interface Message {
  role: Role;
  content: string;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, conversation, path } = (body ?? {}) as {
    name?: string;
    email?: string;
    conversation?: Message[];
    path?: string;
  };

  if (
    !email?.trim() ||
    !Array.isArray(conversation) ||
    conversation.length === 0
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const transcript = conversation
    .map((m) =>
      m.role === "user"
        ? `*${name?.trim() || "Visitor"}:* ${m.content}`
        : `*Abdul (bot):* ${m.content}`
    )
    .join("\n\n");

  const slackMessage = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "💬 Chat Conversation",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${name?.trim() || "—"}` },
          { type: "mrkdwn", text: `*Email:*\n${email.trim()}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Transcript*\n${transcript}` },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Submitted via on-site chat widget · \`${path || "/"}\``,
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
}
