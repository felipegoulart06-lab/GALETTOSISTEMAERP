import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { ManagedMedia } from "@/components/managed-media";
import {
  adminNavGroups,
  adminSectionOrder,
  adminSections,
  type AdminIconName,
  type AdminSectionConfig,
  type AdminSectionKey
} from "@/lib/admin-data";

function AdminIcon({ name }: { name: AdminIconName }) {
  switch (name) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.7-3 8.5-7 10-4-1.5-7-5.3-7-10V6l7-3z" />
          <path d="M9.5 12l1.7 1.7L14.8 10" />
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
    case "inbox":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v10H4z" />
          <path d="M4 14h4l2 3h4l2-3h4" />
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
    case "crm":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16" />
          <path d="M4 12h10" />
          <path d="M4 19h16" />
          <path d="M17 9l2 3-2 3" />
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
    case "money":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8" />
          <path d="M9.5 10.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19h16" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-7" />
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
    case "team":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <path d="M16.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <path d="M3.5 19a4 4 0 0 1 8 0" />
          <path d="M12.5 19a4 4 0 0 1 8 0" />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" />
          <path d="M8 11V8.5A4 4 0 0 1 12 4.5A4 4 0 0 1 16 8.5V11" />
        </svg>
      );
    case "log":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h12v16H6z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5z" />
          <path d="M4 12h2.2" />
          <path d="M17.8 12H20" />
          <path d="M12 4v2.2" />
          <path d="M12 17.8V20" />
          <path d="M6.3 6.3l1.5 1.5" />
          <path d="M16.2 16.2l1.5 1.5" />
          <path d="M17.7 6.3l-1.5 1.5" />
          <path d="M7.8 16.2l-1.5 1.5" />
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

function AdminMetricCard({ label, value, change, tone }: AdminSectionConfig["metrics"][number]) {
  return (
    <article className={`admin-metric-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{change}</small>
    </article>
  );
}

function AdminBoardItem({ item }: { item: AdminSectionConfig["primaryItems"][number] }) {
  return (
    <article className="admin-board-item">
      <div className="admin-item-identity">
        {item.avatar ? (
          <ManagedMedia
            alt={item.title}
            sizeLabel="512 x 512"
            src={item.avatar}
            className="managed-media-admin-table-avatar"
            tone="soft"
          />
        ) : null}
        <div>
          <strong>{item.title}</strong>
          <p>{item.subtitle}</p>
        </div>
      </div>
      <div className="admin-board-meta">
        <span>{item.meta}</span>
        <mark>{item.status}</mark>
      </div>
    </article>
  );
}

function AdminHero({ section }: { section: AdminSectionConfig }) {
  return (
    <section className="admin-hero admin-hero-dark">
      <div>
        <span>{section.eyebrow}</span>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      <div className="admin-hero-performance">
        <small>Leitura operacional</small>
        <strong>{section.metrics[0]?.value ?? "0"}</strong>
        <span>{section.heroNotice}</span>
      </div>
    </section>
  );
}

function SummaryLayout({ section }: { section: AdminSectionConfig }) {
  return (
    <>
      <AdminHero section={section} />
      <section className="admin-metrics-grid admin-metrics-grid-large">
        {section.metrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="admin-summary-grid">
        <div className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.boardTitle}</p>
              <h3>{section.boardDescription}</h3>
            </div>
          </div>
          <div className="admin-board-stack">
            {section.primaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </div>
        <aside className="admin-side-stack">
          <div className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p>{section.secondaryTitle}</p>
                <h3>Radar administrativo</h3>
              </div>
            </div>
            <div className="admin-mini-stack">
              {section.secondaryItems.map((item) => (
                <AdminBoardItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function TableLayout({
  section,
  tableTitle,
  tableColumns
}: {
  section: AdminSectionConfig;
  tableTitle: string;
  tableColumns: [string, string, string, string];
}) {
  return (
    <>
      <AdminHero section={section} />
      <section className="admin-metrics-grid">
        {section.metrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="admin-finance-grid">
        <div className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.boardTitle}</p>
              <h3>{tableTitle}</h3>
            </div>
            <span>{section.boardDescription}</span>
          </div>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>{tableColumns[0]}</span>
              <span>{tableColumns[1]}</span>
              <span>{tableColumns[2]}</span>
              <span>{tableColumns[3]}</span>
            </div>
            {section.primaryItems.map((item) => (
              <div key={item.title} className="admin-table-row">
                <div className="admin-item-identity">
                  {item.avatar ? (
                    <ManagedMedia
                      alt={item.title}
                      sizeLabel="512 x 512"
                      src={item.avatar}
                      className="managed-media-admin-table-avatar"
                      tone="soft"
                    />
                  ) : null}
                  <strong>{item.title}</strong>
                </div>
                <span>{item.subtitle}</span>
                <span>{item.meta}</span>
                <mark>{item.status}</mark>
              </div>
            ))}
          </div>
        </div>
        <aside className="admin-side-stack">
          <div className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p>{section.secondaryTitle}</p>
                <h3>Leitura lateral</h3>
              </div>
            </div>
            <div className="admin-mini-stack">
              {section.secondaryItems.map((item) => (
                <AdminBoardItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function CatalogLayout({ section }: { section: AdminSectionConfig }) {
  return (
    <>
      <AdminHero section={section} />
      <section className="admin-products-layout admin-products-layout-wide">
        <aside className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.boardTitle}</p>
              <h3>Fila prioritaria</h3>
            </div>
          </div>
          <div className="admin-mini-stack">
            {section.primaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </aside>
        <div className="admin-surface">
          <section className="admin-metrics-grid admin-metrics-grid-inline">
            {section.metrics.map((metric) => (
              <AdminMetricCard key={metric.label} {...metric} />
            ))}
          </section>
          <div className="admin-section-head">
            <div>
              <p>{section.secondaryTitle}</p>
              <h3>Configuracoes e sinais</h3>
            </div>
          </div>
          <div className="admin-catalog-grid">
            {section.secondaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PipelineLayout({ section }: { section: AdminSectionConfig }) {
  return (
    <>
      <AdminHero section={section} />
      <section className="admin-metrics-grid">
        {section.metrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="admin-pipeline-grid">
        {section.primaryItems.map((item) => (
          <div key={item.title} className="admin-surface pipeline-column">
            <AdminBoardItem item={item} />
          </div>
        ))}
      </section>
      <section className="admin-summary-grid">
        <div className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.secondaryTitle}</p>
              <h3>Base operacional</h3>
            </div>
          </div>
          <div className="admin-mini-stack">
            {section.secondaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GridStackLayout({ section }: { section: AdminSectionConfig }) {
  return (
    <>
      <AdminHero section={section} />
      <section className="admin-metrics-grid">
        {section.metrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <section className="admin-content-grid admin-content-grid-double">
        <div className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.boardTitle}</p>
              <h3>{section.boardDescription}</h3>
            </div>
          </div>
          <div className="admin-library-stack">
            {section.primaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className="admin-surface">
          <div className="admin-section-head">
            <div>
              <p>{section.secondaryTitle}</p>
              <h3>Estrutura do modulo</h3>
            </div>
          </div>
          <div className="admin-mini-stack">
            {section.secondaryItems.map((item) => (
              <AdminBoardItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderAdminSection(section: AdminSectionConfig) {
  switch (section.key) {
    case "resumo":
      return <SummaryLayout section={section} />;
    case "usuarios":
      return <TableLayout section={section} tableTitle="Tabela de usuarios" tableColumns={["Usuario", "Cadastro e atividade", "Origem", "Status"]} />;
    case "solicitacoes":
      return <TableLayout section={section} tableTitle="Central de solicitacoes" tableColumns={["Solicitacao", "Resumo", "Categoria", "Status"]} />;
    case "produtos":
      return <CatalogLayout section={section} />;
    case "lives":
      return <PipelineLayout section={section} />;
    case "empresas":
      return <PipelineLayout section={section} />;
    case "indicacoes":
      return <TableLayout section={section} tableTitle="Pipeline de indicacoes" tableColumns={["Lead ou regra", "Resumo", "Origem", "Status"]} />;
    case "campanhas":
      return <GridStackLayout section={section} />;
    case "mentorias":
      return <GridStackLayout section={section} />;
    case "clubao":
      return <GridStackLayout section={section} />;
    case "divulgue":
      return <GridStackLayout section={section} />;
    case "missoes":
      return <GridStackLayout section={section} />;
    case "ranking":
      return <GridStackLayout section={section} />;
    case "recompensas":
      return <GridStackLayout section={section} />;
    case "financeiro":
      return <TableLayout section={section} tableTitle="Extrato administrativo" tableColumns={["Usuario ou evento", "Resumo", "Origem", "Status"]} />;
    case "relatorios":
      return <GridStackLayout section={section} />;
    case "notificacoes":
      return <GridStackLayout section={section} />;
    case "equipe":
      return <TableLayout section={section} tableTitle="Equipe e vendedores" tableColumns={["Pessoa", "Resumo", "Area", "Status"]} />;
    case "administradores":
      return <TableLayout section={section} tableTitle="Perfis administrativos" tableColumns={["Perfil", "Escopo", "Nivel", "Status"]} />;
    case "auditoria":
      return <TableLayout section={section} tableTitle="Logs de auditoria" tableColumns={["Acao", "Detalhe", "Contexto", "Resultado"]} />;
    case "configuracoes":
      return <GridStackLayout section={section} />;
    default:
      return <SummaryLayout section={section} />;
  }
}

export function AdminDashboard({ sectionKey }: { sectionKey: AdminSectionKey }) {
  const section = adminSections[sectionKey];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-row">
          <div>
            <p className="brand-title">FG EXACTA</p>
            <p className="brand-subtitle">admin master</p>
          </div>
        </div>

        <div className="workspace-card">
          <div className="workspace-avatar">A</div>
          <div className="workspace-copy">
            <strong>Painel Admin Master</strong>
            <span>Backoffice central</span>
          </div>
        </div>

        {adminNavGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <span className="sidebar-label">{group.label}</span>
            <nav className="sidebar-nav" aria-label={group.label}>
              {group.items.map((item) => {
                const href = item.key === "resumo" ? "/admin" : `/admin/${item.key}`;
                const active = item.key === sectionKey;

                return (
                  <Link key={item.key} href={href} className={`nav-item${active ? " is-active" : ""}`}>
                    <span className="nav-icon">
                      <AdminIcon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        <div className="sidebar-card">
          <p className="sidebar-card-label">Fluxo principal</p>
          <strong>Cadastra • Configura • Aprova • Publica</strong>
          <span>Depois acompanha a acao do usuario, o resultado, a comissao, os pontos e o financeiro.</span>
        </div>

        <LogoutButton />

        <div className="admin-sidebar-footer">
          <div className="admin-profile-card">
            <ManagedMedia
              alt="Filipe Galetto"
              sizeLabel="512 x 512"
              src="/images/admin-filipe-galetto-01-v1.png"
              className="managed-media-admin-avatar"
              tone="soft"
            />
            <div>
              <strong>Filipe Galetto</strong>
              <span>Super Admin • admin@fgexacta.com</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-topbar">
          <div>
            <p className="breadcrumb">FG EXACTA / {section.label.toUpperCase()}</p>
            <h1>{section.label}</h1>
          </div>
          <div className="topbar-actions">
            <label className="search-field" htmlFor="admin-search">
              <SearchIcon />
              <input id="admin-search" type="text" placeholder="Buscar usuario, produto, empresa, lead ou campanha..." />
            </label>
            <button type="button" className="icon-button" aria-label="Notificacoes administrativas">
              <AdminIcon name="bell" />
            </button>
            <div className="admin-avatar-pill">SA</div>
          </div>
        </header>

        {renderAdminSection(section)}

        <footer className="admin-footer">
          <div>
            <strong>Admin Master</strong>
            <p>
              O painel administrativo responde o que esta acontecendo na plataforma inteira e o que precisa ser administrado agora.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Links administrativos">
            {adminSectionOrder.slice(0, 8).map((key) => {
              const item = adminSections[key];
              return (
                <Link key={key} href={key === "resumo" ? "/admin" : `/admin/${key}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </footer>
      </main>
    </div>
  );
}
