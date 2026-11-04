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
        <div className="space-y-8 rounded-2xl bg-white p-8 text-justify text-sm leading-7 text-slate-600 shadow-[0_12px_35px_rgba(36,41,141,0.08)] sm:p-12 sm:text-base">
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
              Os dados geralmente coletados por meio do website, de cadastro ou para informação em atividades de marketing são: nome, profissão, CPF, endereço, e-mail, telefone e celular. Ao navegar pelo website, podem ser coletados dados relativos ao seu provedor de internet, sistema operacional, navegador e páginas. Havendo interesse do usuário na contratação de nossos produtos e serviços, serão coletados nomes, e-mail, CNPJ, CPF, endereços e disponibilizado questionário operacional mediante solicitação.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">2. Utilização e Coleta dos Dados</h2>
            <p className="mt-2">
              Utilizamos os dados fornecidos para responder às questões e interesses apresentados pelo titular do dado, nos comunicar e apresentar possibilidades de contratação. Os dados de navegação são coletados por meio de cookies, podendo ser desativados nas configurações do navegador (Firefox, Edge, Google Chrome, entre outros).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">3. Utilização de Dados Sensíveis e 4. Proteção dos Dados</h2>
            <p className="mt-2">
              Não coletamos dados sensíveis. Utilizamos sistemas de criptografia e exercitamos todos os cuidados para garantir que o trânsito de informações ao nosso website ofereça segurança de uso e privacidade, objetivando impedir que os dados sejam indevidamente acessados ou alterados.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">5. Compartilhamento e 6. Armazenamento de Dados</h2>
            <p className="mt-2">
              O compartilhamento de dados com terceiros ocorre apenas mediante consentimento ou nas hipóteses autorizadas por lei. Os dados coletados serão utilizados e armazenados durante o período necessário aos fins a que se destinam, observando a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">7. Direitos do Titular dos Dados</h2>
            <p className="mt-2">
              A LGPD concede direitos ao titular de dados, tais como: acesso pleno aos dados; correção de dados; anonimização, bloqueio e/ou eliminação de dados; portabilidade; eliminação dos dados tratados com consentimento; informações sobre compartilhamento e revogação do consentimento.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">8. Tipos de Cookies e 9. Cookies Coletados</h2>
            <p className="mt-2">
              Utilizamos cookies proprietários, de terceiros, de sessão, persistentes, necessários (SIDCC, _Secure-HSID, AID, DSID, NID), de desempenho (1P_JAR, OTZ, _fbp, _ga, _dc_gtm_, _gid) e de publicidade para otimizar a experiência de navegação sem identificar pessoalmente o visitante, salvo mediante preenchimento voluntário de formulário.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#24298D]">10. Alteração, 11. Versões e 12. Contatos</h2>
            <p className="mt-2">
              Primeira versão da Política de Privacidade — NANO QUIMICA LTDA, formulada em fevereiro de 2022. Para esclarecimentos, entre em contato pelo endereço eletrônico:{" "}
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
