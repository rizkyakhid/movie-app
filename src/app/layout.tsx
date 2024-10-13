import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { rubik } from "./fonts";

export const metadata: Metadata = {
  title: "Riz Movie App",
  description: "Movie App by Rizkyakhid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${rubik.className} antialiased`}>
          <DefaultLayout>{children}</DefaultLayout>
        </body>
      </html>
    </StoreProvider>
  );
}
