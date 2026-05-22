import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautyFlow",
  description: "Salon Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wenn auf Root, redirect zu /en
  redirect('/en');

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}