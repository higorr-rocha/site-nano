import acidoFosforico from "../images/acido-fosforico-purificado-bloco-1.webp";
import acucarImage from "../images/list-acucar.webp";
import etanolImage from "../images/list-etanol.webp";
import industriaImage from "../images/list-industria.webp";
import produtoDetalhe from "../images/produto_a_1.webp";

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

export const sugarProducts = [
  ["acido-fosforico-purificado-nanophos", "Ácido Fosfórico Purificado - NanoPhós"],
  ["anti-incrustante-inibir-a-incrustacao", "Anti-incrustante - Inibir a incrustação"],
  ["auxiliar-para-extracao-de-acucar-nanodec-541", "Auxiliar para extração de açúcar - Nanodec 541"],
  ["bactericidas-para-moenda", "Bactericidas para Moenda"],
  ["clarificante-de-caldo-xarope-e-calda", "Clarificante de caldo, xarope e calda"],
  ["descolorante-de-xarope-e-calda", "Descolorante de Xarope e Calda"],
  ["dispersante-de-massa-nanodec-520", "Dispersante de massa - Nanodec 520"],
  ["limpeza-quimica-acida-e-alcalina", "Limpeza química ácida e alcalina"],
  ["lubrificante-de-massa", "Lubrificante de massa"],
  ["neutralizante-de-vapor", "Neutralizante de vapor"],
] as const;

export const productImage = acidoFosforico;
export const detailImage = produtoDetalhe;
