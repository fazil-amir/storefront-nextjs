import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/libs/types";
import styles from "./product-card.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <div className={styles.meta}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.rating}>⭐ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeletonBlock} ${styles.skeletonImage}`} />
      <div className={styles.info}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonTitleLineShort}`} />
        <div className={styles.skeletonRow}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonMetaValue}`} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonMetaValueSmall}`} />
        </div>
      </div>
    </div>
  );
}
