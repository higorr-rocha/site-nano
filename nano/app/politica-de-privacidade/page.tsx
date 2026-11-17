import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Política de Privacidade | Nanoquímica",
  description:
    "Política de Privacidade e Cookies da NANO QUIMICA LTDA (CNPJ n° 39.728.455/0001-63).",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Política de Privacidade" }]} />

      <section className="bg-[#24298D] px-6 py-12 text-white lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            LGPD e Transparência
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80">
            Política de Privacidade e Cookies — NANO QUIMICA LTDA (CNPJ n° 39.728.455/0001-63)
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="space-y-8 rounded-2xl bg-white p-8 text-left sm:text-justify hyphens-auto text-sm leading-7 text-slate-600 shadow-[0_12px_35px_rgba(36,41,141,0.08)] sm:p-12 sm:text-base">
          <div className="space-y-4">
            <p>
              A <strong>NANO QUIMICA LTDA</strong> atua no sentido de estar em conformidade com a legislação de proteção de dados e preservação da privacidade, nos termos da lei, por esta razão divulga a sua Política de Privacidade e Cookies, conforme descrito abaixo e coloca-se à disposição para eventuais esclarecimentos, pelo contato informado ao final deste documento.
            </p>
            <p>
              O objetivo é demonstrar com base na Lei Geral de Proteção de Dados, como ocorrem a coleta, o armazenamento, a utilização, o tratamento, o compartilhamento e a exclusão dos dados e informações eventualmente coletados pela NANO QUIMICA LTDA em suas plataformas digitais, oferecendo informações sobre o tratamento e a utilização dos dados aos seus titulares.
            </p>
            <p>
              A NANO QUIMICA LTDA declara que o seu objetivo principal é o de preservar a privacidade, a autodeterminação, a liberdade de expressão, informação, a sua intimidade, honra e imagens, nos termos regulamentados pela Lei Geral de Proteção de Dados.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">1. Dados Coletados</h2>
            <p className="mt-2">
              Os dados coletados por meio dos formulários deste website restringem-se às informações fornecidas voluntariamente pelo titular para atendimento comercial ou candidatura a vagas: nome, empresa, e-mail, telefone, cidade, estado (UF), mensagem e currículo anexado (nos formatos PDF, DOC ou DOCX). Ao interagir com o aviso de privacidade, a preferência é armazenada localmente no navegador, e os metadados técnicos essenciais de segurança (hash de fingerprint do navegador, idioma, fuso horário e resolução) são registrados no servidor exclusivamente quando o usuário submete um formulário ou realiza autenticação administrativa, para fins de prevenção à fraude e segurança (Art. 7º, IX da LGPD).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">2. Utilização e Coleta dos Dados</h2>
            <p className="mt-2">
              Utilizamos os dados fornecidos para responder às solicitações comerciais e de orçamento, conduzir processos seletivos de Recursos Humanos e proteger a integridade dos serviços digitais da empresa. Os cookies analíticos são opcionais e podem ser recusados no banner de consentimento ou desativados nas configurações do navegador (Firefox, Edge, Google Chrome, Safari, entre outros).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">3. Utilização de Dados Sensíveis e 4. Proteção dos Dados</h2>
            <p className="mt-2">
              Não coletamos dados pessoais sensíveis. Utilizamos assinaturas criptográficas (HMAC-SHA256), hashing irreversível de senhas (PBKDF2-SHA512), conexões seguras (TLS/HTTPS) e controle estrito de acesso baseado em escopos (RBAC) para impedir que os dados sejam indevidamente acessados, alterados ou divulgados.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">5. Compartilhamento e 6. Armazenamento de Dados</h2>
            <p className="mt-2">
              O compartilhamento de dados com terceiros ocorre apenas quando estritamente necessário para a operação segura do site (como verificação anti-bot via Cloudflare Turnstile e métricas agregadas via Google Analytics mediante consentimento) ou nas hipóteses previstas em lei. Os dados são armazenados de forma segura durante o período necessário aos fins a que se destinam, observando a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">7. Direitos do Titular dos Dados</h2>
            <p className="mt-2">
              A LGPD (Art. 18) assegura ao titular de dados direitos como: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos, inexatos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; eliminação dos dados tratados com consentimento; informações sobre compartilhamento e revogação do consentimento a qualquer momento.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">8. Tipos de Cookies e 9. Cookies e Chaves Utilizadas</h2>
            <p className="mt-2">
              Utilizamos apenas cookies e registros de armazenamento local estritamente alinhados às funcionalidades do site:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
              <li>
                <strong>Cookies e registros estritamente necessários e de segurança:</strong>{" "}
                <code>nanoquimica_cookie_consent_v2</code> e <code>nanoquimica_browser_fp</code> (chaves de <code>localStorage</code> mantidas localmente no navegador para guardar sua preferência de privacidade e hash de segurança); <code>nano_cookie_consent</code> (cookie HTTP-Only emitido quando há envio de formulário para registrar a preferência de consentimento); <code>nano_acesso_sid</code> (cookie de sessão HTTP-Only restrito a colaboradores autenticados no painel administrativo); e tokens de verificação do Cloudflare Turnstile (<code>cf_clearance</code>) para proteção contra bots.
              </li>
              <li>
                <strong>Cookies analíticos opcionais (Google Analytics 4):</strong>{" "}
                <code>_ga</code> e <code>_ga_*</code>, carregados exclusivamente quando o visitante autoriza métricas analíticas no banner de cookies, operando com anonimização de IP ativada.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">10. Alteração, 11. Versões e 12. Contatos</h2>
            <p className="mt-2">
              Política de Privacidade e Cookies da NANO QUIMICA LTDA atualizada em conformidade com a arquitetura vigente do portal corporativo. Para esclarecimentos ou exercício dos direitos de titular (LGPD), entre em contato pelo endereço eletrônico:{" "}
              <a href="mailto:nanoquimica@nanoquimica.com.br" className="font-bold text-[#FF8200] hover:underline">
                nanoquimica@nanoquimica.com.br
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
