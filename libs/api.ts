import type { Product } from "./types";
import { API_BASE, SUMMARY_FIELDS } from "./constants";

export async function fetchProductsPage(
  page: number,
  pageSize: number
): Promise<{ products: Product[]; total: number }> {
  const skip = (page - 1) * pageSize;
  const res = await fetch(
    `${API_BASE}?limit=${pageSize}&skip=${skip}&select=${SUMMARY_FIELDS}`
  );
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  const data = await res.json();
  return { products: data.products, total: data.total };
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
  return res.json();
}
