"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { dashboardSections, navGroups, type IconName, type SectionKey } from "@/lib/dashboard-data";

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
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 13V9l10-4v12L4 13z" />
          <path d="M14 9h4.5a1.5 1.5 0 0 1 0 3H14" />
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
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v11H4z" />
          <path d="M4 10h16" />
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
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4z" />
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

export function ClientShell({
  activeSection,
  title,
  breadcrumb,
  children
}: {
  activeSection: SectionKey;
  title: string;
  breadcrumb: string;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div>
            <p className="brand-title">FG EXACTA</p>
            <p className="brand-subtitle">platform</p>
          </div>
        </div>

        {navGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <span className="sidebar-label">{group.label}</span>
            <nav className="sidebar-nav" aria-label={group.label}>
              {group.items
                .filter((item) => item.key !== "ranking")
                .map((item) => (
                <Link
                  key={item.key}
                  href={item.key === "home" ? "/" : `/${item.key}`}
                  className={`nav-item${item.key === activeSection ? " is-active" : ""}`}
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
            <p className="breadcrumb">{breadcrumb}</p>
            <h1>{title}</h1>
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

        {children}

        <footer className="content-footer">
          <div>
            <strong>{dashboardSections[activeSection].label}</strong>
            <p>Esta camada aprofunda a ação principal do menu sem quebrar o fluxo do painel.</p>
          </div>
          <nav className="footer-nav">
            <Link href={activeSection === "home" ? "/" : `/${activeSection}`}>Voltar ao menu</Link>
            <Link href="/oportunidades">Oportunidades</Link>
            <Link href="/campanhas">Campanhas</Link>
            <Link href="/desempenho">Desempenho</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
