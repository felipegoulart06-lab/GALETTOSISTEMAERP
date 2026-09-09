import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product-detail-page";
import { getPublishedProductBySlug, getRelatedPublishedProducts } from "@/lib/platform-content";

export const dynamic = "force-dynamic";

export default async function ProductDetailsRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, relatedProducts] = await Promise.all([getPublishedProductBySlug(slug), getRelatedPublishedProducts(slug)]);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
