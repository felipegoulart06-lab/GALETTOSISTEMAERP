"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { parseSafeDate } from "@/lib/safe-date";
import type { UpcomingLiveItem } from "@/lib/upcoming-lives";

export type { UpcomingLiveItem };

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

  const formatLiveDate = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "A definir";
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(parseSafeDate(trimmed));
    }
    return trimmed;
  };

  const formatLiveTime = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const match = trimmed.match(/^(\d{1,2}):(\d{2})/);
    if (match) return `${match[1].padStart(2, "0")}:${match[2]}`;
    return trimmed;
  };

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
        const dateLabel = formatLiveDate(item.scheduledDate);
        const timeLabel = formatLiveTime(item.scheduledTime);

        return (
          <article key={item.id} className="timeline-item">
            <time className="timeline-time" dateTime={`${item.scheduledDate}${timeLabel ? `T${timeLabel}` : ""}`}>
              <span>{dateLabel}</span>
              {timeLabel ? <span>{timeLabel}</span> : null}
            </time>
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
