import Image from "next/image";
import type { CartItem as CartItemType } from "@/contexts/cart-context";
import styles from "./cart-item.module.css";

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}) {
  return (
    <li className={styles.item}>
      <div className={styles.thumbWrap}>
        <Image src={item.thumbnail} alt={item.title} fill className={styles.thumb} />
      </div>

      <div className={styles.details}>
        <span className={styles.itemTitle}>{item.title}</span>
        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
      </div>

      <div className={styles.qtyControls}>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className={styles.qtyButton}
        >
          −
        </button>
        <span className={styles.qtyValue}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className={styles.qtyButton}
        >
          +
        </button>
      </div>

      <button type="button" onClick={() => onRemove(item.id)} className={styles.removeButton}>
        Remove
      </button>
    </li>
  );
}
