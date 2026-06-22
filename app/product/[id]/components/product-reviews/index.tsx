import type { Review } from "@/libs/types";
import styles from "./product-reviews.module.css";

export default function ProductReviews({ reviews }: { reviews?: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionHeading}>Reviews</h2>
      <div className={styles.reviews}>
        {reviews.map((review, i) => (
          <div key={i} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewer}>{review.reviewerName}</span>
              <span className={styles.reviewMeta}>
                ⭐ {review.rating} · {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
