import Link from "next/link";
import type { ReactNode } from "react";
import { ClientShell } from "@/components/client-shell";
import { CompanyLocationMap } from "@/components/company-location-map";
import { ManagedMedia } from "@/components/managed-media";
import type { ClubOfferRecord, CompanyRecord, ReferralServiceRecord } from "@/lib/platform-types";

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
  return <span className={`detail-chip chip-${tone}`}>{children}</span>;
}

export function CompanyDetailPage({
  company,
  relatedCompanies,
  clubaoOffers,
  affiliateServices
}: {
  company: CompanyRecord;
  relatedCompanies: CompanyRecord[];
  clubaoOffers: ClubOfferRecord[];
  affiliateServices: ReferralServiceRecord[];
}) {
  const accent = company.accent ?? "blue";
  const statusLabel = company.credentialedStatus?.trim() || "Empresa credenciada para ações do ecossistema FG EXACTA.";
  const safeClubOffers = Array.isArray(clubaoOffers) ? clubaoOffers : [];
  const safeAffiliateServices = Array.isArray(affiliateServices) ? affiliateServices : [];
  const safeSpecialties = Array.isArray(company.specialties) ? company.specialties : [];
  const safeFacts = Array.isArray(company.facts) ? company.facts : [];
  const safeChips = Array.isArray(company.chips) ? company.chips : [];
  const safeSocialLinks = Array.isArray(company.socialLinks) ? company.socialLinks : [];

  return (
    <ClientShell
      activeSection="empresas"
      title={company.title}
      breadcrumb={`FG EXACTA / EMPRESAS / ${company.title.toUpperCase()}`}
    >
      <section className={`company-hero company-hero-accent-${accent}`}>
        <div className="company-hero-background" aria-hidden="true" />
        <div className="company-hero-frame">
          <div className="company-hero-brand">
            <div className="company-hero-logo">
              <ManagedMedia
                alt={`Logo ${company.title}`}
                sizeLabel="420 x 420"
                src={company.logo}
                className="managed-media-fill managed-media-fit-contain"
              />
            </div>
            <div className="company-hero-identity">
              <div className="company-hero-tags">
                <span className={`tag-accent tag-accent-${accent}`}>{company.badge}</span>
                <span className="tag-subtle">{company.type}</span>
              </div>
              <h1 className="company-hero-title">{company.title}</h1>
              <p className="company-hero-summary">{company.shortDescription}</p>
              <div className="company-hero-chips">
                {safeChips.slice(0, 4).map((chip) => (
                  <ChipPill key={chip} tone={accent as "blue" | "green" | "orange" | "violet"}>{chip}</ChipPill>
                ))}
              </div>
            </div>
          </div>

          <div className="company-hero-metrics">
            <article className={`hero-metric hero-metric-${accent}`}>
              <span className="hero-metric-label">Categoria</span>
              <strong>{company.category || company.segment || "—"}</strong>
              <small>{company.segment || "Segmento comercial credenciado"}</small>
            </article>
            <article className="hero-metric hero-metric-blue">
              <span className="hero-metric-label">Localização</span>
              <strong>{company.city} / {company.state}</strong>
              <small>{company.neighborhood || "Bairro informado no credenciamento"}</small>
            </article>
            <article className="hero-metric hero-metric-green">
              <span className="hero-metric-label">Clubão</span>
              <strong>{safeClubOffers.length} {safeClubOffers.length === 1 ? "vantagem" : "vantagens"}</strong>
              <small>Benefícios liberados para parceiros credenciados</small>
            </article>
            <article className="hero-metric hero-metric-orange">
              <span className="hero-metric-label">Afiliações</span>
              <strong>{safeAffiliateServices.length} {safeAffiliateServices.length === 1 ? "possibilidade" : "possibilidades"}</strong>
              <small>Programas de indicação e monetização da base</small>
            </article>
          </div>

          <div className="company-hero-actions">
            <Link href="/empresas" className="hero-link-button hero-link-button-primary">
              Voltar para Empresas
            </Link>
            <Link href="/clubao" className="hero-link-button hero-link-button-secondary">
              Ver ofertas do Clubão
            </Link>
          </div>
        </div>
      </section>

      <section className="company-detail-layout">
        <div className="company-detail-main">
          <section className="detail-panel">
            <SectionHeader
              eyebrow="Sobre a empresa"
              title="Visão completa do parceiro"
              description="Perfil, diferenciais e posicionamento comercial da empresa credenciada."
            />
            <p className="detail-paragraph">{company.description}</p>
            <div className="detail-fact-grid">
              {safeFacts.map((fact) => (
                <article key={fact} className="detail-fact-card">
                  <span className="detail-fact-dot" aria-hidden="true" />
                  <p>{fact}</p>
                </article>
              ))}
            </div>
            {safeSpecialties.length > 0 ? (
              <div className="specialty-block">
                <h3 className="section-subtitle">Frentes de atuação</h3>
                <div className="specialty-grid">
                  {safeSpecialties.map((specialty) => (
                    <article key={specialty} className={`specialty-card specialty-${accent}`}>
                      <strong>{specialty}</strong>
                      <span>Frente ativa dentro do ecossistema FG EXACTA.</span>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Contato & endereço"
              title="Ficha comercial da empresa"
              description="Canais diretos para negociação, credenciamento e atendimento."
            />
            <div className="contact-grid">
              <article className="contact-card contact-card-blue">
                <span className="contact-label">Endereço</span>
                <strong>{company.neighborhood}</strong>
                <p>{company.address}</p>
              </article>
              <article className="contact-card contact-card-green">
                <span className="contact-label">Contato comercial</span>
                <strong>{company.contactName || "Atendimento comercial"}</strong>
                <p>{company.phone || "Contato via solicitação interna"}</p>
              </article>
              <article className="contact-card contact-card-orange">
                <span className="contact-label">E-mail & site</span>
                <strong>{company.contactEmail || "e-mail cadastrado"}</strong>
                <p>{company.website || "Website institucional do parceiro"}</p>
              </article>
              {safeSocialLinks.length > 0 ? (
                <article className="contact-card contact-card-violet">
                  <span className="contact-label">Redes sociais</span>
                  <strong>Presença digital</strong>
                  <div className="social-row">
                    {safeSocialLinks.map((social) => (
                      <span key={social} className="social-pill">{social}</span>
                    ))}
                  </div>
                </article>
              ) : null}
            </div>
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Clubão"
              title="Ofertas, descontos e vantagens"
              description="Benefícios exclusivos para clientes e parceiros credenciados."
            />
            {safeClubOffers.length > 0 ? (
              <div className="opportunity-grid">
                {safeClubOffers.map((offer) => (
                  <article key={offer.id || offer.title} className={`opportunity-card opportunity-card-${accent}`}>
                    <span className="opportunity-tag">{offer.discountLabel}</span>
                    <strong>{offer.title}</strong>
                    <p>{offer.shortDescription || offer.partnerLocation || "Condição exclusiva credenciada."}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <strong>Nenhuma oferta ativa no momento.</strong>
                <p>Novas vantagens do Clubão para este parceiro serão publicadas aqui pelo Admin Master.</p>
              </div>
            )}
          </section>

          <section className="detail-panel">
            <SectionHeader
              eyebrow="Afiliações"
              title="Oportunidades para a base"
              description="Programas de indicação, lead e comissão organizados para a rede parceira."
            />
            {safeAffiliateServices.length > 0 ? (
              <div className="opportunity-grid">
                {safeAffiliateServices.map((service) => (
                  <article key={service.id || service.title} className={`opportunity-card opportunity-card-orange`}>
                    <span className="opportunity-tag opportunity-tag-alt">{service.rewardLabel || service.valueLabel}</span>
                    <strong>{service.title}</strong>
                    <p>{service.shortDescription || "Regras e critérios definidos pelo Admin Master."}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <strong>Sem programas de afiliação publicados.</strong>
                <p>Assim que novas oportunidades forem liberadas, elas aparecerão nesta seção.</p>
              </div>
            )}
          </section>
        </div>

        <aside className="company-detail-side">
          <section className="side-panel">
            <div className="side-panel-head">
              <h3>Localização</h3>
              <span>Mapa interativo</span>
            </div>
            <CompanyLocationMap
              companyName={company.title}
              latitude={company.latitude}
              longitude={company.longitude}
              locationLabel={company.address}
            />
            <p className="side-panel-note">Apresente este endereço ao visitar o parceiro para validar o credenciamento.</p>
          </section>

          <section className="side-panel">
            <div className="side-panel-head">
              <h3>Credenciamento</h3>
              <span>Status atual</span>
            </div>
            <ul className="system-list">
              <li>{statusLabel}</li>
              <li>Ofertas do Clubão são liberadas apenas para empresas credenciadas.</li>
              <li>Programas de afiliação seguem as regras comerciais publicadas pela marca.</li>
              <li>Qualquer ajuste nesta ficha é responsabilidade do Admin Master.</li>
            </ul>
          </section>

          <section className="side-panel side-panel-highlight">
            <div className="side-panel-head">
              <h3>Resumo rápido</h3>
              <span>Identidade da marca</span>
            </div>
            <div className="summary-list">
              <div><span>Categoria</span><strong>{company.category || "—"}</strong></div>
              <div><span>Segmento</span><strong>{company.segment || "—"}</strong></div>
              <div><span>Cidade</span><strong>{company.city} / {company.state}</strong></div>
              <div><span>Código público</span><strong>{company.publicCode || "—"}</strong></div>
            </div>
          </section>
        </aside>
      </section>

      {relatedCompanies && relatedCompanies.length > 0 ? (
        <section className="related-company-section">
          <SectionHeader
            eyebrow="Continue navegando"
            title="Outras empresas do ecossistema"
            description="Todos os botões seguem o mesmo padrão premium de visualização."
          />
          <div className="related-company-grid">
            {relatedCompanies.map((relatedCompany) => (
              <article key={relatedCompany.slug} className={`related-card related-accent-${relatedCompany.accent || "blue"}`}>
                <Link href={`/detalhes/empresas/${relatedCompany.slug}`} className="related-card-media" aria-label={`Ver detalhes de ${relatedCompany.title}`}>
                  <ManagedMedia
                    alt={relatedCompany.title}
                    sizeLabel="900 x 900"
                    src={relatedCompany.logo}
                    className="managed-media-fill managed-media-fit-contain"
                  />
                </Link>
                <div className="related-card-copy">
                  <span className="related-card-tag">{relatedCompany.category || relatedCompany.segment}</span>
                  <Link href={`/detalhes/empresas/${relatedCompany.slug}`} className="related-card-title-link">
                    <strong>{relatedCompany.title}</strong>
                  </Link>
                  <p>{relatedCompany.shortDescription}</p>
                  <small>{relatedCompany.city} • {relatedCompany.type}</small>
                  <Link href={`/detalhes/empresas/${relatedCompany.slug}`} className={`related-card-action related-card-action-${relatedCompany.accent || "blue"}`}>
                    Ver empresa
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
