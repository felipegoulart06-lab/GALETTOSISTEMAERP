export interface ProductCatalogItem {
  slug: string;
  title: string;
  category: string;
  badge: string;
  accent: "blue" | "green" | "orange" | "violet";
  image: string;
  price: string;
  commissionRate: string;
  commissionValue: string;
  summary: string;
  description: string;
  ctaLabel: string;
  chips: string[];
  facts: string[];
  filters: string[];
  audience: string;
  payoutWindow: string;
  approvalFlow: string;
  affiliateLink: string;
}

function item(
  data: Omit<ProductCatalogItem, "ctaLabel" | "payoutWindow" | "approvalFlow" | "affiliateLink">
): ProductCatalogItem {
  return {
    ctaLabel: "Quero me afiliar",
    payoutWindow: "Comissão liberada após aprovação do pedido em até 7 dias úteis.",
    approvalFlow: "Afiliação aprovada na página do produto e link liberado nesta etapa.",
    affiliateLink: `https://fgexacta.com/r/felipe/${data.slug}`,
    ...data
  };
}

export const productCatalog: ProductCatalogItem[] = [
  {
    slug: "carteira-executive-kit",
    title: "Carteira Executive Kit",
    category: "Acessórios",
    badge: "Novo",
    accent: "orange",
    image: "/images/product-carteira.svg",
    price: "R$ 189,90",
    commissionRate: "22%",
    commissionValue: "R$ 41,78",
    summary: "Kit premium com carteira, chaveiro e óculos para oferta de ticket maior.",
    description:
      "Produto com apelo visual forte, bom valor percebido e excelente encaixe para conteúdos lifestyle, redes sociais e ofertas premium.",
    ctaLabel: "Quero me afiliar",
    chips: ["Acessórios", "Premium", "Oferta"],
    facts: [
      "Boa leitura para público lifestyle",
      "Oferta com alto valor percebido",
      "Material pronto para posts, story e criativo de performance"
    ],
    filters: ["Todos", "Acessórios", "Premium", "Para redes sociais"],
    audience: "Público lifestyle, moda, presentes e ticket médio mais alto.",
    payoutWindow: "Comissão liberada após aprovação do pedido em até 7 dias úteis.",
    approvalFlow: "Afiliação aprovada na página do produto e link liberado nesta etapa.",
    affiliateLink: "https://fgexacta.com/r/felipe/carteira-executive-kit"
  },
  {
    slug: "fone-bluetooth-pro",
    title: "Fone Bluetooth Pro",
    category: "Tecnologia",
    badge: "Em alta",
    accent: "violet",
    image: "/images/product-fone.svg",
    price: "R$ 129,90",
    commissionRate: "20%",
    commissionValue: "R$ 25,98",
    summary: "Produto líder para redes sociais, com preço competitivo e boa conversão.",
    description:
      "O Fone Bluetooth Pro funciona muito bem em vídeos curtos, criativos comparativos e campanhas de performance com foco em alcance rápido.",
    ctaLabel: "Quero me afiliar",
    chips: ["Tecnologia", "Comissão", "Conversão"],
    facts: [
      "Ótimo para reels, stories e tráfego social",
      "Bom histórico de conversão",
      "Comissão clara e fácil de comunicar"
    ],
    filters: ["Todos", "Tecnologia", "Em alta", "Para redes sociais"],
    audience: "Creator economy, tech, rotina e público jovem.",
    payoutWindow: "Comissão registrada após aprovação da venda e validada no ciclo seguinte.",
    approvalFlow: "Afiliação concluída dentro do detalhe do produto com link individual.",
    affiliateLink: "https://fgexacta.com/r/felipe/fone-bluetooth-pro"
  },
  {
    slug: "smartwatch-classic-x",
    title: "Smartwatch Classic X",
    category: "Wearables",
    badge: "Recomendado",
    accent: "green",
    image: "/images/product-smartwatch.svg",
    price: "R$ 297,00",
    commissionRate: "25%",
    commissionValue: "R$ 74,25",
    summary: "Relógio premium com forte apelo visual para demonstração e oferta ao vivo.",
    description:
      "Produto ideal para lives, demonstração de uso, rotina fitness e criativos premium com maior valor percebido.",
    ctaLabel: "Quero me afiliar",
    chips: ["Wearable", "Ao vivo", "Premium"],
    facts: [
      "Muito forte para demonstração em live",
      "Alto valor percebido no visual",
      "Bom encaixe para tecnologia e lifestyle"
    ],
    filters: ["Todos", "Wearables", "Premium", "Recomendados"],
    audience: "Público premium, tech e creators que usam prova visual.",
    payoutWindow: "Comissão aprovada após confirmação da venda e janela de validação comercial.",
    approvalFlow: "Link individual liberado somente após o aceite da afiliação nesta página.",
    affiliateLink: "https://fgexacta.com/r/felipe/smartwatch-classic-x"
  },
  {
    slug: "blender-fit-inox",
    title: "Blender Fit Inox",
    category: "Casa e Cozinha",
    badge: "Em alta",
    accent: "orange",
    image: "/images/product-blender.svg",
    price: "R$ 249,90",
    commissionRate: "18%",
    commissionValue: "R$ 44,98",
    summary: "Produto prático com apelo saudável e demonstração simples no conteúdo.",
    description:
      "Excelente para criativos de rotina, bem-estar e conteúdo utilitário com demonstração direta do benefício.",
    ctaLabel: "Quero me afiliar",
    chips: ["Casa", "Saúde", "Utilidade"],
    facts: [
      "Bom para conteúdo de rotina",
      "Explicação simples e conversão rápida",
      "Material visual bem adaptável para vídeo curto"
    ],
    filters: ["Todos", "Casa e Cozinha", "Em alta", "Para redes sociais"],
    audience: "Público fitness, casa, bem-estar e utilidade prática.",
    payoutWindow: "Comissão disponível após aprovação da compra e validação operacional.",
    approvalFlow: "A página do produto concentra afiliação, comissão e geração do link.",
    affiliateLink: "https://fgexacta.com/r/felipe/blender-fit-inox"
  },
  {
    slug: "camera-creator-4k",
    title: "Camera Creator 4K",
    category: "Creator Gear",
    badge: "Maior comissão",
    accent: "blue",
    image: "/images/product-camera.svg",
    price: "R$ 1.249,00",
    commissionRate: "15%",
    commissionValue: "R$ 187,35",
    summary: "Produto visual para público de conteúdo, foto e vídeo com ticket premium.",
    description:
      "Item de creator gear com apelo profissional, excelente para posicionamento de valor e campanhas com comissão destacada.",
    ctaLabel: "Quero me afiliar",
    chips: ["Creator", "4K", "Maior comissão"],
    facts: [
      "Maior comissão do catálogo atual",
      "Forte para creators e makers",
      "Bom para campanhas premium e comparativos"
    ],
    filters: ["Todos", "Creator Gear", "Maior comissão", "Premium"],
    audience: "Criadores, filmmakers, fotógrafos e público creator premium.",
    payoutWindow: "Comissão validada após confirmação de entrega e aceite comercial.",
    approvalFlow: "Afiliação e link exclusivo liberados apenas no detalhe deste produto.",
    affiliateLink: "https://fgexacta.com/r/felipe/camera-creator-4k"
  },
  item({
    slug: "hub-smart-home-vision",
    title: "Hub Smart Home Vision",
    category: "Smart Home",
    badge: "Premium",
    accent: "violet",
    image: "/images/product-hub-home.svg",
    price: "R$ 899,00",
    commissionRate: "18%",
    commissionValue: "R$ 161,82",
    summary: "Central colorida para automação, bundles e demonstração em live.",
    description: "Produto pensado para ofertas premium, comparação técnica e campanhas de demonstração com foco em ticket maior.",
    chips: ["Smart Home", "Premium", "Bundle"],
    facts: ["Forte para bundles", "Boa margem de comissão", "Encaixe com creator tech"],
    filters: ["Todos", "Smart Home", "Premium", "Recomendados"],
    audience: "Público premium, tecnologia e automação residencial."
  }),
  item({
    slug: "mochila-urban-creator",
    title: "Mochila Urban Creator",
    category: "Lifestyle",
    badge: "Lifestyle",
    accent: "blue",
    image: "/images/product-mochila-urban.svg",
    price: "R$ 249,90",
    commissionRate: "21%",
    commissionValue: "R$ 52,47",
    summary: "Mochila viva para rotina, viagem e criativos de moda.",
    description: "Boa opção para criativos de rotina, moda, utilidade e conteúdos com valor percebido mais alto.",
    chips: ["Lifestyle", "Moda", "Creator"],
    facts: ["Bom para rotina", "Apelo visual alto", "Campanhas sazonais"],
    filters: ["Todos", "Lifestyle", "Acessórios", "Para redes sociais"],
    audience: "Moda, creators, rotina e lifestyle."
  }),
  item({
    slug: "ring-light-studio-max",
    title: "Ring Light Studio Max",
    category: "Creator Gear",
    badge: "Ao vivo",
    accent: "orange",
    image: "/images/product-ring-light.svg",
    price: "R$ 319,90",
    commissionRate: "17%",
    commissionValue: "R$ 54,38",
    summary: "Luz de palco para lives, mentorias e vídeos com cara de estúdio.",
    description: "Produto creator com linguagem simples, valor percebido e excelente encaixe para lives, mentorias e bundles.",
    chips: ["Creator Gear", "Live", "Demonstração"],
    facts: ["Encaixa com mentorias", "Ticket médio bom", "Alta leitura para vídeo"],
    filters: ["Todos", "Creator Gear", "Em alta", "Para redes sociais"],
    audience: "Creators, professores e vendedores em live."
  }),
  item({
    slug: "power-bank-turbo-air",
    title: "Power Bank Turbo Air",
    category: "Tecnologia",
    badge: "Giro rápido",
    accent: "green",
    image: "/images/product-power-bank.svg",
    price: "R$ 149,90",
    commissionRate: "19%",
    commissionValue: "R$ 28,48",
    summary: "Carregador portátil fácil de explicar e rápido de converter.",
    description: "Produto com linguagem simples, boa utilidade e ótimo encaixe para campanhas rápidas de conversão.",
    chips: ["Tecnologia", "Giro", "Conversão"],
    facts: ["Fácil de explicar", "Boa taxa de clique", "Preço competitivo"],
    filters: ["Todos", "Tecnologia", "Em alta", "Para redes sociais"],
    audience: "Público geral, rotina e mobilidade."
  }),
  item({
    slug: "kit-skincare-glow",
    title: "Kit Skincare Glow",
    category: "Beleza",
    badge: "Novo",
    accent: "orange",
    image: "/images/product-skincare.svg",
    price: "R$ 179,90",
    commissionRate: "24%",
    commissionValue: "R$ 43,18",
    summary: "Rotina de skincare com visual rosa, ideal para reels e stories.",
    description: "Kit com alto apelo estético para beleza, bem-estar e prova social em conteúdos curtos.",
    chips: ["Beleza", "Skincare", "Stories"],
    facts: ["Forte em vídeo curto", "Ticket acessível", "Comissão alta"],
    filters: ["Todos", "Beleza", "Novo", "Para redes sociais"],
    audience: "Beleza, bem-estar e creators de rotina."
  }),
  item({
    slug: "tenis-pulse-run",
    title: "Tênis Pulse Run",
    category: "Esporte",
    badge: "Em alta",
    accent: "green",
    image: "/images/product-tenis.svg",
    price: "R$ 329,90",
    commissionRate: "20%",
    commissionValue: "R$ 65,98",
    summary: "Tênis vibrante para corrida, lifestyle e ofertas de performance.",
    description: "Produto visual para esporte e moda urbana, com boa leitura em foto e vídeo de movimento.",
    chips: ["Esporte", "Lifestyle", "Performance"],
    facts: ["Look forte em foto", "Público amplo", "Boa comissão"],
    filters: ["Todos", "Esporte", "Lifestyle", "Em alta"],
    audience: "Esporte, moda urbana e creators fitness."
  }),
  item({
    slug: "cafeteira-barista-mini",
    title: "Cafeteira Barista Mini",
    category: "Casa e Cozinha",
    badge: "Recomendado",
    accent: "orange",
    image: "/images/product-cafeteira.svg",
    price: "R$ 389,00",
    commissionRate: "18%",
    commissionValue: "R$ 70,02",
    summary: "Café na mesa com visual quente para conteúdo de rotina e casa.",
    description: "Ótima para demos de manhã, unboxing e criativos de casa com cheiro de benefício imediato.",
    chips: ["Casa", "Café", "Rotina"],
    facts: ["Demonstração simples", "Ticket médio", "Conteúdo de rotina"],
    filters: ["Todos", "Casa e Cozinha", "Recomendados", "Premium"],
    audience: "Casa, gastronomia e rotina matinal."
  }),
  item({
    slug: "caixa-som-wave",
    title: "Caixa de Som Wave",
    category: "Tecnologia",
    badge: "Em alta",
    accent: "violet",
    image: "/images/product-caixa-som.svg",
    price: "R$ 219,90",
    commissionRate: "22%",
    commissionValue: "R$ 48,38",
    summary: "Som portátil com paleta ciano e violeta para festas e criativos.",
    description: "Produto de impacto visual para música, viagem e lives com energia alta.",
    chips: ["Tecnologia", "Áudio", "Portátil"],
    facts: ["Visual chamativo", "Fácil de demonstrar", "Boa conversão social"],
    filters: ["Todos", "Tecnologia", "Em alta", "Para redes sociais"],
    audience: "Música, viagem e creators jovens."
  }),
  item({
    slug: "kit-pet-care",
    title: "Kit Pet Care",
    category: "Pet",
    badge: "Novo",
    accent: "green",
    image: "/images/product-pet-kit.svg",
    price: "R$ 99,90",
    commissionRate: "26%",
    commissionValue: "R$ 25,97",
    summary: "Linha pet com visual alegre e comissão alta para conteúdo fofo.",
    description: "Encaixa em reels de pets, stories e campanhas sazonais com alto engajamento.",
    chips: ["Pet", "Kit", "Engajamento"],
    facts: ["Alto engajamento", "Preço de entrada", "Comissão elevada"],
    filters: ["Todos", "Pet", "Novo", "Para redes sociais"],
    audience: "Tutores, família e creators pet."
  }),
  item({
    slug: "luminaria-aurora-rgb",
    title: "Luminária Aurora RGB",
    category: "Casa e Cozinha",
    badge: "Destaque",
    accent: "violet",
    image: "/images/product-luminaria.svg",
    price: "R$ 159,90",
    commissionRate: "23%",
    commissionValue: "R$ 36,78",
    summary: "Luz RGB para setup, quarto e lives com clima de palco.",
    description: "Produto colorido para ambiente, gamer, creator e ofertas visuais de decoração.",
    chips: ["Casa", "RGB", "Setup"],
    facts: ["Muito visual", "Setup e quarto", "Ótimo para live"],
    filters: ["Todos", "Casa e Cozinha", "Creator Gear", "Em alta"],
    audience: "Gamer, creators e decoração."
  }),
  item({
    slug: "garrafa-termica-coral",
    title: "Garrafa Térmica Coral",
    category: "Lifestyle",
    badge: "Oferta",
    accent: "orange",
    image: "/images/product-garrafa.svg",
    price: "R$ 89,90",
    commissionRate: "28%",
    commissionValue: "R$ 25,17",
    summary: "Garrafa coral e teal, presente fácil e comissão agressiva.",
    description: "Item de giro para lifestyle, academia e presente, com criativo direto e cor forte.",
    chips: ["Lifestyle", "Utilidade", "Presente"],
    facts: ["Comissão alta", "Presente fácil", "Cor forte no feed"],
    filters: ["Todos", "Lifestyle", "Acessórios", "Em alta"],
    audience: "Academia, rotina e presente."
  }),
  item({
    slug: "kit-office-premium-desk",
    title: "Kit Office Premium Desk",
    category: "Home Office",
    badge: "Bundle",
    accent: "blue",
    image: "/images/product-office-kit.svg",
    price: "R$ 459,90",
    commissionRate: "20%",
    commissionValue: "R$ 91,98",
    summary: "Mesa completa para produtividade, home office e conteúdo de organização.",
    description: "Kit com apelo premium para produtividade, bem-estar e conteúdo de organização de ambiente.",
    chips: ["Home Office", "Bundle", "Premium"],
    facts: ["Bundle premium", "Ótimo para conteúdo de mesa", "Bom valor percebido"],
    filters: ["Todos", "Home Office", "Premium", "Recomendados"],
    audience: "Home office, creators e produtividade."
  }),
  item({
    slug: "oculos-sunset-pop",
    title: "Óculos Sunset Pop",
    category: "Moda",
    badge: "Novo",
    accent: "orange",
    image: "/images/product-oculos.svg",
    price: "R$ 159,90",
    commissionRate: "25%",
    commissionValue: "R$ 39,98",
    summary: "Óculos com lentes ciano e rosa para looks de verão e reels de moda.",
    description: "Peça visual para moda, viagem e presente, com cor forte no feed e fácil demonstração.",
    chips: ["Moda", "Acessórios", "Verão"],
    facts: ["Cor alta no feed", "Ticket acessível", "Comissão forte"],
    filters: ["Todos", "Moda", "Acessórios", "Para redes sociais"],
    audience: "Moda, viagem e creators de lifestyle."
  }),
  item({
    slug: "perfume-aurora-night",
    title: "Perfume Aurora Night",
    category: "Beleza",
    badge: "Premium",
    accent: "violet",
    image: "/images/product-perfume.svg",
    price: "R$ 219,90",
    commissionRate: "23%",
    commissionValue: "R$ 50,58",
    summary: "Fragrância violeta e dourada para unboxing e conteúdo de presente.",
    description: "Produto premium de beleza com visual de vitrine, ótimo para stories e campanhas sazonais.",
    chips: ["Beleza", "Presente", "Premium"],
    facts: ["Unboxing forte", "Presente fácil", "Ticket médio"],
    filters: ["Todos", "Beleza", "Premium", "Recomendados"],
    audience: "Beleza, presente e creators de rotina."
  }),
  item({
    slug: "drone-neo-spark",
    title: "Drone Neo Spark",
    category: "Tecnologia",
    badge: "Destaque",
    accent: "green",
    image: "/images/product-drone.svg",
    price: "R$ 1.089,00",
    commissionRate: "14%",
    commissionValue: "R$ 152,46",
    summary: "Drone compacto com hélices amarelas e rosa para vídeos aéreos.",
    description: "Item de impacto para tech, viagem e creators que vendem prova visual em movimento.",
    chips: ["Tecnologia", "Creator", "Viagem"],
    facts: ["Alto valor percebido", "Conteúdo aéreo", "Campanha premium"],
    filters: ["Todos", "Tecnologia", "Creator Gear", "Premium"],
    audience: "Tech, viagem e creators de vídeo."
  }),
  item({
    slug: "chaleira-mint-glow",
    title: "Chaleira Mint Glow",
    category: "Casa e Cozinha",
    badge: "Oferta",
    accent: "green",
    image: "/images/product-chaleira.svg",
    price: "R$ 189,90",
    commissionRate: "21%",
    commissionValue: "R$ 39,88",
    summary: "Chaleira menta e coral para conteúdo de chá, casa e rotina.",
    description: "Produto de cozinha com paleta viva, fácil de demonstrar e vender em vídeo curto.",
    chips: ["Casa", "Chá", "Rotina"],
    facts: ["Visual de cozinha", "Demonstração simples", "Boa comissão"],
    filters: ["Todos", "Casa e Cozinha", "Em alta", "Para redes sociais"],
    audience: "Casa, bem-estar e rotina."
  }),
  item({
    slug: "skate-flash-deck",
    title: "Skate Flash Deck",
    category: "Esporte",
    badge: "Em alta",
    accent: "orange",
    image: "/images/product-skate.svg",
    price: "R$ 279,90",
    commissionRate: "19%",
    commissionValue: "R$ 53,18",
    summary: "Shape amarelo e verde para rua, moda urbana e criativos de movimento.",
    description: "Produto jovem com cor saturada, ideal para reels de rua, moda e esporte.",
    chips: ["Esporte", "Moda", "Street"],
    facts: ["Look de rua", "Público jovem", "Alta leitura em vídeo"],
    filters: ["Todos", "Esporte", "Moda", "Em alta"],
    audience: "Streetwear, esporte e creators urbanos."
  }),
  item({
    slug: "umidificador-lilac-mist",
    title: "Umidificador Lilac Mist",
    category: "Casa e Cozinha",
    badge: "Novo",
    accent: "violet",
    image: "/images/product-umidificador.svg",
    price: "R$ 129,90",
    commissionRate: "24%",
    commissionValue: "R$ 31,18",
    summary: "Névoa lilás para quarto, bem-estar e setup aconchegante.",
    description: "Item de casa com paleta suave e destaque visual para lives e rotina noturna.",
    chips: ["Casa", "Bem-estar", "Setup"],
    facts: ["Cor de feed", "Ticket de entrada", "Comissão alta"],
    filters: ["Todos", "Casa e Cozinha", "Novo", "Lifestyle"],
    audience: "Casa, bem-estar e creators de rotina."
  }),
  item({
    slug: "teclado-candy-keys",
    title: "Teclado Candy Keys",
    category: "Tecnologia",
    badge: "Giro rápido",
    accent: "violet",
    image: "/images/product-teclado.svg",
    price: "R$ 349,90",
    commissionRate: "18%",
    commissionValue: "R$ 62,98",
    summary: "Teclado RGB doce para gamer, home office e unboxing colorido.",
    description: "Produto tech com teclas em cores vivas, perfeito para setup, lives e comparativos.",
    chips: ["Tecnologia", "Gamer", "Setup"],
    facts: ["RGB no criativo", "Setup e live", "Ticket médio"],
    filters: ["Todos", "Tecnologia", "Home Office", "Em alta"],
    audience: "Gamer, home office e creators de setup."
  }),
  item({
    slug: "bolsa-cross-pop",
    title: "Bolsa Cross Pop",
    category: "Moda",
    badge: "Recomendado",
    accent: "orange",
    image: "/images/product-bolsa.svg",
    price: "R$ 199,90",
    commissionRate: "26%",
    commissionValue: "R$ 51,97",
    summary: "Crossbody rosa e dourada para moda, presente e stories de look.",
    description: "Acessório de moda com cor saturada, fácil de girar em campanhas de presente e verão.",
    chips: ["Moda", "Acessórios", "Presente"],
    facts: ["Comissão alta", "Look imediato", "Presente fácil"],
    filters: ["Todos", "Moda", "Acessórios", "Para redes sociais"],
    audience: "Moda, presente e creators de look do dia."
  })
];

export const productCatalogFilters = [
  "Todos",
  "Tecnologia",
  "Wearables",
  "Acessórios",
  "Moda",
  "Casa e Cozinha",
  "Creator Gear",
  "Beleza",
  "Esporte",
  "Lifestyle",
  "Pet",
  "Smart Home",
  "Home Office",
  "Premium",
  "Para redes sociais",
  "Em alta",
  "Recomendados",
  "Maior comissão"
];

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  return productCatalog.filter((product) => product.slug !== slug).slice(0, 3);
}
