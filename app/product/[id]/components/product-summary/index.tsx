import { useCart } from "@/contexts/cart-context";
import type { Product } from "@/libs/types";
import styles from "./product-summary.module.css";

export default function ProductSummary({
  product,
  isLoading,
}: {
  product?: Product;
  isLoading: boolean;
}) {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className={styles.info}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonTitle}`} />

        <div className={styles.metaRow}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonPrice}`} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonRating}`} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonDiscount}`} />
        </div>

        <div className={styles.descriptionSkeleton}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLine}`} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLine}`} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonDescriptionLineShort}`} />
        </div>

        <button type="button" disabled className={styles.addButton}>
          Add to cart
        </button>
      </div>
    );
  }

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      {(product.brand || product.category) && (
        <p className={styles.brandLine}>
          {[product.brand, product.category].filter(Boolean).join(" · ")}
        </p>
      )}

      <div className={styles.metaRow}>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
        <span className={styles.rating}>⭐ {product.rating.toFixed(1)}</span>
        {product.discountPercentage !== undefined && (
          <span className={styles.discountBadge}>
            -{product.discountPercentage.toFixed(0)}%
          </span>
        )}
      </div>

      {product.stock !== undefined && (
        <p className={styles.stock}>
          {product.stock > 0 ? (
            <span className={styles.inStock}>In stock — {product.stock} left</span>
          ) : (
            <span className={styles.outOfStock}>Out of stock</span>
          )}
        </p>
      )}

      {product.description !== undefined && (
        <p className={styles.description}>{product.description}</p>
      )}

      {product.tags && product.tags.length > 0 && (
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
        onClick={() =>
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
  );
}
