import type { Metadata } from "next";
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
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}