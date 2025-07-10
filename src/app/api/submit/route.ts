import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const n8nWebhook = process.env.N8N_WEBHOOK_URL;
  if (!n8nWebhook) {
    return NextResponse.json({ error: "Webhook URL not set" }, { status: 500 });
  }
  try {
    const res = await fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: "n8n error" }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
} 