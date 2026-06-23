import type { ReactNode } from "react";
import styles from "./error-message.module.css";

export default function ErrorMessage({
  message,
  children,
}: {
  message: string;
  children?: ReactNode;
}) {
  return (
    <>
      <p className={styles.error}>{message}</p>
      {children}
    </>
  );
}
