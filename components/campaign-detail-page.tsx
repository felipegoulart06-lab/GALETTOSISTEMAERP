import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import type { CampaignRecord, ProductRecord } from "@/lib/platform-types";

export function CampaignDetailPage({
  campaign,
  relatedCampaigns,
  relatedProducts
}: {
  campaign: CampaignRecord;
  relatedCampaigns: CampaignRecord[];
  relatedProducts: ProductRecord[];
}) {
  const rules = Array.isArray(campaign.rules) ? campaign.rules : [];
  const tags = Array.isArray(campaign.tags) ? campaign.tags : [];
  const materials = Array.isArray(campaign.materials) ? campaign.materials : [];
  const linkedProductIds = Array.isArray(campaign.relatedProductIds) ? campaign.relatedProductIds : [];

  return (
    <ClientShell
      activeSection="campanhas"
      title={campaign.title}
      breadcrumb={`FG EXACTA / CAMPANHAS / ${campaign.title.toUpperCase()}`}
    >
      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <span className="hero-tag">{campaign.rewardLabel}</span>
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <div className="hero-notice">
            Nesta página você vê objetivo, prazo, materiais, regras e os produtos conectados a esta campanha.
          </div>
          <div className="product-detail-hero-actions">
            <Link href="/campanhas" className="hero-link-button">
              Voltar para Campanhas
            </Link>
            <Link href="/detalhes/campanhas" className="hero-link-button hero-link-button-secondary">
              Ver mural de campanhas
            </Link>
          </div>
        </div>
        <div className="product-detail-media">
          <ManagedMedia
            alt={campaign.title}
            sizeLabel="1600 x 1200"
            src={campaign.image}
            className="managed-media-fill managed-media-fit-contain"
          />
        </div>
      </section>

      <section className="product-detail-metrics">
        <article className="metric-card tone-violet">
          <span className="metric-label">Período</span>
          <strong>{campaign.periodLabel}</strong>
          <small>Janela oficial da campanha</small>
        </article>
        <article className="metric-card tone-green">
          <span className="metric-label">Pontuação</span>
          <strong>{campaign.scoreLabel}</strong>
          <small>Critério de reconhecimento e ranking</small>
        </article>
        <article className="metric-card tone-blue">
          <span className="metric-label">Participantes</span>
          <strong>{campaign.participantCount}</strong>
          <small>Base envolvida nesta ação</small>
        </article>
        <article className="metric-card tone-orange">
          <span className="metric-label">Materiais</span>
          <strong>{materials.length}</strong>
          <small>Assets prontos para execução</small>
        </article>
      </section>

      <section className="product-detail-layout">
        <div className="product-detail-main">
          <section className="product-detail-panel">
            <div className="section-head">
              <div>
                <p>Resumo da campanha</p>
                <h2>Objetivo e leitura comercial</h2>
              </div>
              <span>{campaign.resultsSummary}</span>
            </div>
            <div className="product-affiliate-box">
              <strong>{campaign.objective}</strong>
              <p>{campaign.shortDescription}</p>
            </div>
            <ul className="media-facts product-detail-facts">
              {rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <div className="media-chips">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          <section className="product-detail-panel">
            <div className="section-head">
              <div>
                <p>Materiais</p>
                <h2>Assets liberados para executar</h2>
              </div>
              <span>Use estes materiais para reduzir atrito e acelerar a entrada na campanha.</span>
            </div>
            <div className="media-chips">
              {materials.map((material) => (
                <span key={material}>{material}</span>
              ))}
            </div>
            <div className="product-detail-actions">
              <Link href="/desempenho" className="hero-link-button">
                Acompanhar desempenho depois
              </Link>
              <Link href="/minha-renda" className="hero-link-button hero-link-button-secondary">
                Ver impacto na renda
              </Link>
            </div>
          </section>

          <section className="product-detail-panel">
            <div className="section-head">
              <div>
                <p>Produtos conectados</p>
                <h2>O que esta campanha movimenta</h2>
              </div>
              <span>Itens relacionados que puxam conversão, narrativa e material de apoio.</span>
            </div>
            <div className="cta-visual-grid">
              {relatedProducts.map((product) => (
                <article key={product.slug} className="cta-visual-card">
                  <Link href={`/detalhes/produtos/${product.slug}`} className="cta-visual-media-link">
                    <ManagedMedia
                      alt={product.title}
                      sizeLabel="1200 x 900"
                      src={product.image}
                      className="managed-media-fill managed-media-fit-contain"
                    />
                  </Link>
                  <div className="cta-visual-copy">
                    <span>{product.badge}</span>
                    <strong>
                      <Link href={`/detalhes/produtos/${product.slug}`} className="cta-visual-title-link">
                        {product.title}
                      </Link>
                    </strong>
                    <p>{product.shortDescription}</p>
                    <small>
                      Preço {product.price} • comissão {product.commissionRate}
                    </small>
                    <Link href={`/detalhes/produtos/${product.slug}`} className="cta-visual-action">
                      Ver produto
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="product-detail-side">
          <section className="side-panel">
            <div className="side-panel-head">
              <h3>Como participar</h3>
              <span>Passo a passo</span>
            </div>
            <ul className="system-list">
              <li>Leia o objetivo e valide se a campanha combina com sua operação atual.</li>
              <li>Use os materiais aprovados para manter consistência visual e comercial.</li>
              <li>Acompanhe a execução em Desempenho, Minha renda e Ranking.</li>
              <li>Respeite o período e as regras publicadas pelo Admin Master.</li>
            </ul>
          </section>

          <section className="side-panel">
            <div className="side-panel-head">
              <h3>Leitura rápida</h3>
              <span>Resumo</span>
            </div>
            <ul className="system-list">
              <li>Categoria: {campaign.category}</li>
              <li>Código público: {campaign.publicCode}</li>
              <li>Recompensa: {campaign.rewardLabel}</li>
              <li>Produtos ligados: {linkedProductIds.length}</li>
            </ul>
          </section>
        </aside>
      </section>

      <section className="product-related-grid">
        <div className="section-head">
          <div>
            <p>Continue explorando</p>
            <h2>Outras campanhas abertas</h2>
          </div>
          <span>Cada item abaixo abre uma página individual de detalhe.</span>
        </div>
        <div className="cta-visual-grid">
          {relatedCampaigns.map((relatedCampaign) => (
            <article key={relatedCampaign.slug} className="cta-visual-card">
              <Link href={`/detalhes/campanhas/${relatedCampaign.slug}`} className="cta-visual-media-link">
                <ManagedMedia
                  alt={relatedCampaign.title}
                  sizeLabel="1200 x 900"
                  src={relatedCampaign.image}
                  className="managed-media-fill managed-media-fit-contain"
                />
              </Link>
              <div className="cta-visual-copy">
                <span>{relatedCampaign.rewardLabel}</span>
                <strong>
                  <Link href={`/detalhes/campanhas/${relatedCampaign.slug}`} className="cta-visual-title-link">
                    {relatedCampaign.title}
                  </Link>
                </strong>
                <p>{relatedCampaign.shortDescription}</p>
                <small>
                  {relatedCampaign.periodLabel} • {relatedCampaign.scoreLabel}
                </small>
                <Link href={`/detalhes/campanhas/${relatedCampaign.slug}`} className="cta-visual-action">
                  Ver campanha
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ClientShell>
  );
}
