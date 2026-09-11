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
