// Serverless function: forwards demo-request notifications to Slack.
// The webhook URL is read from the SLACK_WEBHOOK_URL environment
// variable, so the webhook secret never ships in client code or the repo.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    res.status(500).json({ error: 'Slack webhook not configured' });
    return;
  }
  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch (e) { payload = {}; }
    }
    const slackRes = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {}),
    });
    res.status(slackRes.ok ? 200 : 502).json({ ok: slackRes.ok });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reach Slack' });
  }
};
