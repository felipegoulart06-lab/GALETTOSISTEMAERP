"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LiveRecord, ProductRecord } from "@/lib/platform-types";

export interface UpcomingLiveItem {
  id: string;
  slug: string;
  title: string;
  presenterName: string;
  scheduledDate: string;
  scheduledTime: string;
  products: Array<{
    id: string;
    slug: string;
    title: string;
    price?: string;
    commissionRate?: string;
  }>;
}

export function UpcomingLivesPanel({
  lives,
  fallback
}: {
  lives: UpcomingLiveItem[];
  fallback?: Array<{ title: string; detail: string; meta: string }>;
}) {
  const items = useMemo(() => {
    if (lives.length > 0) return lives;
    return (fallback ?? []).map((item, index) => ({
      id: `fallback-${index}`,
      slug: "",
      title: item.detail,
      presenterName: item.meta,
      scheduledDate: item.title,
      scheduledTime: "",
      products: []
    }));
  }, [lives, fallback]);

  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  const [openProducts, setOpenProducts] = useState<Record<string, boolean>>({});

  const togglePresence = (id: string) => {
    setConfirmed((current) => ({ ...current, [id]: !current[id] }));
  };

  const toggleProducts = (id: string) => {
    setOpenProducts((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="timeline-list">
      {items.map((item) => {
        const isConfirmed = Boolean(confirmed[item.id]);
        const productsOpen = Boolean(openProducts[item.id]);
        const timeLabel = item.scheduledTime
          ? `${item.scheduledDate}\n${item.scheduledTime}`
          : item.scheduledDate;

        return (
          <article key={item.id} className="timeline-item">
            <div className="timeline-time">{timeLabel}</div>
            <div className="timeline-card">
              <strong>{item.title}</strong>
              <span>{item.presenterName}</span>
              <div className="timeline-live-actions">
                <button
                  type="button"
                  className={`timeline-live-btn timeline-live-btn-confirm${isConfirmed ? " is-confirmed" : ""}`}
                  onClick={() => togglePresence(item.id)}
                >
                  {isConfirmed ? "Presença confirmada" : "Confirmar Presença"}
                </button>
                <button
                  type="button"
                  className={`timeline-live-btn timeline-live-btn-products${productsOpen ? " is-open" : ""}`}
                  onClick={() => toggleProducts(item.id)}
                >
                  Produtos Apresentados na Live
                </button>
              </div>
              {productsOpen ? (
                <div className="timeline-live-products">
                  {item.products.length > 0 ? (
                    item.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/detalhes/produtos/${product.slug}`}
                        className="timeline-live-product"
                      >
                        <strong>{product.title}</strong>
                        <small>
                          {product.price ? `Preço ${product.price}` : "Produto da live"}
                          {product.commissionRate ? ` • comissão ${product.commissionRate}` : ""}
                        </small>
                      </Link>
                    ))
                  ) : (
                    <p>Nenhum produto vinculado a esta live ainda.</p>
                  )}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function mapUpcomingLives(lives: LiveRecord[], products: ProductRecord[]): UpcomingLiveItem[] {
  const productById = new Map(products.map((product) => [product.id, product]));

  return [...lives]
    .sort((a, b) => `${a.scheduledDate} ${a.scheduledTime}`.localeCompare(`${b.scheduledDate} ${b.scheduledTime}`))
    .slice(0, 6)
    .map((live) => ({
      id: live.id,
      slug: live.slug,
      title: live.title,
      presenterName: live.presenterName,
      scheduledDate: live.scheduledDate,
      scheduledTime: live.scheduledTime,
      products: (Array.isArray(live.relatedProductIds) ? live.relatedProductIds : [])
        .map((productId) => productById.get(productId))
        .filter((product): product is ProductRecord => Boolean(product))
        .map((product) => ({
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          commissionRate: product.commissionRate
        }))
    }));
}
