import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import "./globals.css";

const locales = ['en', 'de', 'ar', 'ku'];

export const metadata: Metadata = {
  title: "BeautyFlow",
  description: "Salon Management Platform",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const isValidLocale = locales.some(cur => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}