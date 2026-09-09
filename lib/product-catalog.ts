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

export const productCatalog: ProductCatalogItem[] = [
  {
    slug: "carteira-executive-kit",
    title: "Carteira Executive Kit",
    category: "Acessórios",
    badge: "Novo",
    accent: "blue",
    image: "/images/product-card-01-real-v2.png",
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
    accent: "green",
    image: "/images/product-card-02-real-v2.png",
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
    accent: "blue",
    image: "/images/product-card-03-real-v2.png",
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
    accent: "green",
    image: "/images/product-card-04-real-v2.png",
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
    accent: "violet",
    image: "/images/product-card-05-real-v2.png",
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
  }
];

export const productCatalogFilters = [
  "Todos",
  "Tecnologia",
  "Wearables",
  "Acessórios",
  "Casa e Cozinha",
  "Creator Gear",
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
