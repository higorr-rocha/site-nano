import type { StaticImageData } from "next/image";
import acucarImage from "../images/produtos/list-acucar.webp";
import etanolImage from "../images/produtos/list-etanol.webp";
import industriaImage from "../images/produtos/list-industria.webp";
import acucarDescriptionImage from "../images/produtos/acucar/descricao/produto_a_1.webp";
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

export type ProductDetailContent = {
  introHeading: string;
  introParagraphs: string[];
  ctaText?: string;
  featuresTitle?: string;
  featuresParagraphs?: string[];
  featuresBullets?: string[];
  gridTitle?: string;
  gridIntro?: string;
  gridItems?: [string, string][];
  highlightTitle?: string;
  highlightParagraphs?: string[];
  highlightItems?: [string, string][];
  conclusionTitle?: string;
  conclusionLeft?: string[];
  conclusionRight?: string[];
};

export type Product = {
  slug: string;
  title: string;
  image: StaticImageData;
  secondaryImage?: StaticImageData;
  details: ProductDetailContent;
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

export const productDetailsBySlug: Record<string, ProductDetailContent> = {
  "acido-fosforico-purificado-nanophos": {
    introHeading: "Aplicações, benefícios e mercado",
    introParagraphs: [
      "O Nanophós Purificado (Ácido Fosfórico Purificado) é um composto químico de extrema importância em diversas indústrias, sendo amplamente utilizado em aplicações que vão desde a produção de fertilizantes até a clarificação de açúcar. Neste conteúdo preparado pela Nanoquimica, apresentaremos informações essenciais sobre o Ácido Fosfórico Purificado, nosso NANOPHÓS PURIFICADO, abordando suas características, usos e relevância nos setores industriais.",
    ],
    featuresTitle: "Características do Ácido Fosfórico Purificado",
    featuresParagraphs: [
      "Neste conteúdo também vamos trazer as principais características do Nanophós Purificado (Ácido Fosfórico Purificado), um tipo específico de ácido fosfórico que passa por rigorosos processos de purificação, resultando em um produto de alta qualidade, livre de impurezas e contaminantes. Sua pureza é essencial para garantir o desempenho ideal nas aplicações em que é utilizado.",
    ],
    gridTitle: "Aplicações e Usos",
    gridItems: [
      [
        "Indústria de fertilizantes:",
        "O Nanophós Purificado (Ácido Fosfórico Purificado) é um componente fundamental na produção de fertilizantes fosfatados. Sua capacidade de fornecer fósforo de maneira solúvel em água torna-o essencial para o crescimento saudável das plantas e aumento da produtividade agrícola.",
      ],
      [
        "Clarificação de açúcar:",
        "Na indústria açucareira, o Nanophós Purificado (Ácido Fosfórico Purificado) é amplamente empregado na clarificação do caldo de cana, removendo impurezas e corantes, resultando em um açúcar de alta qualidade e pureza.",
      ],
      [
        "Galvanoplastia (decapagem de metal):",
        "Nas usinas e indústrias que trabalham com metais, o ácido fosfórico é usado para realizar a decapagem, ou seja, a remoção de óxidos e impurezas das superfícies metálicas, preparando-as para processos de revestimento ou tratamentos posteriores.",
      ],
      [
        "Indústria de couro:",
        "O Nanophós Purificado (Ácido Fosfórico Purificado) é empregado no processo de curtimento de couro, contribuindo para a remoção de resíduos e substâncias indesejadas, resultando em couro de qualidade superior.",
      ],
      [
        "Biodiesel:",
        "Na produção de biodiesel, o ácido fosfórico é usado como catalisador em reações específicas de transesterificação, que transformam óleos vegetais em biodiesel.",
      ],
    ],
    highlightTitle: "Benefícios e diferenciais",
    highlightParagraphs: [
      "Uma das principais vantagens do Nanophós Purificado (Ácido Fosfórico Purificado) é sua alta capacidade de clarificação, tornando-o especialmente adequado para aplicações que requerem um alto grau de pureza.",
      "Outro ponto relevante é sua versatilidade do Nanophós Purificado (Ácido Fosfórico Purificado), pois atende às demandas de diversos segmentos industriais, desde a agricultura até a indústria em geral. Vale ressaltar que, embora o Ácido Fosfórico Purificado não seja o mais caro, sua pureza e eficácia o colocam distante da categoria de produtos de qualidade inferior.",
    ],
    conclusionTitle: "Considerações Finais",
    conclusionLeft: [
      "O Nanophós Purificado (Ácido Fosfórico Purificado) é um componente essencial em muitos processos industriais, desempenhando um papel fundamental na clarificação, purificação e produção de diversos produtos. Sua relevância é evidente nos mercados de fertilizantes, açúcar, couro, alimentos e biodiesel, entre outros.",
      "Se você busca um produto de alta pureza e qualidade, capaz de atender às demandas de aplicações críticas, o Nanophós Purificado (Ácido Fosfórico Purificado) fornecido pela Nanoquimica é a escolha ideal.",
    ],
    conclusionRight: [
      "Com experiência e excelência na produção química, a empresa oferece soluções confiáveis e eficientes para as indústrias que necessitam do melhor desempenho em seus processos.",
      "Conte com a Nanoquimica para obter o Ácido Fosfórico Purificado que sua empresa precisa. Entre em contato conosco e descubra como nossos produtos podem impulsionar o sucesso do seu negócio.",
    ],
  },

  "anti-incrustante-inibir-a-incrustacao": {
    introHeading: "Descubra o Poderoso Nanocrust! Antincrustantes de Coluna e Evaporação.",
    introParagraphs: [
      "Em um mundo onde a eficiência é crucial, apresentamos o revolucionário Nanocrust, uma solução avançada para a prevenção de incrustações em colunas e evaporação. Este inovador antincrustante é a resposta para desafios persistentes, oferecendo benefícios excepcionais em diversas aplicações industriais.",
      "O Nanocrust é um antincrustante de última geração, formulado com nanotecnologia de ponta. Desenvolvido por especialistas, esse produto é projetado especificamente para combater o acúmulo de incrustações em colunas e evaporação, garantindo um desempenho superior em ambientes industriais desafiadores.",
    ],
    featuresTitle: "O poder do Nanocrut: Um anti-incrustante de qualidade",
    featuresParagraphs: [
      "O Nanocrust possui um poder incomparável na prevenção de incrustações, proporcionando uma limpeza eficaz e duradoura. Sua formulação avançada age rapidamente, impedindo a formação de depósitos indesejados e promovendo a eficiência operacional. Com Nanocrust, você pode contar com uma solução poderosa que mantém seus sistemas funcionando sem interrupções.",
    ],
    gridTitle: "Benefícios e diferenciais do Nanocrust",
    gridItems: [
      [
        "Eficiência Aprimorada:",
        "O Nanocrust melhora significativamente a eficiência dos sistemas, reduzindo a resistência ao fluxo e otimizando o desempenho.",
      ],
      [
        "Manutenção Reduzida:",
        "Ao prevenir incrustações, o produto minimiza a necessidade de manutenção corretiva, resultando em economia de tempo e recursos.",
      ],
      [
        "Vida Útil Prolongada:",
        "A aplicação regular do Nanocrust prolonga a vida útil de equipamentos e sistemas, economizando custos a longo prazo.",
      ],
      [
        "Meio Ambiente Seguro:",
        "Sua fórmula é projetada para ser ecoamigável, garantindo que a eficácia não comprometa a responsabilidade ambiental.",
      ],
    ],
    highlightTitle: "Aplicações e Usos",
    highlightParagraphs: [
      "O Nanocrust é ideal para uma variedade de aplicações industriais, incluindo:",
    ],
    highlightItems: [
      [
        "Colunas de Destilação:",
        "Previna incrustações em colunas de destilação, mantendo a eficiência na produção de produtos químicos.",
      ],
      [
        "Evaporadores:",
        "Proteja os evaporadores de incrustações que podem comprometer a transferência de calor e eficiência do processo.",
      ],
      [
        "Sistemas de Resfriamento:",
        "Evite depósitos indesejados em sistemas de resfriamento, garantindo um funcionamento suave e contínuo.",
      ],
    ],
    conclusionTitle: "Considerações Finais",
    conclusionLeft: [
      "Em um mercado competitivo, investir no Nanocrust é investir na eficiência e na confiabilidade. Sua capacidade de prevenir incrustações em colunas e evaporação redefine os padrões da indústria, proporcionando benefícios substanciais e contribuindo para operações mais sustentáveis.",
    ],
    conclusionRight: [
      "Conheça o poderoso Nanocrust e eleve sua produção a novos patamares de eficiência e excelência.",
    ],
  },

  "auxiliar-para-extracao-de-acucar-nanodec-541": {
    introHeading: "Dispersante de massa: Eficiência e Inovação para o Processo de Produção de Açúcar",
    introParagraphs: [
      "O NANODEC 541 é formulado com agentes tensoativos para atuar como auxiliar na extração de sacarose. Sua aplicação contribui para maior eficiência na extração do açúcar, favorecendo o melhor aproveitamento da matéria-prima.",
      "O produto promove a ruptura de agregados coloidais e a dispersão de sólidos presentes no processo, tornando-os mais solúveis ou mais facilmente removíveis. Dessa forma, otimiza a liberação da sacarose durante as etapas de moagem ou difusão.",
    ],
    ctaText:
      "Entre em contato com nossos especialistas e descubra como o NANODEC 520 pode transformar o seu processo.",
    gridTitle: "Benefícios do NANODEC 541",
    gridItems: [
      ["Maior eficiência na extração do açúcar", ""],
      ["Ruptura de agregados coloidais", ""],
      ["Redução da pol no bagaço", ""],
      ["Melhor aproveitamento da matéria-prima", ""],
      ["Dispersão de sólidos no processo", ""],
      ["Menor teor de umidade do bagaço", ""],
      ["Melhor rendimento térmico", ""],
    ],
    highlightTitle: "Aplicação e Dosagem",
    highlightItems: [
      [
        "Aplicação:",
        "O NANODEC 541 deve ser aplicado diretamente na água de embebição no penúltimo terno, de forma contínua.",
      ],
      [
        "Dosagem:",
        "A dosagem recomendada varia entre 50 e 150 ppm, podendo ser ajustada conforme as condições operacionais do processo.",
      ],
    ],
  },

  "bactericidas-para-moenda": {
    introHeading: "Bactericidas para Moenda: O Segredo para uma Produção Eficiente de Açúcar",
    introParagraphs: [
      "Os bactericidas para moenda são produtos essenciais na indústria açucareira, utilizados para controlar a presença de micro-organismos indesejados durante a extração do caldo. Sua aplicação estratégica é fundamental para manter a eficiência da produção e garantir a qualidade do açúcar final.",
    ],
    gridTitle: "Aplicações, Poder e Características do Produto",
    gridItems: [
      [
        "Aplicações e Usos:",
        "Os bactericidas para moenda devem ser aplicados diretamente no processo de extração do caldo de cana. Isso ocorre geralmente nas moendas ou nos equipamentos próximos, onde há maior probabilidade de contaminação por micro-organismos.",
      ],
      [
        "Poder dos Bactericidas para Moenda:",
        "Esses produtos possuem um poderoso efeito bactericida, capaz de eliminar rapidamente os micro-organismos presentes na moenda. Ao interromper o crescimento dessas bactérias indesejadas, os bactericidas minimizam as perdas de açúcar durante a produção, garantindo um rendimento mais eficiente.",
      ],
      [
        "Conheça as Características do Produto:",
        "Os bactericidas para moenda são formulados com compostos químicos específicos, desenvolvidos para combater eficazmente uma ampla variedade de bactérias e fungos. Geralmente, são apresentados na forma líquida ou em pó, facilitando sua aplicação nos processos industriais.",
      ],
    ],
    highlightTitle: "Benefícios e diferenciais",
    highlightParagraphs: [
      "Uma das principais vantagens do Nanophós Purificado (Ácido Fosfórico Purificado) é sua alta capacidade de clarificação, tornando-o especialmente adequado para aplicações que requerem um alto grau de pureza.",
      "Outro ponto relevante é sua versatilidade do Nanophós Purificado (Ácido Fosfórico Purificado), pois atende às demandas de diversos segmentos industriais, desde a agricultura até a indústria em geral. Vale ressaltar que, embora o Ácido Fosfórico Purificado não seja o mais caro, sua pureza e eficácia o colocam distante da categoria de produtos de qualidade inferior.",
    ],
    conclusionTitle: "Considerações Finais",
    conclusionLeft: [
      "Investir na utilização de bactericidas para moenda é crucial para garantir uma produção eficiente e de alta qualidade na indústria açucareira. Ao controlar a presença de bactérias e fungos durante a extração do caldo, esses produtos contribuem significativamente para minimizar as perdas de açúcar e manter os padrões de qualidade exigidos pelo mercado.",
    ],
    conclusionRight: [
      "Assim, os bactericidas para moenda se revelam como um aliado indispensável para as usinas de açúcar em busca de maior eficiência e competitividade.",
    ],
  },

  "clarificante-de-caldo-xarope-e-calda": {
    introHeading: "Maximize a claridade com Nossos Clarificantes Industriais!",
    introParagraphs: [
      "Descubra a revolução na indústria com nossos clarificantes especializados, projetados para aprimorar a clarificação do caldo, xarope e/ou calda, proporcionando assim a produção de açúcar branco de alta qualidade. A eficácia desse produto é inigualável, conferindo uma solução que não apenas facilita a aplicação, mas também reduz significativamente os riscos associados ao manuseio.",
    ],
    featuresTitle: "Conheça o poder dos nossos clarificantes",
    featuresParagraphs: [
      "Nossos clarificantes são formulados com uma combinação única de ingredientes que potencializam a clarificação do caldo, xarope e/ou calda. Essa fórmula exclusiva oferece benefícios inigualáveis, resultando em açúcar branco de qualidade superior. Com uma ação rápida e eficiente, nossos clarificantes destacam-se pela sua capacidade de:",
    ],
    featuresBullets: [
      "Aumentar a transparência do caldo, proporcionando um processo de produção mais eficiente.",
      "Reduzir a formação de impurezas, contribuindo para a obtenção de um produto final mais puro.",
      "Aprimorar a cristalização, resultando em açúcar branco de textura fina e sabor excepcional.",
    ],
    gridTitle: "Benefícios e diferenciais exclusivos do clarificante",
    gridItems: [
      [
        "Melhoria na qualidade:",
        "Melhora significativa na qualidade do açúcar produzido.",
      ],
      [
        "Aumenta a eficiência:",
        "Maior eficiência no processo de clarificação.",
      ],
      [
        "Rapidez na produção:",
        "Redução do tempo de produção.",
      ],
      [
        "Menos riscos:",
        "Minimização dos riscos no manuseio do produto.",
      ],
    ],
    highlightTitle: "Veja as aplicações e usos abrangentes",
    highlightParagraphs: [
      "Este inovador clarificante pode ser aplicado em diversas etapas do processo de produção de açúcar. Desde a fase de extração do caldo até a cristalização final, nossos produtos oferecem resultados notáveis. Seja em usinas de açúcar, refinarias ou plantas de processamento, nossos clarificantes proporcionam vantagens substanciais em todas as etapas do ciclo produtivo.",
    ],
    conclusionTitle: "Clarificantes industriais que proporcionam um aumento significativo na eficiência",
    conclusionLeft: [
      "Não comprometa a qualidade do seu açúcar. Invista nos nossos clarificantes industriais e experimente um salto significativo na eficiência do seu processo produtivo.",
    ],
    conclusionRight: [
      "Garantimos que nossos produtos não apenas atendem, mas superam as expectativas da indústria, promovendo a produção de açúcar branco de alta qualidade de maneira segura e eficaz. Escolha a claridade, escolha a excelência - escolha nossos clarificantes industriais!",
    ],
  },

  "descolorante-de-xarope-e-calda": {
    introHeading: "Descolorante Polifosfatado: Eficiência e Qualidade na Produção de Açúcar",
    introParagraphs: [
      "O descolorante de xarope e calda é um composto polifosfatado de caráter catiônico, especialmente formulado para a remoção eficiente de substâncias corantes e impurezas aniônicas presentes no processo de produção de açúcar. Sua composição foi desenvolvida com rigorosos padrões de qualidade para garantir resultados superiores.",
    ],
    featuresTitle: "Características desse produto",
    featuresParagraphs: [
      "Este descolorante apresenta propriedades únicas que o tornam ideal para o refinamento de xaropes e caldas. Sua formulação polifosfatada confere-lhe uma capacidade excepcional de clarificação, resultando em xaropes e caldas límpidos e translúcidos. Além disso, sua natureza catiônica permite uma adsorção eficaz de impurezas, garantindo um produto final de qualidade superior.",
    ],
    gridTitle: "Onde aplicar Esse produto",
    gridItems: [
      [
        "Indústrias açucareiras:",
        "O descolorante é usado para refinar matéria-prima, produzindo açúcar de alta qualidade, livre de impurezas e com cor atrativa.",
      ],
      [
        "Fábricas de doces e sobremesas:",
        "Essencial para garantir ingredientes puros, resultando em produtos finais com cores vibrantes e sabores intensos.",
      ],
      [
        "Processamento de alimentos:",
        "Fundamental para obter ingredientes de alta qualidade, livres de impurezas, em uma variedade de produtos alimentícios.",
      ],
      [
        "Empresas de bebidas:",
        "Essencial para aprimorar a qualidade de xaropes e caldas, resultando em bebidas com sabor puro e aparência atraente.",
      ],
    ],
    highlightTitle: "O poder desse Produto",
    highlightParagraphs: [
      "O descolorante de xarope e calda demonstra um poder notável na remoção de corantes e impurezas, proporcionando um refinamento incomparável aos produtos açucarados. Sua ação rápida e eficiente torna-o indispensável em processos de produção que visam a obtenção de açúcar de excelente qualidade.",
    ],
  },

  "dispersante-de-massa-nanodec-520": {
    introHeading: "Dispersante de massa: Eficiência e Inovação para o Processo de Produção de Açúcar",
    introParagraphs: [
      "O Nanodec 520 é um dispersante de massa de alto desempenho, desenvolvido especialmente para otimizar o tratamento e a clarificação da massa cozida no processo de produção de açúcar. Sua formulação avançada promove a dispersão eficaz de sais e a remoção de impurezas coloidais, além de eliminar gomas residuais que dificultam a cristalização e reduzem a eficiência produtiva.",
    ],
    ctaText:
      "Entre em contato com nossos especialistas e descubra como o NANODEC 520 pode transformar o seu processo.",
    featuresTitle: "Características do Dispersante de massa",
    featuresParagraphs: [
      "O Dispersante de Massa Nanodec 520 reduz impurezas coloidais e o escurecimento do mel, dispersa sais e materiais gomosos e melhora a formação dos cristais de sacarose. Também diminui o consumo de água, evita o derretimento de cristais já formados e reduz a recirculação de méis, aumentando a eficiência e reduzindo perdas. Além disso, contribui para a redução do tempo de cozimento e para o aumento da produtividade da planta.",
    ],
    gridTitle: "Onde aplicar?",
    gridItems: [
      [
        "O Dispersante de Massa Nanodec 520 é aplicado:",
        "O Nanodec 520 é aplicado direto no cozimento da massa.",
      ],
    ],
    highlightTitle: "O poder do Nanodec 520",
    highlightParagraphs: [
      "A eficácia do Dispersante de Massa Nanodec 520 é comprovada em operações industriais. Ele proporciona maior clareza da massa cozida, acelera a cristalização e contribui diretamente para a estabilidade e eficiência do processo. O resultado é um açúcar de qualidade superior aliado a uma operação mais econômica e sustentável.",
    ],
  },

  "limpeza-quimica-acida-e-alcalina": {
    introHeading: "Revolucione sua Limpeza com NanoClean:",
    introParagraphs: [
      "Descubra a inovação em limpeza química com a linha de produtos NanoClean! Desenvolvidos especificamente para a limpeza e descontaminação de superfícies internas de tubos e equipamentos de aço inoxidável, nossos produtos são a resposta para a remoção eficaz de ferrugem inorgânica e contaminantes, incluindo biofilme, presentes nas delicadas superfícies de aço inoxidável.",
    ],
    featuresTitle: "Desvendando o poder de NanoClean",
    featuresParagraphs: [
      "O segredo por trás da eficácia incomparável de NanoClean reside em sua fórmula avançada, que atua como uma força invencível na remoção de impurezas e na restauração da integridade de superfícies de aço inoxidável. Sua ação profunda, penetrando nas áreas mais desafiadoras, dissolve ferrugem inorgânica e biofilme, proporcionando uma limpeza abrangente e duradoura. NanoClean não apenas limpa, mas protege, criando uma camada defensiva que desencoraja a formação futura de contaminantes, contribuindo para a longevidade dos equipamentos.",
    ],
    gridTitle: "Benefícios e diferenciais exclusivos do NanoClean.",
    gridItems: [
      [
        "Prolonga a Vida Útil:",
        "Ao eliminar a ferrugem e biofilme, NanoClean contribui para a durabilidade dos equipamentos.",
      ],
      [
        "Melhora a Eficiência:",
        "Superfícies limpas resultam em processos mais eficientes e menos obstruções.",
      ],
      [
        "Confiabilidade:",
        "Produtos testados e comprovados para garantir resultados consistentes.",
      ],
      [
        "Ação Profunda:",
        "Penetra nas áreas de difícil acesso, garantindo uma limpeza completa.",
      ],
      [
        "Remoção Eficaz:",
        "Elimina ferrugem inorgânica e biofilme, restaurando a pureza das superfícies de aço inoxidável.",
      ],
      [
        "Proteção Duradoura:",
        "Cria uma camada protetora para prevenir a formação futura de contaminantes.",
      ],
    ],
    highlightTitle: "Veja as aplicações e usos abrangentes",
    highlightParagraphs: [
      "O NanoClean é ideal para uso em diversos ambientes, incluindo instalações industriais, espaços comerciais e residências. Aplique o NanoClean em superfícies como aço inoxidável, cerâmicas, vidro e muito mais. Seja lidando com resíduos industriais persistentes ou manchas cotidianas em casa, o NanoClean oferece uma solução abrangente para um acabamento impecável.",
    ],
    conclusionTitle: "NanoClean, a escolha defifinitiva para que busca eficácia!",
    conclusionLeft: [
      "Elevando os padrões de limpeza química, NanoClean é a escolha definitiva para indústrias que buscam eficácia, confiabilidade e durabilidade.",
    ],
    conclusionRight: [
      "Ao investir em nossos produtos, você não apenas garante uma limpeza excepcional, mas também protege seus equipamentos, prolongando sua vida útil. Escolha NanoClean e experimente uma abordagem inovadora para a limpeza e descontaminação de superfícies de aço inoxidável.",
    ],
  },

  "lubrificante-de-massa": {
    introHeading: "Linha de Lubrificantes de Massa, Conheça o NQ 700",
    introParagraphs: [
      "Apresentamos a NQ 700, uma inovação notável na categoria de lubrificantes de massa. Desenvolvida com tecnologia de ponta, essa linha redefine os padrões de lubrificação, oferecendo desempenho excepcional em uma variedade de aplicações industriais. O NQ 700 é formulada para garantir uma lubrificação duradoura, resistente a condições extremas e capaz de maximizar a eficiência operacional em diversos setores.",
    ],
    featuresTitle: "Conheça o Poder do NQ 700",
    featuresParagraphs: [
      "A NQ 700 destaca-se pelo seu poder incomparável na redução do atrito e no prolongamento da vida útil de componentes mecânicos. Sua fórmula avançada incorpora nanopartículas lubrificantes que aderem eficazmente às superfícies, formando uma camada protetora que minimiza o desgaste. Esse poder de lubrificação excepcional faz da NQ 700 a escolha ideal para sistemas mecânicos que demandam desempenho superior e durabilidade.",
    ],
    gridTitle: "Benefícios e diferenciais do NQ 700",
    gridItems: [
      [
        "Redução de Atrito:",
        "Minimiza o atrito entre peças móveis, reduzindo o desgaste e aumentando a eficiência.",
      ],
      [
        "Prolongamento da Vida Útil:",
        "Aumenta significativamente a durabilidade de componentes mecânicos, resultando em menor necessidade de substituição.",
      ],
      [
        "Estabilidade em Condições Extremas:",
        "Mantém sua eficácia mesmo em ambientes adversos, como altas temperaturas ou cargas pesadas.",
      ],
      [
        "Economia de Energia:",
        "Contribui para a eficiência energética, reduzindo a resistência e o consumo de energia em operações mecânicas.",
      ],
    ],
    highlightTitle: "Veja as Aplicações e Usos",
    highlightParagraphs: [
      "A versatilidade do NQ 700 permite sua aplicação em uma ampla gama de equipamentos e maquinários, incluindo engrenagens, rolamentos, correntes industriais, mancais e outros componentes mecânicos. Seja em ambientes industriais, agrícolas ou automotivos, o NQ 700 oferece uma solução de lubrificação avançada, adaptando-se às demandas específicas de cada aplicação.",
    ],
    conclusionTitle: "Lubrificação de Alta Performance e Durabilidade",
    conclusionLeft: [
      "Para aqueles que buscam uma lubrificação de alta performance e durabilidade excepcional, o NQ 700 é a escolha certa. Não apenas ela proporciona uma redução notável no atrito e no desgaste, mas também contribui para a eficiência energética e a confiabilidade dos equipamentos.",
    ],
    conclusionRight: [
      "Ao escolher o NQ 700, você investe em qualidade, longevidade e eficiência para os seus sistemas mecânicos. Descubra o poder do NQ 700 e experimente uma revolução na lubrificação de massa.",
    ],
  },

  "neutralizante-de-vapor": {
    introHeading: "Proteção Anticorrosiva Confiança: O Poder do Neutralizante de Vapor à Base de Aminas",
    introParagraphs: [
      "O Neutralizante de Vapor é uma solução à base de aminas, meticulosamente desenvolvida para proporcionar um tratamento anticorrosivo eficaz em uma ampla gama de equipamentos. Sua composição especial o torna adequado para uso em diversos tipos de metais, garantindo uma proteção robusta contra os efeitos corrosivos do ambiente.",
    ],
    featuresTitle: "Características e poder desse produto",
    featuresParagraphs: [
      "Além de sua capacidade de neutralização rápida e eficaz, o Neutralizante de Vapor apresenta outras características notáveis. Sua formulação é projetada para garantir uma aplicação fácil e segura, minimizando qualquer potencial de danos aos equipamentos. Além disso, sua compatibilidade com uma ampla variedade de metais torna-o uma escolha versátil para aplicações industriais diversas.",
      "A eficácia do Neutralizante de Vapor é prontamente perceptível através dos parâmetros de controle, sendo o pH do condensado um dos indicadores mais evidentes. Ao aplicar este produto, os usuários observam uma rápida neutralização da acidez, com o pH do condensado estabilizando-se na faixa de 7,00. Essa ação imediata demonstra o poder de proteção contra a corrosão que o Neutralizante de Vapor oferece.",
    ],
    gridTitle: "Onde aplicar Esse produto",
    gridItems: [
      [
        "Caldeiras Industriais:",
        "O Neutralizante de Vapor é ideal para proteger as caldeiras industriais contra a corrosão, mantendo seu desempenho e prolongando sua vida útil.",
      ],
      [
        "Trocadores de Calor:",
        "Ao aplicar este produto em trocadores de calor, é possível garantir uma transferência eficiente de calor, sem comprometer a integridade dos equipamentos.",
      ],
      [
        "Sistemas de Refrigeração:",
        "Nos sistemas de refrigeração, o Neutralizante de Vapor atua como um escudo protetor, prevenindo danos causados pela corrosão e garantindo a operação contínua e confiável.",
      ],
    ],
    highlightTitle: "Benefícios e diferenciais",
    highlightParagraphs: [
      "O uso do Neutralizante de Vapor proporciona uma série de benefícios significativos para os processos industriais. Além de proteger os equipamentos contra a corrosão, ele ajuda a manter a eficiência operacional, reduzindo os custos de manutenção e prolongando a vida útil dos ativos industriais. Sua rápida ação e fácil aplicação também contribuem para uma gestão mais eficaz dos processos industriais, garantindo uma produção contínua e confiável.",
    ],
    conclusionTitle: "Considerações Finais",
    conclusionLeft: [
      "Diante dos desafios apresentados pela corrosão em ambientes industriais, o Neutralizante de Vapor destaca-se como uma solução confiável e eficaz.",
    ],
    conclusionRight: [
      "Sua capacidade de neutralizar rapidamente a acidez e proteger uma variedade de equipamentos contra os danos corrosivos o torna um aliado indispensável para qualquer operação industrial preocupada com a integridade de seus ativos e a eficiência de seus processos.",
    ],
  },

  "anti-incrustante-de-coluna": {
    introHeading: "Preservando a Eficiência: O Anti-Incrustante de Coluna na Indústria Vinícola",
    introParagraphs: [
      "O anti-incrustante de coluna é um sistema quelante especialmente formulado para complexar íons de metais de transição e sais de dureza. Desenvolvido com precisão, este produto é uma ferramenta indispensável para a indústria vinícola, atuando de forma eficaz na prevenção da formação de incrustações em colunas de destilação e nas bandejas do destilador.",
    ],
    featuresTitle: "Características e Poder do Anti-incrustante de coluna",
    featuresParagraphs: [
      "O anti-incrustante de coluna apresenta características únicas que o tornam uma solução excepcional para a manutenção da pureza e eficiência dos processos de destilação na indústria vinícola. Sua formulação especializada é desenvolvida para complexar íons metálicos e sais de dureza, prevenindo a formação de incrustações tanto nas colunas de destilação quanto nas bandejas do destilador. Compatível com o processo de vinificação, este produto destaca-se por sua capacidade de evitar a agregação de resíduos indesejáveis, garantindo a qualidade e integridade do vinho produzido.",
      "Graças à sua formulação avançada, o anti-incrustante de coluna demonstra um poder excepcional na manutenção da limpeza e eficiência dos equipamentos de destilação. Sua ação quelante impede a agregação de íons metálicos e sais de dureza, evitando assim a formação de incrustações que poderiam comprometer a qualidade do produto final.",
    ],
    gridTitle: "Saiba onde Aplicar",
    gridItems: [
      [
        "Indústria Vinícola:",
        "Ideal para uso em processos de vinificação, garantindo a integridade e pureza do vinho.",
      ],
      [
        "Colunas de Destilação:",
        "Aplicável para prevenir a formação de incrustações, mantendo as colunas de destilação limpas e eficientes.",
      ],
      [
        "Bandejas do Destilador:",
        "Utilizado para evitar a acumulação de resíduos nas bandejas, garantindo um processo de destilação suave e contínuo.",
      ],
    ],
    highlightTitle: "Vantagens e beneficio de Anti-incrustante de coluna",
    highlightParagraphs: [
      "A utilização do anti-incrustante de coluna oferece benefícios significativos para a indústria vinícola e de destilação. Além de manter a pureza e eficiência dos processos, reduz o tempo de manutenção, preserva a qualidade dos produtos finais e diminui os custos operacionais. Em resumo, é uma escolha inteligente para garantir excelência operacional e qualidade do produto.",
    ],
    conclusionTitle: "Segurança, eficiência e excelência! Anti-incrustante de coluna",
    conclusionLeft: [
      "Em suma, o anti-incrustante de coluna emerge como uma solução indispensável para a indústria vinícola e de destilação, oferecendo uma maneira eficaz de prevenir a formação de incrustações e garantir a qualidade dos produtos finais.",
    ],
    conclusionRight: [
      "Sua formulação avançada e poderosa ação quelante destacam-no como uma escolha confiável para manter a pureza e eficiência dos processos de produção. Ao adotar este produto, as empresas podem alcançar um novo patamar de excelência operacional e qualidade do produto.",
    ],
  },

  "antibiotico-liquido-monensina": {
    introHeading: "Descubra a Revolução do Antibiótico Líquido (Monensina)",
    introParagraphs: [
      "O Antibiótico Líquido, contendo monensina como princípio ativo, destaca-se como um poderoso antibacteriano de amplo espectro, especialmente formulado para o controle das principais espécies contaminantes encontradas nos processos de fermentação etanólica. Sua eficácia é comprovada contra lactobacillus, bacillus e Streptococcus, oferecendo uma defesa robusta contra agentes que podem comprometer a qualidade e a eficiência da produção de etanol.",
    ],
    featuresTitle: "Características e Poder do Antibiótico Líquido (Monensina)",
    featuresParagraphs: [
      "Este antibacteriano de amplo espectro apresenta uma ação bactericida potente contra lactobacillus, bacillus e Streptococcus, as principais espécies contaminantes da fermentação etanólica. Além disso, sua capacidade de reduzir a produção de ácido lático é fundamental para manter o pH ideal no meio de fermentação, favorecendo as condições para o crescimento das leveduras produtoras de etanol.",
      "A ação bactericida da monensina sódica presente neste antibiótico líquido é notável. Além de eliminar as espécies bacterianas mencionadas, o produto também reduz a produção de ácido lático, que pode ser prejudicial ao processo de fermentação. Importante ressaltar que, ao contrário de muitos antibióticos, o Antibiótico Líquido não afeta as leveduras responsáveis pela produção de etanol, garantindo assim a continuidade e a eficiência do processo fermentativo.",
    ],
    gridTitle: "Saiba onde Aplicar o Antibiótico Líquido (Monensina)",
    gridItems: [
      [
        "Indústrias de Produção de Etanol:",
        "O Antibiótico Líquido é amplamente utilizado nas indústrias de produção de etanol, onde protege os processos fermentativos contra contaminações bacterianas, garantindo assim a qualidade do produto final.",
      ],
      [
        "Fábricas de Bebidas Alcoólicas:",
        "Em fábricas de bebidas alcoólicas, como destilarias e cervejarias, o uso deste antibiótico líquido é fundamental para evitar problemas de qualidade e manter a consistência do produto.",
      ],
      [
        "Laboratórios de Pesquisa:",
        "Em ambientes de pesquisa e desenvolvimento, o Antibiótico Líquido é uma ferramenta valiosa para estudar e controlar os processos fermentativos, permitindo uma análise precisa dos resultados.",
      ],
      [
        "Fazendas e Plantas de Biogás:",
        "Para otimizar a produção de biogás, reduzindo a competição bacteriana.",
      ],
    ],
    highlightTitle: "Vantagens e beneficio de Utilizar o Antibiótico Líquido (Monensina)",
    highlightParagraphs: [
      "Os benefícios do Antibiótico Líquido são significativos. Controlando as bactérias indesejadas, promove uma fermentação mais rápida e completa, melhorando a eficiência do processo. Além disso, minimiza a formação de subprodutos indesejados, garantindo um produto final de maior pureza. Previne falhas no processo de fermentação, reduzindo desperdícios e custos operacionais, proporcionando economias substanciais para as empresas. Em suma, oferece eficiência, qualidade aprimorada e vantagens econômicas na indústria da fermentação etanólica.",
    ],
    conclusionTitle: "Segurança, eficiência e excelência! Antibiótico Líquido (Monensina)",
    conclusionLeft: [
      "O Antibiótico Líquido, com sua poderosa ação bactericida e capacidade de promover uma fermentação mais eficiente e de alta qualidade, desempenha um papel vital na indústria da fermentação etanólica.",
    ],
    conclusionRight: [
      "Sua aplicação abrangente e seus benefícios significativos o tornam uma escolha indispensável para empresas e pesquisadores em busca de excelência na produção de etanol e produtos relacionados.",
    ],
  },

  "antiespumante-e-dispersante-ganho-de-eficiencia-no-controle-da-espuma": {
    introHeading: "Antiespumantes e Dispersantes de qualidade da Nano Química",
    introParagraphs: [
      "Na Nano Química, somos especializados na fabricação e distribuição de produtos químicos para diversos segmentos, temos compromisso em fornecer produtos de alta qualidade a preços justos. Nosso portfólio inclui Antiespumantes e Dispersantes exclusivos que atendem às necessidades de várias indústrias, incluindo a sucroalcooleira, têxtil, tratamento de água, esgoto e muito mais.",
    ],
    featuresTitle: "Soluções personalizadas para diferentes setores industriais",
    featuresParagraphs: [
      "Quando o assunto é Controladores de Espuma, aqui na Nano Química você terá personalização para cada necessidade. Nossos Antiespumantes e Dispersantes são formulados para atender às demandas específicas de cada setor. Para a indústria sucroalcooleira, oferecemos um Antiespumante de base oleosa que não apenas quebra a espuma existente, mas também previne a formação de mais espuma. Esse produto se destaca como um aliado vital durante os processos da indústria sucroalcooleira.",
      "No segmento têxtil e de tratamento de efluentes, nosso Antiespumante de base aquosa siliconada, demonstra sua eficácia e ajuda a controlar a formação de espuma em processos industriais, garantindo um ambiente de trabalho mais eficiente e produtivo.",
      "Outras indústrias, como a de fertilizantes e tratamento de água, também se beneficiam de nossos produtos. Nossa abordagem focada na qualidade e na adequação às demandas específicas de cada setor nos diferencia.",
    ],
    gridTitle: "Benefícios tangíveis para sua produção",
    gridIntro: "A escolha dos nossos Antiespumantes e Dispersantes oferece uma série de benefícios concretos para a sua produção:",
    gridItems: [
      [
        "Controle de Espuma Eficiente:",
        "Nossos produtos não só controlam a espuma já existente, mas também trabalham ativamente para evitar a sua formação, mantendo os processos fluidos e eficientes.",
      ],
      [
        "Produto Homogêneo:",
        "Nossa formulação garante a homogeneidade do produto, o que se traduz em uma aplicação mais uniforme e resultados consistentes.",
      ],
      [
        "Relação de Consumo e Custo Vantajosa:",
        "Nossos produtos oferecem uma excelente relação de consumo (g/L) e um ótimo custo-benefício (R$/m3), o que contribui para uma operação mais econômica.",
      ],
      [
        "Prevenção de Micro-Organismos:",
        "Nosso Antiespumante de base oleosa evita a formação de resíduos de cera na dorna, reduzindo assim o risco de proliferação de micro-organismos.",
      ],
    ],
    conclusionTitle: "Entre em contato com a Nano Química",
    conclusionLeft: [
      "Na Nano Química, nosso compromisso vai além dos produtos. Oferecemos suporte técnico especializado in loco para atender integralmente às necessidades dos nossos clientes. Estamos aqui para garantir que você obtenha o máximo de benefícios dos nossos produtos.",
      "Para adquirir nossos Antiespumantes e Dispersantes ou obter mais informações, você pode entrar em contato conosco de diversas maneiras: preenchendo o formulário em nosso site, através do WhatsApp no canto da tela. Estamos prontos para oferecer soluções químicas de qualidade que impulsionem o seu negócio.",
    ],
    conclusionRight: [
      "Confie na Nano Química como seu parceiro confiável para produtos Antiespumantes e Dispersantes que atendem às demandas específicas da sua indústria. Estamos comprometidos com a qualidade e o desempenho excepcionais, sempre trabalhando para impulsionar o sucesso dos nossos clientes.",
    ],
  },

  "bactericidas-controle-da-infeccao-na-fermentacao": {
    introHeading: "Bactericidas da Nano Química: eficiência e resultados em processos de fermentação",
    introParagraphs: [
      "Na Nano Química, estamos comprometidos em fornecer soluções químicas inovadoras e eficazes para diversas indústrias. Como parte do nosso catálogo de produtos, apresentamos a linha NANOBAC, bactericidas de excelência que oferece eficiência, segurança e economia para os processos de fermentação. Com uma abordagem orientada para resultados, nosso objetivo é revolucionar o mercado, proporcionando resultados equiparáveis a um preço mais acessível.",
    ],
    featuresTitle: "O poder da linha NANOBAC: bactericidas líquidos para processos de fermentação",
    featuresParagraphs: [
      "A linha NANOBAC são bactericidas líquidos a base de clorito de sódio, extratos vegetais, monensina em emulsão, nanopartículas e sais de quaternário de amônio, que se destacam no mercado pela sua eficácia e versatilidade, linha completa para atender desde os produtos naturais e/ou orgânicos aos sintéticos. Projetado para processos de fermentação em diversos setores, desde a indústria alimentícia até a produção de bebidas, a família NANOBAC oferece controle efetivo sobre a microbiota presente, assegurando resultados confiáveis e consistentes.",
    ],
    gridTitle: "Benefícios inquestionáveis para a sua produção",
    gridIntro: "Nossos bactericidas trazem uma série de vantagens notáveis para a sua produção:",
    gridItems: [
      [
        "Eficiência Comprovada:",
        "A linha NANOBAC é formulada com precisão para garantir uma ação bactericida eficaz, proporcionando mais segurança nos processos de fermentação.",
      ],
      [
        "Substituição inteligente:",
        "Oferecendo uma alternativa eficiente ao extrato de lúpulo, o NANOBAC 403 não apenas é mais econômico, mas também oferece resultados comparáveis e muitas vezes superiores.",
      ],
      [
        "Aumento na produtividade:",
        "Com processos de fermentação mais seguros e controlados, nossos bactericidas contribuem para um aumento na produtividade, permitindo que você alcance mais com menor investimento.",
      ],
      [
        "Equipe comercial especializada:",
        "Nossa equipe comercial altamente treinada está pronta para fornecer orientação personalizada e suporte técnico, garantindo que você aproveite ao máximo nossos produtos.",
      ],
    ],
    highlightTitle: "Aplicação em diferentes setores industriais",
    highlightParagraphs: [
      "A linha NANOBAC tem como foco principal a produção de etanol, porém encontra aplicação em uma variedade de indústrias que utilizam processos de fermentação, tais como produção de alimentos, bebidas e outros produtos. Seja você um produtor de cerveja, vinho, laticínios ou alimentos fermentados, nossos bactericidas podem otimizar seus processos e garantir resultados de alta qualidade.",
    ],
    conclusionTitle: "Contato e Aquisição",
    conclusionLeft: [
      "Para adquirir o NANOBAC ou obter mais informações sobre os nossos produtos bactericidas, você pode entrar em contato conosco de maneira simples e conveniente. Utilize o formulário em nosso site ou clique no botão do WhatsApp no canto da tela para iniciar uma conversa. Estamos comprometidos em fornecer as soluções que a sua produção merece.",
    ],
    conclusionRight: [
      "Na Nanoquímica, temos a visão de tornar as soluções químicas eficazes mais acessíveis e alinhadas com as necessidades das indústrias. Com o NANOBAC, você pode ter confiança em processos de fermentação controlados e resultados impressionantes, tudo isso a um preço mais vantajoso. Escolha a Nano Química como seu parceiro confiável em bactericidas e experiencie o próximo nível de eficiência nos seus processos industriais.",
    ],
  },

  "bactericidas-organicos": {
    introHeading: "Descubra o Poder Protetor do NanoBac na Produção Agrícola!",
    introParagraphs: [
      "Para assegurar a qualidade da produção agrícola e combater eficazmente bactérias indesejáveis, apresentamos o NanoBac, uma inovação da FertClean. Especialmente formulado para o combate microbiano, este produto destaca-se como uma solução orgânica e importada de qualidade superior.",
    ],
    featuresTitle: "O Poder do NanoBac",
    featuresParagraphs: [
      "O NanoBac possui um poder incomparável no combate a bactérias indesejáveis durante todas as fases de crescimento das plantas. Sua fórmula avançada atua de forma preventiva e curativa, proporcionando uma defesa efetiva contra microrganismos prejudiciais. Ao ser aplicado, o NanoBac penetra nas células, eliminando as bactérias responsáveis por diversas doenças, promovendo assim um ambiente propício para o desenvolvimento saudável das plantas.",
    ],
    gridTitle: "Benefícios tangíveis para sua produção",
    gridItems: [
      [
        "Proteção Integral:",
        "Oferece defesa contínua contra bactérias durante todo o ciclo de crescimento.",
      ],
      [
        "Resultados Duradouros:",
        "Ação persistente que mantém as plantas saudáveis por mais tempo.",
      ],
      [
        "Produtos Orgânicos:",
        "Respeita a natureza, proporcionando uma produção sustentável.",
      ],
      [
        "Qualidade Superior:",
        "Garante alta performance, elevando os padrões da produção agrícola.",
      ],
      [
        "Economia Garantida:",
        "O investimento em NanoBac resulta em economia a longo prazo, prevenindo perdas por doenças e aumentando a colheita.",
      ],
    ],
    highlightTitle: "Saiba onde aplicar a NanoBac",
    highlightParagraphs: [
      "A versatilidade do NanoBac destaca-se em diversas áreas da produção agrícola. Pode ser aplicado em culturas de frutas, vegetais, grãos e flores, promovendo um ambiente saudável e livre de bactérias prejudiciais. Sua aplicação eficaz estende-se tanto a campos abertos quanto a estufas, oferecendo uma solução abrangente para a proteção das plantações.",
    ],
    conclusionTitle: "Poder e qualidade! NanoBac a escolha ideal",
    conclusionLeft: [
      "Ao escolher o NanoBac da FertClean, você investe não apenas em um produto, mas em um aliado confiável para a produção agrícola. A combinação de poder microbiano eficaz, qualidade superior e benefícios sustentáveis faz do NanoBac a escolha ideal para garantir colheitas abundantes e saudáveis.",
    ],
    conclusionRight: [
      "Confie na FertClean para impulsionar o seu sucesso agrícola, mantendo suas plantações protegidas e produtivas em todas as fases do crescimento.",
    ],
  },

  "biocidas-dioxido-de-cloro": {
    introHeading: "Descubra a Revolução do Controle Microbiológico com NANOBAC 432!",
    introParagraphs: [
      "O NANOBAC 432 representa a vanguarda do controle microbiológico nas usinas, introduzindo o poder do dióxido de cloro (Clo2) de forma eficiente e comprovada. Desde a década de 1940, o dióxido de cloro tem sido uma ferramenta confiável nas indústrias, e o NANOBAC 432 eleva ainda mais esse legado ao oferecer uma solução estável em clorito de sódio, com uma concentração impressionante de 32%.",
    ],
    featuresTitle: "O Poder do NanoBac 432",
    featuresParagraphs: [
      "O NANOBAC 432 é mais que um biocida; é uma garantia de desempenho superior. Sua composição estável em clorito de sódio confere propriedades desinfetantes com eficácia comprovada em diversas frentes:",
      "Esta solução é um escudo confiável contra ameaças microbiológicas, oferecendo uma resposta eficiente e segura para o controle de contaminantes nas usinas.",
    ],
    featuresBullets: [
      "Bactericida: Elimina bactérias prejudiciais.",
      "Viricida: Combate vírus com eficácia.",
      "Fungicida: Controla o crescimento de fungos.",
      "Esporicida: Atua contra esporos microbianos.",
    ],
    gridTitle: "Benefícios exclusivos para sua produção",
    gridItems: [
      [
        "Eficiência Comprovada:",
        "Resultados positivos como bactericida, viricida, fungicida e esporicida.",
      ],
      [
        "Estabilidade:",
        "Composto estável garante uma solução consistente.",
      ],
      [
        "Concentração Poderosa:",
        "32% de concentração para máxima eficácia.",
      ],
      [
        "Versatilidade de Aplicações:",
        "Adapta-se a diversas situações e necessidades.",
      ],
    ],
    highlightTitle: "Saiba onde aplicar a NanoBac 432",
    highlightParagraphs: [
      "A aplicação do NANOBAC 432 é ampla e estratégica. Pode ser utilizado nas fermentações para um controle microbiológico eficaz, proporcionando um ambiente propício para os processos industriais. Além disso, sua versatilidade permite sua utilização em diferentes áreas das usinas, promovendo uma desinfecção abrangente.",
    ],
    conclusionTitle: "Segurança, eficiência e excelência! NanoBac 432 a escolha ideal",
    conclusionLeft: [
      "O NANOBAC 432 não é apenas um produto, mas uma revolução no controle microbiológico nas usinas.",
    ],
    conclusionRight: [
      "Sua eficácia comprovada, estabilidade, concentração poderosa e versatilidade de aplicações fazem dele a escolha ideal para quem busca segurança, eficiência e excelência no controle de bactérias, vírus, fungos e esporos. Adote o NANOBAC 432 e eleve o padrão de proteção microbiológica em suas operações industriais.",
    ],
  },

  "dispersante": {
    introHeading: "Dispersante de Poliglicóis: Redução de Espuma e Custos na Produção",
    introParagraphs: [
      "O dispersante é um produto multifuncional formulado à base de poliglicóis, especificamente projetado para atuar na redução da tensão superficial do meio. Sua eficácia reside em sua capacidade de prevenir a formação de espuma, resultando na redução do consumo de antiespumantes e otimizando significativamente a relação custo/benefício para os usuários.",
    ],
    featuresTitle: "Explorando as Características e o Poder do Dispersante",
    featuresParagraphs: [
      "Este produto se destaca por sua composição especial à base de poliglicóis, uma fórmula cuidadosamente desenvolvida para proporcionar uma ação eficaz na redução da tensão superficial do meio. Sua aplicação é simples e eficiente, oferecendo uma solução prática para problemas comuns relacionados à formação de espuma.",
      "O poder do dispersante reside na sua capacidade de interromper a formação de espuma antes que ela ocorra, agindo de forma proativa para manter processos industriais eficientes e livres de interrupções indesejadas. Além disso, sua fórmula avançada não apenas previne a formação de espuma, mas também reduz o consumo de antiespumantes, proporcionando uma abordagem econômica e sustentável.",
    ],
    gridTitle: "Soluções para Diversos Setores Industriais — Saiba onde Aplicar o Dispersante",
    gridItems: [
      [
        "Indústria Alimentícia:",
        "Em processos de fabricação de alimentos onde a formação de espuma é uma preocupação, como na produção de bebidas, lácteos e processamento de alimentos.",
      ],
      [
        "Indústria Química:",
        "Em operações que envolvem misturas líquidas propensas à formação de espuma, como na produção de produtos químicos, tintas e revestimentos.",
      ],
      [
        "Indústria Farmacêutica:",
        "Em processos de fabricação de medicamentos e produtos farmacêuticos que exigem um ambiente de produção livre de contaminação por espuma.",
      ],
    ],
    highlightTitle: "Vantagens e beneficio do Dispersante à Base de Poliglicóis",
    highlightParagraphs: [
      "O dispersante à base de poliglicóis oferece uma série de benefícios significativos para várias indústrias. Sua aplicação proporciona eficiência ao reduzir os tempos de inatividade relacionados à limpeza de equipamentos e remoção de espuma. Além disso, ele reduz o consumo de antiespumantes, resultando em economias de custo substanciais. Garante a qualidade dos produtos finais, eliminando a contaminação por espuma e mantendo a consistência dos processos industriais. Em resumo, o uso deste produto promove eficiência operacional, qualidade do produto e rentabilidade das operações industriais.",
    ],
    conclusionTitle: "Adotando o Dispersante: Melhorias Operacionais e Econômicas para Indústrias Modernas",
    conclusionLeft: [
      "Em resumo, o dispersante à base de poliglicóis oferece uma solução eficaz e econômica para os desafios relacionados à formação de espuma em uma variedade de indústrias.",
    ],
    conclusionRight: [
      "Sua capacidade de prevenir a formação de espuma e reduzir o consumo de antiespumantes não apenas otimiza a eficiência operacional, mas também contribui para a qualidade e consistência dos produtos finais. Incorporar esse produto em processos industriais pode resultar em benefícios significativos, tanto em termos de desempenho quanto de economia.",
    ],
  },

  "neutralizante-de-etanol": {
    introHeading: "Estabilidade e Qualidade: O Neutralizante de Etanol à Base de Aminas",
    introParagraphs: [
      "O neutralizante de etanol é uma solução formulada por compostos de aminas, projetada especificamente para neutralizar os traços de ácidos orgânicos e inorgânicos encontrados no etanol. Além disso, estabiliza o pH do etanol sem comprometer sua condutividade elétrica, garantindo assim a qualidade e a estabilidade do produto final.",
    ],
    featuresTitle: "Explorando as Características e a Força do Neutralizante de Etanol",
    featuresParagraphs: [
      "Este produto se destaca por sua composição à base de compostos de aminas, uma fórmula cuidadosamente desenvolvida para proporcionar uma neutralização eficaz dos ácidos presentes no etanol. Sua capacidade de estabilizar o pH do etanol sem afetar sua condutividade elétrica é uma característica fundamental para garantir a qualidade e a consistência do produto final.",
      "O poder do neutralizante de etanol reside na sua capacidade de neutralizar os traços de ácidos orgânicos e inorgânicos presentes no etanol, o que contribui para a estabilidade química e física do produto. Além disso, sua capacidade de estabilizar o pH do etanol sem interferir em sua condutividade elétrica é crucial para manter os processos de produção eficientes e livres de interrupções.",
    ],
    gridTitle: "Conheça as aplicações Versáteis do Neutralizante de Etanol",
    gridItems: [
      [
        "Indústria de Biocombustíveis:",
        "Utilizado durante o processo de produção de etanol a partir de matérias-primas como cana-de-açúcar, milho, entre outras, para garantir a qualidade e a estabilidade do etanol produzido.",
      ],
      [
        "Indústria de Alimentos e Bebidas:",
        "Aplicado em processos de produção de bebidas alcoólicas, como destilação de álcool para uso culinário ou em bebidas alcoólicas, para assegurar a neutralização de ácidos indesejados e a estabilidade do produto final.",
      ],
      [
        "Indústria Química:",
        "Utilizado em diversas operações que envolvem o uso de etanol como matéria-prima, garantindo a neutralização de ácidos e a estabilidade do produto em processos de síntese química.",
      ],
    ],
    highlightTitle: "Vantagens e beneficio do Neutralizante de Etanol",
    highlightParagraphs: [
      "O uso do neutralizante de etanol oferece uma série de benefícios para as indústrias onde é aplicado. Garante a qualidade e a estabilidade do etanol produzido, evitando a formação de subprodutos indesejados e prolongando a vida útil dos equipamentos. Além disso, contribui para a eficiência dos processos de produção, garantindo a consistência dos produtos finais e reduzindo os custos operacionais associados a problemas de instabilidade química.",
    ],
    conclusionTitle: "Neutralizante de Etanol — Garantindo Estabilidade e Eficiência",
    conclusionLeft: [
      "Em suma, o neutralizante de etanol é um componente essencial em diversas indústrias, garantindo a qualidade, estabilidade e eficiência dos processos de produção que envolvem o uso de etanol.",
    ],
    conclusionRight: [
      "Sua capacidade de neutralizar ácidos e estabilizar o pH do etanol sem interferir em sua condutividade elétrica o torna uma escolha confiável para assegurar a consistência e a qualidade dos produtos finais. Incorporar este produto em processos industriais pode resultar em benefícios significativos, tanto em termos de desempenho quanto de economia.",
    ],
  },

  "nutrientes-aumento-da-propagacao-do-fermento-no-inicio-da-safra": {
    introHeading: "Fermentação com Máxima Eficiência: Confira a Linha NanoSpuma.",
    introParagraphs: [
      "A linha NanoSpuma é a resposta inovadora para alcançar a máxima eficiência em processos de fermentação. Desenvolvida com tecnologia de ponta, essa gama de produtos é cuidadosamente formulada para atender às exigências dos mais diversos setores industriais, proporcionando resultados excepcionais em cada aplicação.",
    ],
    featuresTitle: "O Poder da Linha NanoSpuma",
    featuresParagraphs: [
      "A linha NanoSpuma incorpora agentes ativos de última geração que impulsionam a fermentação a níveis inigualáveis. Sua formulação exclusiva promove uma atividade fermentativa robusta, acelerando o tempo de produção sem comprometer a qualidade do produto final. Além disso, a NanoSpuma contribui para a uniformidade e consistência dos lotes, garantindo uma fermentação controlada e previsível.",
    ],
    gridTitle: "Benefícios tangíveis para sua produção",
    gridItems: [
      [
        "Aceleração do Processo:",
        "Redução significativa no tempo de fermentação, aumentando a produtividade.",
      ],
      [
        "Melhoria na Qualidade:",
        "Contribui para a obtenção de produtos finais de alta qualidade, com características sensoriais aprimoradas.",
      ],
      [
        "Economia de Recursos:",
        "Otimiza o uso de insumos, reduzindo o consumo de matérias-primas e energia.",
      ],
      [
        "Controle Preciso:",
        "Proporciona controle preciso sobre os parâmetros fermentativos, minimizando variações indesejadas.",
      ],
      [
        "Versatilidade:",
        "Adapta-se a diferentes tipos de fermentação, sendo ideal para processos em diversos setores da indústria alimentícia.",
      ],
    ],
    highlightTitle: "Saiba onde aplicar a NanoSpuma",
    highlightParagraphs: [
      "A versatilidade da NanoSpuma permite sua aplicação em uma variedade de processos fermentativos. Indústrias de cervejaria, vinificação, panificação e produção de produtos lácteos podem se beneficiar significativamente. Desde a fermentação de massas para pães até a produção de vinhos e cervejas, a NanoSpuma destaca-se como a escolha preferida para garantir resultados consistentes e eficientes em todas as fases do processo fermentativo.",
      "Para alcançar os mais altos padrões de eficiência na fermentação, não há escolha melhor do que a linha NanoSpuma. Seja para acelerar o tempo de produção, melhorar a qualidade do produto final ou garantir um controle preciso sobre o processo, a NanoSpuma é a parceira confiável que impulsiona a excelência em cada lote. Confira hoje mesmo como a NanoSpuma pode transformar seus processos fermentativos, elevando seus produtos a um novo patamar de qualidade e eficiência.",
    ],
  },
};

const product = (
  slug: string,
  title: string,
  image: StaticImageData,
  secondaryImage?: StaticImageData
): Product => ({
  slug,
  title,
  image,
  secondaryImage,
  details: productDetailsBySlug[slug],
});

export const productsByCategory: Record<string, Product[]> = {
  acucar: [
    product("acido-fosforico-purificado-nanophos", "Ácido Fosfórico Purificado - NanoPhós", acucarAcido, acucarDescriptionImage),
    product("anti-incrustante-inibir-a-incrustacao", "Anti-incrustante - Inibir a incrustação", acucarAntiIncrustante),
    product("auxiliar-para-extracao-de-acucar-nanodec-541", "Auxiliar para extração de açúcar - Nanodec 541", acucarAuxiliar),
    product("bactericidas-para-moenda", "Bactericidas para Moenda", acucarBactericida),
    product("clarificante-de-caldo-xarope-e-calda", "Clarificante de caldo, xarope e calda", acucarClarificante),
    product("descolorante-de-xarope-e-calda", "Descolorante de Xarope e Calda", acucarDescolorante),
    product("dispersante-de-massa-nanodec-520", "Dispersante de massa - Nanodec 520", acucarDispersante),
    product("limpeza-quimica-acida-e-alcalina", "Limpeza química ácida e alcalina", acucarLimpeza),
    product("lubrificante-de-massa", "Lubrificante de massa", acucarLubrificante),
    product("neutralizante-de-vapor", "Neutralizante de vapor", acucarNeutralizante),
  ],
  etanol: [
    product("anti-incrustante-de-coluna", "Anti-incrustante de coluna", etanolAntiIncrustante),
    product("antibiotico-liquido-monensina", "Antibiótico Líquido (Monensina)", etanolAntibiotico),
    product("antiespumante-e-dispersante-ganho-de-eficiencia-no-controle-da-espuma", "Antiespumante e Dispersante - Ganho de eficiência no controle da espuma", etanolAntiespumante),
    product("bactericidas-controle-da-infeccao-na-fermentacao", "Bactericidas - Controle da infecção na fermentação", etanolBactericida),
    product("bactericidas-organicos", "Bactericidas orgânicos", etanolBactericidaOrganico),
    product("biocidas-dioxido-de-cloro", "Biocidas (dióxido de cloro)", etanolBiocidas),
    product("dispersante", "Dispersante", etanolDispersante),
    product("neutralizante-de-etanol", "Neutralizante de Etanol", etanolNeutralizante),
    product("nutrientes-aumento-da-propagacao-do-fermento-no-inicio-da-safra", "Nutrientes - Aumento da propagação do fermento no início da safra", etanolNutrientes),
  ],
  industria: [
    product("acido-fosforico-purificado-nanophos", "Ácido Fosfórico Purificado - NanoPhós", industriaAcido, acucarDescriptionImage),
    product("antiespumante-e-dispersante-ganho-de-eficiencia-no-controle-da-espuma", "Antiespumante e Dispersante - Ganho de eficiência no controle da espuma", industriaAntiespumante),
    product("biocidas-dioxido-de-cloro", "Biocidas (dióxido de cloro)", industriaBiocidas),
    product("limpeza-quimica-acida-e-alcalina", "Limpeza química ácida e alcalina", industriaLimpeza),
  ],
};

export const sugarProducts = productsByCategory.acucar;
