import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import type { ProductRecord } from "@/lib/platform-types";

export function ProductDetailPage({
  product,
  relatedProducts
}: {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
}) {

  return (
    <ClientShell
      activeSection="produtos"
      title={product.title}
      breadcrumb={`FG EXACTA / PRODUTOS / ${product.title.toUpperCase()}`}
    >
      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <span className="hero-tag">{product.badge}</span>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="hero-notice">
            Nesta página você vê a comissão, entende as condições e recebe o link de afiliação da plataforma.
          </div>
          <div className="product-detail-hero-actions">
            <Link href="/produtos?catalogo=aberto#catalogo-produtos" className="hero-link-button">
              Voltar para todos os produtos
            </Link>
            <Link href="/detalhes/produtos" className="hero-link-button hero-link-button-secondary">
              Ver recomendados
            </Link>
          </div>
        </div>
        <div className="product-detail-media">
          <ManagedMedia
            alt={product.title}
            sizeLabel="1600 x 1200"
            src={product.image}
            className="managed-media-fill managed-media-fit-contain"
          />
        </div>
      </section>

      <section className="product-detail-metrics">
        <article className={`metric-card tone-${product.accent}`}>
          <span className="metric-label">Preço do produto</span>
          <strong>{product.price}</strong>
          <small>Valor público exibido na oferta</small>
        </article>
        <article className="metric-card tone-green">
          <span className="metric-label">Comissão</span>
          <strong>{product.commissionValue}</strong>
          <small>{product.commissionRate} por venda aprovada</small>
        </article>
        <article className="metric-card tone-blue">
          <span className="metric-label">Categoria</span>
          <strong>{product.category}</strong>
          <small>{product.audience}</small>
        </article>
        <article className="metric-card tone-orange">
          <span className="metric-label">Validação</span>
          <strong>Fluxo claro</strong>
          <small>{product.payoutWindow}</small>
        </article>
      </section>

      <section className="product-detail-layout">
        <div className="product-detail-main">
          <section className="product-detail-panel">
            <div className="section-head">
              <div>
                <p>Resumo comercial</p>
                <h2>Por que vale promover</h2>
              </div>
              <span>{product.commercialInfo}</span>
            </div>
            <ul className="media-facts product-detail-facts">
              {product.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className="media-chips">
              {product.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </section>

          <section className="product-detail-panel">
            <div className="section-head">
              <div>
                <p>Afiliação</p>
                <h2>Seu link de afiliação</h2>
              </div>
              <span>Liberado somente nesta etapa</span>
            </div>
            <div className="product-affiliate-box">
              <strong>{product.affiliateLink}</strong>
              <p>{product.approvalFlow}</p>
            </div>
            <div className="product-detail-actions">
              <a href={product.affiliateLink} className="hero-link-button">
                Abrir meu link
              </a>
              <Link href="/desempenho" className="hero-link-button hero-link-button-secondary">
                Ver desempenho depois
              </Link>
            </div>
          </section>
        </div>

        <aside className="product-detail-side">
          <section className="side-panel">
            <div className="side-panel-head">
              <h3>O que você recebe aqui</h3>
              <span>Leitura rápida</span>
            </div>
            <ul className="system-list">
              <li>Comissão detalhada por venda aprovada.</li>
              <li>Contexto comercial do produto antes da afiliação.</li>
              <li>Link individual da plataforma liberado nesta página.</li>
              <li>Fluxo de validação e expectativa de pagamento.</li>
            </ul>
          </section>
        </aside>
      </section>

      <section className="product-related-grid">
        <div className="section-head">
          <div>
            <p>Continue explorando</p>
            <h2>Outros produtos do catálogo</h2>
          </div>
          <span>Clique em qualquer item para abrir o detalhe individual.</span>
        </div>
        <div className="cta-visual-grid">
          {relatedProducts.map((relatedProduct) => (
            <article key={relatedProduct.slug} className="cta-visual-card">
              <Link href={`/detalhes/produtos/${relatedProduct.slug}`} className="cta-visual-media-link">
                <ManagedMedia
                  alt={relatedProduct.title}
                  sizeLabel="1200 x 900"
                  src={relatedProduct.image}
                  className="managed-media-fill managed-media-fit-contain"
                />
              </Link>
              <div className="cta-visual-copy">
                <span>{relatedProduct.badge}</span>
                <strong>
                  <Link href={`/detalhes/produtos/${relatedProduct.slug}`} className="cta-visual-title-link">
                    {relatedProduct.title}
                  </Link>
                </strong>
                <p>{relatedProduct.shortDescription}</p>
                <small>
                  Preço {relatedProduct.price} • comissão {relatedProduct.commissionRate}
                </small>
                <Link href={`/detalhes/produtos/${relatedProduct.slug}`} className="cta-visual-action">
                  Ver detalhes do produto
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ClientShell>
  );
}
