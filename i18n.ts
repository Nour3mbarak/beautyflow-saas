import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'de', 'ar', 'ku'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({locale}) => ({
  locale: (locale as string) || defaultLocale,
  messages: (await import(`./public/locales/${locale || defaultLocale}/messages.json`))
    .default
}));