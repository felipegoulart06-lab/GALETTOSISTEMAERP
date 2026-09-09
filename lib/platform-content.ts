import "server-only";

import { dashboardSections, type MediaCardData, type SectionConfig, type SectionKey } from "@/lib/dashboard-data";
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
    cta: "Ver campanha",
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

export async function buildUserDashboardSections() {
  const db = await getPlatformDb();
  const products = db.products.filter((item) => isContentVisible(item));
  const mentorships = db.mentorships.filter((item) => isContentVisible(item));
  const lives = db.lives.filter((item) => isContentVisible(item));
  const companies = db.companies.filter((item) => isContentVisible(item));
  const supplierLists = db.supplierLists.filter((item) => isContentVisible(item));
  const services = db.referralServices.filter((item) => isContentVisible(item));
  const opportunities = db.opportunities.filter((item) => isContentVisible(item));
  const campaigns = db.campaigns.filter((item) => isContentVisible(item));
  const sweepstakes = db.sweepstakes.filter((item) => isContentVisible(item));
  const offers = db.clubOffers.filter((item) => isContentVisible(item));

  const homeHighlights = [
    ...products.slice(0, 1).map(toProductCard),
    ...mentorships.slice(0, 1).map(toMentorshipCard),
    ...lives.slice(0, 1).map(toLiveCard)
  ];

  return {
    ...dashboardSections,
    home: withFallback(dashboardSections.home, {
      cards: homeHighlights,
      metrics: [
        { label: "Produtos publicados", value: `${products.length}`, detail: "Controlados pelo admin", tone: "blue" },
        { label: "Mentorias publicadas", value: `${mentorships.length}`, detail: "Trilhas ativas", tone: "green" },
        { label: "Lives disponíveis", value: `${lives.length}`, detail: "Agenda viva", tone: "orange" },
        { label: "Ofertas ativas", value: `${offers.length}`, detail: "Clubão publicado", tone: "violet" }
      ]
    }),
    lives: withFallback(dashboardSections.lives, {
      cards: lives.map(toLiveCard),
      metrics: [
        { label: "Lives publicadas", value: `${lives.length}`, detail: "Vindas do Admin Master", tone: "blue" },
        { label: "Agendadas", value: `${db.lives.filter((item) => item.status === "AGENDADO").length}`, detail: "Próximas transmissões", tone: "orange" },
        { label: "Com gravação", value: `${db.lives.filter((item) => item.recordingUrl).length}`, detail: "Acervo ativo", tone: "green" },
        { label: "Destaques", value: `${db.lives.filter((item) => item.featured).length}`, detail: "Em evidência", tone: "violet" }
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
        { label: "Produtos publicados", value: `${products.length}`, detail: "Admin fonte de verdade", tone: "blue" },
        { label: "Destaques", value: `${products.filter((item) => item.featured).length}`, detail: "Em promoção", tone: "green" },
        { label: "Categorias", value: `${new Set(products.map((item) => item.category)).size}`, detail: "Mix atual", tone: "orange" },
        { label: "Comissão média", value: "20%", detail: "Faixa comercial", tone: "violet" }
      ]
    }),
    mentorias: withFallback(dashboardSections.mentorias, {
      cards: mentorships.map(toMentorshipCard),
      filters: Array.from(new Set(["Todas", ...mentorships.map((item) => item.category)])),
      metrics: [
        { label: "Mentorias publicadas", value: `${mentorships.length}`, detail: "Vindas do admin", tone: "blue" },
        { label: "Módulos totais", value: `${mentorships.reduce((total, item) => total + item.modules.length, 0)}`, detail: "Estrutura criada", tone: "green" },
        { label: "Aulas totais", value: `${mentorships.reduce((total, item) => total + item.modules.reduce((sum, moduleItem) => sum + moduleItem.lessons.length, 0), 0)}`, detail: "Conteúdo publicado", tone: "orange" },
        { label: "Destaques", value: `${mentorships.filter((item) => item.featured).length}`, detail: "Em evidência", tone: "violet" }
      ]
    }),
    empresas: withFallback(dashboardSections.empresas, {
      cards: companies.map(toCompanyCard),
      metrics: [
        { label: "Empresas publicadas", value: `${companies.length}`, detail: "Diretório ativo", tone: "blue" },
        { label: "Com ofertas", value: `${companies.filter((item) => item.linkedOfferIds.length > 0).length}`, detail: "Clubão conectado", tone: "green" },
        { label: "Com serviços", value: `${companies.filter((item) => item.linkedServiceIds.length > 0).length}`, detail: "Indicações ligadas", tone: "orange" },
        { label: "Destaques", value: `${companies.filter((item) => item.featured).length}`, detail: "Empresas em foco", tone: "violet" }
      ]
    }),
    listas: withFallback(dashboardSections.listas, {
      cards: supplierLists.map(toSupplierListCard),
      metrics: [
        { label: "Listas publicadas", value: `${supplierLists.length}`, detail: "Curadoria ativa", tone: "blue" },
        { label: "Fornecedores", value: `${supplierLists.reduce((total, item) => total + item.suppliers.length, 0)}`, detail: "Base organizada", tone: "green" },
        { label: "Categorias", value: `${new Set(supplierLists.map((item) => item.category)).size}`, detail: "Segmentos", tone: "orange" },
        { label: "Atualizadas", value: "Hoje", detail: "Fonte administrativa", tone: "violet" }
      ]
    }),
    indicacoes: withFallback(dashboardSections.indicacoes, {
      cards: services.map(toReferralServiceCard),
      metrics: [
        { label: "Serviços publicados", value: `${services.length}`, detail: "Disponíveis para indicar", tone: "blue" },
        { label: "Indicações registradas", value: `${db.referrals.length}`, detail: "Histórico ativo", tone: "green" },
        { label: "Convertidas", value: `${db.referrals.filter((item) => item.status === "CONVERTIDA").length}`, detail: "Com resultado", tone: "orange" },
        { label: "Premiadas", value: `${db.referrals.filter((item) => item.status === "PREMIADA").length}`, detail: "Com benefício", tone: "violet" }
      ]
    }),
    oportunidades: withFallback(dashboardSections.oportunidades, {
      cards: opportunities.map(toOpportunityCard),
      metrics: [
        { label: "Oportunidades ativas", value: `${opportunities.length}`, detail: "Publicadas", tone: "blue" },
        { label: "Empresas ligadas", value: `${new Set(opportunities.map((item) => item.companyId)).size}`, detail: "Origens", tone: "green" },
        { label: "Destaques", value: `${opportunities.filter((item) => item.featured).length}`, detail: "Em foco", tone: "orange" },
        { label: "Novas esta semana", value: "03", detail: "Movimento recente", tone: "violet" }
      ]
    }),
    campanhas: withFallback(dashboardSections.campanhas, {
      cards: campaigns.map(toCampaignCard),
      metrics: [
        { label: "Campanhas ativas", value: `${campaigns.length}`, detail: "Publicadas pelo admin", tone: "blue" },
        { label: "Participantes", value: `${campaigns.reduce((total, item) => total + item.participantCount, 0)}`, detail: "Base envolvida", tone: "green" },
        { label: "Produtos relacionados", value: `${new Set(campaigns.flatMap((item) => item.relatedProductIds)).size}`, detail: "Mix conectado", tone: "orange" },
        { label: "Materiais", value: `${campaigns.reduce((total, item) => total + item.materials.length, 0)}`, detail: "Assets disponíveis", tone: "violet" }
      ]
    }),
    sorteios: withFallback(dashboardSections.sorteios, {
      cards: sweepstakes.map(toSweepstakeCard),
      metrics: [
        { label: "Sorteios publicados", value: `${sweepstakes.length}`, detail: "Eventos ativos", tone: "orange" },
        { label: "Participantes", value: `${sweepstakes.reduce((total, item) => total + item.participantCount, 0)}`, detail: "Base engajada", tone: "blue" },
        { label: "Prêmios em agenda", value: `${sweepstakes.filter((item) => item.status === "AGENDADO").length}`, detail: "Próximos eventos", tone: "violet" },
        { label: "Com ganhador", value: `${sweepstakes.filter((item) => item.winnerUserId).length}`, detail: "Histórico registrado", tone: "green" }
      ],
      feed: sweepstakes.slice(0, 4).map((item) => ({
        title: item.title,
        detail: item.prizeLabel,
        meta: `${item.scheduledDate} • ${item.scheduledTime}`
      }))
    }),
    ranking: withFallback(dashboardSections.ranking, {
      metrics: [
        { label: "Top usuário", value: db.users[0]?.fullName ?? "FG EXACTA", detail: "Liderança atual", tone: "green" },
        { label: "Pontos totais", value: `${db.users.reduce((total, item) => total + item.points, 0)}`, detail: "Base ranqueada", tone: "blue" },
        { label: "Conversões", value: `${db.referrals.filter((item) => item.status === "CONVERTIDA").length}`, detail: "Peso no ranking", tone: "orange" },
        { label: "Cupons", value: `${db.couponRedemptions.length}`, detail: "Interações do ecossistema", tone: "violet" }
      ]
    }),
    desempenho: withFallback(dashboardSections.desempenho, {
      metrics: [
        { label: "Vendas", value: `${db.users.reduce((total, item) => total + item.salesCount, 0)}`, detail: "Base consolidada", tone: "blue" },
        { label: "Comissões", value: `R$ ${db.users.reduce((total, item) => total + item.commissionTotal, 0).toFixed(0)}`, detail: "Plataforma", tone: "green" },
        { label: "Indicações", value: `${db.referrals.length}`, detail: "Rastreamento ativo", tone: "violet" },
        { label: "Cupons", value: `${db.couponRedemptions.length}`, detail: "Clubão e ofertas", tone: "orange" }
      ]
    })
  } satisfies Record<SectionKey, SectionConfig>;
}

export async function getPublishedClubOffers() {
  const db = await getPlatformDb();
  return db.clubOffers.filter((item) => isContentVisible(item));
}

export async function getPlatformSnapshot() {
  return getPlatformDb();
}
