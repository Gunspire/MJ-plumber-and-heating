import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_FORM_ID = "xntJDYPU0dQCTZi3laE9";
const GHL_LOCATION_ID = "iTtjnJGBcz99Ghti6cnM";
const GHL_ENDPOINT =
  `https://backend.leadconnectorhq.com/forms/submit?formId=${encodeURIComponent(GHL_FORM_ID)}` +
  `&locationId=${encodeURIComponent(GHL_LOCATION_ID)}`;

type SubmitPayload = {
  fullName: string;
  phone: string;
  address: string;
  postcode: string;
  serviceNeeded: string;
  details?: string;
  captchaV3: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  let body: SubmitPayload;
  try {
    body = (await req.json()) as SubmitPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !isNonEmptyString(body.fullName) ||
    !isNonEmptyString(body.phone) ||
    !isNonEmptyString(body.address) ||
    !isNonEmptyString(body.postcode) ||
    !isNonEmptyString(body.serviceNeeded) ||
    !isNonEmptyString(body.captchaV3)
  ) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const phoneRaw = body.phone.replace(/\D/g, "");
  if (!phoneRaw) {
    return NextResponse.json({ ok: false, error: "Invalid phone number" }, { status: 400 });
  }

  // Map our site form fields into the GHL form's field tags.
  // Tags come from https://backend.leadconnectorhq.com/forms/data/{formId}
  const formData = {
    full_name: body.fullName.trim(),
    phone: phoneRaw,
    address: body.address.trim(),
    postal_code: body.postcode.trim(),
    xaR0bdGlBSAxNrkFwT9L: [body.serviceNeeded],
    GqGaTIeNPgHrNThtQnCE: (body.details ?? "").trim(),
    // Minimal attribution (not strictly required, but helpful)
    eventData: { medium: "Form", mediumId: GHL_FORM_ID },
  };

  const fd = new FormData();
  fd.set("formData", JSON.stringify(formData));
  fd.append("locationId", GHL_LOCATION_ID);
  fd.append("formId", GHL_FORM_ID);
  fd.append("captchaV3", body.captchaV3);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const headers: Record<string, string> = {};
  if (tz) headers.timezone = tz;

  const upstream = await fetch(GHL_ENDPOINT, {
    method: "POST",
    body: fd,
    headers,
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { ok: false, error: "GHL form submit failed", status: upstream.status, details: text },
      { status: 502 }
    );
  }

  const json = await upstream.json().catch(() => null);
  return NextResponse.json({ ok: true, data: json });
}

