import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import "./globals.css";

const locales = ['en', 'de', 'ar', 'ku'];

export const metadata: Metadata = {
  title: "BeautyFlow",
  description: "Salon Management Platform",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const isValidLocale = locales.some(cur => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}