import { NextResponse } from "next/server";
import { joinFields, validateApplication, type JoinValues } from "@/lib/join";

// The Formspree endpoint stays on the server, so it never ships to the browser.
// Set FORMSPREE_ENDPOINT (see .env.example) to turn sending on.
const MAX_LENGTH = 2000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  // Honeypot: real people never see this field. Pretend it worked so bots move on.
  if (typeof body.company === "string" && body.company !== "") {
    return NextResponse.json({ ok: true });
  }

  const data = {} as JoinValues;
  for (const field of joinFields) {
    const value = body[field];
    data[field] = typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
  }

  // Same rules as the form, so skipping the browser doesn't skip the checks
  const errors = validateApplication(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "invalid-fields", fields: Object.keys(errors) }, { status: 400 });
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
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
