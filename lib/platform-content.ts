import "server-only";

import { dashboardSections, type MediaCardData, type SectionConfig, type SectionKey } from "@/lib/dashboard-data";
import { getPlatformDb, isContentVisible } from "@/lib/platform-store";
// #region debug-point B:C:content-env
const __debugEnv = (() => {
  let u = "http://127.0.0.1:7777/event";
  let s = "vercel-server-crash";
  try {
    const content = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8");
    const mu = content.match(/DEBUG_SERVER_URL=(.+)/)?.[1];
    const ms = content.match(/DEBUG_SESSION_ID=(.+)/)?.[1];
    if (mu) u = mu;
    if (ms) s = ms;
  } catch {
  }
  return { u, s };
})();
const __debugEmit = (hypothesisId: string, location: string, msg: string, data: Record<string, unknown> = {}) => {
  try {
    void fetch(__debugEnv.u, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: __debugEnv.s,
        runId: "pre-fix",
        hypothesisId,
        location,
        msg: `[DEBUG] ${msg}`,
        data,
        ts: Date.now()
      })
    }).catch(() => undefined);
  } catch {
  }
};
// #endregion
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
  const lessonCount = mentorship.modules.reduce((total, moduleItem) => total + moduleItem.lessons.length, 0);

  return {
    eyebrow: mentorship.category,
    title: mentorship.title,
    subtitle: mentorship.shortDescription,
    meta: `${mentorship.duration} • ${mentorship.level}`,
    badge: mentorship.badge,
    accent: mentorship.accent,
    image: mentorship.coverImage,
    cta: "Ver mentoria",
    facts: mentorship.facts,
    chips: mentorship.chips,
    mentorName: mentorship.mentorName,
    mentorAvatar: mentorship.mentorAvatar,
    moduleCount: mentorship.modules.length,
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
    facts: live.facts,
    chips: live.chips
  };
}

function toCompanyCard(company: CompanyRecord): MediaCardData {
  return {
    eyebrow: `Categoria ${company.category}`,
    title: company.title,
    subtitle: company.shortDescription,
    meta: `${company.city} • ${company.type}`,
    badge: company.badge,
    accent: company.accent,
    image: company.logo,
    logo: company.logo,
    coverFit: "contain",
    cta: "Ver empresa",
    href: `/detalhes/empresas/${company.slug}`,
    ctaHref: `/detalhes/empresas/${company.slug}`,
    facts: company.facts,
    chips: company.chips
  };
}

function toSupplierListCard(item: SupplierListRecord): MediaCardData {
  return {
    eyebrow: `Lista ${item.category}`,
    title: item.title,
    subtitle: item.shortDescription,
    meta: `${item.suppliers.length} fornecedores • ${item.badge}`,
    badge: item.badge,
    accent: "blue",
    image: item.image,
    cta: "Abrir lista",
    facts: item.facts,
    chips: item.chips
  };
}

function toReferralServiceCard(service: ReferralServiceRecord): MediaCardData {
  return {
    eyebrow: service.category,
    title: service.title,
    subtitle: service.shortDescription,
    meta: `${service.valueLabel} • ${service.rewardLabel}`,
    badge: service.status,
    accent: "green",
    image: service.image,
    cta: "Ver serviço",
    facts: service.facts,
    chips: service.chips
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
    facts: ["Produtos vinculados", ...item.rules.slice(0, 2)],
    chips: ["Campanha", ...item.tags.slice(0, 2)]
  };
}

function toSweepstakeCard(item: SweepstakesRecord): MediaCardData {
  return {
    eyebrow: item.sweepstakeType,
    title: item.title,
    subtitle: item.prizeLabel,
    meta: `${item.participantCount} participantes • ${item.scheduledDate}`,
    badge: item.status,
    accent: item.featured ? "orange" : "blue",
    image: item.image,
    cta: "Ver sorteio",
    facts: [`Horário ${item.scheduledTime}`, ...item.criteria.slice(0, 2)],
    chips: item.tags
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
  return db.products.filter((product) => isContentVisible(product));
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
  return db.companies.filter((company) => isContentVisible(company));
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
  return db.campaigns.filter((campaign) => isContentVisible(campaign));
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
  // #region debug-point B:C:build-sections-enter
  __debugEmit("B", "platform-content.ts:buildUserDashboardSections:enter", "buildUserDashboardSections enter", {});
  // #endregion
  const db = await getPlatformDb();
  // #region debug-point C:collection-shapes
  __debugEmit("C", "platform-content.ts:buildUserDashboardSections:collections", "collections shape check", {
    productsIsArray: Array.isArray(db.products),
    mentorshipsIsArray: Array.isArray(db.mentorships),
    livesIsArray: Array.isArray(db.lives),
    companiesIsArray: Array.isArray(db.companies),
    supplierListsIsArray: Array.isArray(db.supplierLists),
    servicesIsArray: Array.isArray(db.referralServices),
    opportunitiesIsArray: Array.isArray(db.opportunities),
    campaignsIsArray: Array.isArray(db.campaigns),
    sweepstakesIsArray: Array.isArray(db.sweepstakes),
    clubOffersIsArray: Array.isArray(db.clubOffers),
    referralsIsArray: Array.isArray(db.referrals),
    usersIsArray: Array.isArray(db.users),
    couponRedemptionsIsArray: Array.isArray(db.couponRedemptions),
    auditIsArray: Array.isArray(db.auditLog)
  });
  // #endregion
  const products = Array.isArray(db.products) ? db.products.filter((item) => isContentVisible(item)) : [];
  const mentorships = Array.isArray(db.mentorships) ? db.mentorships.filter((item) => isContentVisible(item)) : [];
  const lives = Array.isArray(db.lives) ? db.lives.filter((item) => isContentVisible(item)) : [];
  const companies = Array.isArray(db.companies) ? db.companies.filter((item) => isContentVisible(item)) : [];
  const supplierLists = Array.isArray(db.supplierLists) ? db.supplierLists.filter((item) => isContentVisible(item)) : [];
  const services = Array.isArray(db.referralServices) ? db.referralServices.filter((item) => isContentVisible(item)) : [];
  const opportunities = Array.isArray(db.opportunities) ? db.opportunities.filter((item) => isContentVisible(item)) : [];
  const campaigns = Array.isArray(db.campaigns) ? db.campaigns.filter((item) => isContentVisible(item)) : [];
  const sweepstakes = Array.isArray(db.sweepstakes) ? db.sweepstakes.filter((item) => isContentVisible(item)) : [];
  const offers = Array.isArray(db.clubOffers) ? db.clubOffers.filter((item) => isContentVisible(item)) : [];

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

    // #region debug-point B:build-sections-success
    __debugEmit("B", "platform-content.ts:buildUserDashboardSections:success", "buildUserDashboardSections success", {
      sectionKeys: Object.keys(result),
      homeCards: Array.isArray(result.home.cards) ? result.home.cards.length : -1,
      homeMetrics: Array.isArray(result.home.metrics) ? result.home.metrics.length : -1
    });
    // #endregion
    return result;
  } catch (error) {
    __debugEmit("C", "platform-content.ts:buildUserDashboardSections:error", "buildUserDashboardSections error", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
  // #endregion
}

export async function getPublishedClubOffers() {
  const db = await getPlatformDb();
  return db.clubOffers.filter((item) => isContentVisible(item));
}

export async function getPlatformSnapshot() {
  return getPlatformDb();
}
