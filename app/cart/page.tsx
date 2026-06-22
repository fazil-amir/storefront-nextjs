"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, itemCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Your cart is empty</h1>
        <Link href="/" className={styles.link}>
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your cart</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
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
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={styles.qtyButton}
              >
                −
              </button>
              <span className={styles.qtyValue}>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={styles.qtyButton}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.footerCount}>
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </span>
        <span className={styles.footerTotal}>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
