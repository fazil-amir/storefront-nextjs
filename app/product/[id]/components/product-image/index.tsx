import Image from "next/image";
import type { Product } from "@/libs/types";
import styles from "./product-image.module.css";

export default function ProductImage({ product }: { product?: Product }) {
  return (
    <div className={styles.imageWrap}>
      {product?.thumbnail ? (
        <Image
          src={product.images?.[0] ?? product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          priority
        />
      ) : (
        <div className={`${styles.skeletonBlock} ${styles.skeletonImage}`} />
      )}
    </div>
  );
}
