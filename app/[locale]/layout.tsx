import { notFound } from 'next/navigation';
import { Providers } from './provider';

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

  const messages = (await import(`../../public/locales/${locale}/messages.json`)).default;

  return (
    <html lang={locale}>
      <head />
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}