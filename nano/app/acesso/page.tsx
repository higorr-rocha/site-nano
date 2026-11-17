import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, verifySessionToken } from "../lib/security";
import { getStoreDataForScopes } from "../lib/store";
import PainelClient from "./PainelClient";

export const dynamic = "force-dynamic";

export default async function AcessoRootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect("/acesso/login?bloqueado=1");
  }

  const data = await getStoreDataForScopes(session.scopes);
  const defaultSection = session.scopes[0] || "contatos";

  return (
    <PainelClient
      user={{
        email: session.email,
        name: session.name,
        roleLabel: session.roleLabel,
        scopes: session.scopes,
      }}
      initialSection={defaultSection}
      data={data}
    />
  );
}
