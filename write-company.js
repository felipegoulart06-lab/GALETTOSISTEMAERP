const fs = require('fs');
const content = `
"use client";

import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { CompanyLocationMap } from "@/components/company-location-map";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/dashboard";
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
  const accent = company.accent ?? "blue";
  const statusLabel = company.credentialedStatus?.trim() || "Empresa credenciada";
  
  const safeClubOffers = Array.isArray(clubaoOffers) ? clubaoOffers : [];
  const safeAffiliateServices = Array.isArray(affiliateServices) ? affiliateServices : [];
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];
  
  const hasContact = company.phone || company.whatsapp || company.contactEmail || company.website || company.instagram || company.linkedin;

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
                  <span className="cph-tag highlight">{company.badge || "Empresa"}</span>
                  <span className="cph-tag subtle">{statusLabel}</span>
                </div>
                <h1 className="cph-title">{company.title}</h1>
                <div className="cph-meta-row">
                  {company.category && <span className="cph-meta-item"><Icon name="folder" /> {company.category}</span>}
                  {company.city && <span className="cph-meta-item"><Icon name="map-pin" /> {company.city} / {company.state}</span>}
                </div>
              </div>
            </div>
            <div className="cph-actions-block">
              <Link href="/empresas" className="cph-btn-outline">
                <Icon name="arrow-left" /> Voltar
              </Link>
              {safeClubOffers.length > 0 && (
                <a href="#beneficios" className="cph-btn-primary">
                  Ver ofertas
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="cph-main-grid">
          <div className="cph-content-column">
            
            {/* 2. RESUMO EMPRESARIAL */}
            <section className="cph-section">
              <div className="cph-section-header">
                <h2>Resumo Empresarial</h2>
                <p>Visão completa e posicionamento comercial</p>
              </div>
              <div className="cph-section-body">
                <div className="cph-description">
                  {company.description || company.shortDescription || "Informações não cadastradas."}
                </div>
                
                <div className="cph-info-grid">
                  {company.segment && (
                    <div className="cph-info-cell">
                      <span className="cph-cell-label">Segmento</span>
                      <strong className="cph-cell-value">{company.segment}</strong>
                    </div>
                  )}
                  {company.businessArea && (
                    <div className="cph-info-cell">
                      <span className="cph-cell-label">Área de atuação</span>
                      <strong className="cph-cell-value">{company.businessArea}</strong>
                    </div>
                  )}
                  {company.targetAudience && (
                    <div className="cph-info-cell">
                      <span className="cph-cell-label">Público atendido</span>
                      <strong className="cph-cell-value">{company.targetAudience}</strong>
                    </div>
                  )}
                  {company.timeInBusiness && (
                    <div className="cph-info-cell">
                      <span className="cph-cell-label">Tempo de mercado</span>
                      <strong className="cph-cell-value">{company.timeInBusiness}</strong>
                    </div>
                  )}
                </div>

                {company.valueProposition && (
                  <div className="cph-value-proposition">
                    <span className="cph-cell-label">Proposta de valor</span>
                    <p>{company.valueProposition}</p>
                  </div>
                )}

                {company.specialties && company.specialties.length > 0 && (
                  <div className="cph-specialties">
                    <span className="cph-cell-label">Especialidades & Diferenciais</span>
                    <ul className="cph-check-list">
                      {company.specialties.map((item, i) => (
                        <li key={i}><Icon name="check-circle" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* 6. BENEFÍCIOS / CLUBÃO */}
            {safeClubOffers.length > 0 && (
              <section id="beneficios" className="cph-section">
                <div className="cph-section-header">
                  <h2>Benefícios & Ofertas</h2>
                  <p>Vantagens exclusivas vinculadas a este parceiro</p>
                </div>
                <div className="cph-section-body">
                  <div className="cph-offers-list">
                    {safeClubOffers.map((offer) => (
                      <div key={offer.id} className="cph-offer-row">
                        <div className="cph-offer-info">
                          <span className="cph-offer-badge">{offer.discountLabel}</span>
                          <h3 className="cph-offer-title">{offer.title}</h3>
                          <p className="cph-offer-desc">{offer.shortDescription}</p>
                        </div>
                        <div className="cph-offer-action">
                          <Link href={\`/detalhes/ofertas/\${offer.slug}\`} className="cph-btn-secondary">
                            Ver benefício
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 7. OPORTUNIDADES */}
            {(safeOpportunities.length > 0 || safeAffiliateServices.length > 0) && (
              <section id="oportunidades" className="cph-section">
                <div className="cph-section-header">
                  <h2>Oportunidades</h2>
                  <p>Programas de indicação e campanhas ativas</p>
                </div>
                <div className="cph-section-body">
                  <div className="cph-opportunities-list">
                    {safeAffiliateServices.map((service) => (
                      <div key={service.id} className="cph-opportunity-row">
                        <div className="cph-opp-icon"><Icon name="briefcase" /></div>
                        <div className="cph-opp-info">
                          <h3 className="cph-opp-title">{service.title}</h3>
                          <p className="cph-opp-desc">Indicação premiada: {service.rewardLabel}</p>
                        </div>
                        <div className="cph-opp-action">
                          <Link href={\`/detalhes/empresas/servico/\${service.slug}\`} className="cph-btn-outline">
                            Detalhes
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
            
          </div>

          {/* COLUNA LATERAL (DADOS E MAPA) */}
          <div className="cph-sidebar-column">
            
            {/* 3 e 4. DADOS DA EMPRESA E MAPA */}
            <aside className="cph-widget">
              <div className="cph-widget-header">
                <h3>Localização & Dados</h3>
              </div>
              
              <div className="cph-map-container">
                <CompanyLocationMap
                  latitude={company.latitude}
                  longitude={company.longitude}
                  zoom={company.mapZoom || 15}
                  markerTitle={company.title}
                  addressSnippet={\`\${company.address || ""}, \${company.city || ""}\`}
                />
              </div>

              <div className="cph-widget-body">
                <div className="cph-data-list">
                  <div className="cph-data-item">
                    <Icon name="map-pin" />
                    <div>
                      <strong>Endereço completo</strong>
                      <span>{company.address || "Não informado"}</span>
                      {company.neighborhood && <span>Bairro: {company.neighborhood}</span>}
                      {company.city && <span>{company.city} - {company.state}</span>}
                      {company.zipCode && <span>CEP: {company.zipCode}</span>}
                    </div>
                  </div>
                  {company.operatingHours && (
                    <div className="cph-data-item">
                      <Icon name="clock" />
                      <div>
                        <strong>Horário de funcionamento</strong>
                        <span>{company.operatingHours}</span>
                      </div>
                    </div>
                  )}
                  <div className="cph-data-item">
                    <Icon name="info" />
                    <div>
                      <strong>Código da Empresa</strong>
                      <span>{company.publicCode || company.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* 8. CONTATO */}
            {hasContact && (
              <aside className="cph-widget">
                <div className="cph-widget-header">
                  <h3>Contato Comercial</h3>
                </div>
                <div className="cph-widget-body">
                  <div className="cph-contact-grid">
                    {company.phone && (
                      <a href={\`tel:\${company.phone.replace(/\\D/g,'')}\`} className="cph-contact-btn">
                        <Icon name="phone" /> Ligar
                      </a>
                    )}
                    {company.whatsapp && (
                      <a href={\`https://wa.me/\${company.whatsapp.replace(/\\D/g,'')}\`} target="_blank" rel="noreferrer" className="cph-contact-btn whatsapp">
                        <Icon name="message-circle" /> WhatsApp
                      </a>
                    )}
                    {company.contactEmail && (
                      <a href={\`mailto:\${company.contactEmail}\`} className="cph-contact-btn">
                        <Icon name="mail" /> E-mail
                      </a>
                    )}
                    {company.website && (
                      <a href={company.website} target="_blank" rel="noreferrer" className="cph-contact-btn">
                        <Icon name="globe" /> Visitar site
                      </a>
                    )}
                    {company.instagram && (
                      <a href={company.instagram} target="_blank" rel="noreferrer" className="cph-contact-btn">
                        <Icon name="instagram" /> Instagram
                      </a>
                    )}
                    {company.linkedin && (
                      <a href={company.linkedin} target="_blank" rel="noreferrer" className="cph-contact-btn">
                        <Icon name="linkedin" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* 11. OUTRAS EMPRESAS */}
        {relatedCompanies.length > 0 && (
          <section className="cph-related-section">
            <div className="cph-section-header">
              <h2>Outras empresas do ecossistema</h2>
            </div>
            <div className="cph-related-grid">
              {relatedCompanies.map((rel) => (
                <div key={rel.id} className="cph-related-card">
                  <div className="cph-rel-logo">
                    <ManagedMedia alt={rel.title} src={rel.logo} sizeLabel="100x100" className="managed-media-fill managed-media-fit-contain" />
                  </div>
                  <div className="cph-rel-info">
                    <h4>{rel.title}</h4>
                    <span className="cph-rel-cat">{rel.category}</span>
                    <span className="cph-rel-loc">{rel.city} / {rel.state}</span>
                  </div>
                  <div className="cph-rel-action">
                    <Link href={\`/detalhes/empresas/\${rel.slug}\`} className="cph-btn-outline compact">
                      Ver empresa
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
      </div>
    </ClientShell>
  );
}
`;
fs.writeFileSync('components/company-detail-page.tsx', content, 'utf8');
