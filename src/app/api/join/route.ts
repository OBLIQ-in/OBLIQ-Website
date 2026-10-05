import { NextResponse } from "next/server";

// The Formspree endpoint stays on the server, so it never ships to the browser.
// Set FORMSPREE_ENDPOINT (see .env.example) to turn sending on.
const FIELDS = ["name", "email", "phone", "education", "linkedin", "github", "position", "resume", "availability", "note"];
const MAX_LENGTH = 2000;

export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  // Honeypot: real people never see this field. Pretend it worked so bots move on.
  if (typeof body.company === "string" && body.company !== "") {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {};
  for (const field of FIELDS) {
    const value = body[field];
    data[field] = typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
  }
  if (!data.name || !data.email || !data.linkedin || !data.position || !data.resume) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return NextResponse.json({ error: "send-failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
