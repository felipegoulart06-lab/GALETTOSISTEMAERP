const fs = require('fs');
const path = require('path');

const pageContent = `"use client";

import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/dashboard";
import { CompanyLocationMap } from "@/components/company-location-map";
import type { ClubOfferRecord, CompanyRecord, ReferralServiceRecord, OpportunityRecord } from "@/lib/platform-types";

export function CompanyDetailPage({
  company,
  relatedCompanies,
  clubaoOffers,
  affiliateServices,
  opportunities = []
}: {
  company: CompanyRecord;
  relatedCompanies: CompanyRecord[];
  clubaoOffers: ClubOfferRecord[];
  affiliateServices: ReferralServiceRecord[];
  opportunities?: OpportunityRecord[];
}) {
  const statusLabel = company.credentialedStatus?.trim() || "Empresa credenciada";
  
  const safeClubOffers = Array.isArray(clubaoOffers) ? clubaoOffers : [];
  const safeAffiliateServices = Array.isArray(affiliateServices) ? affiliateServices : [];
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];
  
  const hasContact = company.phone || company.whatsapp || company.contactEmail || company.website || company.instagram || company.linkedin;

  // Prepare map coordinates
  const lat = company.latitude || -26.9066;
  const lng = company.longitude || -48.6618;
  const zoom = company.mapZoom || 14;

  return (
    <ClientShell
      activeSection="empresas"
      title={company.title}
      breadcrumb={\`FG EXACTA / EMPRESAS / \${company.title.toUpperCase()}\`}
    >
      <div className="company-premium-wrapper">
        
        {/* 1. HEADER DA EMPRESA */}
        <header className="cph-header">
          <div className="cph-header-inner">
            <div className="cph-brand-block">
              <div className="cph-logo-wrapper">
                <ManagedMedia
                  alt={\`Logo \${company.title}\`}
                  sizeLabel="200 x 200"
                  src={company.logo}
                  className="managed-media-fill managed-media-fit-contain"
                />
              </div>
              <div className="cph-title-block">
                <div className="cph-tags">
                  <span className="cph-tag highlight">{company.badge || "VER EMPRESA"}</span>
                  <span className="cph-tag subtle">{statusLabel}</span>
                </div>
                <h1 className="cph-title">{company.title}</h1>
                <p className="cph-subtitle">{company.shortDescription || company.description}</p>
                <div className="cph-meta-row">
                  {company.category && <span className="cph-meta-item"><Icon name="folder" /> {company.category}</span>}
                  {company.city && <span className="cph-meta-item"><Icon name="map-pin" /> {company.city} / {company.state}</span>}
                </div>
              </div>
            </div>
            <div className="cph-actions-block">
              <Link href="/empresas" className="cph-btn-primary">
                Voltar para Empresas
              </Link>
              {safeClubOffers.length > 0 && (
                <a href="#beneficios" className="cph-btn-outline">
                  Ver ofertas do Clubão
                </a>
              )}
            </div>
          </div>
        </header>

        {/* METRICS ROW */}
        <div className="cph-metrics-row">
          <div className="cph-metric-card">
            <span className="cph-metric-label">CATEGORIA</span>
            <span className="cph-metric-value">{company.category || "Não definida"}</span>
            <span className="cph-metric-sub">{company.subcategory || company.category}</span>
          </div>
          <div className="cph-metric-card">
            <span className="cph-metric-label">LOCALIZAÇÃO</span>
            <span className="cph-metric-value">{company.city || "Sede"} {company.state ? \`/ \${company.state}\` : ""}</span>
            <span className="cph-metric-sub">{company.address || "Endereço principal"}</span>
          </div>
          <div className="cph-metric-card">
            <span className="cph-metric-label">CLUBÃO</span>
            <span className="cph-metric-value">{safeClubOffers.length} vantagens</span>
            <span className="cph-metric-sub">Benefícios liberados para parceiros credenciados</span>
          </div>
          <div className="cph-metric-card">
            <span className="cph-metric-label">AFILIAÇÕES</span>
            <span className="cph-metric-value">{safeAffiliateServices.length} possibilidade{safeAffiliateServices.length !== 1 ? 's' : ''}</span>
            <span className="cph-metric-sub">Programas de indicação e monetização da base</span>
          </div>
        </div>

        <div className="cph-main-grid">
          <div className="cph-content-column">
            
            {/* 2. RESUMO EMPRESARIAL */}
            <section className="cph-section">
              <div className="cph-section-header">
                <span className="cph-section-eyebrow">SOBRE A EMPRESA</span>
                <div className="cph-section-header-split">
                  <h2>Visão completa do parceiro</h2>
                  <p>Perfil, diferenciais e posicionamento comercial da empresa credenciada.</p>
                </div>
              </div>
              <div className="cph-section-body">
                <div className="cph-description">
                  {company.description || "Informações não cadastradas."}
                </div>
                
                {company.chips && company.chips.length > 0 && (
                  <div className="cph-checkpoints">
                    {company.chips.map((chip, idx) => (
                      <div key={idx} className="cph-checkpoint-item">
                        <span className="cph-checkpoint-icon"></span>
                        <span className="cph-checkpoint-text">{chip}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="cph-focus-areas">
                  <h3 className="cph-sub-heading">Frentes de atuação</h3>
                  <div className="cph-focus-grid">
                    {(company.facts || ["Atuação no mercado", "Produtos e serviços", "Atendimento corporativo"]).map((fact, idx) => (
                      <div key={idx} className="cph-focus-card">
                        <h4>{fact}</h4>
                        <p>Frente ativa dentro do ecossistema FG EXACTA.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. DADOS E CONTATO */}
            <section className="cph-section">
              <div className="cph-section-header">
                <span className="cph-section-eyebrow">CONTATO & ENDEREÇO</span>
                <div className="cph-section-header-split">
                  <h2>Ficha comercial da empresa</h2>
                  <p>Canais diretos para negociação, credenciamento e atendimento.</p>
                </div>
              </div>
              <div className="cph-section-body">
                <div className="cph-contact-grid">
                  <div className="cph-contact-box">
                    <span className="cph-contact-label">ENDEREÇO</span>
                    <span className="cph-contact-value">{company.address || "Endereço não informado"}</span>
                    <span className="cph-contact-sub">{company.city} {company.state ? \`/ \${company.state}\` : ""}</span>
                  </div>
                  <div className="cph-contact-box">
                    <span className="cph-contact-label">CONTATO COMERCIAL</span>
                    <span className="cph-contact-value">{company.title} Comercial</span>
                    <span className="cph-contact-sub">{company.phone || company.whatsapp || "Telefone não cadastrado"}</span>
                  </div>
                  <div className="cph-contact-box">
                    <span className="cph-contact-label">E-MAIL & SITE</span>
                    <span className="cph-contact-value">{company.contactEmail || "contato@empresa.com.br"}</span>
                    <span className="cph-contact-sub">{company.website || "Website não informado"}</span>
                  </div>
                  <div className="cph-contact-box">
                    <span className="cph-contact-label">REDES SOCIAIS</span>
                    <span className="cph-contact-value">Presença digital</span>
                    <div className="cph-social-links">
                      {company.instagram && <a href={company.instagram} target="_blank" rel="noreferrer" className="cph-social-btn">instagram</a>}
                      {company.linkedin && <a href={company.linkedin} target="_blank" rel="noreferrer" className="cph-social-btn">linkedin</a>}
                      {!company.instagram && !company.linkedin && <span className="cph-contact-sub">Não cadastradas</span>}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. BENEFÍCIOS / CLUBÃO */}
            <section id="beneficios" className="cph-section">
              <div className="cph-section-header">
                <span className="cph-section-eyebrow">CLUBÃO</span>
                <div className="cph-section-header-split">
                  <h2>Ofertas, descontos e vantagens</h2>
                  <p>Benefícios exclusivos para clientes e parceiros credenciados.</p>
                </div>
              </div>
              <div className="cph-section-body">
                {safeClubOffers.length > 0 ? (
                  <div className="cph-offers-grid">
                    {safeClubOffers.map((offer) => (
                      <div key={offer.id} className="cph-offer-card">
                        <div className="cph-offer-badge">{offer.badge || "OFERTA"}</div>
                        <h4 className="cph-offer-title">{offer.title}</h4>
                        <p className="cph-offer-desc">{offer.shortDescription || offer.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cph-empty-state">
                    Nenhuma oferta ativa no momento.
                  </div>
                )}
              </div>
            </section>

            {/* 7. OPORTUNIDADES */}
            <section className="cph-section">
              <div className="cph-section-header">
                <span className="cph-section-eyebrow">AFILIAÇÕES</span>
                <div className="cph-section-header-split">
                  <h2>Oportunidades para a base</h2>
                  <p>Programas de indicação, lead e comissão organizados para a rede parceira.</p>
                </div>
              </div>
              <div className="cph-section-body">
                {safeAffiliateServices.length > 0 || safeOpportunities.length > 0 ? (
                  <div className="cph-opportunities-grid">
                    {safeAffiliateServices.map((service) => (
                      <div key={service.id} className="cph-opportunity-card">
                        <div className="cph-opp-badge">COMISSÃO {service.commissionRate || "VARIÁVEL"}</div>
                        <h4 className="cph-opp-title">Indicação {service.title}</h4>
                        <p className="cph-opp-desc">{service.shortDescription || "Programa ativo"}</p>
                      </div>
                    ))}
                    {safeOpportunities.map((opp) => (
                      <div key={opp.id} className="cph-opportunity-card">
                        <div className="cph-opp-badge">OPORTUNIDADE</div>
                        <h4 className="cph-opp-title">{opp.title}</h4>
                        <p className="cph-opp-desc">{opp.shortDescription || "Programa ativo"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cph-empty-state">
                    Nenhuma oportunidade ativa no momento.
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* SIDEBAR - MAPA E RESUMO */}
          <div className="cph-sidebar-column">
            
            <div className="cph-sidebar-widget">
              <div className="cph-widget-header">
                <h3>Localização</h3>
                <span className="cph-widget-meta">MAPA INTERATIVO</span>
              </div>
              <div className="cph-widget-body">
                <div className="cph-map-container">
                  <CompanyLocationMap lat={lat} lng={lng} zoom={zoom} title={company.title} />
                </div>
                <p className="cph-widget-hint">
                  Apresente este endereço ao visitar o parceiro para validar o credenciamento.
                </p>
              </div>
            </div>

            <div className="cph-sidebar-widget">
              <div className="cph-widget-header">
                <h3>Credenciamento</h3>
                <span className="cph-widget-meta">STATUS ATUAL</span>
              </div>
              <div className="cph-widget-body">
                <ul className="cph-rules-list">
                  <li>Credenciada para Clubão, recorrência e benefícios especiais.</li>
                  <li>Ofertas do Clubão são liberadas apenas para empresas credenciadas.</li>
                  <li>Programas de afiliação seguem as regras comerciais publicadas pela marca.</li>
                  <li>Qualquer ajuste nesta ficha é responsabilidade do Admin Master.</li>
                </ul>
              </div>
            </div>

            <div className="cph-sidebar-widget">
              <div className="cph-widget-header">
                <h3>Resumo rápido</h3>
                <span className="cph-widget-meta">IDENTIDADE DA MARCA</span>
              </div>
              <div className="cph-widget-body">
                <table className="cph-summary-table">
                  <tbody>
                    <tr>
                      <td>Categoria</td>
                      <td><strong>{company.category || "-"}</strong></td>
                    </tr>
                    <tr>
                      <td>Segmento</td>
                      <td><strong>{company.subcategory || company.category || "-"}</strong></td>
                    </tr>
                    <tr>
                      <td>Cidade</td>
                      <td><strong>{company.city || "-"} / {company.state || "-"}</strong></td>
                    </tr>
                    <tr>
                      <td>Código público</td>
                      <td><strong>{company.publicCode || "-"}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* 11. OUTRAS EMPRESAS */}
        <section className="cph-related-section">
          <div className="cph-related-header">
            <span className="cph-section-eyebrow">CONTINUE NAVEGANDO</span>
            <div className="cph-section-header-split">
              <h2>Outras empresas do ecossistema</h2>
              <p>Todos os botões seguem o mesmo padrão premium de visualização.</p>
            </div>
          </div>
          <div className="cph-related-grid">
            {relatedCompanies.slice(0, 3).map((rel) => (
              <div key={rel.id} className="cph-related-card">
                <div className="cph-related-image">
                  <ManagedMedia
                    alt={rel.title}
                    src={rel.logo}
                    sizeLabel="600 x 400"
                    className="managed-media-fill managed-media-fit-contain"
                  />
                </div>
                <div className="cph-related-content">
                  <span className="cph-related-cat">{rel.category}</span>
                  <h4 className="cph-related-title">{rel.title}</h4>
                  <p className="cph-related-desc">{rel.shortDescription}</p>
                  <Link href={\`/empresas/\${rel.slug}\`} className="cph-btn-primary full-width">
                    Ver empresa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ClientShell>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'components', 'company-detail-page.tsx'), pageContent);
console.log('Updated components/company-detail-page.tsx');
