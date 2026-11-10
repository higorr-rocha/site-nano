import { createSignedChallenge, signedJsonResponse } from "../../../lib/security";

export async function GET() {
  const challenge = createSignedChallenge();
  return signedJsonResponse({
    ok: true,
    challengeNonce: challenge.nonce,
    challengeTimestamp: challenge.timestamp,
    challengeSignature: challenge.serverSignature,
  });
}
