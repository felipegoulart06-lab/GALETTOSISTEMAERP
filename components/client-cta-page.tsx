import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { MentorshipCatalogPage } from "@/components/mentorship-catalog-page";
import { clientCtaPages } from "@/lib/client-cta-data";
import { dashboardSections, type SectionKey } from "@/lib/dashboard-data";
import { productCatalog } from "@/lib/product-catalog";
import { companyCatalog } from "@/lib/company-catalog";
import { getPublishedMentorships } from "@/lib/platform-content";
import type { MentorshipRecord } from "@/lib/platform-types";

function CtaMetricStrip({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];

  return (
    <section className="cta-metrics-grid">
      {page.metrics.map((metric) => (
        <article key={metric.label} className={`cta-metric-card tone-${metric.tone}`}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <small>{metric.detail}</small>
        </article>
      ))}
    </section>
  );
}

function VisualCard({
  title,
  subtitle,
  meta,
  badge,
  image,
  href,
  ctaLabel,
  fitContain = false,
  actionClassName
}: {
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  image: string;
  href?: string;
  ctaLabel?: string;
  fitContain?: boolean;
  actionClassName?: string;
}) {
  const mediaClassName = `managed-media-fill${fitContain ? " managed-media-fit-contain" : ""}`;

  return (
    <article className="cta-visual-card">
      {href ? (
        <Link href={href} className="cta-visual-media-link" aria-label={`Abrir ${title}`}>
          <ManagedMedia alt={title} sizeLabel="1200 x 900" src={image} className={mediaClassName} />
        </Link>
      ) : (
        <ManagedMedia alt={title} sizeLabel="1200 x 900" src={image} className={mediaClassName} />
      )}
      <div className="cta-visual-copy">
        <span>{badge}</span>
        {href ? (
          <strong>
            <Link href={href} className="cta-visual-title-link">
              {title}
            </Link>
          </strong>
        ) : (
          <strong>{title}</strong>
        )}
        <p>{subtitle}</p>
        <small>{meta}</small>
        {href ? (
          <Link href={href} className={`cta-visual-action${actionClassName ? ` ${actionClassName}` : ""}`}>
            {ctaLabel ?? "Ver detalhes"}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function SideNotes({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];

  return (
    <aside className="cta-side-panel">
      <div className="cta-side-head">
        <p>Estrutura da experiência</p>
        <h3>O que não pode faltar</h3>
      </div>
      <ul className="cta-note-list">
        {page.secondaryItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={sectionKey === "home" ? "/" : `/${sectionKey}`} className="hero-link-button">
        Voltar para {dashboardSections[sectionKey].label}
      </Link>
    </aside>
  );
}

function HomeDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-hero cta-hero-home">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          <div className="cta-chip-row">
            <span>Produtos</span>
            <span>Lives</span>
            <span>Missões</span>
            <span>Campanhas</span>
          </div>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-layout-home">
        <div className="cta-hero-card-large">
          <VisualCard {...page.primaryCards[0]} />
        </div>
        <div className="cta-mini-stack">
          {page.primaryCards.slice(1).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function LivesDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-live-stage">
        <ManagedMedia alt={page.title} sizeLabel="1600 x 900" className="managed-media-fill" tone="dark" />
        <div className="cta-live-overlay">
          <div>
            <span>{page.eyebrow}</span>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
          </div>
          <div className="cta-product-sidecard">
            <VisualCard {...page.primaryCards[0]} />
          </div>
        </div>
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-layout-lives">
        <div className="cta-schedule-rail">
          {page.primaryCards.slice(1).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function ProdutosDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-hero">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-layout-products">
        <aside className="cta-filter-panel">
          <p>Por que estes produtos?</p>
          <h3>Recomendados para o seu momento</h3>
          <div className="cta-chip-column">
            <span>Boa conversão</span>
            <span>Visual forte</span>
            <span>Comissão clara</span>
            <span>Encaixe com tecnologia</span>
          </div>
          <ul className="cta-note-list">
            <li>O detalhe individual mostra preço, comissão, público e contexto de venda.</li>
            <li>O link de afiliação só aparece dentro da página do produto.</li>
            <li>Qualquer produto desta grade leva para uma página própria de detalhe.</li>
          </ul>
        </aside>
        <div className="cta-visual-grid">
          {productCatalog.map((product) => (
            <VisualCard
              key={product.slug}
              title={product.title}
              subtitle={product.summary}
              meta={`Preço ${product.price} • comissão ${product.commissionRate}`}
              badge={product.badge}
              image={product.image}
              href={`/detalhes/produtos/${product.slug}`}
              ctaLabel="Ver detalhes do produto"
              fitContain
            />
          ))}
        </div>
      </section>
    </>
  );
}

function MentoriasDetail({
  mentorships,
  selectedFilter
}: {
  mentorships: MentorshipRecord[];
  selectedFilter?: string;
}) {
  return <MentorshipCatalogPage mentorships={mentorships} selectedFilter={selectedFilter} />;
}

function MosaicDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-hero">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-mosaic-layout">
        <div className="cta-mosaic-main">
          <VisualCard {...page.primaryCards[0]} />
        </div>
        <div className="cta-mosaic-side">
          {page.primaryCards.slice(1).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function DirectoryDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-search-hero">
        <div className="cta-search-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          <div className="cta-search-box">Buscar empresa, serviço ou categoria</div>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" src={dashboardSections.empresas.heroImage} className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-visual-grid cta-visual-grid-wide">
        {companyCatalog.map((company) => (
          <VisualCard
            key={company.slug}
            title={company.name}
            subtitle={company.summary}
            meta={`${company.city} • ${company.type}`}
            badge={company.category}
            image={company.logo}
            href={`/detalhes/empresas/${company.slug}`}
            ctaLabel="Ver empresa"
            actionClassName="company-visual-action"
          />
        ))}
      </section>
      <SideNotes sectionKey={sectionKey} />
    </>
  );
}

function SupplierListsDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-search-hero">
        <div className="cta-search-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          <div className="cta-search-box">Buscar contato, região ou categoria atacadista</div>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-visual-grid cta-visual-grid-wide">
        {page.primaryCards.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </section>
      <SideNotes sectionKey={sectionKey} />
    </>
  );
}

function FlowDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-flow-hero">
        <div>
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-flow-layout">
        <div className="cta-flow-steps">
          <div className="cta-flow-step">1. Escolha a oportunidade</div>
          <div className="cta-flow-step">2. Compartilhe ou cadastre</div>
          <div className="cta-flow-step">3. Acompanhe o status</div>
          <div className="cta-flow-step">4. Veja a comissão entrar</div>
        </div>
        <div className="cta-visual-grid">
          {page.primaryCards.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function BoardDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-hero cta-hero-board">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-board-grid">
        {page.primaryCards.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </section>
      <SideNotes sectionKey={sectionKey} />
    </>
  );
}

function RendaDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  const ledgerRows = [
    { origin: "Fone Bluetooth", type: "Produto", amount: "R$ 25,98", when: "08/09/2026", status: "Aprovado" },
    { origin: "Indicação de serviço", type: "Rede", amount: "R$ 30,00", when: "08/09/2026", status: "Em validação" },
    { origin: "Desafio de vendas da temporada", type: "Campanha", amount: "R$ 180,00", when: "07/09/2026", status: "Disponível" },
    { origin: "Mentoria premium indicada", type: "Produto", amount: "R$ 92,00", when: "06/09/2026", status: "Processando" },
    { origin: "Bônus por meta semanal", type: "Campanha", amount: "R$ 240,00", when: "05/09/2026", status: "Pago" }
  ];
  const releaseStages = [
    {
      label: "Pendente",
      title: "Aguardando confirmação de origem",
      detail: "Entradas que ainda dependem de lead validado, venda confirmada ou fechamento da campanha."
    },
    {
      label: "Disponível",
      title: "Pronto para próxima janela de liberação",
      detail: "Valores já reconhecidos pelo sistema e preparados para entrar no próximo ciclo."
    },
    {
      label: "Pago",
      title: "Histórico preservado e auditável",
      detail: "Tudo que já foi concluído continua legível para conferência, prova e acompanhamento."
    }
  ];
  const sourceSummary = [
    { label: "Produtos", value: "48%", detail: "Maior motor de comissão no período", tone: "blue" },
    { label: "Indicações", value: "31%", detail: "Leads e serviços com validação ativa", tone: "green" },
    { label: "Campanhas", value: "14%", detail: "Bônus e aceleração de metas", tone: "orange" },
    { label: "Missões", value: "7%", detail: "Complemento gamificado do ciclo", tone: "violet" }
  ];
  const monthlyFlow = [
    { month: "Jun", total: "R$ 3,2k", width: "38%" },
    { month: "Jul", total: "R$ 4,8k", width: "56%" },
    { month: "Ago", total: "R$ 6,1k", width: "72%" },
    { month: "Set", total: "R$ 4,3k", width: "51%" }
  ];

  return (
    <>
      <section className="cta-hero cta-hero-finance cta-renda-hero">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          <div className="cta-chip-row">
            <span>Origem clara</span>
            <span>Status visível</span>
            <span>Histórico auditável</span>
            <span>Leitura sem cara de banco</span>
          </div>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" src={page.heroImage} className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-renda-layout">
        <div className="cta-renda-main">
          <section className="cta-renda-summary">
            <article className="cta-renda-balance-card">
              <span>Visão do ciclo</span>
              <strong>Você já gerou R$ 18.420</strong>
              <p>Leitura executiva da sua renda com origem, estágio e histórico detalhado por transação.</p>
              <div className="cta-renda-balance-strip">
                <div>
                  <small>Liberado</small>
                  <strong>R$ 2.840</strong>
                </div>
                <div>
                  <small>Em validação</small>
                  <strong>R$ 1.260</strong>
                </div>
                <div>
                  <small>Próxima janela</small>
                  <strong>12 Set</strong>
                </div>
              </div>
            </article>
            <div className="cta-renda-status-grid">
              {sourceSummary.map((item) => (
                <article key={item.label} className={`cta-renda-status-card tone-${item.tone}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.detail}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="cta-source-strip">
            {page.primaryCards.map((item) => (
              <VisualCard key={item.title} {...item} fitContain />
            ))}
          </section>

          <section className="cta-renda-history-panel">
            <div className="cta-renda-history-headline">
              <div>
                <p>Histórico detalhado</p>
                <h3>Tudo que entrou, em qual etapa está e de onde veio</h3>
              </div>
              <span>Atualizado agora</span>
            </div>
            <div className="cta-renda-history-table">
              <div className="cta-renda-history-head">
                <span>Origem</span>
                <span>Categoria</span>
                <span>Valor</span>
                <span>Data</span>
                <span>Status</span>
              </div>
              <div className="cta-renda-history-body">
                {ledgerRows.map((row) => (
                  <article key={`${row.origin}-${row.when}`} className="cta-renda-history-row">
                    <strong>{row.origin}</strong>
                    <span>{row.type}</span>
                    <span>{row.amount}</span>
                    <span>{row.when}</span>
                    <small
                      className={`cta-renda-status-pill ${
                        row.status === "Pago"
                          ? "is-paid"
                          : row.status === "Disponível"
                            ? "is-ready"
                            : row.status === "Aprovado"
                              ? "is-approved"
                              : "is-pending"
                      }`}
                    >
                      {row.status}
                    </small>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="cta-renda-side">
          <div className="cta-ledger-panel cta-renda-flow-panel">
            <p>Evolução mensal</p>
            <h3>Fluxo por período</h3>
            <div className="cta-renda-monthly-list">
              {monthlyFlow.map((item) => (
                <div key={item.month} className="cta-renda-monthly-item">
                  <div className="cta-renda-monthly-copy">
                    <strong>{item.month}</strong>
                    <span>{item.total}</span>
                  </div>
                  <div className="cta-renda-monthly-bar">
                    <span style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-ledger-panel cta-renda-steps-panel">
            <p>Jornada do valor</p>
            <h3>Como o dinheiro caminha até ficar disponível</h3>
            <div className="cta-renda-steps-list">
              {releaseStages.map((stage) => (
                <article key={stage.label} className="cta-renda-step-card">
                  <span>{stage.label}</span>
                  <strong>{stage.title}</strong>
                  <p>{stage.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <SideNotes sectionKey={sectionKey} />
        </div>
      </section>
    </>
  );
}

function AnalyticsDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-analytics-top">
        <div className="cta-analytics-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <div className="cta-bars">
          <span style={{ height: "48%" }} />
          <span style={{ height: "72%" }} />
          <span style={{ height: "61%" }} />
          <span style={{ height: "84%" }} />
        </div>
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-analytics-layout">
        <div className="cta-visual-grid">
          {page.primaryCards.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function NotificationsDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-hero cta-hero-board">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-notification-layout">
        <div className="cta-notification-list">
          {page.primaryCards.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function ProfileDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-profile-hero">
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
        <div className="cta-profile-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-profile-layout">
        <div className="cta-visual-grid">
          {page.primaryCards.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
}

function renderDetail(
  sectionKey: SectionKey,
  mentorships: MentorshipRecord[] = [],
  selectedFilter?: string
) {
  const layout = clientCtaPages[sectionKey].layout;

  switch (layout) {
    case "home":
      return <HomeDetail sectionKey={sectionKey} />;
    case "lives":
      return <LivesDetail sectionKey={sectionKey} />;
    case "produtos":
      return <ProdutosDetail sectionKey={sectionKey} />;
    case "mentorias":
      return <MentoriasDetail mentorships={mentorships} selectedFilter={selectedFilter} />;
    case "clubao":
      return <MosaicDetail sectionKey={sectionKey} />;
    case "empresas":
      return <DirectoryDetail sectionKey={sectionKey} />;
    case "listas":
      return <SupplierListsDetail sectionKey={sectionKey} />;
    case "indicacoes":
      return <FlowDetail sectionKey={sectionKey} />;
    case "oportunidades":
    case "campanhas":
    case "divulgue":
    case "missoes":
    case "ranking":
    case "recompensas":
      return <BoardDetail sectionKey={sectionKey} />;
    case "renda":
      return <RendaDetail sectionKey={sectionKey} />;
    case "desempenho":
      return <AnalyticsDetail sectionKey={sectionKey} />;
    case "notificacoes":
      return <NotificationsDetail sectionKey={sectionKey} />;
    case "perfil":
      return <ProfileDetail sectionKey={sectionKey} />;
    default:
      return <BoardDetail sectionKey={sectionKey} />;
  }
}

export async function ClientCtaPage({
  sectionKey,
  selectedFilter
}: {
  sectionKey: SectionKey;
  selectedFilter?: string;
}) {
  const page = clientCtaPages[sectionKey];
  const mentorships = sectionKey === "mentorias" ? await getPublishedMentorships() : [];

  return (
    <ClientShell
      activeSection={sectionKey}
      title={sectionKey === "mentorias" ? "Biblioteca de mentorias" : page.ctaLabel}
      breadcrumb={`FG EXACTA / ${page.sectionKey.toUpperCase()} / ${sectionKey === "mentorias" ? "BIBLIOTECA" : page.ctaLabel.toUpperCase()}`}
    >
      {renderDetail(sectionKey, mentorships, selectedFilter)}
    </ClientShell>
  );
}
