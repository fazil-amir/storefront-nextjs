import styles from "./cart-summary.module.css";

export default function CartSummary({
  itemCount,
  totalPrice,
}: {
  itemCount: number;
  totalPrice: number;
}) {
  return (
    <div className={styles.footer}>
      <span className={styles.footerCount}>
        {itemCount} item{itemCount === 1 ? "" : "s"}
      </span>
      <span className={styles.footerTotal}>${totalPrice.toFixed(2)}</span>
    </div>
  );
}
