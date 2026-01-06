// lib/oauthState.ts
import crypto from "crypto";

type StatePayload = {
  returnTo: string;
  ts: number; // timestamp
  nonce: string;
};

function base64urlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64urlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function hmacSHA256(secret: string, data: string) {
  if (!secret) {
    throw new Error(
      "Missing WORKOS_STATE_SECRET environment variable. Please set it in your production environment.",
    );
  }
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSignedState(returnToRaw: string, secret: string) {
  // ✅ open-redirect protection: only allow internal relative paths
  const returnTo = returnToRaw.startsWith("/") ? returnToRaw : "/";

  const payload: StatePayload = {
    returnTo,
    ts: Date.now(),
    nonce: crypto.randomBytes(8).toString("hex"),
  };

  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const sig = hmacSHA256(secret, payloadB64);

  // format: "<payload>.<signature>"
  return `${payloadB64}.${sig}`;
}

export function verifyAndParseState(
  state: string,
  secret: string,
  maxAgeMs = 10 * 60 * 1000,
) {
  const [payloadB64, sig] = state.split(".");
  if (!payloadB64 || !sig) return null;

  const expected = hmacSHA256(secret, payloadB64);

  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  let payload: StatePayload;
  try {
    payload = JSON.parse(base64urlDecode(payloadB64));
  } catch {
    return null;
  }

  if (
    typeof payload?.returnTo !== "string" ||
    !payload.returnTo.startsWith("/")
  )
    return null;
  if (typeof payload?.ts !== "number") return null;

  // optional expiry
  if (Date.now() - payload.ts > maxAgeMs) return null;

  return payload;
}
