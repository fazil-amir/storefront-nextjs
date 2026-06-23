import type { Product } from "@/libs/types";
import styles from "./product-info.module.css";

export default function ProductInfo({
  product,
  isLoading,
}: {
  product?: Product;
  isLoading: boolean;
}) {
  const rows: Array<[string, string]> = [];
  if (product?.sku) rows.push(["SKU", product.sku]);
  if (product?.warrantyInformation) rows.push(["Warranty", product.warrantyInformation]);
  if (product?.shippingInformation) rows.push(["Shipping", product.shippingInformation]);
  if (product?.returnPolicy) rows.push(["Returns", product.returnPolicy]);

  if (rows.length === 0) {
    if (!isLoading) return null;

    return (
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Product information</h2>
        <div className={styles.infoList}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={styles.row}>
              <div className={`${styles.skeletonBlock} ${styles.skeletonLabel}`} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonValue}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionHeading}>Product information</h2>
      <div className={styles.infoList}>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.row}>
            <span className={styles.infoLabel}>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
