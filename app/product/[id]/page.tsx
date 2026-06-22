"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useProductDetails } from "@/contexts/product-context";
import ProductImage from "./components/product-image";
import ProductInfo from "./components/product-info";
import ProductReviews from "./components/product-reviews";
import styles from "./page.module.css";

// Keyed by productId in the parent so navigating between products mounts a
// fresh instance, letting useProductDetails' lazy initializer pick up that
// product's cache synchronously instead of patching state from an effect.
function ProductDetails({ productId }: { productId: number }) {
  const { addToCart } = useCart();
  const { product, isLoading, error } = useProductDetails(productId);

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <Link href="/" className={styles.backLink}>
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <span>← </span> Back
      </Link>

      <div className={styles.grid}>
        <ProductImage product={product} />

        <div className={styles.info}>
          {product?.title ? (
            <h1 className={styles.title}>{product.title}</h1>
          ) : (
            <div className={`${styles.skeletonBlock} ${styles.skeletonTitle}`} />
          )}

          {(product?.brand || product?.category) && (
            <p className={styles.brandLine}>
              {[product.brand, product.category].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className={styles.metaRow}>
            {product?.price !== undefined ? (
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            ) : (
              <div className={`${styles.skeletonBlock} ${styles.skeletonPrice}`} />
            )}
            {product?.rating !== undefined ? (
              <span className={styles.rating}>⭐ {product.rating.toFixed(1)}</span>
            ) : (
              <div className={`${styles.skeletonBlock} ${styles.skeletonRating}`} />
            )}
            {product?.discountPercentage !== undefined ? (
              <span className={styles.discountBadge}>
                -{product.discountPercentage.toFixed(0)}%
              </span>
            ) : (
              <div className={`${styles.skeletonBlock} ${styles.skeletonDiscount}`} />
            )}
          </div>

          {product?.stock !== undefined && (
            <p className={styles.stock}>
              {product.stock > 0 ? (
                <span className={styles.inStock}>In stock — {product.stock} left</span>
              ) : (
                <span className={styles.outOfStock}>Out of stock</span>
              )}
            </p>
          )}

          {product?.description !== undefined ? (
            <p className={styles.description}>{product.description}</p>
          ) : (
            <div className={styles.descriptionSkeleton}>
              <div className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLine}`} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLine}`} />
              <div
                className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLineShort}`}
              />
            </div>
          )}

          {product?.tags && product.tags.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            disabled={!product}
            onClick={() =>
              product &&
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
              })
            }
            className={styles.addButton}
          >
            Add to cart
          </button>

          {isLoading && <p className={styles.loadingNote}>Loading full details…</p>}
        </div>
      </div>

      <ProductInfo product={product} />
      <ProductReviews reviews={product?.reviews} />
    </div>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <ProductDetails key={id} productId={Number(id)} />;
}
