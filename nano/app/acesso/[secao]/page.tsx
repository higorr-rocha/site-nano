import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getSessionCookieName,
  type RoleScope,
  verifySessionToken,
} from "../../lib/security";
import { getStoreDataForScopes } from "../../lib/store";
import PainelClient from "../PainelClient";

export const dynamic = "force-dynamic";

type SecaoPageProps = {
  params: Promise<{ secao: string }>;
};

export default async function AcessoSecaoPage({ params }: SecaoPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect("/acesso/login");
  }

  const { secao } = await params;
  const validSecao = secao as RoleScope;
  const data = getStoreDataForScopes(session.scopes);

  const isAllowed = session.scopes.includes(validSecao);
  const activeSection = isAllowed ? validSecao : session.scopes[0];
  const accessDeniedNotice = !isAllowed
    ? `Bloqueio de Segurança (Servidor): Sua conta (${session.email}) não possui permissão para acessar a rota "/acesso/${secao}". Exibindo apenas as seções autorizadas para o seu perfil.`
    : undefined;

  return (
    <PainelClient
      user={{
        email: session.email,
        name: session.name,
        roleLabel: session.roleLabel,
        scopes: session.scopes,
      }}
      initialSection={activeSection}
      accessDeniedNotice={accessDeniedNotice}
      data={data}
    />
  );
}
