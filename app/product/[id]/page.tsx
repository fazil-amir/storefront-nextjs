"use client";

import { useParams } from "next/navigation";
import { useProductDetails } from "@/contexts/product-context";
import ErrorMessage from "@/components/error-message";
import BackLink from "@/components/back-link";
import ProductImage from "./components/product-image";
import ProductInfo from "./components/product-info";
import ProductReviews from "./components/product-reviews";
import ProductSummary from "./components/product-summary";

import styles from "./page.module.css";

function ProductDetails({ productId }: { productId: number }) {
  const { product, isLoading, error } = useProductDetails(productId);

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorMessage message={error}>
          <BackLink />
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackLink />

      <div className={styles.grid}>
        <ProductImage product={product} />
        <ProductSummary product={product} isLoading={isLoading} />
      </div>

      <ProductInfo product={product} isLoading={isLoading} />
      <ProductReviews reviews={product?.reviews} isLoading={isLoading} />
    </div>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <ProductDetails key={id} productId={Number(id)} />;
}
