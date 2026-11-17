import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieName, verifySessionToken } from "../../../../lib/security";
import { getJobResumeById } from "../../../../lib/store";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session || !session.scopes.includes("candidaturas")) {
    return new NextResponse("Acesso negado.", { status: 403 });
  }

  const { id } = await context.params;
  const resume = await getJobResumeById(id);

  if (!resume) {
    return new NextResponse("Currículo não encontrado.", { status: 404 });
  }

  return new NextResponse(Uint8Array.from(resume.buffer), {
    status: 200,
    headers: {
      "Content-Type": resume.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(resume.fileName)}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
