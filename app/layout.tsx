import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { ProductsProvider } from "@/contexts/product-context";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storefront",
  description: "Browse products, view details, and manage your cart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ProductsProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
