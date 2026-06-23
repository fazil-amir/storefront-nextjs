"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product-card";
import ProductGridSkeleton from "@/components/product-grid-skeleton";
import Pagination from "@/components/pagination";
import ErrorMessage from "@/components/error-message";
import { useHomeProducts } from "@/contexts/product-context";
import { PAGE_SIZE } from "@/libs/constants";
import styles from "./page.module.css";

function HomePage({ page }: { page: number }) {
  const router = useRouter();
  const { products, totalPages, error } = useHomeProducts(page, PAGE_SIZE);

  function goToPage(nextPage: number) {
    router.push(`/?page=${nextPage}`);
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorMessage message={error} />
      </div>
    )
  }

  if (!error && products === null) {
    return (
      <div className={styles.container}>
        <ProductGridSkeleton />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products?.map((product) => (
          <div key={product.id} className={styles.gridItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
}

function HomeRoute() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  return <HomePage key={page} page={page} />;
}

export default function Home() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <HomeRoute />
    </Suspense>
  );
}
