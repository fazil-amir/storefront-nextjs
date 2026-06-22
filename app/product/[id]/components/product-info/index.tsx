import { Fragment } from "react";
import type { Product } from "@/libs/types";
import styles from "./product-info.module.css";

export default function ProductInfo({ product }: { product?: Product }) {
  const rows: Array<[string, string]> = [];
  if (product?.sku) rows.push(["SKU", product.sku]);
  if (product?.warrantyInformation) rows.push(["Warranty", product.warrantyInformation]);
  if (product?.shippingInformation) rows.push(["Shipping", product.shippingInformation]);
  if (product?.returnPolicy) rows.push(["Returns", product.returnPolicy]);

  if (rows.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionHeading}>Product information</h2>
      <div className={styles.infoList}>
        {rows.map(([label, value]) => (
          <Fragment key={label}>
            <span className={styles.infoLabel}>{label}</span>
            <span>{value}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
