"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fetchProductById, fetchProductsPage } from "@/libs/api";
import type { Product } from "@/libs/types";

type HomePageResult = { products: Product[]; total: number };

type ProductsContextValue = {
  getProduct: (id: number) => Product | undefined;
  getHomePage: (page: number) => HomePageResult | undefined;
  loadHomePage: (page: number, pageSize: number) => Promise<HomePageResult>;
  loadProductDetails: (id: number) => Promise<Product>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProductsContext must be used within a ProductsProvider");
  return context;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [homePages, setHomePages] = useState<Record<number, HomePageResult>>({});

  const getProduct = useCallback((id: number) => products[id], [products]);

  const getHomePage = useCallback((page: number) => homePages[page], [homePages]);

  const loadHomePage = useCallback(
    async (page: number, pageSize: number) => {
      const cached = homePages[page];
      if (cached) return cached;

      const { products: fetched, total } = await fetchProductsPage(page, pageSize);
      setProducts((current) => {
        const next = { ...current };
        for (const product of fetched) {
          next[product.id] = { ...next[product.id], ...product };
        }
        return next;
      });
      const result = { products: fetched, total };
      setHomePages((current) => ({ ...current, [page]: result }));
      return result;
    },
    [homePages]
  );

  const loadProductDetails = useCallback(
    async (id: number) => {
      const existing = products[id];
      if (existing?.description !== undefined) return existing;

      const full = await fetchProductById(id);
      setProducts((current) => ({ ...current, [id]: { ...current[id], ...full } }));
      return full;
    },
    [products]
  );

  const value = useMemo(
    () => ({ getProduct, getHomePage, loadHomePage, loadProductDetails }),
    [getProduct, getHomePage, loadHomePage, loadProductDetails]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useHomeProducts(page: number, pageSize: number) {
  const { getHomePage, loadHomePage } = useProductsContext();

  const [state, setState] = useState<{
    products: Product[] | null;
    total: number;
    error: string | null;
  }>(() => {
    const cached = getHomePage(page);
    return { products: cached?.products ?? null, total: cached?.total ?? 0, error: null };
  });

  useEffect(() => {
    if (getHomePage(page)) return;

    loadHomePage(page, pageSize)
      .then(({ products, total }) => setState({ products, total, error: null }))
      .catch((err) => setState((current) => ({ ...current, error: err.message })));
  }, [page, pageSize, getHomePage, loadHomePage]);

  const totalPages = Math.max(1, Math.ceil(state.total / pageSize));

  return { ...state, totalPages };
}

export function useProductDetails(id: number) {
  const { getProduct, loadProductDetails } = useProductsContext();

  const [product, setProduct] = useState<Product | undefined>(() => getProduct(id));
  const [isLoading, setIsLoading] = useState(
    () => getProduct(id)?.description === undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getProduct(id)?.description !== undefined) return;

    loadProductDetails(id)
      .then((full) => {
        setProduct(full);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id, getProduct, loadProductDetails]);

  return { product, isLoading, error };
}
