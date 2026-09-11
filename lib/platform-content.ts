import "server-only";

import { dashboardSections, type MediaCardData, type SectionConfig, type SectionKey } from "@/lib/dashboard-data";
import { parseSafeDate } from "@/lib/safe-date";
import { getPlatformDb, isContentVisible } from "@/lib/platform-store";
import type {
  CampaignRecord,
  ClubOfferRecord,
  CompanyRecord,
  LiveRecord,
  MentorshipRecord,
  OpportunityRecord,
  PlatformDb,
  ProductRecord,
  ReferralServiceRecord,
  SpinWheelRecord,
  SupplierListRecord,
  SweepstakesRecord
} from "@/lib/platform-types";

function toProductCard(product: ProductRecord): MediaCardData {
  return {
    eyebrow: `Categoria ${product.category}`,
    title: product.title,
    subtitle: product.shortDescription,
    meta: `Preço ${product.price} • comissão ${product.commissionRate}`,
    badge: product.badge,
    accent: product.accent,
    image: product.image,
    coverFit: "contain",
    cta: "Quero me afiliar",
    href: `/detalhes/produtos/${product.slug}`,
    ctaHref: `/detalhes/produtos/${product.slug}`,
    facts: product.facts,
    chips: product.chips
  };
}

function toMentorshipCard(mentorship: MentorshipRecord): MediaCardData {
  const modulesSafe = Array.isArray(mentorship.modules) ? mentorship.modules : [];
  const lessonCount = modulesSafe.reduce((total, moduleItem) => {
    const lessons = Array.isArray((moduleItem as any)?.lessons) ? (moduleItem as any).lessons : [];
    return total + lessons.length;
  }, 0);

  return {
    eyebrow: mentorship.category,
    title: mentorship.title,
    subtitle: mentorship.shortDescription,
    meta: `${mentorship.duration} • ${mentorship.level}`,
    badge: mentorship.badge,
    accent: mentorship.accent,
    image: mentorship.coverImage,
    cta: "Ver mentoria", ctaHref: `/detalhes/mentorias/${mentorship.slug}`,
    facts: mentorship.facts,
    chips: mentorship.chips,
    mentorName: mentorship.mentorName,
    mentorAvatar: mentorship.mentorAvatar,
    moduleCount: modulesSafe.length,
    lessonCount,
    duration: mentorship.duration,
    level: mentorship.level,
    progressPercent: mentorship.progressPercent,
    progressLabel: mentorship.progressLabel
  };
}

function toLiveCard(live: LiveRecord): MediaCardData {
  return {
    eyebrow: live.category,
    title: live.title,
    subtitle: live.shortDescription,
    meta: `${live.scheduledDate} • ${live.scheduledTime} • ${live.duration}`,
    badge: live.featured ? "Destaque" : live.status,
    accent: live.featured ? "orange" : "blue",
    image: live.image,
    cta: "Ver live",
    href: `/detalhes/lives/${live.slug}`,
    ctaHref: `/detalhes/lives/${live.slug}`,
    facts: live.facts,
    chips: live.chips
  };
}

function toCompanyCard(company: CompanyRecord): MediaCardData {
  const coverImage = company.image || (Array.isArray(company.gallery) ? company.gallery[0] : "") || company.logo;

  return {
    eyebrow: `Categoria ${company.category}`,
    title: company.title,
    subtitle: company.shortDescription,
    meta: `${company.city} • ${company.type}`,
    badge: company.badge,
    accent: company.accent,
    image: coverImage,
    logo: company.logo && company.logo !== coverImage ? company.logo : undefined,
    coverFit: "cover",
    cta: "Ver empresa",
    href: `/detalhes/empresas/${company.slug}`,
    ctaHref: `/detalhes/empresas/${company.slug}`,
    facts: company.facts,
    chips: company.chips
  };
}

function toSupplierListCard(item: SupplierListRecord): MediaCardData {
  const suppliersCount = Array.isArray(item.suppliers) ? item.suppliers.length : 0;
  return {
    eyebrow: `Lista ${item.category}`,
    title: item.title,
    subtitle: item.shortDescription,
    meta: `${suppliersCount} fornecedores • ${item.badge}`,
    badge: item.badge,
    accent: "blue",
    image: item.image,
    cta: "Abrir lista",
    href: `/detalhes/listas/${item.slug}`,
    ctaHref: `/detalhes/listas/${item.slug}`,
    facts: item.facts,
    chips: item.chips
  };
}

function toReferralServiceCard(service: ReferralServiceRecord): MediaCardData {
  const factsSafe = Array.isArray(service.facts) ? service.facts : [];
  const chipsSafe = Array.isArray(service.chips) ? service.chips : [];
  const hrefSuffix = (typeof (service as any)?.slug === "string" && (service as any).slug) ? encodeURIComponent((service as any).slug) : encodeURIComponent(String(service.id));
  return {
    eyebrow: service.category,
    title: service.title,
    subtitle: service.shortDescription,
    meta: `${service.valueLabel} • ${service.rewardLabel}`,
    badge: service.status,
    accent: "green",
    image: service.image,
    cta: "Ver serviço",
    ctaHref: `/detalhes/empresas/servico/${hrefSuffix}`,
    href: `/detalhes/empresas/servico/${hrefSuffix}`,
    facts: factsSafe,
    chips: chipsSafe
  };
}

function toOpportunityCard(item: OpportunityRecord): MediaCardData {
  return {
    eyebrow: item.category,
    title: item.title,
    subtitle: item.shortDescription,
    meta: item.valueLabel,
    badge: item.benefit,
    accent: "orange",
    image: item.image,
    cta: item.ctaLabel,
    facts: item.facts,
    chips: item.chips
  };
}

function toCampaignCard(item: CampaignRecord): MediaCardData {
  const rulesSafe = Array.isArray(item.rules) ? item.rules : [];
  const tagsSafe = Array.isArray(item.tags) ? item.tags : [];
  return {
    eyebrow: item.category,
    title: item.title,
    subtitle: item.shortDescription,
    meta: `${item.periodLabel} • ${item.scoreLabel}`,
    badge: item.rewardLabel,
    accent: "violet",
    image: item.image,
    coverFit: "contain",
    cta: "Ver campanha",
    href: `/detalhes/campanhas/${item.slug}`,
    ctaHref: `/detalhes/campanhas/${item.slug}`,
    facts: ["Produtos vinculados", ...rulesSafe.slice(0, 2)],
    chips: ["Campanha", ...tagsSafe.slice(0, 2)]
  };
}

function toSweepstakeCard(item: SweepstakesRecord): MediaCardData {
  const criteriaSafe = Array.isArray(item.criteria) ? item.criteria : [];
  const participantCount = typeof item.participantCount === "number" ? item.participantCount : 0;
  const tagsSafe = Array.isArray(item.tags) ? item.tags : [];
  return {
    eyebrow: item.sweepstakeType,
    title: item.title,
    subtitle: item.prizeLabel,
    meta: `${participantCount} participantes • ${item.scheduledDate}`,
    badge: item.status,
    accent: item.featured ? "orange" : "blue",
    image: item.image,
    cta: "Ver sorteio",
    facts: [`Horário ${item.scheduledTime}`, ...criteriaSafe.slice(0, 2)],
    chips: tagsSafe
  };
}

function toSpinWheelCard(item: SpinWheelRecord): MediaCardData {
  const rewardsSafe = Array.isArray(item.rewards) ? item.rewards : [];
  const rewardTitle = rewardsSafe[0]?.title ?? "Recompensa premium";
  return {
    eyebrow: item.wheelType,
    title: item.title,
    subtitle: item.shortDescription,
    meta: `${item.availableSpins} giros • ${item.nextSpinLabel}`,
    badge: rewardTitle,
    accent: item.visualTone,
    image: item.image,
    cta: "Abrir giro",
    facts: [
      `${rewardsSafe.length} recompensas configuradas`,
      item.audienceRule,
      item.releaseRule
    ],
    chips: Array.isArray(item.tags) ? item.tags : []
  };
}

function defaultStartEnd(now = new Date()) {
  const end = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
  const start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  end.setMilliseconds(0);
  start.setMilliseconds(0);
  return { startAt: start.toISOString(), endAt: end.toISOString() };
}

function toClubOfferClientCard(item: ClubOfferRecord): {
  id: string;
  offerCode: string;
  title: string;
  subtitle: string;
  shortLabel: string;
  description: string;
  image: string;
  partnerName: string;
  partnerLocation: string;
  category: string;
  discountLabel: string;
  originalPrice?: string;
  discountedPrice?: string;
  startAt: string;
  endAt: string;
  validityLabel: string;
  redemptionLimit: number;
  redeemedCount: number;
  singleUsePerUser: boolean;
  rules: string[];
  conditions: string[];
  importantInfo: string[];
} {
  const defaults = defaultStartEnd();
  const startAtRaw = (item as any)?.startAt ?? item.publishedAt ?? defaults.startAt;
  const endAtRaw = (item as any)?.endAt ?? defaults.endAt;
  const rulesSafe = Array.isArray(item.rules) ? item.rules : [];
  const conditionsSafe = Array.isArray(item.conditions) ? item.conditions : [];
  const importantSafe = Array.isArray(item.importantInfo) ? item.importantInfo : [];
  return {
    id: String(item.id ?? Math.random().toString(36).slice(2, 10)),
    offerCode: String(item.offerCode ?? "OFR-PENDENTE"),
    title: String(item.title ?? "Oferta"),
    subtitle: String(item.subtitle ?? ""),
    shortLabel: String(item.shortDescription ?? item.subtitle ?? ""),
    description: String(item.description ?? ""),
    image: String(item.image ?? ""),
    partnerName: String(item.partnerName ?? "Parceiro FG EXACTA"),
    partnerLocation: String(item.partnerLocation ?? "Atendimento nacional"),
    category: String(item.category ?? "Clubão"),
    discountLabel: String(item.discountLabel ?? "Benefício exclusivo"),
    originalPrice: typeof item.originalPrice === "string" && item.originalPrice ? item.originalPrice : undefined,
    discountedPrice: typeof item.discountedPrice === "string" && item.discountedPrice ? item.discountedPrice : undefined,
    startAt: parseSafeDate(startAtRaw, Date.parse(defaults.startAt)).toISOString(),
    endAt: parseSafeDate(endAtRaw, Date.parse(defaults.endAt)).toISOString(),
    validityLabel: String(item.validityLabel ?? "Conferir regulamento"),
    redemptionLimit: typeof item.redemptionLimit === "number" ? item.redemptionLimit : 9999,
    redeemedCount: typeof item.redeemedCount === "number" ? item.redeemedCount : 0,
    singleUsePerUser: Boolean(item.singleUsePerUser),
    rules: rulesSafe.map((rule) => String(rule)),
    conditions: conditionsSafe.map((condition) => String(condition)),
    importantInfo: importantSafe.map((info) => String(info))
  };
}

function withFallback(base: SectionConfig, partial: Partial<SectionConfig>): SectionConfig {
  return {
    ...base,
    ...partial
  };
}

export async function getPublishedProducts() {
  const db = await getPlatformDb();
  return Array.isArray(db.products) ? db.products.filter((product) => isContentVisible(product)) : [];
}

export async function getPublishedProductBySlug(slug: string) {
  const products = await getPublishedProducts();
  return products.find((product) => product.slug === slug);
}

export async function getRelatedPublishedProducts(slug: string) {
  const products = await getPublishedProducts();
  return products.filter((product) => product.slug !== slug).slice(0, 3);
}

export async function getPublishedCompanies() {
  const db = await getPlatformDb();
  return Array.isArray(db.companies) ? db.companies.filter((company) => isContentVisible(company)) : [];
}

export async function getPublishedCompanyBySlug(slug: string) {
  const companies = await getPublishedCompanies();
  return companies.find((company) => company.slug === slug);
}

export async function getRelatedPublishedCompanies(slug: string) {
  const companies = await getPublishedCompanies();
  return companies.filter((company) => company.slug !== slug).slice(0, 3);
}

export async function getPublishedCampaigns() {
  const db = await getPlatformDb();
  return Array.isArray(db.campaigns) ? db.campaigns.filter((campaign) => isContentVisible(campaign)) : [];
}

export async function getPublishedCampaignBySlug(slug: string) {
  const campaigns = await getPublishedCampaigns();
  return campaigns.find((campaign) => campaign.slug === slug);
}

export async function getRelatedPublishedCampaigns(slug: string) {
  const campaigns = await getPublishedCampaigns();
  return campaigns.filter((campaign) => campaign.slug !== slug).slice(0, 3);
}

export async function buildUserDashboardSections() {
  const db = await getPlatformDb();
  const products = Array.isArray(db.products) ? db.products.filter((item) => isContentVisible(item)) : [];
  const mentorships = Array.isArray(db.mentorships) ? db.mentorships.filter((item) => isContentVisible(item)) : [];
  const lives = Array.isArray(db.lives) ? db.lives.filter((item) => isContentVisible(item)) : [];
  const companies = Array.isArray(db.companies) ? db.companies.filter((item) => isContentVisible(item)) : [];
  const supplierLists = Array.isArray(db.supplierLists) ? db.supplierLists.filter((item) => isContentVisible(item)) : [];
  const services = Array.isArray(db.referralServices) ? db.referralServices.filter((item) => isContentVisible(item)) : [];
  const opportunities = Array.isArray(db.opportunities) ? db.opportunities.filter((item) => isContentVisible(item)) : [];
  const campaigns = Array.isArray(db.campaigns) ? db.campaigns.filter((item) => isContentVisible(item)) : [];
  const spinWheels = Array.isArray(db.spinWheels) ? db.spinWheels.filter((item) => isContentVisible(item)) : [];
  const sweepstakes = Array.isArray(db.sweepstakes) ? db.sweepstakes.filter((item) => isContentVisible(item)) : [];
  const offers = Array.isArray(db.clubOffers) ? db.clubOffers.filter((item) => isContentVisible(item)).map(toClubOfferClientCard) : [];

  const homeHighlights = [
    ...products.slice(0, 1).map(toProductCard),
    ...mentorships.slice(0, 1).map(toMentorshipCard),
    ...lives.slice(0, 1).map(toLiveCard)
  ];

  // #region debug-point B:build-sections-wrap
  try {
    const dbUsersSafe = Array.isArray(db.users) ? db.users : [];
    const dbReferralsSafe = Array.isArray(db.referrals) ? db.referrals : [];
    const dbCouponSafe = Array.isArray(db.couponRedemptions) ? db.couponRedemptions : [];
    const dbLivesSafe = Array.isArray(db.lives) ? db.lives : [];

    const result = {
      ...dashboardSections,
      home: withFallback(dashboardSections.home, {
        cards: homeHighlights,
        metrics: [
          { label: "Produtos publicados", value: `${products.length}`, detail: "Controlados pelo admin", tone: "blue" as const },
          { label: "Mentorias publicadas", value: `${mentorships.length}`, detail: "Trilhas ativas", tone: "green" as const },
          { label: "Lives disponíveis", value: `${lives.length}`, detail: "Agenda viva", tone: "orange" as const },
          { label: "Ofertas ativas", value: `${offers.length}`, detail: "Clubão publicado", tone: "violet" as const }
        ]
      }),
      lives: withFallback(dashboardSections.lives, {
        cards: lives.map(toLiveCard),
        metrics: [
          { label: "Lives publicadas", value: `${lives.length}`, detail: "Vindas do Admin Master", tone: "blue" as const },
          { label: "Agendadas", value: `${dbLivesSafe.filter((item) => item.status === "AGENDADO").length}`, detail: "Próximas transmissões", tone: "orange" as const },
          { label: "Com gravação", value: `${dbLivesSafe.filter((item) => item.recordingUrl).length}`, detail: "Acervo ativo", tone: "green" as const },
          { label: "Destaques", value: `${dbLivesSafe.filter((item) => item.featured).length}`, detail: "Em evidência", tone: "violet" as const }
        ],
        feed: lives.slice(0, 4).map((item) => ({
          title: `${item.scheduledDate} • ${item.scheduledTime}`,
          detail: item.title,
          meta: item.presenterName
        }))
      }),
      produtos: withFallback(dashboardSections.produtos, {
        filters: Array.from(new Set(["Todos", ...products.map((item) => item.category), "Premium", "Em alta"])),
        cards: products.slice(0, 5).map(toProductCard),
        metrics: [
          { label: "Produtos publicados", value: `${products.length}`, detail: "Admin fonte de verdade", tone: "blue" as const },
          { label: "Destaques", value: `${products.filter((item) => item.featured).length}`, detail: "Em promoção", tone: "green" as const },
          { label: "Categorias", value: `${new Set(products.map((item) => item.category)).size}`, detail: "Mix atual", tone: "orange" as const },
          { label: "Comissão média", value: "20%", detail: "Faixa comercial", tone: "violet" as const }
        ]
      }),
      mentorias: withFallback(dashboardSections.mentorias, {
        cards: mentorships.map(toMentorshipCard),
        filters: Array.from(new Set(["Todas", ...mentorships.map((item) => item.category)])),
        metrics: [
          { label: "Mentorias publicadas", value: `${mentorships.length}`, detail: "Vindas do admin", tone: "blue" as const },
          { label: "Módulos totais", value: `${mentorships.reduce((total, item) => total + (Array.isArray(item.modules) ? item.modules.length : 0), 0)}`, detail: "Estrutura criada", tone: "green" as const },
          { label: "Aulas totais", value: `${mentorships.reduce((total, item) => total + (Array.isArray(item.modules) ? item.modules.reduce((sum, moduleItem) => sum + (Array.isArray(moduleItem.lessons) ? moduleItem.lessons.length : 0), 0) : 0), 0)}`, detail: "Conteúdo publicado", tone: "orange" as const },
          { label: "Destaques", value: `${mentorships.filter((item) => item.featured).length}`, detail: "Em evidência", tone: "violet" as const }
        ]
      }),
      empresas: withFallback(dashboardSections.empresas, {
        cards: companies.map(toCompanyCard),
        metrics: [
          { label: "Empresas publicadas", value: `${companies.length}`, detail: "Diretório ativo", tone: "blue" as const },
          { label: "Com ofertas", value: `${companies.filter((item) => (Array.isArray(item.linkedOfferIds) ? item.linkedOfferIds.length : 0) > 0).length}`, detail: "Clubão conectado", tone: "green" as const },
          { label: "Com serviços", value: `${companies.filter((item) => (Array.isArray(item.linkedServiceIds) ? item.linkedServiceIds.length : 0) > 0).length}`, detail: "Indicações ligadas", tone: "orange" as const },
          { label: "Destaques", value: `${companies.filter((item) => item.featured).length}`, detail: "Empresas em foco", tone: "violet" as const }
        ]
      }),
      listas: withFallback(dashboardSections.listas, {
        cards: supplierLists.map(toSupplierListCard),
        metrics: [
          { label: "Listas publicadas", value: `${supplierLists.length}`, detail: "Curadoria ativa", tone: "blue" as const },
          { label: "Fornecedores", value: `${supplierLists.reduce((total, item) => total + (Array.isArray(item.suppliers) ? item.suppliers.length : 0), 0)}`, detail: "Base organizada", tone: "green" as const },
          { label: "Categorias", value: `${new Set(supplierLists.map((item) => item.category)).size}`, detail: "Segmentos", tone: "orange" as const },
          { label: "Atualizadas", value: "Hoje", detail: "Fonte administrativa", tone: "violet" as const }
        ]
      }),
      indicacoes: withFallback(dashboardSections.indicacoes, {
        cards: services.map(toReferralServiceCard),
        metrics: [
          { label: "Serviços publicados", value: `${services.length}`, detail: "Disponíveis para indicar", tone: "blue" as const },
          { label: "Indicações registradas", value: `${dbReferralsSafe.length}`, detail: "Histórico ativo", tone: "green" as const },
          { label: "Convertidas", value: `${dbReferralsSafe.filter((item) => item.status === "CONVERTIDA").length}`, detail: "Com resultado", tone: "orange" as const },
          { label: "Premiadas", value: `${dbReferralsSafe.filter((item) => item.status === "PREMIADA").length}`, detail: "Com benefício", tone: "violet" as const }
        ]
      }),
      oportunidades: withFallback(dashboardSections.oportunidades, {
        cards: opportunities.map(toOpportunityCard),
        metrics: [
          { label: "Oportunidades ativas", value: `${opportunities.length}`, detail: "Publicadas", tone: "blue" as const },
          { label: "Empresas ligadas", value: `${new Set(opportunities.map((item) => item.companyId)).size}`, detail: "Origens", tone: "green" as const },
          { label: "Destaques", value: `${opportunities.filter((item) => item.featured).length}`, detail: "Em foco", tone: "orange" as const },
          { label: "Novas esta semana", value: "03", detail: "Movimento recente", tone: "violet" as const }
        ]
      }),
      campanhas: withFallback(dashboardSections.campanhas, {
        cards: campaigns.map(toCampaignCard),
        metrics: [
          { label: "Campanhas ativas", value: `${campaigns.length}`, detail: "Publicadas pelo admin", tone: "blue" as const },
          { label: "Participantes", value: `${campaigns.reduce((total, item) => total + (typeof item.participantCount === "number" ? item.participantCount : 0), 0)}`, detail: "Base envolvida", tone: "green" as const },
          { label: "Produtos relacionados", value: `${new Set(campaigns.flatMap((item) => (Array.isArray(item.relatedProductIds) ? item.relatedProductIds : []))).size}`, detail: "Mix conectado", tone: "orange" as const },
          { label: "Materiais", value: `${campaigns.reduce((total, item) => total + (Array.isArray(item.materials) ? item.materials.length : 0), 0)}`, detail: "Assets disponíveis", tone: "violet" as const }
        ]
      }),
      "giro-da-sorte": withFallback(dashboardSections["giro-da-sorte"], {
        cards: spinWheels.map(toSpinWheelCard),
        metrics: [
          { label: "Roletas publicadas", value: `${spinWheels.length}`, detail: "Vindas do Admin Master", tone: "blue" as const },
          { label: "Giros disponíveis", value: `${spinWheels.reduce((total, item) => total + (typeof item.availableSpins === "number" ? item.availableSpins : 0), 0)}`, detail: "Liberados", tone: "green" as const },
          { label: "Prêmios ganhos", value: `${spinWheels.reduce((total, item) => total + (typeof item.totalPrizesWon === "number" ? item.totalPrizesWon : 0), 0)}`, detail: "Histórico registrado", tone: "orange" as const },
          { label: "Tipos ativos", value: `${new Set(spinWheels.map((item) => item.wheelType)).size}`, detail: "Formatos de roleta", tone: "violet" as const }
        ],
        feed: spinWheels.slice(0, 4).map((item) => ({
          title: item.title,
          detail: item.nextSpinLabel,
          meta: item.campaignLabel
        }))
      }),
      sorteios: withFallback(dashboardSections.sorteios, {
        cards: sweepstakes.map(toSweepstakeCard),
        metrics: [
          { label: "Sorteios publicados", value: `${sweepstakes.length}`, detail: "Eventos ativos", tone: "orange" as const },
          { label: "Participantes", value: `${sweepstakes.reduce((total, item) => total + (typeof item.participantCount === "number" ? item.participantCount : 0), 0)}`, detail: "Base engajada", tone: "blue" as const },
          { label: "Prêmios em agenda", value: `${sweepstakes.filter((item) => item.status === "AGENDADO").length}`, detail: "Próximos eventos", tone: "violet" as const },
          { label: "Com ganhador", value: `${sweepstakes.filter((item) => item.winnerUserId).length}`, detail: "Histórico registrado", tone: "green" as const }
        ],
        feed: sweepstakes.slice(0, 4).map((item) => ({
          title: item.title,
          detail: item.prizeLabel,
          meta: `${item.scheduledDate} • ${item.scheduledTime}`
        }))
      }),
      ranking: withFallback(dashboardSections.ranking, {
        metrics: [
          { label: "Top usuário", value: dbUsersSafe[0]?.fullName ?? "FG EXACTA", detail: "Liderança atual", tone: "green" as const },
          { label: "Pontos totais", value: `${dbUsersSafe.reduce((total, item) => total + (typeof item.points === "number" ? item.points : 0), 0)}`, detail: "Base ranqueada", tone: "blue" as const },
          { label: "Conversões", value: `${dbReferralsSafe.filter((item) => item.status === "CONVERTIDA").length}`, detail: "Peso no ranking", tone: "orange" as const },
          { label: "Cupons", value: `${dbCouponSafe.length}`, detail: "Interações do ecossistema", tone: "violet" as const }
        ]
      }),
      desempenho: withFallback(dashboardSections.desempenho, {
        metrics: [
          { label: "Vendas", value: `${dbUsersSafe.reduce((total, item) => total + (typeof item.salesCount === "number" ? item.salesCount : 0), 0)}`, detail: "Base consolidada", tone: "blue" as const },
          { label: "Comissões", value: `R$ ${dbUsersSafe.reduce((total, item) => total + (typeof item.commissionTotal === "number" ? item.commissionTotal : 0), 0).toFixed(0)}`, detail: "Plataforma", tone: "green" as const },
          { label: "Indicações", value: `${dbReferralsSafe.length}`, detail: "Rastreamento ativo", tone: "violet" as const },
          { label: "Cupons", value: `${dbCouponSafe.length}`, detail: "Clubão e ofertas", tone: "orange" as const }
        ]
      })
    } satisfies Record<SectionKey, SectionConfig>;

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedClubOffers() {
  const db = await getPlatformDb();
  return Array.isArray(db.clubOffers) ? db.clubOffers.filter((item) => isContentVisible(item)) : [];
}

export async function getPlatformSnapshot() {
  return getPlatformDb();
}

export async function loadDashboardPayload() {
  const snapshot = await getPlatformDb();
  const sections = await buildUserDashboardSections();
  const publishedProducts = Array.isArray(snapshot.products)
    ? snapshot.products.filter((item) => isContentVisible(item))
    : [];

  return {
    sections,
    publishedProducts,
    snapshot
  };
}
export async function getPublishedSupplierListBySlug(slug: string): Promise<SupplierListRecord | null> {
  const db = await getPlatformSnapshot();
  if (!Array.isArray(db.supplierLists)) return null;
  const list = db.supplierLists.find((s) => s.slug === slug && isContentVisible(s));
  return list || null;
}
export async function getPublishedMentorships(): Promise<MentorshipRecord[]> {
  const db = await getPlatformDb();
  return Array.isArray(db.mentorships) ? db.mentorships.filter((item) => isContentVisible(item)) : [];
}

export async function getPublishedMentorshipBySlug(slug: string): Promise<MentorshipRecord | null> {
  const mentorships = await getPublishedMentorships();
  const decoded = decodeURIComponent(slug);
  return mentorships.find((item) => item.slug === decoded || item.slug === slug || item.id === decoded) ?? null;
}

export async function getPublishedLiveBySlug(slug: string): Promise<LiveRecord | null> {
  const db = await getPlatformSnapshot();
  if (!Array.isArray(db.lives)) return null;
  const decoded = decodeURIComponent(slug);
  const item = db.lives.find(
    (live) =>
      (live.slug === decoded || live.slug === slug || live.id === decoded) &&
      live.status !== "ARQUIVADO"
  );
  return item || null;
}
