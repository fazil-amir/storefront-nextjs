"use client";

import { useCart } from "@/contexts/cart-context";
import BackLink from "@/components/back-link";
import CartItem from "./components/cart-item";
import CartSummary from "./components/cart-summary";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, itemCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Your cart is empty</h1>
        <BackLink />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your cart</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </ul>

      <CartSummary itemCount={itemCount} totalPrice={totalPrice} />
    </div>
  );
}
