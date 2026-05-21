'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
          <div className="flex gap-6">
            <a href="#" className="text-gray-700 hover:text-gray-900">{t('nav.home')}</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">{t('nav.features')}</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">{t('nav.pricing')}</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">{t('nav.contact')}</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('hero.subtitle')}
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
          {t('hero.cta')}
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
        {t('footer.copyright')}
      </footer>
    </div>
  );
}