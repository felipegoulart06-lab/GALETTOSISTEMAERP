import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { clientCtaPages } from "@/lib/client-cta-data";
import { dashboardSections, type SectionKey } from "@/lib/dashboard-data";
import { productCatalog } from "@/lib/product-catalog";
import { companyCatalog } from "@/lib/company-catalog";

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

function MentoriasDetail({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];
  return (
    <>
      <section className="cta-library-hero">
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
        <div className="cta-library-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-course-list">
        {page.primaryCards.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </section>
      <section className="cta-bottom-double">
        <div className="cta-module-list">
          <p>Módulos visíveis</p>
          <h3>Progressão e próximos passos</h3>
          <ul className="cta-note-list">
            <li>Módulo 1 — Fundamentos</li>
            <li>Aula 1 e Aula 2 concluídas</li>
            <li>Aula 3 em andamento</li>
            <li>Conclusão libera pontos e missão</li>
          </ul>
        </div>
        <SideNotes sectionKey={sectionKey} />
      </section>
    </>
  );
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
            fitContain
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
  return (
    <>
      <section className="cta-hero cta-hero-finance">
        <div className="cta-hero-copy">
          <span>{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <ManagedMedia alt={page.title} sizeLabel="1600 x 720" className="managed-media-fill" />
      </section>
      <CtaMetricStrip sectionKey={sectionKey} />
      <section className="cta-renda-layout">
        <div className="cta-source-strip">
          {page.primaryCards.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
        <div className="cta-ledger-panel">
          <p>Histórico detalhado</p>
          <h3>Movimentações recentes</h3>
          <div className="cta-ledger-list">
            <div><strong>Produto: Fone Bluetooth</strong><span>Venda confirmada • R$ 25,98 • Aprovado</span></div>
            <div><strong>Indicação de serviço</strong><span>Lead convertido • R$ 30,00 • Em validação</span></div>
            <div><strong>Campanha de vendas</strong><span>Bônus temporário • R$ 180,00 • Disponível</span></div>
          </div>
        </div>
        <SideNotes sectionKey={sectionKey} />
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

function renderDetail(sectionKey: SectionKey) {
  const layout = clientCtaPages[sectionKey].layout;

  switch (layout) {
    case "home":
      return <HomeDetail sectionKey={sectionKey} />;
    case "lives":
      return <LivesDetail sectionKey={sectionKey} />;
    case "produtos":
      return <ProdutosDetail sectionKey={sectionKey} />;
    case "mentorias":
      return <MentoriasDetail sectionKey={sectionKey} />;
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

export function ClientCtaPage({ sectionKey }: { sectionKey: SectionKey }) {
  const page = clientCtaPages[sectionKey];

  return (
    <ClientShell
      activeSection={sectionKey}
      title={page.ctaLabel}
      breadcrumb={`FG EXACTA / ${page.sectionKey.toUpperCase()} / ${page.ctaLabel.toUpperCase()}`}
    >
      {renderDetail(sectionKey)}
    </ClientShell>
  );
}
