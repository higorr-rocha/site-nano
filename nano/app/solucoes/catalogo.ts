import acucarImage from "../images/produtos/list-acucar.webp";
import etanolImage from "../images/produtos/list-etanol.webp";
import industriaImage from "../images/produtos/list-industria.webp";
import acucarDescriptionImage from "../images/produtos/acucar/descricao/produto_a_1.webp";
import etanolDescriptionImage from "../images/produtos/etanol/descricao/produto_e_1.webp";
import industriaDescriptionImage from "../images/produtos/industria/descricao/produto_i_1.webp";
import acucarAcido from "../images/produtos/acucar/acido-fosforico-purificado-bloco-1.webp";
import acucarAntiIncrustante from "../images/produtos/acucar/anti-incrustante-lateral.webp";
import acucarAuxiliar from "../images/produtos/acucar/auxiliar-para-extracao-de-acucar-nanodec-541.webp";
import acucarBactericida from "../images/produtos/acucar/bactericida-lateral.webp";
import acucarClarificante from "../images/produtos/acucar/clarificante-de-acucar-655x538.webp";
import acucarDescolorante from "../images/produtos/acucar/descolorante-lateral.webp";
import acucarDispersante from "../images/produtos/acucar/Dispersante-de-massa-Nanodec-520.webp";
import acucarLimpeza from "../images/produtos/acucar/limpeza-quimica-acida-e-alcalina-655x538.webp";
import acucarLubrificante from "../images/produtos/acucar/lubrificante-de-massa.webp";
import acucarNeutralizante from "../images/produtos/acucar/neutralizante-de-vapor-lateral.webp";
import etanolAntiIncrustante from "../images/produtos/etanol/antiencrustante-de-coluna.webp";
import etanolAntibiotico from "../images/produtos/etanol/antibiotico-liquido-lateral.webp";
import etanolAntiespumante from "../images/produtos/etanol/antiespumante-lateral.webp";
import etanolBactericida from "../images/produtos/etanol/bactericidas-lateral.webp";
import etanolBactericidaOrganico from "../images/produtos/etanol/bactericida-organico-lateral.webp";
import etanolBiocidas from "../images/produtos/etanol/biocidas.webp";
import etanolDispersante from "../images/produtos/etanol/dispersante-lateral.webp";
import etanolNeutralizante from "../images/produtos/etanol/neutralizante-de-etanol-lateral.webp";
import etanolNutrientes from "../images/produtos/etanol/nutrientes-lateral-1.webp";
import industriaAcido from "../images/produtos/industria/acido-fosforico-purificado-bloco-1.webp";
import industriaAntiespumante from "../images/produtos/industria/antiespumante-lateral.webp";
import industriaBiocidas from "../images/produtos/industria/biocidas.webp";
import industriaLimpeza from "../images/produtos/industria/limpeza-quimica-acida-e-alcalina-655x538.webp";

export type Product = {
  slug: string;
  title: string;
  image: StaticImageData;
  descriptionImage: StaticImageData;
};

export const categories = [
  {
    slug: "acucar",
    title: "Açúcar",
    description: "Soluções químicas para eficiência, qualidade e controle na produção de açúcar.",
    image: acucarImage,
  },
  {
    slug: "etanol",
    title: "Etanol",
    description: "Tecnologia para apoiar processos mais seguros e eficientes na produção de etanol.",
    image: etanolImage,
  },
  {
    slug: "industria",
    title: "Indústria",
    description: "Produtos e suporte técnico para diferentes desafios da operação industrial.",
    image: industriaImage,
  },
] as const;

const product = (slug: string, title: string, image: StaticImageData, descriptionImage: StaticImageData): Product => ({
  slug,
  title,
  image,
  descriptionImage,
});

export const productsByCategory: Record<string, Product[]> = {
  acucar: [
    product("acido-fosforico-purificado-nanophos", "Ácido Fosfórico Purificado - NanoPhós", acucarAcido, acucarDescriptionImage),
    product("anti-incrustante-inibir-a-incrustacao", "Anti-incrustante - Inibir a incrustação", acucarAntiIncrustante, acucarDescriptionImage),
    product("auxiliar-para-extracao-de-acucar-nanodec-541", "Auxiliar para extração de açúcar - Nanodec 541", acucarAuxiliar, acucarDescriptionImage),
    product("bactericidas-para-moenda", "Bactericidas para Moenda", acucarBactericida, acucarDescriptionImage),
    product("clarificante-de-caldo-xarope-e-calda", "Clarificante de caldo, xarope e calda", acucarClarificante, acucarDescriptionImage),
    product("descolorante-de-xarope-e-calda", "Descolorante de Xarope e Calda", acucarDescolorante, acucarDescriptionImage),
    product("dispersante-de-massa-nanodec-520", "Dispersante de massa - Nanodec 520", acucarDispersante, acucarDescriptionImage),
    product("limpeza-quimica-acida-e-alcalina", "Limpeza química ácida e alcalina", acucarLimpeza, acucarDescriptionImage),
    product("lubrificante-de-massa", "Lubrificante de massa", acucarLubrificante, acucarDescriptionImage),
    product("neutralizante-de-vapor", "Neutralizante de vapor", acucarNeutralizante, acucarDescriptionImage),
  ],
  etanol: [
    product("anti-incrustante-de-coluna", "Anti-incrustante de coluna", etanolAntiIncrustante, etanolDescriptionImage),
    product("antibiotico-liquido-monensina", "Antibiótico Líquido (Monensina)", etanolAntibiotico, etanolDescriptionImage),
    product("antiespumante-e-dispersante-ganho-de-eficiencia-no-controle-da-espuma", "Antiespumante e Dispersante - Ganho de eficiência no controle da espuma", etanolAntiespumante, etanolDescriptionImage),
    product("bactericidas-controle-da-infeccao-na-fermentacao", "Bactericidas - Controle da infecção na fermentação", etanolBactericida, etanolDescriptionImage),
    product("bactericidas-organicos", "Bactericidas orgânicos", etanolBactericidaOrganico, etanolDescriptionImage),
    product("biocidas-dioxido-de-cloro", "Biocidas (dióxido de cloro)", etanolBiocidas, etanolDescriptionImage),
    product("dispersante", "Dispersante", etanolDispersante, etanolDescriptionImage),
    product("neutralizante-de-etanol", "Neutralizante de Etanol", etanolNeutralizante, etanolDescriptionImage),
    product("nutrientes-aumento-da-propagacao-do-fermento-no-inicio-da-safra", "Nutrientes - Aumento da propagação do fermento no início da safra", etanolNutrientes, etanolDescriptionImage),
  ],
  industria: [
    product("acido-fosforico-purificado-nanophos", "Ácido Fosfórico Purificado - NanoPhós", industriaAcido, industriaDescriptionImage),
    product("antiespumante-e-dispersante-ganho-de-eficiencia-no-controle-da-espuma", "Antiespumante e Dispersante - Ganho de eficiência no controle da espuma", industriaAntiespumante, industriaDescriptionImage),
    product("biocidas-dioxido-de-cloro", "Biocidas (dióxido de cloro)", industriaBiocidas, industriaDescriptionImage),
    product("limpeza-quimica-acida-e-alcalina", "Limpeza química ácida e alcalina", industriaLimpeza, industriaDescriptionImage),
  ],
};

export const sugarProducts = productsByCategory.acucar;
import type { StaticImageData } from "next/image";
