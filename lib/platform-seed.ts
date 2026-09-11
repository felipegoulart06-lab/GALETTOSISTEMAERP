import { companyCatalog } from "@/lib/company-catalog";
import { dashboardSections } from "@/lib/dashboard-data";
import { productCatalog } from "@/lib/product-catalog";
import { supplierListCatalog } from "@/lib/supplier-list-catalog";
import type {
  CampaignRecord,
  ClubOfferRecord,
  CompanyRecord,
  CouponRedemptionRecord,
  LiveRecord,
  MentorshipRecord,
  MissionRecord,
  OpportunityRecord,
  PlatformDb,
  PlatformUser,
  ProductRecord,
  ReferralRecord,
  ReferralServiceRecord,
  RewardRecord,
  SpinWheelRecord,
  SupplierListRecord,
  SweepstakesRecord,
  WorkflowStatus
} from "@/lib/platform-types";

const now = "2026-09-08T19:45:00.000Z";
const adminMasterId = "user-admin-master-01";
const adminId = "user-admin-02";
const editorId = "user-editor-03";

const createCode = (prefix: string, index: number) => `${prefix}-${String(index).padStart(3, "0")}`;
const createSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function createBaseEntity<T extends { title: string; subtitle: string; shortDescription: string; description: string; image: string; category: string; tags?: string[]; featured?: boolean; status?: WorkflowStatus; startAt?: string; endAt?: string }>(
  prefix: string,
  index: number,
  payload: T
) {
  return {
    id: `${prefix}-${String(index).padStart(3, "0")}`,
    slug: createSlug(`${payload.title}-${index}`),
    publicCode: createCode(prefix.toUpperCase(), index),
    title: payload.title,
    subtitle: payload.subtitle,
    shortDescription: payload.shortDescription,
    description: payload.description,
    image: payload.image,
    gallery: [payload.image],
    category: payload.category,
    tags: payload.tags ?? [],
    featured: payload.featured ?? false,
    status: payload.status ?? "PUBLICADO",
    createdAt: now,
    updatedAt: now,
    createdByUserId: adminMasterId,
    updatedByUserId: adminMasterId,
    publishedAt: payload.status === "PUBLICADO" || !payload.status ? now : undefined,
    publishedByUserId: payload.status === "PUBLICADO" || !payload.status ? adminMasterId : undefined,
    startAt: payload.startAt ?? now,
    endAt: payload.endAt
  };
}

const adminAvatars = [
  "/images/admin-filipe-galetto-01-v1.png",
  "/images/admin-felipe-goulart-01-v1.jpg",
  "/images/admin-filipe-galetto-02-v1.png",
  "/images/admin-felipe-goulart-02-v1.jpg",
  "/images/admin-filipe-galetto-03-v1.png",
  "/images/admin-felipe-goulart-03-v1.png"
];

export const seededUsers: PlatformUser[] = [
  {
    id: adminMasterId,
    slug: "filipe-galetto",
    fullName: "Filipe Galetto",
    email: "admin.master@fgexacta.com",
    avatar: "/images/admin-filipe-galetto-01-v1.png",
    role: "ADMIN_MASTER",
    status: "ATIVO",
    plan: "Premium",
    joinedAt: "2026-01-10T09:00:00.000Z",
    points: 9990,
    salesCount: 83,
    commissionTotal: 18420,
    referralsCount: 54,
    redeemedCouponsCount: 17,
    rankingPosition: 1,
    progressPercent: 100
  },
  {
    id: adminId,
    slug: "felipe-goulart",
    fullName: "Felipe Goulart",
    email: "admin@fgexacta.com",
    avatar: "/images/admin-felipe-goulart-01-v1.jpg",
    role: "ADMIN",
    status: "ATIVO",
    plan: "Premium",
    joinedAt: "2026-01-14T09:00:00.000Z",
    points: 8450,
    salesCount: 62,
    commissionTotal: 14980,
    referralsCount: 31,
    redeemedCouponsCount: 11,
    rankingPosition: 2,
    progressPercent: 94
  },
  {
    id: editorId,
    slug: "marina-lopes",
    fullName: "Marina Lopes",
    email: "editor@fgexacta.com",
    avatar: "/images/user-avatar-09-v1.png",
    role: "EDITOR",
    status: "ATIVO",
    plan: "Membro Pro",
    joinedAt: "2026-02-01T11:30:00.000Z",
    points: 5220,
    salesCount: 24,
    commissionTotal: 5820,
    referralsCount: 13,
    redeemedCouponsCount: 6,
    rankingPosition: 4,
    progressPercent: 77
  },
  {
    id: "user-01",
    slug: "rafael-martins",
    fullName: "Rafael Martins",
    email: "rafael@fgexacta.com",
    avatar: "/images/user-avatar-01-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Membro Pro",
    joinedAt: "2026-03-02T08:00:00.000Z",
    points: 4410,
    salesCount: 19,
    commissionTotal: 4390,
    referralsCount: 8,
    redeemedCouponsCount: 4,
    rankingPosition: 5,
    progressPercent: 71
  },
  {
    id: "user-02",
    slug: "lucas-almeida",
    fullName: "Lucas Almeida",
    email: "lucas@fgexacta.com",
    avatar: "/images/user-avatar-02-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Membro Pro",
    joinedAt: "2026-03-05T14:30:00.000Z",
    points: 3890,
    salesCount: 17,
    commissionTotal: 4020,
    referralsCount: 10,
    redeemedCouponsCount: 3,
    rankingPosition: 6,
    progressPercent: 69
  },
  {
    id: "user-03",
    slug: "camila-prado",
    fullName: "Camila Prado",
    email: "camila@fgexacta.com",
    avatar: "/images/user-avatar-03-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Essencial",
    joinedAt: "2026-03-09T10:00:00.000Z",
    points: 3120,
    salesCount: 11,
    commissionTotal: 2630,
    referralsCount: 7,
    redeemedCouponsCount: 2,
    rankingPosition: 9,
    progressPercent: 58
  },
  {
    id: "user-04",
    slug: "juliana-campos",
    fullName: "Juliana Campos",
    email: "juliana@fgexacta.com",
    avatar: "/images/user-avatar-04-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Premium",
    joinedAt: "2026-03-14T12:00:00.000Z",
    points: 4780,
    salesCount: 21,
    commissionTotal: 5300,
    referralsCount: 9,
    redeemedCouponsCount: 5,
    rankingPosition: 3,
    progressPercent: 82
  },
  {
    id: "user-05",
    slug: "pedro-lisboa",
    fullName: "Pedro Lisboa",
    email: "pedro@fgexacta.com",
    avatar: "/images/user-avatar-05-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Membro Pro",
    joinedAt: "2026-04-02T09:45:00.000Z",
    points: 2650,
    salesCount: 9,
    commissionTotal: 2140,
    referralsCount: 4,
    redeemedCouponsCount: 1,
    rankingPosition: 12,
    progressPercent: 49
  },
  {
    id: "user-06",
    slug: "fernanda-luz",
    fullName: "Fernanda Luz",
    email: "fernanda@fgexacta.com",
    avatar: "/images/user-avatar-06-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Premium",
    joinedAt: "2026-04-18T17:10:00.000Z",
    points: 3560,
    salesCount: 13,
    commissionTotal: 3175,
    referralsCount: 11,
    redeemedCouponsCount: 4,
    rankingPosition: 8,
    progressPercent: 61
  },
  {
    id: "user-07",
    slug: "victor-paes",
    fullName: "Victor Paes",
    email: "victor@fgexacta.com",
    avatar: "/images/user-avatar-07-v1.png",
    role: "USER",
    status: "PENDENTE",
    plan: "Essencial",
    joinedAt: "2026-05-01T16:20:00.000Z",
    points: 890,
    salesCount: 2,
    commissionTotal: 340,
    referralsCount: 2,
    redeemedCouponsCount: 0,
    rankingPosition: 27,
    progressPercent: 22
  },
  {
    id: "user-08",
    slug: "bianca-teixeira",
    fullName: "Bianca Teixeira",
    email: "bianca@fgexacta.com",
    avatar: "/images/user-avatar-08-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Membro Pro",
    joinedAt: "2026-05-08T13:25:00.000Z",
    points: 2840,
    salesCount: 10,
    commissionTotal: 2410,
    referralsCount: 6,
    redeemedCouponsCount: 3,
    rankingPosition: 10,
    progressPercent: 53
  },
  {
    id: "user-09",
    slug: "henrique-nery",
    fullName: "Henrique Nery",
    email: "henrique@fgexacta.com",
    avatar: "/images/user-avatar-10-v1.png",
    role: "USER",
    status: "ATIVO",
    plan: "Essencial",
    joinedAt: "2026-05-19T18:00:00.000Z",
    points: 1980,
    salesCount: 6,
    commissionTotal: 1390,
    referralsCount: 5,
    redeemedCouponsCount: 2,
    rankingPosition: 15,
    progressPercent: 37
  }
];

const seededCompanies: CompanyRecord[] = companyCatalog.slice(0, 10).map((company, index) => ({
  ...createBaseEntity("company", index + 1, {
    title: company.name,
    subtitle: company.summary,
    shortDescription: company.summary,
    description: company.description,
    image: company.logo,
    category: company.category,
    tags: company.chips,
    featured: index < 4
  }),
  kind: "company" as const,
  badge: company.badge,
  accent: company.accent,
  logo: company.logo,
  segment: company.category,
  type: company.type,
  city: company.city,
  state: company.state,
  neighborhood: company.neighborhood,
  address: company.address,
  phone: "(47) 3000-0000",
  contactEmail: `${company.slug}@fgexacta-demo.com`,
  website: `https://${company.slug}.fgexacta-demo.com`,
  socialLinks: ["instagram", "linkedin"],
  contactName: `${company.name} Comercial`,
  credentialedStatus: company.credentialedStatus,
  specialties: company.specialties,
  facts: company.facts,
  chips: company.chips,
  linkedOfferIds: [],
  linkedProductIds: [],
  linkedServiceIds: [],
  linkedCampaignIds: [],
  linkedOpportunityIds: [],
  latitude: company.latitude,
  longitude: company.longitude
}));

const seededProducts: ProductRecord[] = [
  ...productCatalog.map((product, index) => ({
    ...createBaseEntity("product", index + 1, {
      title: product.title,
      subtitle: product.summary,
      shortDescription: product.summary,
      description: product.description,
      image: product.image,
      category: product.category,
      tags: product.chips,
      featured: index < 3
    }),
    kind: "product" as const,
    badge: product.badge,
    accent: product.accent,
    brand: product.title,
    manufacturer: "FG EXACTA Labs",
    price: product.price,
    commissionRate: product.commissionRate,
    commissionValue: product.commissionValue,
    commercialInfo: product.summary,
    audience: product.audience,
    payoutWindow: product.payoutWindow,
    approvalFlow: product.approvalFlow,
    affiliateLink: product.affiliateLink,
    affiliationRules: ["Disponível para afiliados aprovados", "Comissão válida após aprovação da venda"],
    materials: ["Criativo para story", "Criativo para reels", "Banner 1080x1080"],
    facts: product.facts,
    chips: product.chips
  })),
  {
    ...createBaseEntity("product", 6, {
      title: "Hub Smart Home Vision",
      subtitle: "Central residencial com apelo premium para automação",
      shortDescription: "Hub premium para automação residencial e bundles de alto valor.",
      description: "Produto pensado para ofertas mais premium, comparação técnica e campanhas de demonstração com foco em ticket maior.",
      image: "/images/product-card-03-real-v2.png",
      category: "Smart Home",
      tags: ["Smart Home", "Premium", "Bundle"],
      featured: true
    }),
    kind: "product" as const,
    badge: "Premium",
    accent: "violet",
    brand: "Vision Home",
    manufacturer: "Vision Home",
    price: "R$ 899,00",
    commissionRate: "18%",
    commissionValue: "R$ 161,82",
    commercialInfo: "Ideal para bundles e lives com demonstração.",
    audience: "Público premium, tecnologia e automação residencial.",
    payoutWindow: "Liberação após confirmação da venda e validação logística.",
    approvalFlow: "Afiliação liberada após aceite do regulamento comercial.",
    affiliateLink: "https://fgexacta.com/r/admin/hub-smart-home-vision",
    affiliationRules: ["Necessita aprovação administrativa", "Conteúdo deve seguir o material oficial"],
    materials: ["Vídeo de demonstração", "Carrossel de benefícios"],
    facts: ["Forte para bundles", "Boa margem para comissão", "Encaixe com creator tech"],
    chips: ["Smart Home", "Premium", "Comissão"]
  },
  {
    ...createBaseEntity("product", 7, {
      title: "Mochila Urban Creator",
      subtitle: "Acessório lifestyle com apelo visual para rotina e viagem",
      shortDescription: "Produto lifestyle com forte leitura visual para creators.",
      description: "Boa opção para criativos de rotina, moda, utilidade e conteúdos com valor percebido mais alto.",
      image: "/images/product-card-01-real-v2.png",
      category: "Lifestyle",
      tags: ["Lifestyle", "Moda", "Creator"]
    }),
    kind: "product" as const,
    badge: "Lifestyle",
    accent: "blue",
    brand: "Urban Creator",
    manufacturer: "Urban Creator",
    price: "R$ 249,90",
    commissionRate: "21%",
    commissionValue: "R$ 52,47",
    commercialInfo: "Acessório de giro com forte apelo visual.",
    audience: "Moda, creators, rotina e lifestyle.",
    payoutWindow: "Validação de comissão em até 7 dias.",
    approvalFlow: "Link gerado para afiliados aprovados.",
    affiliateLink: "https://fgexacta.com/r/admin/mochila-urban-creator",
    affiliationRules: ["Divulgação sem promessa irreal", "Uso da identidade visual oficial"],
    materials: ["Criativo estático", "Story motion"],
    facts: ["Bom para rotina", "Apelo visual alto", "Campanhas sazonais"],
    chips: ["Lifestyle", "Moda", "Creator"]
  },
  {
    ...createBaseEntity("product", 8, {
      title: "Ring Light Studio Max",
      subtitle: "Equipamento creator com ticket intermediário e boa conversão",
      shortDescription: "Ring light com apelo para creators, mentorias e lives.",
      description: "Produto creator com linguagem simples, valor percebido e excelente encaixe para lives, mentorias e bundles.",
      image: "/images/product-card-05-real-v2.png",
      category: "Creator Gear",
      tags: ["Creator", "Live", "Mentorias"]
    }),
    kind: "product" as const,
    badge: "Ao vivo",
    accent: "green",
    brand: "Studio Max",
    manufacturer: "Studio Max",
    price: "R$ 319,90",
    commissionRate: "17%",
    commissionValue: "R$ 54,38",
    commercialInfo: "Perfeito para bundles e lives de demonstração.",
    audience: "Creators, professores e vendedores em live.",
    payoutWindow: "Validação comercial após entrega do pedido.",
    approvalFlow: "Afiliação aprovada com aceite do material oficial.",
    affiliateLink: "https://fgexacta.com/r/admin/ring-light-studio-max",
    affiliationRules: ["Uso do posicionamento oficial", "Sem alterar claims de benefício"],
    materials: ["Roteiro de live", "Assets para criativos"],
    facts: ["Encaixa com mentorias", "Ticket médio bom", "Alta leitura para vídeo"],
    chips: ["Creator Gear", "Live", "Demonstração"]
  },
  {
    ...createBaseEntity("product", 9, {
      title: "Power Bank Turbo Air",
      subtitle: "Produto de giro com forte apelo de utilidade e recorrência",
      shortDescription: "Acessório prático e fácil de explicar em campanhas de performance.",
      description: "Produto com linguagem simples, boa utilidade e ótimo encaixe para campanhas rápidas de conversão.",
      image: "/images/product-card-02-real-v2.png",
      category: "Tecnologia",
      tags: ["Tecnologia", "Utilidade", "Giro"]
    }),
    kind: "product" as const,
    badge: "Giro rápido",
    accent: "orange",
    brand: "Turbo Air",
    manufacturer: "Turbo Air",
    price: "R$ 149,90",
    commissionRate: "19%",
    commissionValue: "R$ 28,48",
    commercialInfo: "Produto para criativos diretos e utilitários.",
    audience: "Público geral, rotina e mobilidade.",
    payoutWindow: "Comissão após aprovação da venda.",
    approvalFlow: "Link liberado dentro da plataforma após aprovação.",
    affiliateLink: "https://fgexacta.com/r/admin/power-bank-turbo-air",
    affiliationRules: ["Oferta sujeita ao estoque", "Não usar claims técnicos não aprovados"],
    materials: ["Pack de criativos", "Vídeo curto"],
    facts: ["Fácil de explicar", "Boa taxa de clique", "Preço competitivo"],
    chips: ["Tecnologia", "Giro", "Conversão"]
  },
  {
    ...createBaseEntity("product", 10, {
      title: "Kit Office Premium Desk",
      subtitle: "Bundle de mesa para público de produtividade e home office",
      shortDescription: "Bundle com excelente valor percebido para home office.",
      description: "Kit com apelo premium para produtividade, bem-estar e conteúdo de organização de ambiente.",
      image: "/images/product-card-04-real-v2.png",
      category: "Home Office",
      tags: ["Home Office", "Produtividade", "Premium"]
    }),
    kind: "product" as const,
    badge: "Bundle",
    accent: "violet",
    brand: "Desk Premium",
    manufacturer: "Desk Premium",
    price: "R$ 459,90",
    commissionRate: "20%",
    commissionValue: "R$ 91,98",
    commercialInfo: "Produto premium com excelente leitura visual.",
    audience: "Home office, creators e produtividade.",
    payoutWindow: "Comissão validada após ciclo de entrega.",
    approvalFlow: "Afiliação precisa aceite do regulamento de marca.",
    affiliateLink: "https://fgexacta.com/r/admin/kit-office-premium-desk",
    affiliationRules: ["Obrigatório usar material aprovado", "Campanhas com preço devem seguir tabela vigente"],
    materials: ["Fotos de lifestyle", "Assets de campanha"],
    facts: ["Bundle premium", "Ótimo para conteúdo de mesa", "Bom valor percebido"],
    chips: ["Home Office", "Bundle", "Premium"]
  }
];

const mentorshipCards = dashboardSections.mentorias.cards;
const seededMentorships: MentorshipRecord[] = [
  ...mentorshipCards.map((card, index) => ({
    ...createBaseEntity("mentoria", index + 1, {
      title: card.title,
      subtitle: card.subtitle,
      shortDescription: card.subtitle,
      description: `${card.subtitle} ${card.meta}`,
      image: card.image,
      category: card.eyebrow.replace("Categoria ", ""),
      tags: card.chips,
      featured: index < 3
    }),
    kind: "mentorship" as const,
    badge: card.badge,
    accent: card.accent,
    coverImage: card.image,
    mentorName: card.mentorName ?? "Filipe Galetto",
    mentorAvatar: card.mentorAvatar ?? adminAvatars[index % adminAvatars.length],
    level: card.level ?? "Intermediário",
    duration: card.duration ?? "4h 20min",
    progressPercent: card.progressPercent ?? 0,
    progressLabel: card.progressLabel ?? "Começar agora",
    modules: [
      {
        id: `module-${index + 1}-1`,
        title: "Fundamentos",
        description: "Base estratégica para iniciar a trilha.",
        lessons: [
          { id: `lesson-${index + 1}-1`, title: "Introdução", duration: "18 min", videoUrl: "https://fgexacta.com/videos/intro", materials: ["Resumo em PDF"] },
          { id: `lesson-${index + 1}-2`, title: "Estrutura base", duration: "26 min", videoUrl: "https://fgexacta.com/videos/base", materials: ["Checklist"] }
        ]
      },
      {
        id: `module-${index + 1}-2`,
        title: "Execução",
        description: "Aplicação prática do conteúdo.",
        lessons: [
          { id: `lesson-${index + 1}-3`, title: "Aplicação prática", duration: "31 min", videoUrl: "https://fgexacta.com/videos/pratica", materials: ["Exercício guiado"] },
          { id: `lesson-${index + 1}-4`, title: "Plano de ação", duration: "22 min", videoUrl: "https://fgexacta.com/videos/plano", materials: ["Template"] }
        ]
      }
    ],
    files: ["Workbook premium", "Checklist da trilha"],
    exercises: ["Aplicação guiada", "Plano de ação semanal"],
    facts: card.facts,
    chips: card.chips
  })),
  {
    ...createBaseEntity("mentoria", 7, {
      title: "Mentoria de Prospecção Local",
      subtitle: "Como ativar empresas da sua região com processo simples",
      shortDescription: "Trilha prática para prospecção comercial local.",
      description: "Mentoria para usuários que precisam estruturar prospecção, abordagem e fechamento com empresas locais.",
      image: "/images/mentorias-hero-real-v2.png",
      category: "Vendas",
      tags: ["Vendas", "Prospecção", "Local"],
      featured: true
    }),
    kind: "mentorship" as const,
    badge: "Nova trilha",
    accent: "green",
    coverImage: "/images/mentorias-hero-real-v2.png",
    mentorName: "Felipe Goulart",
    mentorAvatar: "/images/admin-felipe-goulart-01-v1.jpg",
    level: "Intermediário",
    duration: "5h 10min",
    progressPercent: 0,
    progressLabel: "Começar trilha",
    modules: [
      {
        id: "module-7-1",
        title: "Pesquisa e mapeamento",
        description: "Como montar sua lista de prospects.",
        lessons: [
          { id: "lesson-7-1", title: "Mapeando empresas", duration: "19 min", videoUrl: "https://fgexacta.com/videos/mapa", materials: ["Planilha"] },
          { id: "lesson-7-2", title: "Prioridade comercial", duration: "27 min", videoUrl: "https://fgexacta.com/videos/prioridade", materials: ["Checklist"] }
        ]
      },
      {
        id: "module-7-2",
        title: "Contato e follow-up",
        description: "Roteiros e régua de abordagem.",
        lessons: [
          { id: "lesson-7-3", title: "Roteiro inicial", duration: "24 min", videoUrl: "https://fgexacta.com/videos/roteiro", materials: ["Script"] },
          { id: "lesson-7-4", title: "Follow-up objetivo", duration: "21 min", videoUrl: "https://fgexacta.com/videos/followup", materials: ["Template"] }
        ]
      }
    ],
    files: ["Script comercial", "Modelo de régua"],
    exercises: ["Montar pipeline local"],
    facts: ["Aplicação local", "Bom para empresas", "Relacionamento"],
    chips: ["Vendas", "Local", "Pipeline"]
  },
  {
    ...createBaseEntity("mentoria", 8, {
      title: "Mentoria de Conteúdo para Conversão",
      subtitle: "Transforme conteúdo em clique, indicação e venda",
      shortDescription: "Trilha focada em conteúdo que gera resultado prático.",
      description: "Mentoria orientada para creators, afiliados e vendedores que querem melhorar a conversão do conteúdo publicado.",
      image: "/images/mentorias-hero-real.png",
      category: "Conteúdo",
      tags: ["Conteúdo", "Conversão", "Creators"]
    }),
    kind: "mentorship" as const,
    badge: "Em alta",
    accent: "violet",
    coverImage: "/images/mentorias-hero-real.png",
    mentorName: "Filipe Galetto",
    mentorAvatar: "/images/admin-filipe-galetto-02-v1.png",
    level: "Avançado",
    duration: "6h 00min",
    progressPercent: 0,
    progressLabel: "Quero começar",
    modules: [
      {
        id: "module-8-1",
        title: "Pilares de conteúdo",
        description: "Da ideia à estrutura de campanha.",
        lessons: [
          { id: "lesson-8-1", title: "Conteúdo com intenção", duration: "22 min", videoUrl: "https://fgexacta.com/videos/intencao", materials: ["Mapa"] },
          { id: "lesson-8-2", title: "Estrutura para conversão", duration: "29 min", videoUrl: "https://fgexacta.com/videos/conversao", materials: ["Canvas"] }
        ]
      },
      {
        id: "module-8-2",
        title: "Escala e leitura",
        description: "Otimização baseada em dados.",
        lessons: [
          { id: "lesson-8-3", title: "Leitura de performance", duration: "26 min", videoUrl: "https://fgexacta.com/videos/performance", materials: ["Painel"] },
          { id: "lesson-8-4", title: "Escala consciente", duration: "24 min", videoUrl: "https://fgexacta.com/videos/escala", materials: ["Checklist"] }
        ]
      }
    ],
    files: ["Guia editorial", "Template de criativos"],
    exercises: ["Planejar 7 conteúdos"],
    facts: ["Conteúdo que vende", "Leitura de métricas", "Aplicação rápida"],
    chips: ["Conteúdo", "Conversão", "Analytics"]
  }
];

const liveCards = dashboardSections.lives.cards;
const internalLiveVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
];
const seededLives: LiveRecord[] = [
  ...liveCards.map((card, index) => ({
    ...createBaseEntity("live", index + 1, {
      title: card.title,
      subtitle: card.subtitle,
      shortDescription: card.subtitle,
      description: `${card.subtitle} ${card.meta}`,
      image: card.image,
      category: card.eyebrow.replace("Categoria ", ""),
      tags: card.chips,
      featured: index === 0,
      status: "PUBLICADO"
    }),
    kind: "live" as const,
    presenterName: index % 2 === 0 ? "Filipe Galetto" : "Felipe Goulart",
    presenterAvatar: adminAvatars[index % adminAvatars.length],
    provider: "internal" as const,
    guests: index % 2 === 0 ? ["Convidado comercial", "Parceiro da campanha"] : ["Mentor convidado"],
    scheduledDate: `2026-09-${String(9 + index).padStart(2, "0")}`,
    scheduledTime: `${String(19 + (index % 3)).padStart(2, "0")}:00`,
    duration: "01h15",
    transmissionLink: internalLiveVideos[index % internalLiveVideos.length],
    recordingUrl: internalLiveVideos[index % internalLiveVideos.length],
    heroCtaLabel: "Assistir live",
    heroCtaHref: `/detalhes/lives/${createSlug(`${card.title}-${index + 1}`)}`,
    materials: ["Roteiro da live", "Banner da transmissão"],
    relatedProductIds: seededProducts.slice(index, index + 2).map((product) => product.id),
    facts: card.facts,
    chips: card.chips
  })),
  {
    ...createBaseEntity("live", 6, {
      title: "Live especial de Clubão e benefícios",
      subtitle: "Como ativar ofertas, cupons e retenção com linguagem premium",
      shortDescription: "Live voltada para ativação de benefícios e leitura de ofertas.",
      description: "Encontro especial para mostrar como benefícios e ofertas podem ser usados para retenção, relacionamento e conversão.",
      image: "/images/lives-card-05-v1.jpg",
      category: "Clubão",
      tags: ["Clubão", "Benefícios", "Retenção"],
      status: "AGENDADO",
      featured: true
    }),
    kind: "live" as const,
    presenterName: "Felipe Goulart",
    presenterAvatar: "/images/admin-felipe-goulart-02-v1.jpg",
    provider: "internal" as const,
    guests: ["Parceiro Clubão"],
    scheduledDate: "2026-09-20",
    scheduledTime: "20:30",
    duration: "01h00",
    transmissionLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    recordingUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    heroCtaLabel: "Assistir live",
    heroCtaHref: `/detalhes/lives/${createSlug("Live especial de Clubão e benefícios-6")}`,
    materials: ["Checklist de benefícios", "Banner premium"],
    relatedProductIds: [seededProducts[0].id, seededProducts[1].id],
    facts: ["Relação com Clubão", "Retenção", "Conversão"],
    chips: ["Clubão", "Premium", "Oferta"]
  }
];

const seededClubOffers: ClubOfferRecord[] = [
  {
    ...createBaseEntity("offer", 1, {
      title: "Desconto em restaurante",
      subtitle: "Menu degustação com benefício para membros",
      shortDescription: "Restaurante italiano parceiro",
      description: "Oferta exclusiva no restaurante Casa Nobile com experiência gastronômica premium e atendimento prioritário para membros do Clubão.",
      image: "/images/clubao-card-01-real-v1.png",
      category: "Gastronomia",
      tags: ["Restaurante", "Premium", "Jantar"],
      featured: true
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-REST-01",
    partnerCompanyId: seededCompanies[0].id,
    partnerName: "Casa Nobile Cucina",
    partnerLocation: "Balneário Camboriú • SC",
    discountLabel: "25% OFF no menu degustação",
    originalPrice: "R$ 219,00",
    discountedPrice: "R$ 164,25",
    validityLabel: "Válido para jantar",
    redemptionLimit: 240,
    redeemedCount: 108,
    singleUsePerUser: true,
    rules: ["Reserva com antecedência mínima de 6h", "Uso único por usuário", "Não cumulativo"],
    conditions: ["Mesa para até 4 pessoas", "Apresentar cupom com documento"],
    importantInfo: ["Estacionamento conveniado", "Unidade principal"],
    couponPrefix: "REST"
  },
  {
    ...createBaseEntity("offer", 2, {
      title: "Desconto em hotel",
      subtitle: "Hospedagem premium de fim de semana",
      shortDescription: "Hotel boutique com spa incluso",
      description: "Condição especial no Aurora Boutique Hotel com tarifa reduzida, café da manhã premium e acesso ao spa.",
      image: "/images/clubao-card-02-real-v1.png",
      category: "Hotelaria",
      tags: ["Hotel", "Spa", "Fim de semana"],
      featured: true,
      endAt: "2026-09-10T18:00:00.000Z"
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-HOTL-02",
    partnerCompanyId: seededCompanies[1].id,
    partnerName: "Aurora Boutique Hotel",
    partnerLocation: "Gramado • RS",
    discountLabel: "30% OFF em hospedagem selecionada",
    originalPrice: "R$ 1.180,00",
    discountedPrice: "R$ 826,00",
    validityLabel: "Oferta próxima do fim",
    redemptionLimit: 120,
    redeemedCount: 89,
    singleUsePerUser: true,
    rules: ["Check-in até domingo", "Não válido em feriados"],
    conditions: ["Uma reserva por usuário", "Sujeito à disponibilidade"],
    importantInfo: ["Late checkout conforme disponibilidade"],
    couponPrefix: "HOTL"
  },
  {
    ...createBaseEntity("offer", 3, {
      title: "Desconto em viagens",
      subtitle: "Pacote com passagem e hospedagem",
      shortDescription: "Agência com roteiros exclusivos",
      description: "Condição especial para pacotes nacionais com passagem, hotel e suporte de concierge.",
      image: "/images/clubao-card-03-real-v1.png",
      category: "Viagens",
      tags: ["Viagem", "Pacote", "Concierge"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-TRVL-03",
    partnerCompanyId: seededCompanies[2].id,
    partnerName: "Travel Key Experience",
    partnerLocation: "Atendimento nacional",
    discountLabel: "R$ 600 OFF em pacotes selecionados",
    originalPrice: "R$ 4.990,00",
    discountedPrice: "R$ 4.390,00",
    validityLabel: "Embarque em até 60 dias",
    redemptionLimit: 80,
    redeemedCount: 22,
    singleUsePerUser: true,
    rules: ["Válido para pacotes acima de R$ 3.500"],
    conditions: ["Uso único", "Sujeito a datas elegíveis"],
    importantInfo: ["Taxas aeroportuárias não inclusas"],
    couponPrefix: "TRVL"
  },
  {
    ...createBaseEntity("offer", 4, {
      title: "Desconto em academia",
      subtitle: "Plano trimestral com aula premium",
      shortDescription: "Academia com estúdio e personal class",
      description: "Plano trimestral com valor reduzido, avaliação física e aula premium.",
      image: "/images/clubao-card-04-real-v1.png",
      category: "Bem-estar",
      tags: ["Academia", "Saúde", "Plano"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-FITN-04",
    partnerCompanyId: seededCompanies[3].id,
    partnerName: "Core Move Club",
    partnerLocation: "Itajaí • SC",
    discountLabel: "35% OFF no plano trimestral",
    originalPrice: "R$ 599,00",
    discountedPrice: "R$ 389,00",
    validityLabel: "Ativação presencial em até 7 dias",
    redemptionLimit: 160,
    redeemedCount: 47,
    singleUsePerUser: true,
    rules: ["Apenas para novos contratos"],
    conditions: ["Uma ativação por CPF"],
    importantInfo: ["Aula premium experimental inclusa"],
    couponPrefix: "FITN"
  },
  {
    ...createBaseEntity("offer", 5, {
      title: "Desconto em tecnologia",
      subtitle: "Acessórios premium e gadgets selecionados",
      shortDescription: "Oferta encerrada por lote esgotado",
      description: "Campanha relâmpago para gadgets premium com seleção de acessórios e itens creator.",
      image: "/images/product-card-02-real-v2.png",
      category: "Tecnologia",
      tags: ["Tecnologia", "Gadgets", "Acessórios"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-TECH-05",
    partnerCompanyId: seededCompanies[4].id,
    partnerName: "Nexus Gear Store",
    partnerLocation: "E-commerce parceiro",
    discountLabel: "Até 40% OFF em gadgets",
    originalPrice: "R$ 799,00",
    discountedPrice: "R$ 479,00",
    validityLabel: "Lote esgotado",
    redemptionLimit: 150,
    redeemedCount: 150,
    singleUsePerUser: true,
    rules: ["Válida enquanto durarem estoques"],
    conditions: ["Sem nova emissão após esgotar"],
    importantInfo: ["Frete calculado no checkout"],
    couponPrefix: "TECH"
  },
  {
    ...createBaseEntity("offer", 6, {
      title: "Desconto em cursos",
      subtitle: "Trilha premium com aulas e bônus",
      shortDescription: "Curso parceiro com certificado",
      description: "Benefício para uma trilha parceira com certificado, aulas gravadas e encontros bônus.",
      image: "/images/mentorias-hero-real-v2.png",
      category: "Educação",
      tags: ["Curso", "Certificado", "Premium"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-COUR-06",
    partnerCompanyId: seededCompanies[5].id,
    partnerName: "Skill Masters Academy",
    partnerLocation: "Plataforma online",
    discountLabel: "50% OFF na trilha completa",
    originalPrice: "R$ 1.240,00",
    discountedPrice: "R$ 620,00",
    validityLabel: "Acesso liberado após validação",
    redemptionLimit: 200,
    redeemedCount: 74,
    singleUsePerUser: true,
    rules: ["Válido em uma compra por usuário"],
    conditions: ["Acesso individual"],
    importantInfo: ["Bônus liberado em até 24h"],
    couponPrefix: "COUR"
  },
  {
    ...createBaseEntity("offer", 7, {
      title: "Desconto em serviços automotivos",
      subtitle: "Revisão premium com check-up completo",
      shortDescription: "Centro automotivo parceiro",
      description: "Revisão com alinhamento, check-up de 20 itens e mão de obra especial para membros.",
      image: "/images/empresa-logo-04-v1.png",
      category: "Automotivo",
      tags: ["Automotivo", "Revisão", "Parceiro"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-AUTO-07",
    partnerCompanyId: seededCompanies[6].id,
    partnerName: "Torque Prime Center",
    partnerLocation: "Joinville • SC",
    discountLabel: "20% OFF na revisão premium",
    originalPrice: "R$ 540,00",
    discountedPrice: "R$ 432,00",
    validityLabel: "Uso com agendamento",
    redemptionLimit: 90,
    redeemedCount: 33,
    singleUsePerUser: true,
    rules: ["Agendar com antecedência de 24h"],
    conditions: ["Uso único por placa"],
    importantInfo: ["Sala VIP com café"],
    couponPrefix: "AUTO"
  },
  {
    ...createBaseEntity("offer", 8, {
      title: "Desconto em beleza e estética",
      subtitle: "Pacote premium de estética facial",
      shortDescription: "Clínica parceira com protocolo premium",
      description: "Protocolo facial com avaliação, limpeza premium e sessão de hidratação profunda.",
      image: "/images/empresa-logo-02-v1.png",
      category: "Beleza e estética",
      tags: ["Estética", "Beleza", "Protocolo"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-BEAU-08",
    partnerCompanyId: seededCompanies[1].id,
    partnerName: "Maison Lumière Estética",
    partnerLocation: "Florianópolis • SC",
    discountLabel: "R$ 180 OFF no protocolo facial",
    originalPrice: "R$ 690,00",
    discountedPrice: "R$ 510,00",
    validityLabel: "Resgate único por usuário",
    redemptionLimit: 140,
    redeemedCount: 54,
    singleUsePerUser: true,
    rules: ["Necessária avaliação prévia"],
    conditions: ["Agendamento obrigatório"],
    importantInfo: ["Inclui kit pós-procedimento"],
    couponPrefix: "BEAU"
  },
  {
    ...createBaseEntity("offer", 9, {
      title: "Desconto em lojas de roupas",
      subtitle: "Cupom especial para coleção premium",
      shortDescription: "Curadoria de moda urbana e premium",
      description: "Desconto exclusivo na coleção premium com curadoria de peças urbanas e atendimento especial.",
      image: "/images/empresa-logo-05-v1.png",
      category: "Moda",
      tags: ["Moda", "Coleção", "Premium"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-FASH-09",
    partnerCompanyId: seededCompanies[4].id,
    partnerName: "Maison Nord",
    partnerLocation: "Curitiba • PR",
    discountLabel: "R$ 200 OFF em compras acima de R$ 900",
    originalPrice: "R$ 900,00",
    discountedPrice: "R$ 700,00",
    validityLabel: "Resgate histórico mantido",
    redemptionLimit: 180,
    redeemedCount: 121,
    singleUsePerUser: true,
    rules: ["Aplicação automática na compra mínima"],
    conditions: ["Não válido em outlet"],
    importantInfo: ["Atendimento premium com agendamento"],
    couponPrefix: "FASH"
  },
  {
    ...createBaseEntity("offer", 10, {
      title: "Desconto em experiências e lazer",
      subtitle: "Ingresso premium para experiência imersiva",
      shortDescription: "Lazer com vagas especiais",
      description: "Experiência imersiva com acesso premium, fila preferencial e kit especial para membros.",
      image: "/images/clubao-hero-real.jpg",
      category: "Experiências e lazer",
      tags: ["Lazer", "Experiência", "Ingresso"]
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-LAZR-10",
    partnerCompanyId: seededCompanies[7].id,
    partnerName: "Immersion Hall",
    partnerLocation: "São Paulo • SP",
    discountLabel: "15% OFF + acesso premium",
    originalPrice: "R$ 380,00",
    discountedPrice: "R$ 323,00",
    validityLabel: "Uso em datas participantes",
    redemptionLimit: 220,
    redeemedCount: 64,
    singleUsePerUser: true,
    rules: ["Necessário agendar data e horário"],
    conditions: ["Sujeito à disponibilidade da sessão"],
    importantInfo: ["Fila premium inclusa"],
    couponPrefix: "LAZR"
  },
  {
    ...createBaseEntity("offer", 11, {
      title: "Desconto em serviços para empresas",
      subtitle: "Consultoria com condição corporativa",
      shortDescription: "Oferta corporativa com horas bonificadas",
      description: "Condição especial para serviços empresariais, branding e consultoria comercial com horas bonificadas.",
      image: "/images/empresas-hero-real.jpg",
      category: "Serviços para empresas",
      tags: ["Consultoria", "B2B", "Empresas"],
      endAt: "2026-09-07T17:39:00.000Z"
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-B2B-11",
    partnerCompanyId: seededCompanies[8].id,
    partnerName: "Scale Partners Consulting",
    partnerLocation: "Atendimento híbrido",
    discountLabel: "25% OFF + 2h bônus",
    originalPrice: "R$ 3.200,00",
    discountedPrice: "R$ 2.400,00",
    validityLabel: "Oferta encerrada",
    redemptionLimit: 60,
    redeemedCount: 41,
    singleUsePerUser: true,
    rules: ["Válida enquanto ativa"],
    conditions: ["Encerrada para novos resgates"],
    importantInfo: ["Histórico preservado"],
    couponPrefix: "B2B"
  },
  {
    ...createBaseEntity("offer", 12, {
      title: "Oferta exclusiva / benefício premium",
      subtitle: "Pacote insider com concierge e acesso VIP",
      shortDescription: "Benefício premium da temporada",
      description: "Pacote premium com concierge, acesso a experiências exclusivas e prioridade em novas ofertas.",
      image: "/images/recompensas-hero-real-v3.jpg",
      category: "Premium",
      tags: ["Premium", "VIP", "Concierge"],
      featured: true,
      endAt: "2026-09-11T22:00:00.000Z"
    }),
    kind: "clubOffer" as const,
    offerCode: "OFR-PREM-12",
    partnerCompanyId: seededCompanies[9].id,
    partnerName: "FG EXACTA Premium Desk",
    partnerLocation: "Benefício híbrido • atendimento dedicado",
    discountLabel: "Benefício VIP com concierge",
    originalPrice: "R$ 1.990,00",
    discountedPrice: "Acesso exclusivo para membros elegíveis",
    validityLabel: "Próxima do vencimento",
    redemptionLimit: 40,
    redeemedCount: 28,
    singleUsePerUser: true,
    rules: ["Elegibilidade sujeita a análise interna"],
    conditions: ["Não transferível"],
    importantInfo: ["Atendimento concierge incluso"],
    couponPrefix: "PREM"
  }
];

const seededSupplierLists: SupplierListRecord[] = supplierListCatalog.slice(0, 12).map((item, index) => ({
  ...createBaseEntity("list", index + 1, {
    title: item.title,
    subtitle: item.subtitle,
    shortDescription: item.subtitle,
    description: `${item.subtitle} ${item.meta}`,
    image: `/images/empresa-logo-${String((index % 10) + 1).padStart(2, "0")}-v1.png`,
    category: item.badge,
    tags: item.chips
  }),
  kind: "supplierList" as const,
  badge: item.badge,
  prompt: item.prompt,
  facts: item.facts,
  chips: item.chips,
  suppliers: [
    {
      id: `supplier-${index + 1}-1`,
      name: `${item.badge} Prime`,
      company: `${item.badge} Prime Distribuição`,
      category: item.badge,
      segment: item.chips[0],
      description: item.subtitle,
      location: "Atendimento nacional",
      contact: "Comercial Prime",
      phone: "(11) 3000-1000",
      email: `contato${index + 1}@prime.com`,
      website: `https://prime-${index + 1}.fgexacta-demo.com`, whatsapp: "(11) 98888-0000", cityState: "São Paulo / SP", products: ["Lote fechado", "Liquidação", "Kits"], companySlug: "axon-nexus",
      notes: "Fornecedor seed para demonstração administrativa.",
      status: "PUBLICADO"
    },
    {
      id: `supplier-${index + 1}-2`,
      name: `${item.badge} Select`,
      company: `${item.badge} Select Atacado`,
      category: item.badge,
      segment: item.chips[1] ?? item.chips[0],
      description: item.meta,
      location: "Operação regional",
      contact: "Equipe Select",
      phone: "(47) 3000-2000",
      email: `select${index + 1}@fgexacta-demo.com`,
      website: `https://select-${index + 1}.fgexacta-demo.com`, whatsapp: "(47) 99999-1111", cityState: "Itajaí / SC", products: ["Matéria prima", "Insumos base", "Varejo"], companySlug: "pulse-media",
      notes: "Segmento complementar para organização de listas.",
      status: "PUBLICADO"
    }
  ]
}));

const seededReferralServices: ReferralServiceRecord[] = seededCompanies.slice(0, 10).map((company, index) => ({
  ...createBaseEntity("service", index + 1, {
    title: `Indicação ${company.title}`,
    subtitle: `Serviço de indicação para ${company.category.toLowerCase()}`,
    shortDescription: company.shortDescription,
    description: `Serviço administrado pelo Admin Master para conectar usuário, empresa e eventual premiação na plataforma. ${company.description}`,
    image: company.logo,
    category: company.category,
    tags: company.chips,
    featured: index < 4
  }),
  kind: "referralService" as const,
  companyId: company.id,
  companyName: company.title,
  valueLabel: `Ticket médio R$ ${800 + index * 120},00`,
  rewardLabel: `Comissão ${12 + index}% ou premiação escalável`,
  rules: ["Necessita validação da indicação", "A conversão é acompanhada pelo admin"],
  criteria: ["Lead qualificado", "Contato válido", "Contexto comercial aderente"],
  deadlineLabel: `${7 + index} dias úteis para retorno`,
  facts: ["Ligado à empresa cadastrada", "Gera histórico de indicação", "Premiação rastreável"],
  chips: ["Indicação", company.category, "Comissão"]
}));

const seededReferrals: ReferralRecord[] = [
  { id: "ref-001", userId: "user-01", serviceId: seededReferralServices[0].id, companyId: seededCompanies[0].id, createdAt: "2026-09-04T11:10:00.000Z", status: "CONVERTIDA", convertedAt: "2026-09-06T14:30:00.000Z", rewardLabel: "R$ 320" },
  { id: "ref-002", userId: "user-02", serviceId: seededReferralServices[1].id, companyId: seededCompanies[1].id, createdAt: "2026-09-03T10:40:00.000Z", status: "EM_ANALISE" },
  { id: "ref-003", userId: "user-04", serviceId: seededReferralServices[2].id, companyId: seededCompanies[2].id, createdAt: "2026-09-02T16:20:00.000Z", status: "CONTATO_REALIZADO" },
  { id: "ref-004", userId: "user-05", serviceId: seededReferralServices[3].id, companyId: seededCompanies[3].id, createdAt: "2026-09-01T13:15:00.000Z", status: "PREMIADA", rewardLabel: "Bônus premium" },
  { id: "ref-005", userId: "user-06", serviceId: seededReferralServices[4].id, companyId: seededCompanies[4].id, createdAt: "2026-08-29T15:00:00.000Z", status: "RECUSADA" },
  { id: "ref-006", userId: "user-08", serviceId: seededReferralServices[5].id, companyId: seededCompanies[5].id, createdAt: "2026-09-07T09:00:00.000Z", status: "CRIADA" }
];

const opportunityCards = dashboardSections.oportunidades.cards;
const seededOpportunities: OpportunityRecord[] = [
  ...opportunityCards.map((card, index) => ({
    ...createBaseEntity("opportunity", index + 1, {
      title: card.title,
      subtitle: card.subtitle,
      shortDescription: card.subtitle,
      description: `${card.subtitle} ${card.meta}`,
      image: card.image,
      category: card.eyebrow.replace("Categoria ", ""),
      tags: card.chips,
      featured: index < 3
    }),
    kind: "opportunity" as const,
    companyId: seededCompanies[index % seededCompanies.length].id,
    companyName: seededCompanies[index % seededCompanies.length].title,
    benefit: card.badge,
    requirements: ["Perfil aderente", "Execução dentro do prazo", "Material oficial"],
    ctaLabel: card.cta,
    ctaHref: `/${createSlug(card.title)}`,
    valueLabel: `Potencial ${card.meta}`,
    facts: card.facts,
    chips: card.chips
  })),
  {
    ...createBaseEntity("opportunity", 10, {
      title: "Oportunidade regional de expansão comercial",
      subtitle: "Operação local com benefício e recorrência para parceiros ativos",
      shortDescription: "Oportunidade voltada para expansão local.",
      description: "Programa voltado para parceiros com base regional e relacionamento comercial pronto para acelerar conversão.",
      image: "/images/oportunidades-hero-real.png",
      category: "Expansão comercial",
      tags: ["Local", "Expansão", "Recorrência"],
      featured: true
    }),
    kind: "opportunity" as const,
    companyId: seededCompanies[0].id,
    companyName: seededCompanies[0].title,
    benefit: "Recorrência + premiação",
    requirements: ["Base local ativa", "Checklist comercial completo"],
    ctaLabel: "Quero aplicar",
    ctaHref: "/oportunidades",
    valueLabel: "Ticket estimado R$ 2.400",
    facts: ["Bom para base local", "Relacionamento recorrente", "Ligado a empresa cadastrada"],
    chips: ["Local", "Recorrência", "Empresas"]
  }
];

const campaignCards = dashboardSections.campanhas.cards;
const seededCampaigns: CampaignRecord[] = campaignCards.map((card, index) => ({
  ...createBaseEntity("campaign", index + 1, {
    title: card.title,
    subtitle: card.subtitle,
    shortDescription: card.subtitle,
    description: `${card.subtitle} ${card.meta}`,
    image: card.image,
    category: card.eyebrow.replace("Categoria ", ""),
    tags: card.chips,
    featured: index < 3
  }),
  kind: "campaign" as const,
  objective: card.badge,
  periodLabel: `01/09 a ${String(10 + index).padStart(2, "0")}/09`,
  rewardLabel: `${card.badge} + bônus`,
  scoreLabel: `${100 + index * 25} pontos`,
  relatedProductIds: seededProducts.slice(index % 5, (index % 5) + 2).map((product) => product.id),
  materials: ["Banner", "Story", "Template de copy"],
  participantCount: 100 + index * 12,
  resultsSummary: `Campanha com leitura ${card.meta.toLowerCase()}.`,
  rules: ["Válida durante o período", "Resultados auditáveis pelo admin"]
}));

const missionCards = dashboardSections.missoes.cards;
const seededMissions: MissionRecord[] = missionCards.map((card, index) => ({
  ...createBaseEntity("mission", index + 1, {
    title: card.title,
    subtitle: card.subtitle,
    shortDescription: card.subtitle,
    description: `${card.subtitle} ${card.meta}`,
    image: card.image,
    category: card.eyebrow.replace("Categoria ", ""),
    tags: card.chips,
    featured: index < 2
  }),
  kind: "mission" as const,
  objective: card.badge,
  taskLabel: card.title,
  scoreLabel: `${120 + index * 20} pontos`,
  rewardLabel: `Recompensa conectada à missão ${index + 1}`,
  requirements: ["Dentro do prazo", "Critérios objetivos", "Rastreio automático"],
  difficulty: index % 3 === 0 ? "Alta" : index % 2 === 0 ? "Média" : "Baixa"
}));

const rewardCards = dashboardSections.recompensas.cards;
const seededRewards: RewardRecord[] = rewardCards.map((card, index) => ({
  ...createBaseEntity("reward", index + 1, {
    title: card.title,
    subtitle: card.subtitle,
    shortDescription: card.subtitle,
    description: `${card.subtitle} ${card.meta}`,
    image: card.image,
    category: card.eyebrow.replace("Categoria ", ""),
    tags: card.chips,
    featured: index < 2
  }),
  kind: "reward" as const,
  rewardType: card.badge,
  valueLabel: card.meta,
  pointsRequired: 1200 + index * 300,
  quantityAvailable: 40 - index * 2,
  rules: ["Disponível conforme estoque", "Resgate auditável e histórico permanente"]
}));

const wheelTemplates = [
  {
    title: "Giro Diário Premium",
    subtitle: "Retorne todos os dias para uma rodada rápida com leitura premium",
    category: "Giro Diário",
    tone: "blue" as const,
    spinFrequency: "Diário" as const,
    nextSpinAt: "2026-09-09T20:15:00.000Z",
    nextSpinLabel: "Próximo giro em 08:42:15",
    audienceRule: "Todos os usuários ativos",
    releaseRule: "1 giro liberado por dia",
    priorityLabel: "Rotina recorrente",
    campaignLabel: "Ciclo diário"
  },
  {
    title: "Giro Semanal de Benefícios",
    subtitle: "Benefícios maiores para quem mantém consistência durante a semana",
    category: "Giro Semanal",
    tone: "green" as const,
    spinFrequency: "Semanal" as const,
    nextSpinAt: "2026-09-12T19:00:00.000Z",
    nextSpinLabel: "Nova rodada no sábado",
    audienceRule: "Usuários com atividade semanal",
    releaseRule: "1 giro semanal por usuário",
    priorityLabel: "Retenção",
    campaignLabel: "Semana em foco"
  },
  {
    title: "Giro Especial FG EXACTA",
    subtitle: "Roleta especial com recompensas de alto valor percebido",
    category: "Giro Especial",
    tone: "orange" as const,
    spinFrequency: "Especial" as const,
    nextSpinAt: "2026-09-10T18:30:00.000Z",
    nextSpinLabel: "Liberação especial amanhã",
    audienceRule: "Base liberada pelo Admin Master",
    releaseRule: "Disponibilidade por campanha",
    priorityLabel: "Alta",
    campaignLabel: "Evento premium"
  },
  {
    title: "Giro VIP",
    subtitle: "Experiência exclusiva para perfis elegíveis e membros premium",
    category: "Giro VIP",
    tone: "violet" as const,
    spinFrequency: "Condicionado" as const,
    nextSpinAt: "2026-09-11T21:00:00.000Z",
    nextSpinLabel: "Aguardando elegibilidade VIP",
    audienceRule: "Perfis premium ou convidados",
    releaseRule: "Nível e critérios comerciais",
    priorityLabel: "VIP",
    campaignLabel: "Experiência exclusiva"
  },
  {
    title: "Giro de Campanha",
    subtitle: "Roleta conectada às campanhas ativas e à cadência comercial",
    category: "Giro de Campanha",
    tone: "orange" as const,
    spinFrequency: "Condicionado" as const,
    nextSpinAt: "2026-09-09T23:30:00.000Z",
    nextSpinLabel: "Campanha ativa até 23:30",
    audienceRule: "Participantes de campanhas ativas",
    releaseRule: "Cumprir entrada da campanha",
    priorityLabel: "Campanha",
    campaignLabel: "Sprint comercial"
  },
  {
    title: "Giro de Aniversário",
    subtitle: "Condição especial para datas comemorativas e ações sazonais",
    category: "Giro de Aniversário",
    tone: "green" as const,
    spinFrequency: "Especial" as const,
    nextSpinAt: "2026-09-18T12:00:00.000Z",
    nextSpinLabel: "Evento sazonal programado",
    audienceRule: "Usuários elegíveis na campanha",
    releaseRule: "Janela sazonal liberada",
    priorityLabel: "Sazonal",
    campaignLabel: "Aniversário FG EXACTA"
  },
  {
    title: "Giro de Missão",
    subtitle: "Cada missão concluída pode liberar nova rodada e benefício extra",
    category: "Giro de Missão",
    tone: "blue" as const,
    spinFrequency: "Condicionado" as const,
    nextSpinAt: "2026-09-09T22:10:00.000Z",
    nextSpinLabel: "Você desbloqueou um novo giro",
    audienceRule: "Usuários que completarem missões",
    releaseRule: "Meta concluída libera giro",
    priorityLabel: "Missões",
    campaignLabel: "Progressão"
  },
  {
    title: "Giro de Ranking",
    subtitle: "Roleta elegante ligada a desempenho, pontos e posição do ciclo",
    category: "Giro de Ranking",
    tone: "violet" as const,
    spinFrequency: "Semanal" as const,
    nextSpinAt: "2026-09-13T20:40:00.000Z",
    nextSpinLabel: "Nova rodada após fechamento do ciclo",
    audienceRule: "Usuários ranqueados",
    releaseRule: "Faixa de pontuação ou posição",
    priorityLabel: "Desempenho",
    campaignLabel: "Fechamento semanal"
  },
  {
    title: "Giro Relâmpago",
    subtitle: "Janela curta com urgência elegante e recompensas limitadas",
    category: "Giro Relâmpago",
    tone: "orange" as const,
    spinFrequency: "Especial" as const,
    nextSpinAt: "2026-09-09T21:45:00.000Z",
    nextSpinLabel: "Roleta relâmpago em 01:32:10",
    audienceRule: "Usuários ativos no período",
    releaseRule: "Janela curta definida pelo admin",
    priorityLabel: "Urgência",
    campaignLabel: "Relâmpago"
  },
  {
    title: "Giro Exclusivo Clubão",
    subtitle: "Cupons, experiências e benefícios premium ligados ao Clubão",
    category: "Giro Exclusivo Clubão",
    tone: "green" as const,
    spinFrequency: "Condicionado" as const,
    nextSpinAt: "2026-09-10T20:00:00.000Z",
    nextSpinLabel: "Novo benefício amanhã às 20:00",
    audienceRule: "Membros elegíveis do Clubão",
    releaseRule: "Critérios premium do Clubão",
    priorityLabel: "Clubão",
    campaignLabel: "Benefícios premium"
  }
];

function createSpinReward(index: number, wheelIndex: number, title: string, category: string, rewardType: string, estimatedValue: string, probability: number, quantityAvailable: number, image: string) {
  return {
    id: `spin-reward-${wheelIndex + 1}-${index + 1}`,
    title,
    image,
    description: `Recompensa ${title} configurada pelo Admin Master para a roleta ${wheelTemplates[wheelIndex].title}.`,
    estimatedValue,
    quantityAvailable,
    category,
    internalCode: `GIRO-${String(wheelIndex + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`,
    expiresAt: index === 0 ? "2026-09-30T23:59:00.000Z" : "2026-10-10T23:59:00.000Z",
    rules: ["Uso sujeito às regras publicadas no painel.", "Validade e estoque controlados pelo Admin Master."],
    status: "ATIVO" as const,
    probability,
    rewardType
  };
}

function maskUser(fullName: string) {
  const [firstName = "Usuário", lastName = "FGX"] = fullName.split(" ");
  return `${firstName} ${lastName.slice(0, 1)}.`;
}

const seededSpinWheels: SpinWheelRecord[] = wheelTemplates.map((wheel, index) => {
  const primaryProduct = seededProducts[index % seededProducts.length];
  const relatedOffer = seededClubOffers[index % seededClubOffers.length];
  const relatedReward = seededRewards[index % seededRewards.length];
  const relatedUser = seededUsers[(index % (seededUsers.length - 3)) + 3];
  const rewards = [
    createSpinReward(0, index, primaryProduct.title, "Produtos", "Produto", primaryProduct.price, 18, 8 + index, primaryProduct.image),
    createSpinReward(1, index, relatedOffer.title, "Clubão", "Benefício", relatedOffer.discountLabel, 31, 16 + index, relatedOffer.image),
    createSpinReward(2, index, relatedReward.title, "Recompensas", "Pontos", relatedReward.valueLabel, 51, 22 + index, relatedReward.image)
  ];
  const playedAtBase = new Date(Date.UTC(2026, 8, 6 + index, 18 + (index % 3), 15, 0)).toISOString();

  return {
    ...createBaseEntity("spin", index + 1, {
      title: wheel.title,
      subtitle: wheel.subtitle,
      shortDescription: wheel.subtitle,
      description: `${wheel.subtitle} A roleta é controlada pelo Admin Master e conecta prêmios, regras, período e histórico em uma experiência premium.`,
      image: index % 2 === 0 ? "/images/sorteios-hero-real.jpg" : "/images/clubao-hero-real.jpg",
      category: wheel.category,
      tags: [wheel.category, wheel.priorityLabel, "Premium"],
      featured: index < 2,
      status: "PUBLICADO",
      startAt: "2026-09-01T08:00:00.000Z",
      endAt: index < 7 ? "2026-10-30T23:59:00.000Z" : undefined
    }),
    kind: "spinWheel" as const,
    wheelType: wheel.category,
    spinFrequency: wheel.spinFrequency,
    availableSpins: index === 0 ? 3 : index < 4 ? 1 : 0,
    completedSpins: 4 + index,
    totalPrizesWon: 3 + index,
    nextSpinAt: wheel.nextSpinAt,
    nextSpinLabel: wheel.nextSpinLabel,
    pointsLabel: `${850 + index * 145} pontos acumulados`,
    benefitsLabel: index % 2 === 0 ? "Clubão + cupons + vantagens" : "Benefícios premium + acessos especiais",
    audienceRule: wheel.audienceRule,
    releaseRule: wheel.releaseRule,
    priorityLabel: wheel.priorityLabel,
    campaignLabel: wheel.campaignLabel,
    visualTone: wheel.tone,
    rewards,
    recentWinners: [
      {
        id: `spin-winner-${index + 1}-1`,
        userNameMasked: maskUser(relatedUser.fullName),
        rewardTitle: rewards[0].title,
        wheelTitle: wheel.title,
        wonAt: playedAtBase,
        tone: wheel.tone
      },
      {
        id: `spin-winner-${index + 1}-2`,
        userNameMasked: maskUser(seededUsers[((index + 1) % (seededUsers.length - 3)) + 3].fullName),
        rewardTitle: rewards[1].title,
        wheelTitle: wheel.title,
        wonAt: new Date(Date.UTC(2026, 8, 5 + index, 15, 30, 0)).toISOString(),
        tone: index % 2 === 0 ? "green" : "blue"
      }
    ],
    history: [
      {
        id: `spin-history-${index + 1}-1`,
        userId: relatedUser.id,
        userNameMasked: maskUser(relatedUser.fullName),
        wheelTitle: wheel.title,
        resultLabel: "Recompensa liberada",
        rewardTitle: rewards[0].title,
        status: "ATIVO",
        internalCode: rewards[0].internalCode,
        expiresAt: rewards[0].expiresAt,
        playedAt: playedAtBase
      },
      {
        id: `spin-history-${index + 1}-2`,
        userId: seededUsers[((index + 2) % (seededUsers.length - 3)) + 3].id,
        userNameMasked: maskUser(seededUsers[((index + 2) % (seededUsers.length - 3)) + 3].fullName),
        wheelTitle: wheel.title,
        resultLabel: "Benefício entregue",
        rewardTitle: rewards[1].title,
        status: "UTILIZADO",
        internalCode: rewards[1].internalCode,
        expiresAt: rewards[1].expiresAt,
        playedAt: new Date(Date.UTC(2026, 8, 4 + index, 13, 0, 0)).toISOString()
      },
      {
        id: `spin-history-${index + 1}-3`,
        userId: "user-01",
        userNameMasked: "Rafael M.",
        wheelTitle: wheel.title,
        resultLabel: "Pontos registrados",
        rewardTitle: rewards[2].title,
        status: "AGUARDANDO_RESGATE",
        internalCode: rewards[2].internalCode,
        expiresAt: rewards[2].expiresAt,
        playedAt: new Date(Date.UTC(2026, 8, 3 + index, 10, 45, 0)).toISOString()
      }
    ],
    rules: [
      "Resultado calculado pela plataforma com base nas configurações publicadas.",
      "Giros, estoques e janelas de participação são controlados pelo Admin Master.",
      "Cada recompensa possui validade, rastreio e histórico próprio."
    ]
  };
});

const sweepstakeCards = dashboardSections.sorteios.cards;
const seededSweepstakes: SweepstakesRecord[] = sweepstakeCards.map((card, index) => ({
  ...createBaseEntity("sweep", index + 1, {
    title: card.title,
    subtitle: card.subtitle,
    shortDescription: card.subtitle,
    description: `${card.subtitle} ${card.meta}`,
    image: card.image,
    category: card.eyebrow,
    tags: card.chips,
    featured: index === 0,
    status: index === 0 ? "PUBLICADO" : index < 4 ? "AGENDADO" : "PUBLICADO"
  }),
  kind: "sweepstake" as const,
  sweepstakeType: card.eyebrow,
  prizeLabel: card.subtitle,
  rules: ["Critério auditável", "Histórico de participantes preservado"],
  participantCount: 240 + index * 90,
  scheduledDate: `2026-09-${String(10 + index).padStart(2, "0")}`,
  scheduledTime: `${String(18 + (index % 4)).padStart(2, "0")}:30`,
  criteria: ["Participação válida", "Regras do sorteio publicadas"],
  winnerUserId: index < 2 ? seededUsers[3 + index].id : undefined
}));

const seededCouponRedemptions: CouponRedemptionRecord[] = [
  {
    id: "coupon-redemption-001",
    couponId: "coupon-seed-01",
    couponCode: "FGX-A3K9-P7L2",
    publicCode: "CPN-001",
    serialNumber: "FGX-CLB-2026-000001",
    offerId: seededClubOffers[7].id,
    offerTitle: seededClubOffers[7].title,
    userId: editorId,
    userName: "Marina Lopes",
    userEmail: "editor@fgexacta.com",
    redeemedAt: "2026-09-06T15:39:00.000Z",
    validUntil: "2026-09-22T19:39:00.000Z",
    status: "ATIVO",
    pdfReference: "voucher-fgx-a3k9-p7l2.pdf",
    qrValidationToken: "seed-beauty-token-01",
    validationToken: "seed-beauty-token-01",
    qrPayload: "https://fgexacta.local/clubao/validate/seed-beauty-token-01",
    downloadCount: 1,
    downloadedAt: "2026-09-06T15:42:00.000Z"
  },
  {
    id: "coupon-redemption-002",
    couponId: "coupon-seed-02",
    couponCode: "FGX-M8R2-X5T1",
    publicCode: "CPN-002",
    serialNumber: "FGX-CLB-2026-000002",
    offerId: seededClubOffers[8].id,
    offerTitle: seededClubOffers[8].title,
    userId: editorId,
    userName: "Marina Lopes",
    userEmail: "editor@fgexacta.com",
    redeemedAt: "2026-09-02T16:39:00.000Z",
    validUntil: "2026-09-13T19:39:00.000Z",
    status: "UTILIZADO",
    pdfReference: "voucher-fgx-m8r2-x5t1.pdf",
    qrValidationToken: "seed-fashion-token-02",
    validationToken: "seed-fashion-token-02",
    qrPayload: "https://fgexacta.local/clubao/validate/seed-fashion-token-02",
    downloadCount: 1,
    downloadedAt: "2026-09-02T16:45:00.000Z"
  },
  {
    id: "coupon-redemption-003",
    couponId: "coupon-seed-03",
    couponCode: "FGX-Q4N7-B9C6",
    publicCode: "CPN-003",
    serialNumber: "FGX-CLB-2026-000003",
    offerId: seededClubOffers[10].id,
    offerTitle: seededClubOffers[10].title,
    userId: editorId,
    userName: "Marina Lopes",
    userEmail: "editor@fgexacta.com",
    redeemedAt: "2026-08-27T14:39:00.000Z",
    validUntil: "2026-09-07T17:39:00.000Z",
    status: "EXPIRADO",
    pdfReference: "voucher-fgx-q4n7-b9c6.pdf",
    qrValidationToken: "seed-business-token-03",
    validationToken: "seed-business-token-03",
    qrPayload: "https://fgexacta.local/clubao/validate/seed-business-token-03",
    downloadCount: 1,
    downloadedAt: "2026-08-27T14:50:00.000Z"
  },
  {
    id: "coupon-redemption-004",
    couponId: "coupon-seed-04",
    couponCode: "FGX-Z7P2-R4N8",
    publicCode: "CPN-004",
    serialNumber: "FGX-CLB-2026-000004",
    offerId: seededClubOffers[1].id,
    offerTitle: seededClubOffers[1].title,
    userId: "user-04",
    userName: "Juliana Campos",
    userEmail: "juliana@fgexacta.com",
    redeemedAt: "2026-09-07T11:15:00.000Z",
    validUntil: "2026-09-10T18:00:00.000Z",
    status: "ATIVO",
    pdfReference: "voucher-fgx-z7p2-r4n8.pdf",
    qrValidationToken: "seed-hotel-token-04",
    validationToken: "seed-hotel-token-04",
    qrPayload: "https://fgexacta.local/clubao/validate/seed-hotel-token-04",
    downloadCount: 0
  }
];

function linkCompanyRelationships() {
  seededProducts.forEach((product, index) => {
    seededCompanies[index % seededCompanies.length].linkedProductIds.push(product.id);
  });

  seededClubOffers.forEach((offer, index) => {
    const company = seededCompanies[index % seededCompanies.length];
    company.linkedOfferIds.push(offer.id);
  });

  seededReferralServices.forEach((service, index) => {
    seededCompanies[index % seededCompanies.length].linkedServiceIds.push(service.id);
  });

  seededCampaigns.forEach((campaign, index) => {
    seededCompanies[index % seededCompanies.length].linkedCampaignIds.push(campaign.id);
  });

  seededOpportunities.forEach((opportunity, index) => {
    seededCompanies[index % seededCompanies.length].linkedOpportunityIds.push(opportunity.id);
  });
}

linkCompanyRelationships();

export function createPlatformSeed(): PlatformDb {
  return {
    version: 1,
    seededAt: now,
    users: seededUsers,
    products: seededProducts,
    mentorships: seededMentorships,
    lives: seededLives,
    clubOffers: seededClubOffers,
    companies: seededCompanies,
    supplierLists: seededSupplierLists,
    referralServices: seededReferralServices,
    referrals: seededReferrals,
    opportunities: seededOpportunities,
    campaigns: seededCampaigns,
    missions: seededMissions,
    rewards: seededRewards,
    spinWheels: seededSpinWheels,
    sweepstakes: seededSweepstakes,
    couponRedemptions: seededCouponRedemptions,
    auditLog: [
      {
        id: "audit-001",
        module: "products",
        entityId: seededProducts[0].id,
        entityTitle: seededProducts[0].title,
        action: "PUBLISH",
        changedByUserId: adminMasterId,
        changedByName: "Filipe Galetto",
        changedAt: now,
        previousStatus: "EM_REVISAO",
        nextStatus: "PUBLICADO",
        summary: "Produto publicado e liberado para o painel do usuário."
      },
      {
        id: "audit-002",
        module: "mentorships",
        entityId: seededMentorships[0].id,
        entityTitle: seededMentorships[0].title,
        action: "UPDATE",
        changedByUserId: adminId,
        changedByName: "Felipe Goulart",
        changedAt: now,
        previousStatus: "PUBLICADO",
        nextStatus: "PUBLICADO",
        summary: "Mentoria revisada com ajuste em módulos e aulas."
      },
      {
        id: "audit-003",
        module: "clubOffers",
        entityId: seededClubOffers[0].id,
        entityTitle: seededClubOffers[0].title,
        action: "PUBLISH",
        changedByUserId: adminMasterId,
        changedByName: "Filipe Galetto",
        changedAt: now,
        previousStatus: "RASCUNHO",
        nextStatus: "PUBLICADO",
        summary: "Oferta do Clubão publicada com cupom ativo."
      }
    ]
  };
}
