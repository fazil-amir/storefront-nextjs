import Link from "next/link";
import CartLink from "../cart-link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.siteName}>
          Storefront
        </Link>
        <CartLink />
      </div>
    </header>
  );
}
