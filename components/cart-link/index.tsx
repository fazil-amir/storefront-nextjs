"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import styles from "./cart.module.css";

export default function CartLink() {
  const { itemCount, hydrated } = useCart();

  const label =
    itemCount === 0
      ? "Cart, empty"
      : itemCount === 1
        ? "Cart, 1 item"
        : `Cart, ${itemCount} items`;

  const displayCount = itemCount > 99 ? "99+" : itemCount;

  return (
    <Link href="/cart" className={styles.cartLink} aria-label={label}>
      <span className={styles.iconWrapper}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
        </svg>
        {itemCount > 0 && (
          <span
            key={itemCount}
            className={styles.badge}
            data-animate={hydrated}
            aria-hidden="true"
          >
            {displayCount}
          </span>
        )}
      </span>
      Cart
    </Link>
  );
}
