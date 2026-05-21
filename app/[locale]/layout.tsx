export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';

const locales = ['en', 'de', 'ar', 'ku'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
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