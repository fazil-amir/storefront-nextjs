import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/libs/types";
import styles from "./product-image.module.css";

export default function ProductImage({ product }: { product?: Product }) {
  const [index, setIndex] = useState(0);

  if (!product) {
    return (
      <div className={styles.carousel}>
        <div className={styles.imageWrap}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonImage}`} />
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];
  const activeIndex = Math.min(index, images.length - 1);

  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrap}>
        <Image
          src={images[activeIndex]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          priority={activeIndex === 0}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
