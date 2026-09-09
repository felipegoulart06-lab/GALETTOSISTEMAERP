"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import type { CompanyRecord, ReferralServiceRecord } from "@/lib/platform-types";
import type { ReactNode } from "react";

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

function ChipPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "blue" | "orange" | "violet" }) {
  return <span className={"detail-chip chip-" + tone}>{children}</span>;
}

export function ReferralServiceDetailPage({
  service,
  relatedCompany,
  relatedServices
}: {
  service: ReferralServiceRecord;
  relatedCompany?: CompanyRecord;
  relatedServices: ReferralServiceRecord[];
}) {
  const router = useRouter();
  if (!service) {
    return null;
  }
  const accent = "green";
  const rulesSafe = Array.isArray(service.rules) ? service.rules : [];
  const criteriaSafe = Array.isArray(service.criteria) ? service.criteria : [];
  const factsSafe = Array.isArray(service.facts) ? service.facts : [];
  const chipsSafe = Array.isArray(service.chips) ? service.chips : [];
  const relatedSafe = Array.isArray(relatedServices) ? relatedServices.filter((item) => item.id !== service.id).slice(0, 3) : [];

  return (
    <ClientShell
      activeSection="indicacoes"
      title={service.title}
      breadcrumb={"FG EXACTA / INDICAÇÕES / " + service.title.toUpperCase()}
    >
      <section className={"company-hero company-hero-accent-" + accent}>
        <div className="company-hero-background" aria-hidden="true" />
        <div className="company-hero-frame">
          <div className="company-hero-brand">
            <div className="company-hero-logo">
              <ManagedMedia
                alt={"Logo " + String(relatedCompany?.title ?? service.companyName ?? "serviço")}
                sizeLabel="420 x 420"
                src={relatedCompany?.logo ?? service.image}
                className="managed-media-fill managed-media-fit-contain"
              />
            </div>
            <div className="company-hero-identity">
              <div className="company-hero-tags">
                <span className={"tag-accent tag-accent-" + accent}>Serviço de indicação</span>
                <span className="tag-subtle">{service.category}</span>
              </div>
              <h1 className="company-hero-title">{service.title}</h1>
              <p className="company-hero-summary">{service.shortDescription}</p>
              <div className="company-hero-chips">
                {chipsSafe.slice(0, 4).map((chip) => (
                  <ChipPill key={chip} tone={accent as "green"}>{chip}</ChipPill>
                ))}
              </div>
            </div>
          </div>
          <div className="company-hero-metrics">
            <article className="hero-metric hero-metric-green">
              <span className="hero-metric-label">Valor do ticket</span>
              <strong>{service.valueLabel}</strong>
              <small>Referência comercial do serviço</small>
            </article>
            <article className="hero-metric hero-metric-orange">
              <span className="hero-metric-label">Premiação</span>
              <strong>{service.rewardLabel}</strong>
              <small>Modelo de compensação para indicador</small>
            </article>
            <article className="hero-metric hero-metric-blue">
              <span className="hero-metric-label">Prazo</span>
              <strong>{service.deadlineLabel}</strong>
              <small>Janela para validação do retorno</small>
            </article>
            <article className="hero-metric hero-metric-violet">
              <span className="hero-metric-label">Empresa</span>
              <strong>{service.companyName}</strong>
              <small>Parceiro responsável pelo serviço</small>
            </article>
          </div>
          <div className="company-hero-actions">
            <Link href="/indicacoes" className="hero-link-button hero-link-button-primary">
              Voltar para Indicações
            </Link>
            <button type="button" className="hero-link-button hero-link-button-secondary" onClick={() => router.push("/detalhes/empresas")}>
              Ver empresas do ecossistema
            </button>
          </div>
        </div>
      </section>

      <section className="company-detail-layout">
        <div className="company-detail-main">
          <section className="detail-panel">
            <SectionHeader
              eyebrow="Sobre o serviço"
              title="Contexto comercial e objetivo"
              description="Entenda como funciona a indicação e o que é esperado em cada etapa."
            />
            <div className="detail-prose">
              <p>{service.description}</p>
              {factsSafe.length > 0 ? (
                <ul className="bulleted-list">
                  {factsSafe.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Regras"
              title="Como participar"
              description="Condições principais para validar a indicação."
            />
            {rulesSafe.length > 0 ? (
              <ul className="bulleted-list">
                {rulesSafe.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <strong>Regras em publicação.</strong>
                <p>Em breve o Admin Master libera os critérios completos deste serviço.</p>
              </div>
            )}
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Critérios"
              title="Qualificação do lead"
              description="O que caracteriza uma indicação válida."
            />
            {criteriaSafe.length > 0 ? (
              <ul className="bulleted-list">
                {criteriaSafe.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <strong>Sem critérios cadastrados.</strong>
                <p>Utilize o Admin Master para cadastrar os requisitos mínimos de qualificação.</p>
              </div>
            )}
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Próxima ação"
              title="Quero indicar este serviço"
              description="Fluxo de indicação e acompanhamento."
            />
            <div className="opportunity-grid">
              <article className="opportunity-card opportunity-card-green">
                <span className="opportunity-tag">Etapa 1</span>
                <strong>Levantar dados do lead</strong>
                <p>Nome, telefone, e-mail, contexto de necessidade e prazo de decisão.</p>
              </article>
              <article className="opportunity-card opportunity-card-blue">
                <span className="opportunity-tag opportunity-tag-alt">Etapa 2</span>
                <strong>Registrar indicação</strong>
                <p>O Admin Master valida a entrada e move o lead para a equipe comercial.</p>
              </article>
              <article className="opportunity-card opportunity-card-orange">
                <span className="opportunity-tag">Etapa 3</span>
                <strong>Acompanhar conversão</strong>
                <p>Status do andamento e premiação aparecem em Histórico de indicações.</p>
              </article>
            </div>
          </section>
        </div>

        <aside className="company-detail-side">
          {relatedCompany ? (
            <section className="side-panel">
              <div className="side-panel-head">
                <h3>Empresa do serviço</h3>
                <span>Ficha parceira</span>
              </div>
              <Link href={"/detalhes/empresas/" + encodeURIComponent(relatedCompany.slug)} className="side-company-card">
                <ManagedMedia
                  alt={"Logo " + relatedCompany.title}
                  sizeLabel="240 x 240"
                  src={relatedCompany.logo}
                  className="managed-media-fill managed-media-fit-contain side-company-logo"
                />
                <div className="side-company-copy">
                  <strong>{relatedCompany.title}</strong>
                  <small>{relatedCompany.city + " / " + relatedCompany.state}</small>
                  <span className={"related-card-action related-card-action-" + (relatedCompany.accent || "blue")}>Ver empresa</span>
                </div>
              </Link>
            </section>
          ) : null}

          <section className="side-panel">
            <div className="side-panel-head">
              <h3>Estado da indicação</h3>
              <span>Referência atual</span>
            </div>
            <ul className="system-list">
              <li>Status atual: <strong>{service.status}</strong></li>
              <li>Código público: <strong>{service.publicCode || "—"}</strong></li>
              <li>Empresa responsável: <strong>{service.companyName || "—"}</strong></li>
              <li>Categoria: <strong>{service.category || "—"}</strong></li>
              <li>Qualquer ajuste é responsabilidade do Admin Master.</li>
            </ul>
          </section>

          <section className="side-panel side-panel-highlight">
            <div className="side-panel-head">
              <h3>Regras rápidas</h3>
              <span>Memorize</span>
            </div>
            <div className="summary-list">
              <div><span>Lead válido</span><strong>{criteriaSafe[0] || "Contato qualificado"}</strong></div>
              <div><span>Premiação</span><strong>{service.rewardLabel}</strong></div>
              <div><span>Ticket</span><strong>{service.valueLabel}</strong></div>
              <div><span>Prazo</span><strong>{service.deadlineLabel}</strong></div>
            </div>
          </section>
        </aside>
      </section>

      {relatedSafe.length > 0 ? (
        <section className="related-company-section">
          <SectionHeader
            eyebrow="Continue navegando"
            title="Outros serviços de indicação"
            description="Mesmo padrão premium e rastreável do ecossistema."
          />
          <div className="related-company-grid">
            {relatedSafe.map((related) => (
              <article key={related.id} className="related-card related-accent-green">
                <Link href={"/detalhes/empresas/servico/" + encodeURIComponent((related as any).slug || String(related.id))} className="related-card-media" aria-label={"Ver serviço " + related.title}>
                  <ManagedMedia
                    alt={related.title}
                    sizeLabel="900 x 900"
                    src={related.image}
                    className="managed-media-fill managed-media-fit-contain"
                  />
                </Link>
                <div className="related-card-copy">
                  <span className="related-card-tag">{related.category + " • Indicação"}</span>
                  <Link href={"/detalhes/empresas/servico/" + encodeURIComponent((related as any).slug || String(related.id))} className="related-card-title-link">
                    <strong>{related.title}</strong>
                  </Link>
                  <p>{related.shortDescription}</p>
                  <small>{related.rewardLabel}</small>
                  <Link href={"/detalhes/empresas/servico/" + encodeURIComponent((related as any).slug || String(related.id))} className="related-card-action related-card-action-green">
                    Ver serviço
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </ClientShell>
  );
}

export default function ReferralServiceDetailWrapper(props: any) {
  if (!props?.service) {
    notFound();
  }
  return <ReferralServiceDetailPage service={props.service} relatedCompany={props.relatedCompany} relatedServices={props.relatedServices ?? []} />;
}
