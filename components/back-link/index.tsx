"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./back-link.module.css";

export default function BackLink({
  fallbackHref = "/",
  className,
}: {
  children?: ReactNode;
  fallbackHref?: string;
  className?: string;
}) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className={className ? `${styles.link} ${className}` : styles.link}
    >
      <span>← </span> Back
    </button>
  );
}
