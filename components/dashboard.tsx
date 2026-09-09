import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { ManagedMedia } from "@/components/managed-media";
import { ClubaoBenefitsHub } from "@/components/clubao-benefits-hub";
import { buildUserDashboardSections, getPlatformSnapshot, getPublishedProducts } from "@/lib/platform-content";
import type { CouponRedemptionRecord, ProductRecord } from "@/lib/platform-types";
import {
  navGroups,
  sectionOrder,
  type HeroMetric,
  type IconName,
  type InsightItem,
  type MediaCardData,
  type SectionConfig,
  type SectionKey
} from "@/lib/dashboard-data";

// #region debug-point D:E:dashboard-env
let __dbgServerUrl = "http://127.0.0.1:7777/event";
let __dbgSessionId = "vercel-server-crash";
try {
  if (typeof process !== "undefined") {
    try {
      const envRaw = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8") as string;
      envRaw.split(/\r?\n/).forEach((line) => {
        const [k, v] = line.split("=");
        if (!k || !v) return;
        if (k.trim() === "DEBUG_SERVER_URL") __dbgServerUrl = v.trim();
        if (k.trim() === "DEBUG_SESSION_ID") __dbgSessionId = v.trim();
      });
    } catch {}
  }
} catch {}
const __debugEmit = async (hyp: string, where: string, msg: string, extra?: Record<string, unknown>) => {
  try {
    await fetch(__dbgServerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: __dbgSessionId,
        ts: Date.now(),
        hypothesis: hyp,
        where,
        message: msg,
        extra: extra ?? {}
      })
    }).catch(() => {});
  } catch {}
};
// #endregion

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
        </svg>
      );
    case "live":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="1.75" />
          <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9" />
          <path d="M16.5 7.5a6.4 6.4 0 0 1 0 9" />
          <path d="M4.5 4.5a10.65 10.65 0 0 0 0 15" />
          <path d="M19.5 4.5a10.65 10.65 0 0 1 0 15" />
        </svg>
      );
    case "box":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5" />
          <path d="M12 12L4 7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case "cap":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7.5L12 4l8 3.5-8 3.5L4 7.5z" />
          <path d="M6.5 10.5V14c0 1.8 3 3.5 5.5 3.5s5.5-1.7 5.5-3.5v-3.5" />
          <path d="M20 8v5" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10h16v10H4z" />
          <path d="M12 10v10" />
          <path d="M4 7.5h16V10H4z" />
          <path d="M9.5 7.5c-1.5 0-2.5-1-2.5-2.25C7 4 7.8 3.25 9 3.25c2.1 0 3 2.35 3 4.25" />
          <path d="M14.5 7.5c1.5 0 2.5-1 2.5-2.25 0-1.25-.8-2-2-2-2.1 0-3 2.35-3 4.25" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 21V6.5A1.5 1.5 0 0 1 6.5 5H14v16" />
          <path d="M14 9H19v12H14" />
          <path d="M8.5 9h2" />
          <path d="M8.5 12h2" />
          <path d="M8.5 15h2" />
        </svg>
      );
    case "list":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 7h10" />
          <path d="M9 12h10" />
          <path d="M9 17h10" />
          <circle cx="5.5" cy="7" r="1.25" />
          <circle cx="5.5" cy="12" r="1.25" />
          <circle cx="5.5" cy="17" r="1.25" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M18 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
          <path d="M14.5 19a3.5 3.5 0 0 1 7 0" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4c2.5.2 4.7 2.4 5 5-1.8.6-3.6 1.8-5.2 3.4S11 15.8 10.4 17.6c-2.6-.3-4.8-2.5-5-5 .6-1.8 1.8-3.6 3.4-5.2S12.2 4.6 14 4z" />
          <path d="M14 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M7 15l-2.5 4.5L9 17l2 2-2.5 1.5L13 18" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 13V9l10-4v12L4 13z" />
          <path d="M14 9h4.5a1.5 1.5 0 0 1 0 3H14" />
          <path d="M6.5 13l1.5 5h2" />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="M8.2 10.9l7.6-4.8" />
          <path d="M8.2 13.1l7.6 4.8" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v11H4z" />
          <path d="M4 10h16" />
          <path d="M16 14h2" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <rect x="14" y="14" width="6" height="6" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 18h8" />
          <path d="M9 18v-6a3 3 0 0 1 6 0v6" />
          <path d="M6 18h12l-1.5-2.5V12a4.5 4.5 0 0 0-9 0v3.5L6 18z" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4z" />
          <path d="M7 7H5a2 2 0 0 1-2-2V4h5" />
          <path d="M17 7h2a2 2 0 0 0 2-2V4h-5" />
          <path d="M12 11v5" />
          <path d="M9 20h6" />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4z" />
          <path d="M19 4l.75 1.75L21.5 6.5l-1.75.75L19 9l-.75-1.75L16.5 6.5l1.75-.75L19 4z" />
        </svg>
      );
    default:
      return null;
  }
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function MetricCard({ metric }: { metric: HeroMetric }) {
  return (
    <article className={`metric-card tone-${metric.tone}`}>
      <span className="metric-label">{metric.label}</span>
      <strong>{metric.value}</strong>
      <small>{metric.detail}</small>
    </article>
  );
}

function MediaCard({ card, compact = false }: { card: MediaCardData; compact?: boolean }) {
  return (
    <article className={`media-card accent-${card.accent}${compact ? " media-card-compact" : ""}`}>
      <div className="media-cover">
        {card.href ? (
          <Link href={card.href} className="media-card-cover-link" aria-label={`Abrir detalhes de ${card.title}`}>
            <ManagedMedia
              alt={card.title}
              sizeLabel="1200 x 900"
              src={card.image}
              className={`managed-media-fill${card.coverFit === "contain" ? " managed-media-fit-contain" : ""}`}
            />
          </Link>
        ) : (
          <ManagedMedia
            alt={card.title}
            sizeLabel="1200 x 900"
            src={card.image}
            className={`managed-media-fill${card.coverFit === "contain" ? " managed-media-fit-contain" : ""}`}
          />
        )}
        {card.logo ? (
          <div className="media-card-logo">
            <ManagedMedia
              alt={`${card.title} logo`}
              sizeLabel="256 x 256"
              src={card.logo}
              className="managed-media-fill media-card-logo-media"
              tone="soft"
            />
          </div>
        ) : null}
        <span className="badge">{card.badge}</span>
      </div>
      <div className="media-body">
        <span className="media-eyebrow">{card.eyebrow}</span>
        {card.href ? (
          <h3>
            <Link href={card.href} className="media-card-title-link">
              {card.title}
            </Link>
          </h3>
        ) : (
          <h3>{card.title}</h3>
        )}
        <p className="media-subtitle">{card.subtitle}</p>
        <p className="media-meta">{card.meta}</p>
        {!compact ? (
          <>
            <ul className="media-facts">
              {card.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className="media-chips">
              {card.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </>
        ) : null}
        {card.ctaHref ? (
          <Link href={card.ctaHref} className="media-card-button">
            {card.cta}
          </Link>
        ) : (
          <button type="button">{card.cta}</button>
        )}
      </div>
    </article>
  );
}

function FeedPanel({ section }: { section: SectionConfig }) {
  return (
    <section className="side-panel">
      <div className="side-panel-head">
        <h3>{section.feedTitle}</h3>
        <span>Atualizado agora</span>
      </div>
      <ul className="feed-list">
        {section.feed.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
            <span>{item.meta}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InsightCard({ item }: { item: InsightItem }) {
  return (
    <li className={`insight-item tone-${item.tone}`}>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </li>
  );
}

function InsightPanel({ section }: { section: SectionConfig }) {
  return (
    <section className="side-panel">
      <div className="side-panel-head">
        <h3>{section.insightTitle}</h3>
        <span>Leitura rápida</span>
      </div>
      <ul className="insight-list">
        {section.insights.map((item) => (
          <InsightCard key={item.label} item={item} />
        ))}
      </ul>
    </section>
  );
}

function SystemPanel({ section }: { section: SectionConfig }) {
  return (
    <section className="side-panel">
      <div className="side-panel-head">
        <h3>{section.systemTitle}</h3>
        <span>Base estrutural</span>
      </div>
      <ul className="system-list">
        {section.systemPoints.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function HeroBlock({ section, className = "" }: { section: SectionConfig; className?: string }) {
  return (
    <section className={`hero-panel ${className}`.trim()}>
      <div className="hero-copy">
        <span className="hero-tag">{section.heroTag}</span>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <div className="hero-notice">{section.heroNotice}</div>
        <div className="hero-actions">
          <Link href={section.heroActionHref} className="hero-link-button">
            {section.heroActionLabel}
          </Link>
        </div>
      </div>
      <div className="hero-media">
        <ManagedMedia
          alt={section.title}
          sizeLabel="1600 x 720"
          src={section.heroImage}
          className="managed-media-fill"
        />
      </div>
    </section>
  );
}

function ProdutosHero({ section }: { section: SectionConfig }) {
  return (
    <section className="hero-panel hero-panel-compact">
      <div className="hero-copy">
        <span className="hero-tag">{section.heroTag}</span>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <div className="hero-notice">{section.heroNotice}</div>
        <div className="hero-actions hero-actions-stack">
          <Link href={section.heroActionHref} className="hero-link-button">
            {section.heroActionLabel}
          </Link>
          {section.heroSecondaryActionLabel && section.heroSecondaryActionHref ? (
            <Link href={section.heroSecondaryActionHref} className="hero-link-button hero-link-button-secondary">
              {section.heroSecondaryActionLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="hero-media">
        <ManagedMedia
          alt={section.title}
          sizeLabel="1600 x 720"
          src={section.heroImage}
          className="managed-media-fill"
        />
      </div>
    </section>
  );
}

function MetricsStrip({ section, className = "" }: { section: SectionConfig; className?: string }) {
  return (
    <section className={`metrics-grid ${className}`.trim()}>
      {section.metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-head">
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <span>{description}</span>
    </div>
  );
}

function productMatchesFilter(product: ProductRecord, selectedFilter: string) {
  if (selectedFilter === "Todos") {
    return true;
  }

  const normalized = selectedFilter.toLowerCase();
  return [product.category, ...product.tags].some((value) => value.toLowerCase() === normalized);
}

function ProductCatalogPanel({
  selectedFilter,
  products,
  filters
}: {
  selectedFilter: string;
  products: ProductRecord[];
  filters: string[];
}) {
  const filteredProducts =
    selectedFilter === "Todos"
      ? products
      : products.filter((product) => productMatchesFilter(product, selectedFilter));

  return (
    <section className="product-browser-panel" id="catalogo-produtos">
      <div className="product-browser-head">
        <div>
          <p>Catálogo completo</p>
          <h3>Todos os produtos</h3>
        </div>
        <span>{filteredProducts.length} itens visíveis</span>
      </div>

      <div className="product-browser-filters">
        {filters.map((filter) => {
          const isActive = filter === selectedFilter;
          const href =
            filter === "Todos"
              ? "/produtos?catalogo=aberto#catalogo-produtos"
              : `/produtos?catalogo=aberto&filtro=${encodeURIComponent(filter)}#catalogo-produtos`;

          return (
            <Link
              key={filter}
              href={href}
              className={`product-browser-filter${isActive ? " is-active" : ""}`}
            >
              {filter}
            </Link>
          );
        })}
      </div>

      <div className="product-browser-list product-browser-grid">
        {filteredProducts.map((product) => (
          <Link key={product.slug} href={`/detalhes/produtos/${product.slug}`} className="product-browser-item product-browser-card">
            <div className="product-browser-media">
              <ManagedMedia
                alt={product.title}
                sizeLabel="1600 x 1200"
                src={product.image}
                className="managed-media-fill managed-media-fit-contain"
              />
            </div>
            <div className="product-browser-copy">
              <span>{product.category}</span>
              <strong>{product.title}</strong>
              <p>{product.shortDescription}</p>
              <small>
                Preço {product.price} • comissão {product.commissionRate}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function GalleryMosaic({ cards }: { cards: MediaCardData[] }) {
  const items = cards.concat(cards[0]).slice(0, 4);

  return (
    <section className="gallery-panel gallery-panel-inline">
      <SectionHeader
        eyebrow="Visual"
        title="Elementos de apoio"
        description="Imagens fortes para a plataforma parecer produto real, comercial e vivo."
      />
      <div className="gallery-grid">
        {items.map((card, index) => (
          <article key={`${card.title}-${index}`} className="gallery-card">
            <ManagedMedia alt={card.title} sizeLabel="1200 x 900" className="managed-media-fill" />
            <div className="gallery-copy">
              <span>{card.badge}</span>
              <strong>{card.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <div className="home-greeting-row">
        <div className="greeting-card">
          <span>Bem-vindo de volta</span>
          <strong>Bom dia, Felipe</strong>
          <p>Hoje o foco é descobrir, executar e ganhar com clareza.</p>
        </div>
        <div className="greeting-card greeting-card-avatar">
          <ManagedMedia alt="Felipe" sizeLabel="512 x 512" className="managed-media-avatar" />
          <div>
            <strong>Felipe</strong>
            <span>Nível 7 • Pro</span>
          </div>
        </div>
      </div>

      <HeroBlock section={section} />
      <MetricsStrip section={section} />

      <section className="layout-home">
        <div className="layout-home-main">
          <section className="feature-board">
            <SectionHeader
              eyebrow={section.eyebrow}
              title={section.spotlightTitle}
              description={section.spotlightDescription}
            />
            <div className="cards-grid cards-grid-three">
              {section.cards.map((card) => (
                <MediaCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section className="home-opportunity-callout">
            <div>
              <span>Sua próxima oportunidade</span>
              <h3>Você já vendeu produtos de tecnologia.</h3>
              <p>Encontramos 3 novos produtos que podem interessar ao seu público.</p>
            </div>
            <Link href="/produtos" className="hero-link-button">
              Ver produtos
            </Link>
          </section>

          <GalleryMosaic cards={section.cards} />
        </div>

        <aside className="layout-home-side">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function LivesLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <section className="live-stage">
        <ManagedMedia
          alt={section.title}
          sizeLabel="1600 x 900"
          src={section.heroImage}
          className="managed-media-fill"
          tone="dark"
        />
        <div className="live-stage-overlay">
          <span>{section.heroTag}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <div className="live-chip-row">
            {section.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
        </div>
      </section>
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-lives">
        <div className="live-catalog-grid">
          {section.cards.map((card) => (
            <MediaCard key={card.title} card={card} />
          ))}
        </div>
        <div className="timeline-panel">
          <SectionHeader eyebrow="Programação" title="Próximas Lives" description={section.heroNotice} />
          <div className="timeline-list">
            {section.feed.map((item) => (
              <article key={item.title} className="timeline-item">
                <div className="timeline-time">{item.title}</div>
                <div className="timeline-card">
                  <strong>{item.detail}</strong>
                  <span>{item.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="stack-panels">
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function ProdutosLayout({
  section,
  catalogProducts,
  productCatalogOpen = false,
  productCatalogFilter = "Todos"
}: {
  section: SectionConfig;
  catalogProducts: ProductRecord[];
  productCatalogOpen?: boolean;
  productCatalogFilter?: string;
}) {
  const availableFilters = Array.from(new Set(["Todos", ...catalogProducts.map((product) => product.category), ...catalogProducts.flatMap((product) => product.tags)]));
  const selectedFilter = availableFilters.includes(productCatalogFilter) ? productCatalogFilter : "Todos";

  return (
    <>
      <section className="layout-products layout-products-clean">
        <aside className="catalog-filter-panel">
          <SectionHeader eyebrow="Categorias" title="O que posso vender?" description={section.spotlightDescription} />
          <div className="tag-cloud product-tag-cloud">
            {section.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
          <FeedPanel section={section} />
        </aside>
        <div className="product-showcase">
          <MetricsStrip section={section} className="metrics-grid-double" />
          <ProductCatalogPanel selectedFilter={selectedFilter} products={catalogProducts} filters={availableFilters} />
          <SystemPanel section={section} />
        </div>
      </section>
    </>
  );
}

function matchesMentoriaFilter(card: MediaCardData, selectedFilter: string) {
  if (selectedFilter === "Todas") {
    return true;
  }

  const normalizedFilter = selectedFilter.toLowerCase();
  return [card.eyebrow, ...card.chips].some((value) => value.toLowerCase() === normalizedFilter);
}

function MentoriaLibraryCard({
  card,
  fallbackHref,
  featured = false
}: {
  card: MediaCardData;
  fallbackHref: string;
  featured?: boolean;
}) {
  const stats = [
    { label: "Módulos", value: card.moduleCount ? `${card.moduleCount}` : "--" },
    { label: "Aulas", value: card.lessonCount ? `${card.lessonCount}` : "--" },
    { label: "Duração", value: card.duration ?? "--" },
    { label: "Nível", value: card.level ?? "--" }
  ];

  return (
    <article className={`mentoria-library-card${featured ? " mentoria-library-card-featured" : ""}`}>
      <div className="mentoria-card-media">
        <ManagedMedia alt={card.title} sizeLabel="1600 x 900" src={card.image} className="managed-media-fill" />
        <div className="mentoria-card-media-overlay">
          <span className={`mentoria-card-category accent-${card.accent}`}>{card.eyebrow}</span>
          <span className="mentoria-card-badge">{card.badge}</span>
        </div>
      </div>

      <div className="mentoria-card-body">
        <div className="mentoria-card-heading">
          <strong>{card.title}</strong>
          <p>{card.subtitle}</p>
        </div>

        <div className="mentoria-card-mentor">
          <ManagedMedia
            alt={card.mentorName ?? card.title}
            sizeLabel="512 x 512"
            src={card.mentorAvatar}
            className="managed-media-mentor-avatar"
            tone="soft"
          />
          <div>
            <span>Mentor</span>
            <strong>{card.mentorName ?? "Mentor convidado"}</strong>
          </div>
        </div>

        <div className="mentoria-card-stats">
          {stats.map((stat) => (
            <article key={stat.label} className="mentoria-stat-chip">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>

        {card.progressPercent ? (
          <div className="mentoria-card-progress">
            <div className="mentoria-card-progress-head">
              <span>Progresso</span>
              <strong>{card.progressLabel ?? `${card.progressPercent}% concluído`}</strong>
            </div>
            <div className="mentoria-card-progress-bar" aria-hidden="true">
              <div style={{ width: `${card.progressPercent}%` }} />
            </div>
          </div>
        ) : null}

        <Link href={card.ctaHref ?? fallbackHref} className="mentoria-card-action">
          {card.cta}
        </Link>
      </div>
    </article>
  );
}

function MentoriasLayout({ section, selectedFilter = "Todas" }: { section: SectionConfig; selectedFilter?: string }) {
  const filters = ["Todas", ...section.filters];
  const startedCards = section.cards.filter((card) => (card.progressPercent ?? 0) > 0);
  const visibleCards = section.cards.filter((card) => matchesMentoriaFilter(card, selectedFilter));

  return (
    <>
      <section className="layout-mentorias">
        <div className="course-hero-banner">
          <ManagedMedia alt={section.title} sizeLabel="1600 x 720" src={section.heroImage} className="managed-media-fill" />
          <div className="course-hero-copy">
            <span>{section.heroTag}</span>
            <h2>MENTORIAS</h2>
            <p className="course-hero-kicker">Aprenda com quem faz.</p>
            <p>{section.description}</p>
            <Link href={section.heroActionHref} className="hero-link-button">
              {section.heroActionLabel}
            </Link>
          </div>
        </div>
        <MetricsStrip section={section} className="metrics-grid-tight" />

        {startedCards.length > 0 ? (
          <section className="mentoria-continue-section">
            <SectionHeader
              eyebrow="Continue aprendendo"
              title="Continue de onde parou"
              description="As mentorias já iniciadas aparecem primeiro para facilitar retorno rápido, manter ritmo e não perder contexto."
            />
            <div className="mentoria-continue-grid">
              {startedCards.slice(0, 3).map((card) => (
                <MentoriaLibraryCard key={card.title} card={card} fallbackHref={section.heroActionHref} featured />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mentoria-library-section">
          <SectionHeader eyebrow={section.eyebrow} title={section.spotlightTitle} description={section.spotlightDescription} />

          <div className="mentoria-filter-row" aria-label="Filtros de mentorias">
            {filters.map((filter) => {
              const isActive = filter === selectedFilter;
              const href =
                filter === "Todas" ? "/mentorias" : `/mentorias?categoria=${encodeURIComponent(filter)}`;

              return (
                <Link key={filter} href={href} className={`mentoria-filter-chip${isActive ? " is-active" : ""}`}>
                  {filter}
                </Link>
              );
            })}
          </div>

          <div className="mentoria-library-grid">
            {visibleCards.map((card) => (
              <MentoriaLibraryCard key={card.title} card={card} fallbackHref={section.heroActionHref} />
            ))}
          </div>
        </section>

        <section className="mentoria-support-grid">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </section>
      </section>
    </>
  );
}

function ClubaoLayout({
  section,
  offers,
  couponRedemptions
}: {
  section: SectionConfig;
  offers: Array<{
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
  }>;
  couponRedemptions: Array<{
    id: string;
    couponId: string;
    userId: string;
    userName: string;
    userEmail: string;
    offerId: string;
    couponCode: string;
    validationToken: string;
    qrPayload: string;
    redeemedAt: string;
    validUntil: string;
    status: "ATIVO" | "EXPIRADO" | "UTILIZADO";
    pdfReference: string;
  }>;
}) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-soft-green" />
      <ClubaoBenefitsHub initialOffers={offers} initialRedemptions={couponRedemptions} />
    </>
  );
}

function EmpresasLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-compact" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-divulgue">
        <aside className="catalog-filter-panel">
          <SectionHeader eyebrow="Ações" title={section.spotlightTitle} description={section.spotlightDescription} />
          <div className="tag-cloud product-tag-cloud">
            {section.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
        </aside>
        <div className="product-showcase">
          <div className="cards-grid cards-grid-three cards-grid-company" data-section="empresas">
            {section.cards.map((card) => (
              <MediaCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ListasLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <section className="layout-listas-hero">
        <div className="listas-hero-copy">
          <span className="hero-tag">{section.heroTag}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <div className="hero-notice">{section.heroNotice}</div>
          <div className="hero-actions">
            <Link href={section.heroActionHref} className="hero-link-button">
              {section.heroActionLabel}
            </Link>
          </div>
          <div className="tag-cloud product-tag-cloud">
            {section.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="layout-listas">
        <div className="listas-main">
          <section className="listas-board-panel">
            <SectionHeader eyebrow={section.eyebrow} title={section.spotlightTitle} description={section.spotlightDescription} />
            <div className="cards-grid cards-grid-three">
              {section.cards.map((card) => (
                <MediaCard key={card.title} card={card} />
              ))}
            </div>
          </section>

          <section className="listas-ledger-panel">
            <div className="listas-ledger-head">
              <span>Rota</span>
              <span>Leitura</span>
              <span>Operação</span>
            </div>
            <div className="listas-ledger-body">
              {section.feed.map((item) => (
                <article key={item.title} className="listas-ledger-row">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span>{item.meta}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="stack-panels">
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function IndicacoesLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <section className="layout-indicacoes-hero">
        <div className="indicacoes-copy">
          <span>{section.heroTag}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <Link href={section.heroActionHref} className="hero-link-button">
            {section.heroActionLabel}
          </Link>
        </div>
        <div className="funnel-columns">
          {section.metrics.map((metric) => (
            <article key={metric.label} className={`funnel-stage tone-${metric.tone}`}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="layout-indicacoes">
        <div className="indicacoes-main">
          <SectionHeader eyebrow={section.eyebrow} title={section.spotlightTitle} description={section.spotlightDescription} />
          <div className="cards-grid cards-grid-two">
            {section.cards.map((card) => (
              <MediaCard key={card.title} card={card} />
            ))}
          </div>
        </div>
        <aside className="stack-panels">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function OpportunitiesLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-orange" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-opportunities">
        <div className="cards-grid cards-grid-three">
          {section.cards.map((card) => (
            <MediaCard key={card.title} card={card} />
          ))}
        </div>
        <div className="opportunity-bottom-grid">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </div>
      </section>
    </>
  );
}

function CampanhasLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-compact" />
      <MetricsStrip section={section} />
      <section className="layout-campanhas">
        <div className="campaign-board" data-section="campanhas">
          {section.cards.map((card) => (
            <MediaCard key={card.title} card={card} />
          ))}
        </div>
        <div className="campaign-support-grid">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </div>
      </section>
    </>
  );
}

function DivulgueLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-compact" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-divulgue">
        <aside className="catalog-filter-panel">
          <SectionHeader eyebrow="Ações" title={section.spotlightTitle} description={section.spotlightDescription} />
          <div className="tag-cloud product-tag-cloud">
            {section.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
        </aside>
        <div className="product-showcase">
          <div className="cards-grid cards-grid-three">
            {section.cards.map((card) => (
              <MediaCard key={card.title} card={card} />
            ))}
          </div>
          <FeedPanel section={section} />
        </div>
      </section>
    </>
  );
}

function MinhaRendaLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-finance" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-renda">
        <div className="ledger-panel">
          <SectionHeader eyebrow={section.eyebrow} title={section.spotlightTitle} description={section.spotlightDescription} />
          <div className="ledger-table">
            <div className="ledger-head">
              <span>Origem</span>
              <span>Resumo</span>
              <span>Status</span>
            </div>
            {section.cards.map((card) => (
              <div key={card.title} className="ledger-row">
                <div>
                  <strong>{card.title}</strong>
                  <small>{card.subtitle}</small>
                </div>
                <span>{card.meta}</span>
                <span className="ledger-badge">{card.badge}</span>
              </div>
            ))}
          </div>
        </div>
        <aside className="stack-panels">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function DesempenhoLayout({ section }: { section: SectionConfig }) {
  const periodFilters = ["Hoje", "7 dias", "30 dias", "3 meses", "Personalizado"];
  const dimensionFilters = [
    { label: "Produto", value: "Todos os produtos" },
    { label: "Campanha", value: "Todas as campanhas" },
    { label: "Categoria", value: "Tecnologia, Creator Gear e Casa" },
    { label: "Origem", value: "Stories, WhatsApp e tráfego pago" }
  ];
  const kpis = [
    {
      label: "Vendas",
      value: "312",
      delta: "+18,6%",
      detail: "vs 30 dias anteriores",
      tone: "green",
      direction: "up",
      spark: [32, 34, 41, 39, 45, 47]
    },
    {
      label: "Cliques",
      value: "18,4 mil",
      delta: "+12,1%",
      detail: "crescimento de tráfego qualificado",
      tone: "blue",
      direction: "up",
      spark: [38, 42, 44, 48, 53, 58]
    },
    {
      label: "Conversão",
      value: "5,8%",
      delta: "+0,9 p.p.",
      detail: "melhor taxa desde abril",
      tone: "green",
      direction: "up",
      spark: [26, 28, 29, 32, 35, 37]
    },
    {
      label: "Comissões",
      value: "R$ 4.280",
      delta: "+21,4%",
      detail: "ticket maior puxando resultado",
      tone: "green",
      direction: "up",
      spark: [20, 24, 29, 33, 41, 47]
    },
    {
      label: "Indicações",
      value: "186",
      delta: "+7,3%",
      detail: "rede ativa e melhor resposta",
      tone: "violet",
      direction: "up",
      spark: [22, 25, 26, 30, 31, 34]
    },
    {
      label: "Pontos",
      value: "12.840",
      delta: "+14,2%",
      detail: "missões e conversões combinadas",
      tone: "blue",
      direction: "up",
      spark: [18, 20, 26, 31, 36, 42]
    },
    {
      label: "Ganhos",
      value: "R$ 8.940",
      delta: "-3,2%",
      detail: "queda leve em creator gear premium",
      tone: "orange",
      direction: "down",
      spark: [48, 46, 44, 39, 36, 34]
    }
  ];
  const trendSeries = [24, 28, 26, 34, 37, 42, 40, 47, 51, 56, 61, 66];
  const commissionSeries = [18, 22, 21, 24, 29, 31, 35, 38, 42, 45, 49, 55];
  const clicksVsSales = [
    { label: "Seg", clicks: 76, sales: 22 },
    { label: "Ter", clicks: 82, sales: 24 },
    { label: "Qua", clicks: 91, sales: 29 },
    { label: "Qui", clicks: 88, sales: 28 },
    { label: "Sex", clicks: 97, sales: 34 },
    { label: "Sab", clicks: 69, sales: 19 },
    { label: "Dom", clicks: 58, sales: 16 }
  ];
  const conversionByProduct = [
    { label: "Smartwatch Classic X", rate: 7.9, sales: 88, tone: "green" },
    { label: "Fone Bluetooth Pro", rate: 6.8, sales: 74, tone: "blue" },
    { label: "Carteira Executive Kit", rate: 5.6, sales: 52, tone: "violet" },
    { label: "Blender Fit Inox", rate: 4.9, sales: 43, tone: "orange" },
    { label: "Camera Creator 4K", rate: 3.4, sales: 21, tone: "orange" }
  ];
  const sourceSegments = [
    { label: "Stories", value: 34, tone: "blue" },
    { label: "WhatsApp", value: 28, tone: "green" },
    { label: "Tráfego pago", value: 20, tone: "violet" },
    { label: "Lives", value: 12, tone: "orange" },
    { label: "Outros", value: 6, tone: "red" }
  ];
  const funnelStages = [
    { label: "Visualizações", value: "28,4 mil", detail: "topo do funil", percent: 100, tone: "blue" },
    { label: "Cliques", value: "7.860", detail: "27,7% das visualizações", percent: 68, tone: "blue" },
    { label: "Indicações", value: "512", detail: "6,5% dos cliques", percent: 44, tone: "violet" },
    { label: "Vendas", value: "312", detail: "60,9% das indicações", percent: 28, tone: "green" },
    { label: "Comissão", value: "R$ 4.280", detail: "resultado líquido", percent: 18, tone: "green" }
  ];
  const compareCards = [
    {
      title: "Produto A x Produto B",
      leftLabel: "Smartwatch Classic X",
      leftValue: "7,9%",
      rightLabel: "Fone Bluetooth Pro",
      rightValue: "6,8%",
      detail: "O smartwatch converte mais e sustenta ticket médio maior.",
      tone: "green"
    },
    {
      title: "Período atual x anterior",
      leftLabel: "Últimos 30 dias",
      leftValue: "R$ 18,4 mil",
      rightLabel: "30 dias anteriores",
      rightValue: "R$ 15,5 mil",
      detail: "Crescimento puxado por campanhas com creator gear e remarketing.",
      tone: "blue"
    },
    {
      title: "Você x média da plataforma",
      leftLabel: "Seu desempenho",
      leftValue: "5,8%",
      rightLabel: "Média FG EXACTA",
      rightValue: "4,7%",
      detail: "Sua conversão está 22% acima da média da plataforma.",
      tone: "violet"
    }
  ];
  const goals = [
    { label: "Meta de vendas", current: 312, target: 380, tone: "green" },
    { label: "Meta de cliques", current: 18420, target: 22000, tone: "blue" },
    { label: "Meta de indicações", current: 186, target: 240, tone: "violet" },
    { label: "Meta de comissão", current: 4280, target: 5200, tone: "green" }
  ];
  const productRows = [
    {
      product: "Smartwatch Classic X",
      campaign: "Review curto + prova social",
      clicks: "4.820",
      sales: "88",
      conversion: "7,9%",
      commission: "R$ 1.280",
      origin: "Stories"
    },
    {
      product: "Fone Bluetooth Pro",
      campaign: "Oferta com urgência",
      clicks: "5.140",
      sales: "74",
      conversion: "6,8%",
      commission: "R$ 1.040",
      origin: "WhatsApp"
    },
    {
      product: "Carteira Executive Kit",
      campaign: "Lifestyle premium",
      clicks: "3.260",
      sales: "52",
      conversion: "5,6%",
      commission: "R$ 870",
      origin: "Tráfego pago"
    },
    {
      product: "Blender Fit Inox",
      campaign: "Saúde e rotina",
      clicks: "2.980",
      sales: "43",
      conversion: "4,9%",
      commission: "R$ 620",
      origin: "Lives"
    },
    {
      product: "Camera Creator 4K",
      campaign: "Creator bundle",
      clicks: "2.220",
      sales: "21",
      conversion: "3,4%",
      commission: "R$ 470",
      origin: "Remarketing"
    }
  ];
  const campaignRanking = [
    { name: "Review curto + prova social", result: "R$ 3.180", detail: "+26% de comissão", tone: "green" },
    { name: "Oferta com urgência", result: "74 vendas", detail: "melhor CTR do período", tone: "blue" },
    { name: "WhatsApp reativação", result: "186 indicações", detail: "rede aquecida", tone: "violet" },
    { name: "Bundle premium", result: "R$ 1.420", detail: "ticket médio maior", tone: "orange" }
  ];
  const kanbanColumns = [
    {
      title: "Oportunidades",
      meta: "6 cards",
      tone: "orange",
      cards: [
        { title: "Creator Gear Premium", metric: "CTR 4,8%", note: "Audiência quente nas últimas 48h" },
        { title: "Combo Stories + WhatsApp", metric: "186 leads", note: "Melhor origem para recuperação" }
      ]
    },
    {
      title: "Em andamento",
      meta: "4 cards",
      tone: "blue",
      cards: [
        { title: "Campanha Smartwatch", metric: "R$ 6,4 mil", note: "Sequência de 5 criativos ativos" },
        { title: "Oferta Fone Pro", metric: "5,1 mil cliques", note: "Pico entre 19h e 22h" }
      ]
    },
    {
      title: "Convertendo",
      meta: "3 cards",
      tone: "green",
      cards: [
        { title: "Remarketing Creator", metric: "6,2% conv.", note: "Acima da média da plataforma" },
        { title: "Exec Kit Lifestyle", metric: "22 vendas", note: "Ticket subindo com bundle" }
      ]
    },
    {
      title: "Resultados",
      meta: "2 cards",
      tone: "violet",
      cards: [
        { title: "Comissão validada", metric: "R$ 4.280", note: "21,4% acima do período anterior" },
        { title: "Meta de performance", metric: "82% atingida", note: "Foco em aumentar cliques qualificados" }
      ]
    }
  ];
  const insights = [
    {
      title: "Melhor janela de conversão",
      text: "Seu pico de vendas acontece entre 19h e 22h com campanhas de tecnologia.",
      badge: "Ação sugerida",
      tone: "green"
    },
    {
      title: "Produto com maior margem",
      text: "Smartwatch Classic X combina maior conversão com melhor comissão unitária.",
      badge: "Produto líder",
      tone: "blue"
    },
    {
      title: "Alerta de queda",
      text: "Camera Creator 4K perdeu tração em tráfego pago e precisa de novo criativo.",
      badge: "Queda detectada",
      tone: "red"
    }
  ];
  const trendPath = (values: number[], width = 640, height = 220) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const stepX = width / (values.length - 1);

    return values
      .map((value, index) => {
        const x = index * stepX;
        const y = height - ((value - min) / Math.max(max - min, 1)) * (height - 24) - 12;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  };
  const areaPath = (values: number[], width = 640, height = 220) => {
    const line = trendPath(values, width, height);
    return `${line} L ${width} ${height} L 0 ${height} Z`;
  };
  const donutTotal = sourceSegments.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;
  const donutStops = sourceSegments
    .map((item) => {
      const start = accumulated;
      accumulated += (item.value / donutTotal) * 100;
      const colorMap: Record<string, string> = {
        blue: "#2563eb",
        green: "#16a34a",
        violet: "#7c3aed",
        orange: "#f59e0b",
        red: "#ef4444"
      };

      return `${colorMap[item.tone]} ${start.toFixed(2)}% ${accumulated.toFixed(2)}%`;
    })
    .join(", ");

  return (
    <>
      <section className="layout-desempenho-top performance-command">
        <div className="performance-command-main">
          <div className="performance-hero-card">
            <div className="performance-hero-copy">
              <span>Analytics operacional</span>
              <h2>Seu desempenho</h2>
              <p>Veja seus resultados, entenda o que funciona e descubra onde melhorar.</p>
            </div>
            <div className="performance-filter-grid">
              <div className="performance-filter-group">
                <small>Período</small>
                <div className="performance-chip-row">
                  {periodFilters.map((filter, index) => (
                    <button key={filter} type="button" className={`performance-chip${index === 2 ? " is-active" : ""}`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              {dimensionFilters.map((filter) => (
                <div key={filter.label} className="performance-filter-select">
                  <small>{filter.label}</small>
                  <strong>{filter.value}</strong>
                </div>
              ))}
            </div>
            <div className="performance-highlight-strip">
              <article className="performance-highlight-card tone-blue">
                <span>Melhor horário</span>
                <strong>19h às 22h</strong>
                <small>Faixa com maior volume de cliques e vendas.</small>
              </article>
              <article className="performance-highlight-card tone-green">
                <span>Melhor categoria</span>
                <strong>Tecnologia</strong>
                <small>Concentra 42% da comissão gerada no período.</small>
              </article>
              <article className="performance-highlight-card tone-violet">
                <span>Origem campeã</span>
                <strong>Stories + WhatsApp</strong>
                <small>Rede ativa converte acima da média da plataforma.</small>
              </article>
            </div>
          </div>
          <div className="performance-hero-visual">
            <ManagedMedia
              alt={section.title}
              sizeLabel="1600 x 720"
              src={section.heroImage}
              className="managed-media-fill performance-hero-media"
            />
            <div className="performance-hero-overlay">
              <div className="performance-hero-floating">
                <span>Resultado consolidado</span>
                <strong>R$ 18,4 mil</strong>
                <small>Receita bruta dos últimos 30 dias</small>
              </div>
              <div className="performance-hero-floating tone-green">
                <span>Acima da média</span>
                <strong>+22%</strong>
                <small>Conversão superior à plataforma</small>
              </div>
            </div>
          </div>
        </div>
        <div className="performance-kpi-strip">
          {kpis.map((metric) => (
            <article key={metric.label} className={`performance-kpi-card tone-${metric.tone}`}>
              <div className="performance-kpi-head">
                <span>{metric.label}</span>
                <small className={`performance-kpi-delta is-${metric.direction}`}>{metric.delta}</small>
              </div>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
              <div className="performance-kpi-spark">
                {metric.spark.map((value, index) => (
                  <span key={`${metric.label}-${index}`} style={{ height: `${value}px` }} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="layout-desempenho performance-dashboard">
        <div className="performance-main-grid">
          <section className="performance-panel performance-panel-xl">
            <div className="performance-panel-head">
              <div>
                <span>Evolução de vendas ao longo do tempo</span>
                <h3>Receita e ritmo de crescimento</h3>
              </div>
              <strong>+18,6%</strong>
            </div>
            <svg viewBox="0 0 640 220" className="performance-line-chart" aria-hidden="true">
              <path d={areaPath(trendSeries)} className="performance-line-area" />
              <path d={trendPath(trendSeries)} className="performance-line-path" />
            </svg>
            <div className="performance-axis">
              {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </section>

          <section className="performance-panel performance-panel-md">
            <div className="performance-panel-head">
              <div>
                <span>Cliques x vendas</span>
                <h3>Leitura comparativa por dia</h3>
              </div>
            </div>
            <div className="performance-compare-bars">
              {clicksVsSales.map((item) => (
                <div key={item.label} className="performance-compare-row">
                  <small>{item.label}</small>
                  <div className="performance-compare-track">
                    <span className="is-clicks" style={{ width: `${item.clicks}%` }} />
                    <span className="is-sales" style={{ width: `${item.sales * 2.2}%` }} />
                  </div>
                  <strong>{item.sales} vendas</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="performance-panel performance-panel-md">
            <div className="performance-panel-head">
              <div>
                <span>Comissão gerada</span>
                <h3>Área acumulada por período</h3>
              </div>
              <strong>R$ 4.280</strong>
            </div>
            <svg viewBox="0 0 640 220" className="performance-area-chart" aria-hidden="true">
              <path d={areaPath(commissionSeries)} className="performance-area-fill" />
              <path d={trendPath(commissionSeries)} className="performance-area-line" />
            </svg>
            <div className="performance-axis">
              {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"].map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </section>

          <section className="performance-panel performance-panel-lg">
            <div className="performance-panel-head">
              <div>
                <span>Conversão por produto</span>
                <h3>Comparativo de eficiência comercial</h3>
              </div>
            </div>
            <div className="performance-product-bars">
              {conversionByProduct.map((item) => (
                <div key={item.label} className="performance-product-row">
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.sales} vendas no período</small>
                  </div>
                  <div className="performance-product-track">
                    <span className={`tone-${item.tone}`} style={{ width: `${item.rate * 10}%` }} />
                  </div>
                  <strong>{item.rate}%</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="performance-panel performance-panel-lg">
            <div className="performance-panel-head">
              <div>
                <span>Compare seu desempenho</span>
                <h3>Produto, período e benchmark</h3>
              </div>
            </div>
            <div className="performance-comparison-grid">
              {compareCards.map((item) => (
                <article key={item.title} className={`performance-comparison-card tone-${item.tone}`}>
                  <span>{item.title}</span>
                  <div className="performance-comparison-values">
                    <div>
                      <small>{item.leftLabel}</small>
                      <strong>{item.leftValue}</strong>
                    </div>
                    <div>
                      <small>{item.rightLabel}</small>
                      <strong>{item.rightValue}</strong>
                    </div>
                  </div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="performance-panel performance-panel-xl">
            <div className="performance-panel-head">
              <div>
                <span>Métricas por produto</span>
                <h3>Tabela operacional</h3>
              </div>
            </div>
            <div className="performance-table">
              <div className="performance-table-head">
                <span>Produto</span>
                <span>Campanha</span>
                <span>Cliques</span>
                <span>Vendas</span>
                <span>Conversão</span>
                <span>Comissão</span>
                <span>Origem</span>
              </div>
              <div className="performance-table-body">
                {productRows.map((row) => (
                  <article key={row.product} className="performance-table-row">
                    <strong>{row.product}</strong>
                    <span>{row.campaign}</span>
                    <span>{row.clicks}</span>
                    <span>{row.sales}</span>
                    <span>{row.conversion}</span>
                    <span>{row.commission}</span>
                    <span>{row.origin}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="performance-panel performance-panel-xl">
            <div className="performance-panel-head">
              <div>
                <span>Kanban de oportunidades e resultados</span>
                <h3>Pipeline visual do que merece atenção</h3>
              </div>
            </div>
            <div className="performance-kanban">
              {kanbanColumns.map((column) => (
                <div key={column.title} className={`performance-kanban-column tone-${column.tone}`}>
                  <div className="performance-kanban-head">
                    <strong>{column.title}</strong>
                    <small>{column.meta}</small>
                  </div>
                  <div className="performance-kanban-stack">
                    {column.cards.map((card) => (
                      <article key={card.title} className="performance-kanban-card">
                        <span>{card.metric}</span>
                        <strong>{card.title}</strong>
                        <small>{card.note}</small>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="performance-side-grid">
          <section className="performance-panel">
            <div className="performance-panel-head">
              <div>
                <span>Origem das indicações</span>
                <h3>Gráfico de rosca</h3>
              </div>
            </div>
            <div className="performance-donut-wrap">
              <div className="performance-donut-chart" style={{ background: `conic-gradient(${donutStops})` }}>
                <div className="performance-donut-center">
                  <strong>512</strong>
                  <small>indicações</small>
                </div>
              </div>
              <div className="performance-donut-legend">
                {sourceSegments.map((item) => (
                  <div key={item.label} className="performance-donut-item">
                    <span className={`tone-${item.tone}`} />
                    <strong>{item.label}</strong>
                    <small>{item.value}%</small>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="performance-panel">
            <div className="performance-panel-head">
              <div>
                <span>Funil de conversão</span>
                <h3>Visualizações até comissão</h3>
              </div>
            </div>
            <div className="performance-funnel">
              {funnelStages.map((stage) => (
                <article key={stage.label} className={`performance-funnel-stage tone-${stage.tone}`}>
                  <div className="performance-funnel-bar" style={{ width: `${stage.percent}%` }} />
                  <span>{stage.label}</span>
                  <strong>{stage.value}</strong>
                  <small>{stage.detail}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="performance-panel">
            <div className="performance-panel-head">
              <div>
                <span>Ranking e campanhas</span>
                <h3>Melhores resultados do período</h3>
              </div>
            </div>
            <div className="performance-ranking-list">
              {campaignRanking.map((item, index) => (
                <article key={item.name} className="performance-ranking-item">
                  <span className={`performance-ranking-position tone-${item.tone}`}>{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <strong>{item.result}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="performance-panel">
            <div className="performance-panel-head">
              <div>
                <span>Meta x resultado</span>
                <h3>Barras de progresso</h3>
              </div>
            </div>
            <div className="performance-goals">
              {goals.map((goal) => (
                <div key={goal.label} className="performance-goal-row">
                  <div className="performance-goal-head">
                    <strong>{goal.label}</strong>
                    <small>
                      {goal.current} / {goal.target}
                    </small>
                  </div>
                  <div className="performance-goal-track">
                    <span className={`tone-${goal.tone}`} style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="performance-panel">
            <div className="performance-panel-head">
              <div>
                <span>Insights automáticos e recomendações</span>
                <h3>Leituras acionáveis</h3>
              </div>
            </div>
            <div className="performance-insights">
              {insights.map((insight) => (
                <article key={insight.title} className={`performance-insight-card tone-${insight.tone}`}>
                  <span>{insight.badge}</span>
                  <strong>{insight.title}</strong>
                  <small>{insight.text}</small>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  );
}

function MissoesLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-orange" />
      <section className="layout-missoes">
        <div className="mission-ladder">
          {section.cards.map((card, index) => (
            <article key={card.title} className="mission-step">
              <div className="mission-step-number">0{index + 1}</div>
              <div className="mission-step-card">
                <strong>{card.title}</strong>
                <p>{card.subtitle}</p>
                <span>{card.meta}</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="stack-panels">
          <MetricsStrip section={section} className="metrics-grid-single-column" />
          <FeedPanel section={section} />
          <InsightPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function RankingLayout({ section }: { section: SectionConfig }) {
  const podiumCards = section.cards.slice(0, 3);
  const leaderboardCards = section.cards.slice(3);

  return (
    <>
      <HeroBlock section={section} className="hero-panel-compact" />
      <section className="layout-ranking">
        <div className="podium-board">
          <article className={`podium-card podium-second accent-${podiumCards[1].accent}`}>
            <span className="podium-rank-badge">2</span>
            <div className="podium-avatar-shell podium-avatar-shell-secondary">
              <ManagedMedia
                alt={podiumCards[1].title}
                sizeLabel="512 x 512"
                src={podiumCards[1].image}
                className="managed-media-ranking-avatar managed-media-fit-contain"
                tone="soft"
              />
            </div>
            <span className="podium-label">{podiumCards[1].eyebrow}</span>
            <strong>{podiumCards[1].title}</strong>
            <small>{podiumCards[1].subtitle}</small>
            <p className="podium-meta">{podiumCards[1].meta}</p>
          </article>
          <article className={`podium-card podium-first accent-${podiumCards[0].accent}`}>
            <span className="podium-rank-badge podium-rank-badge-first">1</span>
            <div className="podium-crown" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="podium-avatar-shell podium-avatar-shell-first">
              <ManagedMedia
                alt={podiumCards[0].title}
                sizeLabel="512 x 512"
                src={podiumCards[0].image}
                className="managed-media-ranking-avatar managed-media-fit-contain"
                tone="soft"
              />
            </div>
            <span className="podium-label">{podiumCards[0].eyebrow}</span>
            <strong>{podiumCards[0].title}</strong>
            <small>{podiumCards[0].subtitle}</small>
            <p className="podium-meta">{podiumCards[0].meta}</p>
          </article>
          <article className={`podium-card podium-third accent-${podiumCards[2].accent}`}>
            <span className="podium-rank-badge">3</span>
            <div className="podium-avatar-shell podium-avatar-shell-tertiary">
              <ManagedMedia
                alt={podiumCards[2].title}
                sizeLabel="512 x 512"
                src={podiumCards[2].image}
                className="managed-media-ranking-avatar managed-media-fit-contain"
                tone="soft"
              />
            </div>
            <span className="podium-label">{podiumCards[2].eyebrow}</span>
            <strong>{podiumCards[2].title}</strong>
            <small>{podiumCards[2].subtitle}</small>
            <p className="podium-meta">{podiumCards[2].meta}</p>
          </article>
        </div>
        <div className="ranking-grid">
          <section className="ranking-list-panel">
            <SectionHeader eyebrow={section.eyebrow} title="Quem está subindo agora" description={section.spotlightDescription} />
            <div className="ranking-list">
              {leaderboardCards.map((card, index) => (
                <article key={card.title} className={`ranking-list-item accent-${card.accent}`}>
                  <span className="ranking-list-position">{index + 4}</span>
                  <div className="ranking-list-avatar-shell">
                    <ManagedMedia
                      alt={card.title}
                      sizeLabel="512 x 512"
                      src={card.image}
                      className="managed-media-ranking-list-avatar managed-media-fit-contain"
                      tone="soft"
                    />
                  </div>
                  <div className="ranking-list-copy">
                    <span className="ranking-list-eyebrow">{card.eyebrow}</span>
                    <strong>{card.title}</strong>
                    <p>{card.subtitle}</p>
                    <small>{card.meta}</small>
                  </div>
                  <div className="ranking-list-badge">
                    <span>{card.badge}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <aside className="stack-panels">
            <FeedPanel section={section} />
            <InsightPanel section={section} />
            <SystemPanel section={section} />
          </aside>
        </div>
      </section>
    </>
  );
}

function SorteiosLayout({ section }: { section: SectionConfig }) {
  const liveDraw = section.cards[0];
  const upcomingDraws = section.cards.slice(1, 5);
  const prizeCards = section.cards.slice(4, 8);
  const liveBalls = ["08", "14", "22", "31", "47", "59"];
  const winners = [
    {
      name: "Marina Lopes",
      prize: "Kit Creator Premium",
      type: "Sorteio de produtos",
      date: "Hoje • 19:52",
      result: "Ticket #184",
      avatar: "/images/user-avatar-09-v1.png",
      tone: "orange"
    },
    {
      name: "Rafael Mota",
      prize: "R$ 500 em créditos",
      type: "Sorteio de dinheiro/créditos",
      date: "Hoje • 18:40",
      result: "Ticket #072",
      avatar: "/images/user-avatar-10-v1.png",
      tone: "green"
    },
    {
      name: "Camila Prado",
      prize: "Cupom Clubão 100%",
      type: "Sorteio de cupons",
      date: "Ontem • 21:10",
      result: "Ticket #265",
      avatar: "/images/user-avatar-11-v1.png",
      tone: "blue"
    },
    {
      name: "Lucas Nery",
      prize: "2.000 pontos",
      type: "Sorteio de pontos",
      date: "Ontem • 19:30",
      result: "Ticket #418",
      avatar: "/images/user-avatar-12-v1.png",
      tone: "violet"
    }
  ];
  const history = [
    {
      title: "Sorteio relâmpago",
      prize: "Bônus surpresa de 15 min",
      winner: "Bianca Teixeira",
      participants: "480",
      date: "Hoje • 22:15",
      status: "Encerrado",
      tone: "orange"
    },
    {
      title: "Sorteio exclusivo para membros",
      prize: "Pacote insider do mês",
      winner: "Pedro Lisboa",
      participants: "268",
      date: "Sábado • 10:00",
      status: "Próximo",
      tone: "blue"
    },
    {
      title: "Sorteio por missões",
      prize: "Entrada bônus por meta concluída",
      winner: "Juliana Campos",
      participants: "730",
      date: "Domingo • 17:00",
      status: "Próximo",
      tone: "violet"
    },
    {
      title: "Sorteio mensal",
      prize: "Pacote mensal premium",
      winner: "Fernanda Luz",
      participants: "2.804",
      date: "Dia 30 • 20:00",
      status: "Próximo",
      tone: "green"
    },
    {
      title: "Mega sorteio",
      prize: "Setup completo de creator",
      winner: "A definir",
      participants: "4.560",
      date: "Dia 01 • 21:30",
      status: "Próximo",
      tone: "orange"
    }
  ];

  return (
    <>
      <section className="layout-sorteios-top">
        <div className="sorteios-command">
          <div className="sorteios-command-copy">
            <span>{section.eyebrow}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <div className="sorteios-filter-row">
              {section.filters.map((filter, index) => (
                <button key={filter} type="button" className={`sorteios-chip${index === 0 ? " is-active" : ""}`}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="sorteios-highlight-strip">
              <article className="sorteios-highlight-card tone-orange">
                <span>AO VIVO</span>
                <strong>{liveDraw.subtitle}</strong>
                <small>{liveDraw.meta}</small>
              </article>
              <article className="sorteios-highlight-card tone-violet">
                <span>Participação</span>
                <strong>+420 tickets por missões</strong>
                <small>Usuários ativos liberaram entradas extras hoje.</small>
              </article>
              <article className="sorteios-highlight-card tone-green">
                <span>Clima do evento</span>
                <strong>Exclusivo e competitivo</strong>
                <small>Prêmios maiores puxando retenção e recorrência.</small>
              </article>
            </div>
          </div>
          <div className="sorteios-command-visual">
            <ManagedMedia alt={section.title} sizeLabel="1600 x 720" src={section.heroImage} className="managed-media-fill sorteios-command-media" />
            <div className="sorteios-command-overlay">
              <span className="sorteios-status-badge is-live">AO VIVO</span>
              <strong>{liveDraw.title}</strong>
              <small>{liveDraw.meta}</small>
              <Link href={section.heroActionHref} className="hero-link-button">
                {section.heroActionLabel}
              </Link>
            </div>
          </div>
        </div>
        <div className="sorteios-kpi-strip">
          {section.metrics.map((metric) => (
            <article key={metric.label} className={`sorteios-kpi-card tone-${metric.tone}`}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="layout-sorteios">
        <div className="sorteios-main-grid">
          <section className="sorteios-panel sorteios-live-panel">
            <div className="sorteios-panel-head">
              <div>
                <span className="sorteios-status-badge is-live">AO VIVO</span>
                <h3>Sorteio acontecendo agora</h3>
              </div>
              <strong>00:03:18</strong>
            </div>
            <div className="sorteios-live-grid">
              <div className="sorteios-live-prize">
                <ManagedMedia
                  alt={liveDraw.subtitle}
                  sizeLabel="1200 x 900"
                  src={liveDraw.image}
                  className="managed-media-fill managed-media-fit-contain sorteios-live-media"
                />
                <div className="sorteios-live-copy">
                  <small>{liveDraw.eyebrow}</small>
                  <strong>{liveDraw.subtitle}</strong>
                  <p>{liveDraw.meta}</p>
                  <div className="sorteios-ticket-row">
                    {liveDraw.facts.map((fact) => (
                      <span key={fact}>{fact}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sorteios-live-stage-card">
                <div className="sorteios-live-counter">
                  <div>
                    <span>Participantes</span>
                    <strong>1.284</strong>
                  </div>
                  <div>
                    <span>Tickets extras</span>
                    <strong>+312</strong>
                  </div>
                  <div>
                    <span>Ganhador</span>
                    <strong>Em apuração</strong>
                  </div>
                </div>
                <div className="sorteios-ball-machine" aria-hidden="true">
                  {liveBalls.map((ball) => (
                    <span key={ball}>{ball}</span>
                  ))}
                </div>
                <button type="button" className="hero-link-button sorteios-primary-cta">
                  {liveDraw.cta}
                </button>
              </div>
            </div>
          </section>

          <section className="sorteios-panel">
            <SectionHeader eyebrow={section.feedTitle} title="Próximos sorteios" description={section.spotlightDescription} />
            <div className="sorteios-upcoming-grid">
              {upcomingDraws.map((card) => (
                <article key={card.title} className={`sorteios-upcoming-card tone-${card.accent}`}>
                  <ManagedMedia
                    alt={card.subtitle}
                    sizeLabel="1200 x 900"
                    src={card.image}
                    className="managed-media-fill managed-media-fit-contain sorteios-upcoming-media"
                  />
                  <div className="sorteios-upcoming-copy">
                    <span className="sorteios-status-badge is-upcoming">{card.badge}</span>
                    <strong>{card.title}</strong>
                    <p>{card.subtitle}</p>
                    <small>{card.meta}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel sorteios-panel-wide" id="tipos-de-sorteio">
            <SectionHeader eyebrow={section.spotlightTitle} title="Todos os formatos de sorteio" description={section.description} />
            <div className="sorteios-types-grid">
              {section.cards.map((card) => (
                <article key={card.title} className={`sorteios-type-card tone-${card.accent}`}>
                  <ManagedMedia
                    alt={card.subtitle}
                    sizeLabel="1200 x 900"
                    src={card.image}
                    className="managed-media-fill managed-media-fit-contain sorteios-type-media"
                  />
                  <div className="sorteios-type-copy">
                    <div className="sorteios-type-top">
                      <span>{card.title}</span>
                      <small className={`sorteios-status-badge ${card.badge === "AO VIVO" ? "is-live" : card.badge === "ENCERRADO" ? "is-ended" : "is-upcoming"}`}>
                        {card.badge}
                      </small>
                    </div>
                    <strong>{card.subtitle}</strong>
                    <p>{card.meta}</p>
                    <div className="sorteios-chip-mini-row">
                      {card.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                      ))}
                    </div>
                    <button type="button" className="sorteios-card-action">
                      {card.cta}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel">
            <SectionHeader eyebrow="Últimos ganhadores" title="Quem levou prêmio recentemente" description="Resultados recentes com nome, avatar, prêmio, data e formato do sorteio." />
            <div className="sorteios-winners-grid">
              {winners.map((winner, index) => (
                <article key={winner.name} className={`sorteios-winner-card tone-${winner.tone}`}>
                  <span className="sorteios-winner-position">#{index + 1}</span>
                  <ManagedMedia
                    alt={winner.name}
                    sizeLabel="512 x 512"
                    src={winner.avatar}
                    className="managed-media-ranking-list-avatar managed-media-fit-contain"
                    tone="soft"
                  />
                  <div className="sorteios-winner-copy">
                    <strong>{winner.name}</strong>
                    <p>{winner.prize}</p>
                    <small>
                      {winner.type} • {winner.date}
                    </small>
                  </div>
                  <span className="sorteios-winner-result">{winner.result}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel sorteios-panel-wide">
            <SectionHeader eyebrow="Histórico de sorteios" title="Rodadas realizadas e próximas entradas" description="Uma leitura visual do que já aconteceu e do que está para acontecer." />
            <div className="sorteios-history-table">
              <div className="sorteios-history-head">
                <span>Sorteio</span>
                <span>Prêmio</span>
                <span>Ganhador</span>
                <span>Participantes</span>
                <span>Data</span>
                <span>Status</span>
              </div>
              <div className="sorteios-history-body">
                {history.map((item) => (
                  <article key={`${item.title}-${item.date}`} className="sorteios-history-row">
                    <strong>{item.title}</strong>
                    <span>{item.prize}</span>
                    <span>{item.winner}</span>
                    <span>{item.participants}</span>
                    <span>{item.date}</span>
                    <small className={`sorteios-status-badge ${item.status === "Encerrado" ? "is-ended" : "is-upcoming"}`}>{item.status}</small>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="sorteios-side-grid">
          <section className="sorteios-panel">
            <SectionHeader eyebrow="Prêmios disponíveis" title="Pool de premiação" description="Seleção de benefícios, kits, créditos e acessos especiais ativos." />
            <div className="sorteios-prize-stack">
              {prizeCards.map((card) => (
                <article key={card.title} className={`sorteios-prize-card tone-${card.accent}`}>
                  <ManagedMedia
                    alt={card.subtitle}
                    sizeLabel="1200 x 900"
                    src={card.image}
                    className="managed-media-fill managed-media-fit-contain sorteios-prize-media"
                  />
                  <div>
                    <strong>{card.subtitle}</strong>
                    <p>{card.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel">
            <SectionHeader eyebrow={section.insightTitle} title="Status e sinais do momento" description="Indicadores rápidos para manter a central viva." />
            <div className="sorteios-insight-grid">
              {section.insights.map((item) => (
                <article key={item.label} className={`sorteios-insight-card tone-${item.tone}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel">
            <SectionHeader eyebrow="Agenda" title="Entradas que merecem atenção" description="Próximos horários e prioridades do dia." />
            <div className="sorteios-agenda-list">
              {section.feed.map((item) => (
                <article key={item.title} className="sorteios-agenda-item">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.meta}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="sorteios-panel">
            <SectionHeader eyebrow={section.systemTitle} title="Regras e estrutura" description="O que sustenta a experiência de sorteios dentro da plataforma." />
            <ul className="sorteios-rules-list">
              {section.systemPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </>
  );
}

function RecompensasLayout({ section }: { section: SectionConfig }) {
  return (
    <>
      <HeroBlock section={section} className="hero-panel-soft-green" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-recompensas">
        <div className="reward-catalog">
          <div className="cards-grid cards-grid-three">
            {section.cards.map((card) => (
              <MediaCard key={card.title} card={card} />
            ))}
          </div>
        </div>
        <aside className="stack-panels reward-side">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </aside>
      </section>
    </>
  );
}

function NotificacoesLayout({ section }: { section: SectionConfig }) {
  const [priorityCard, ...secondaryCards] = section.cards;
  const urgentMetrics = section.metrics.slice(0, 3);

  return (
    <>
      <HeroBlock section={section} className="hero-panel-soft-blue" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-notificacoes">
        <div className="notification-command">
          <article className={`notification-priority-card accent-${priorityCard.accent}`}>
            <div className="notification-priority-copy">
              <span className="notification-priority-tag">{priorityCard.eyebrow}</span>
              <h3>{priorityCard.title}</h3>
              <p>{priorityCard.subtitle}</p>
              <strong>{priorityCard.meta}</strong>
              <div className="notification-priority-actions">
                {priorityCard.ctaHref || section.heroActionHref ? (
                  <Link href={priorityCard.ctaHref ?? section.heroActionHref} className="media-card-button">
                    {priorityCard.cta}
                  </Link>
                ) : (
                  <button type="button">{priorityCard.cta}</button>
                )}
                <span className="notification-priority-badge">{priorityCard.badge}</span>
              </div>
              <div className="notification-priority-highlights">
                {urgentMetrics.map((metric) => (
                  <article key={metric.label} className={`notification-priority-stat tone-${metric.tone}`}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.detail}</small>
                  </article>
                ))}
              </div>
            </div>
            <div className="notification-priority-media">
              <ManagedMedia
                alt={priorityCard.title}
                sizeLabel="1200 x 900"
                src={priorityCard.image}
                className="managed-media-fill managed-media-fit-contain"
                tone="soft"
              />
            </div>
          </article>

          <aside className="notification-command-side">
            <section className="notification-filter-panel">
              <div className="notification-panel-head">
                <h3>Leitura da central</h3>
                <span>Priorize rápido</span>
              </div>
              <div className="notification-filter-chip-grid">
                {section.filters.map((filter) => (
                  <span key={filter} className="notification-filter-chip">
                    {filter}
                  </span>
                ))}
              </div>
            </section>

            <section className="notification-mini-feed-panel">
              <div className="notification-panel-head">
                <h3>Próximas ações</h3>
                <span>Fila inteligente</span>
              </div>
              <div className="notification-mini-feed">
                {section.feed.map((item) => (
                  <article key={item.title} className="notification-mini-feed-item">
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    <span>{item.meta}</span>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="notification-queue-grid">
          {secondaryCards.map((card) => (
            <MediaCard key={card.title} card={{ ...card, coverFit: "contain", ctaHref: card.ctaHref ?? section.heroActionHref }} />
          ))}
        </div>

        <div className="notification-bottom-grid">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </div>
      </section>
    </>
  );
}

function PerfilLayout({ section }: { section: SectionConfig }) {
  const [accountCard, statsCard, securityCard] = section.cards;

  return (
    <>
      <HeroBlock section={section} className="hero-panel-soft-violet" />
      <MetricsStrip section={section} className="metrics-grid-tight" />
      <section className="layout-perfil">
        <div className="profile-command">
          <article className="profile-identity-card">
            <div className="profile-identity-head">
              <div className="profile-avatar-shell">
                <span>F</span>
              </div>
              <div className="profile-identity-copy">
                <span className="profile-identity-kicker">{section.heroTag}</span>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </div>

            <div className="profile-chip-cloud">
              {section.filters.map((filter) => (
                <span key={filter} className="profile-chip">
                  {filter}
                </span>
              ))}
            </div>

            <div className="profile-highlight-grid">
              {section.insights.map((item) => (
                <article key={item.label} className={`profile-highlight-card tone-${item.tone}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="profile-identity-actions">
              <Link href={section.heroActionHref} className="hero-link-button">
                {section.heroActionLabel}
              </Link>
              <span className="profile-level-pill">Status premium ativo</span>
            </div>
          </article>

          <aside className="profile-command-side">
            <article className="profile-focus-card">
              <div className="profile-side-head">
                <h3>{statsCard.title}</h3>
                <span>{statsCard.badge}</span>
              </div>
              <p>{statsCard.subtitle}</p>
              <strong>{statsCard.meta}</strong>
              <ul className="profile-side-list">
                {statsCard.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <Link href={statsCard.ctaHref ?? section.heroActionHref} className="media-card-button">
                {statsCard.cta}
              </Link>
            </article>

            <article className="profile-security-card">
              <div className="profile-side-head">
                <h3>{securityCard.title}</h3>
                <span>{securityCard.badge}</span>
              </div>
              <p>{securityCard.subtitle}</p>
              <div className="profile-security-points">
                {securityCard.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
              <Link href={securityCard.ctaHref ?? section.heroActionHref} className="media-card-button">
                {securityCard.cta}
              </Link>
            </article>
          </aside>
        </div>

        <div className="profile-detail-grid">
          <MediaCard key={accountCard.title} card={{ ...accountCard, coverFit: "contain", ctaHref: accountCard.ctaHref ?? section.heroActionHref }} />
          <MediaCard key={statsCard.title} card={{ ...statsCard, coverFit: "contain", ctaHref: statsCard.ctaHref ?? section.heroActionHref }} />
          <MediaCard key={securityCard.title} card={{ ...securityCard, coverFit: "contain", ctaHref: securityCard.ctaHref ?? section.heroActionHref }} />
        </div>

        <div className="profile-support-grid">
          <FeedPanel section={section} />
          <InsightPanel section={section} />
          <SystemPanel section={section} />
        </div>
      </section>
    </>
  );
}

function renderSectionLayout(
  sectionKey: SectionKey,
  section: SectionConfig,
  options?: {
    productCatalogOpen?: boolean;
    productCatalogFilter?: string;
    mentorshipFilter?: string;
    catalogProducts?: ProductRecord[];
    clubOffers?: any[];
    couponRedemptions?: CouponRedemptionRecord[];
  }
) {
  switch (sectionKey) {
    case "home":
      return <HomeLayout section={section} />;
    case "lives":
      return <LivesLayout section={section} />;
    case "produtos":
      return (
        <ProdutosLayout
          section={section}
          catalogProducts={options?.catalogProducts ?? []}
          productCatalogOpen={options?.productCatalogOpen}
          productCatalogFilter={options?.productCatalogFilter}
        />
      );
    case "mentorias":
      return <MentoriasLayout section={section} selectedFilter={options?.mentorshipFilter} />;
    case "clubao":
      return <ClubaoLayout section={section} offers={options?.clubOffers ?? []} couponRedemptions={options?.couponRedemptions ?? []} />;
    case "empresas":
      return <EmpresasLayout section={section} />;
    case "listas":
      return <ListasLayout section={section} />;
    case "indicacoes":
      return <IndicacoesLayout section={section} />;
    case "oportunidades":
      return <OpportunitiesLayout section={section} />;
    case "campanhas":
      return <CampanhasLayout section={section} />;
    case "divulgue":
      return <DivulgueLayout section={section} />;
    case "missoes":
      return <MissoesLayout section={section} />;
    case "ranking":
      return <RankingLayout section={section} />;
    case "recompensas":
      return <RecompensasLayout section={section} />;
    case "sorteios":
      return <SorteiosLayout section={section} />;
    case "minha-renda":
      return <MinhaRendaLayout section={section} />;
    case "desempenho":
      return <DesempenhoLayout section={section} />;
    case "notificacoes":
      return <NotificacoesLayout section={section} />;
    case "perfil":
      return <PerfilLayout section={section} />;
    default:
      return <HomeLayout section={section} />;
  }
}

export async function Dashboard({
  sectionKey,
  productCatalogOpen = false,
  productCatalogFilter = "Todos",
  mentorshipFilter = "Todas"
}: {
  sectionKey: SectionKey;
  productCatalogOpen?: boolean;
  productCatalogFilter?: string;
  mentorshipFilter?: string;
}) {
  // #region debug-point D:E:dashboard-enter
  void __debugEmit("D", "components/dashboard.tsx:Dashboard:enter", "Dashboard SSR iniciado", {
    sectionKey,
    productCatalogOpen,
    productCatalogFilter,
    mentorshipFilter
  });
  // #endregion

  let sections: Record<SectionKey, SectionConfig> | null = null;
  let publishedProducts: ProductRecord[] = [];
  let snapshot: Awaited<ReturnType<typeof getPlatformSnapshot>> | null = null;

  try {
    // #region debug-point D:E:dashboard-promise-all-start
    void __debugEmit("D", "components/dashboard.tsx:Dashboard:promiseAll:start", "Promise.all carregando dados", {});
    // #endregion
    const loaded = await Promise.all([
      buildUserDashboardSections(),
      getPublishedProducts(),
      getPlatformSnapshot()
    ]);
    sections = loaded[0];
    publishedProducts = Array.isArray(loaded[1]) ? loaded[1] : [];
    snapshot = loaded[2];
    // #region debug-point D:E:dashboard-promise-all-success
    void __debugEmit("D", "components/dashboard.tsx:Dashboard:promiseAll:success", "Dados carregados", {
      sectionsKeys: sections && typeof sections === "object" ? Object.keys(sections).length : -1,
      publishedProductsCount: publishedProducts.length,
      snapshotIsNull: snapshot === null || snapshot === undefined,
      snapshotClubOffersIsArray: Array.isArray((snapshot as any)?.clubOffers),
      snapshotClubOffersLength: Array.isArray((snapshot as any)?.clubOffers) ? (snapshot as any).clubOffers.length : -1,
      snapshotCouponIsArray: Array.isArray((snapshot as any)?.couponRedemptions),
      snapshotCouponLength: Array.isArray((snapshot as any)?.couponRedemptions) ? (snapshot as any).couponRedemptions.length : -1
    });
    // #endregion
  } catch (error) {
    // #region debug-point D:E:dashboard-promise-all-error
    void __debugEmit("D", "components/dashboard.tsx:Dashboard:promiseAll:error", "Erro no carregamento de dados", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    // #endregion
    throw error;
  }

  if (!sections || typeof sections !== "object") {
    // #region debug-point D:E:dashboard-sections-invalid
    void __debugEmit("D", "components/dashboard.tsx:Dashboard:sections:invalid", "sections não é objeto válido", {
      sectionsType: typeof sections,
      sectionsIsNull: sections === null
    });
    // #endregion
    throw new Error("Dashboard sections inválidas");
  }

  const section = sections[sectionKey];
  if (!section) {
    // #region debug-point D:E:dashboard-section-missing
    void __debugEmit("D", "components/dashboard.tsx:Dashboard:section:missing", "Seção não encontrada no sections", {
      sectionKey,
      availableKeys: Object.keys(sections)
    });
    // #endregion
    throw new Error(`Seção ${String(sectionKey)} não encontrada");
  }

  const clubOffersSafe = Array.isArray((snapshot as any)?.clubOffers)
    ? (snapshot as any).clubOffers.filter((offer: any) => offer?.status === "PUBLICADO")
    : [];
  const couponRedemptionsSafe = Array.isArray((snapshot as any)?.couponRedemptions)
    ? (snapshot as any).couponRedemptions
    : [];
  const publishedProductsSafe = Array.isArray(publishedProducts) ? publishedProducts : [];

  // #region debug-point D:E:dashboard-layout-start
  void __debugEmit("D", "components/dashboard.tsx:Dashboard:layout:start", "Iniciando render do layout", {
    sectionKey,
    sectionLabel: (section as any)?.label ?? null,
    clubOffersSafeCount: clubOffersSafe.length,
    couponRedemptionsCount: couponRedemptionsSafe.length,
    productsCount: publishedProductsSafe.length
  });
  // #endregion

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div>
            <p className="brand-title">FG EXACTA</p>
            <p className="brand-subtitle">platform</p>
          </div>
        </div>

        <div className="workspace-card">
          <div className="workspace-avatar">F</div>
          <div className="workspace-copy">
            <strong>Meu espaço</strong>
            <span>Membro Pro</span>
          </div>
        </div>

        {navGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <span className="sidebar-label">{group.label}</span>
            <nav className="sidebar-nav" aria-label={group.label}>
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.key === "home" ? "/" : `/${item.key}`}
                  className={`nav-item${item.key === sectionKey ? " is-active" : ""}`}
                >
                  <span className="nav-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="sidebar-card">
          <p className="sidebar-card-label">Ciclo da plataforma</p>
          <strong>Descobrir → Aprender → Executar</strong>
          <span>Depois isso volta como ganho, desempenho, ranking, recompensa e nova oportunidade.</span>
        </div>

        <LogoutButton />
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">FG EXACTA / {section.label.toUpperCase()}</p>
            <h1>{section.label}</h1>
          </div>
          <div className="topbar-actions">
            <label className="search-field" htmlFor="global-search">
              <SearchIcon />
              <input id="global-search" type="text" placeholder="Buscar na plataforma..." />
            </label>
            <button type="button" className="icon-button" aria-label="Notificações">
              <Icon name="bell" />
            </button>
            <Link href="/perfil" className="profile-chip">
              Felipe
            </Link>
          </div>
        </header>

        {renderSectionLayout(sectionKey, section, {
          productCatalogOpen,
          productCatalogFilter,
          mentorshipFilter,
          catalogProducts: publishedProductsSafe,
          clubOffers: clubOffersSafe,
          couponRedemptions: couponRedemptionsSafe
        })}

        <footer className="content-footer">
          <div>
            <strong>Ecossistema conectado</strong>
            <p>
              O usuário entra na Home, descobre uma Live, encontra um produto, acessa os materiais, gera resultado,
              acompanha renda e desempenho, conclui missão, sobe no ranking e destrava novas oportunidades.
            </p>
          </div>
          <nav className="footer-nav">
            {sectionOrder.slice(0, 6).map((item) => (
              <Link key={item} href={item === "home" ? "/" : `/${item}`}>
                {sections[item].label}
              </Link>
            ))}
          </nav>
        </footer>
      </main>
    </div>
  );
}
