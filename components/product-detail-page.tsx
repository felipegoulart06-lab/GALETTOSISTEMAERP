"use client";

import Link from "next/link";
import { useState } from "react";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { Icon } from "@/components/ui-icon";
import type { ProductRecord } from "@/lib/platform-types";

function CopyLinkBlock({ link, approvalFlow }: { link: string; approvalFlow: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="system-affiliate-block">
      <div className="system-affiliate-header">
        <span className="status-indicator active"></span>
        <span className="status-label">Link individual liberado</span>
      </div>
      <div className="system-affiliate-input-group">
        <div className="system-affiliate-url-box">
          <Icon name="link" />
          <input type="text" readOnly value={link} className="system-affiliate-input" />
        </div>
        <button onClick={handleCopy} className={`btn-copy ${copied ? 'copied' : ''}`}>
          {copied ? <><Icon name="check" /> Copiado</> : <><Icon name="copy" /> Copiar</>}
        </button>
      </div>
      <p className="system-affiliate-note">
        <Icon name="info" /> {approvalFlow}
      </p>
      <div className="system-affiliate-actions">
        <a href={link} target="_blank" rel="noopener noreferrer" className="hero-link-button btn-primary-heavy">
          ABRIR MEU LINK AGORA
        </a>
        <Link href="/desempenho" className="hero-link-button hero-link-button-secondary">
          Acompanhar desempenho
        </Link>
      </div>
    </div>
  );
}

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
      {/* HERO PREMIUM */}
      <section className="product-premium-hero">
        <div className="product-premium-info">
          <div className="product-premium-header">
            <span className={`tag-accent tag-accent-${product.accent}`}>{product.badge}</span>
            <span className="tag-subtle">Produto Validado</span>
          </div>
          <h1 className="product-premium-title">{product.title}</h1>
          <p className="product-premium-description">{product.description}</p>
          
          <div className="product-premium-metrics">
            <div className="metric-box box-price">
              <Icon name="tag" />
              <div>
                <span className="box-label">Preço Final</span>
                <strong className="box-value">{product.price}</strong>
              </div>
            </div>
            <div className="metric-box box-commission">
              <Icon name="trending-up" />
              <div>
                <span className="box-label">Sua Comissão ({product.commissionRate})</span>
                <strong className="box-value text-green-600">{product.commissionValue}</strong>
              </div>
            </div>
            <div className="metric-box box-category">
              <Icon name="folder" />
              <div>
                <span className="box-label">Categoria</span>
                <strong className="box-value">{product.category}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="product-premium-media-container">
          <ManagedMedia
            alt={product.title}
            sizeLabel="1600 x 1200"
            src={product.image}
            className="managed-media-fill managed-media-fit-cover"
          />
        </div>
      </section>

      <section className="product-premium-layout">
        <div className="product-premium-main">
          
          {/* AFILIAÇÃO */}
          <section className="product-premium-panel panel-highlight">
            <div className="section-head-compact">
              <h2>Central de Afiliação</h2>
              <p>Seu acesso exclusivo para divulgar este produto</p>
            </div>
            <CopyLinkBlock link={product.affiliateLink} approvalFlow={product.approvalFlow} />
          </section>

          {/* RESUMO COMERCIAL */}
          <section className="product-premium-panel">
            <div className="section-head-compact">
              <h2>Por que vale promover</h2>
              <p>{product.commercialInfo}</p>
            </div>
            <div className="commercial-checkpoints">
              {(product.facts ?? []).map((fact, idx) => (
                <div key={idx} className="checkpoint-item">
                  <div className="checkpoint-icon"><Icon name="check" /></div>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
            <div className="commercial-tags">
              {(product.chips ?? []).map((chip) => (
                <span key={chip} className="chip-tag">{chip}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="product-premium-side">
          <section className="side-panel-premium">
            <div className="side-panel-header">
              <Icon name="shield" />
              <h3>Garantia FG EXACTA</h3>
            </div>
            <ul className="side-system-list">
              <li>
                <strong>Comissão Protegida</strong>
                <span>Rastreamento seguro por cookie e last-click.</span>
              </li>
              <li>
                <strong>Validação Transparente</strong>
                <span>{product.payoutWindow}</span>
              </li>
              <li>
                <strong>Material de Apoio</strong>
                <span>Contexto comercial fornecido para facilitar vendas.</span>
              </li>
            </ul>
          </section>
        </aside>
      </section>

      {/* OUTROS PRODUTOS */}
      <section className="product-related-section">
        <div className="section-head">
          <div>
            <p>Catálogo</p>
            <h2>Explore outras oportunidades</h2>
          </div>
          <span>Diversifique sua esteira de produtos e aumente sua comissão.</span>
        </div>
        
        <div className="premium-cards-grid">
          {relatedProducts.map((relatedProduct) => (
            <article key={relatedProduct.slug} className="premium-product-card">
              <Link href={`/detalhes/produtos/${relatedProduct.slug}`} className="premium-card-image-wrap">
                <ManagedMedia
                  alt={relatedProduct.title}
                  sizeLabel="1200 x 900"
                  src={relatedProduct.image}
                  className="managed-media-fill managed-media-fit-contain"
                />
                <span className="premium-card-badge">{relatedProduct.badge}</span>
              </Link>
              <div className="premium-card-content">
                <h3 className="premium-card-title">
                  <Link href={`/detalhes/produtos/${relatedProduct.slug}`}>
                    {relatedProduct.title}
                  </Link>
                </h3>
                <p className="premium-card-desc">{relatedProduct.shortDescription}</p>
                
                <div className="premium-card-metrics">
                  <div className="pcm-item">
                    <span>Preço</span>
                    <strong>{relatedProduct.price}</strong>
                  </div>
                  <div className="pcm-item highlight">
                    <span>Comissão</span>
                    <strong>{relatedProduct.commissionRate}</strong>
                  </div>
                </div>
                
                <Link href={`/detalhes/produtos/${relatedProduct.slug}`} className="premium-card-action">
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ClientShell>
  );
}
