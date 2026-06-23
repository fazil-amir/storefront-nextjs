import { ProductCardSkeleton } from "@/components/product-card";
import { PAGE_SIZE } from "@/libs/constants";
import styles from "./product-grid-skeleton.module.css";

export default function ProductGridSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className={styles.gridItem}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
