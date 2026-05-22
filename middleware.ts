import createMiddleware from 'next-intl/middleware';
 
export const middleware = createMiddleware({
  locales: ['en', 'de', 'ar', 'ku'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});
 
export const config = {
  matcher: ['/((?!_next|api|favicon).*)']
};