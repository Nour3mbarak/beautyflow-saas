export const metadata = {
  title: "BeautyFlow",
  description: "پلاتفۆرمی بەڕێوەبردنی سالۆنی جوانی",
};

export default function KuHome() {
  return (
    <html lang="ku" dir="rtl">
      <body>
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <nav className="border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex gap-6">
                <a href="/" className="text-gray-700 hover:text-gray-900">English</a>
                <a href="/de" className="text-gray-700 hover:text-gray-900">Deutsch</a>
                <a href="/ar" className="text-gray-700 hover:text-gray-900">العربية</a>
                <a href="/ku" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">کوردی</a>
              </div>
              <div className="flex gap-6">
                <a href="/ku" className="text-gray-700 hover:text-gray-900">سەرەتا</a>
                <a href="#features" className="text-gray-700 hover:text-gray-900">تایبەتمەندی</a>
                <a href="#pricing" className="text-gray-700 hover:text-gray-900">نرخ</a>
                <a href="#contact" className="text-gray-700 hover:text-gray-900">پەیوەندی</a>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
            </div>
          </nav>

          {/* Hero */}
          <section className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              بەڕێوەبردنی سالۆنی جوانی
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              سالۆنەکەت بەڕێوەبەر بکە. بیزنسەکەت گەشە بدە.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              ئێستا دەست پێ بکە
            </button>
          </section>

          {/* Features */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              بۆچی BeautyFlow هەڵبژیرە؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">پلانکردنی ئەقڵی</h3>
                <p className="text-gray-600">موعدەکان بەڕێوەبەر بکە بە ئاسانی و نوێکاریە فۆرییەکان</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">کۆنتڕۆلی مالی</h3>
                <p className="text-gray-600">هاتوچۆ، خەرجی و سووود لە یەک شوێندا پەیگە بکە</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">بەڕێوەبردنی تیم</h3>
                <p className="text-gray-600">کاری کارمەندان و دانە بەڕێگە بەرزاتری ئەنجام بدە</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">وەفاداری پێڕاو</h3>
                <p className="text-gray-600">پەیوەندیی بەتر لەگەڵ VIP و گیانی پاداشت</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">شیکاری</h3>
                <p className="text-gray-600">دەرچوون دروست بکە لەسەر بنەمای داتایی فۆری</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">پیشتر زمان</h3>
                <p className="text-gray-600">پشتگیری English, Deutsch, العربية و کوردی</p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                نرخی سادە
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">دەستپێک</h3>
                  <p className="text-gray-600 mb-4">بۆ پیشەییە تاک</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">29</span>
                    <span className="text-gray-600"> $/مانگ</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">تا 250 بەشدار</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">5 کارمەند</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">بۆکینگ ئۆنلاین</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">وەفاداری پێڕاو</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    دەست پێ بکە
                  </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-2">
                    زۆرتر پێویست
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">پیشەیی</h3>
                  <p className="text-gray-600 mb-4">بۆ سالۆنە زیادبونەوەکان</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">79</span>
                    <span className="text-gray-600"> $/مانگ</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">تا 1000 بەشدار</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">12 کارمەند</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">شیکاری پێشکەوتوو</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">دانە تیم</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    دەست پێ بکە
                  </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">بنگەکان</h3>
                  <p className="text-gray-600 mb-4">بۆ کاریگەریە گەورەکان</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">199</span>
                    <span className="text-gray-600"> $/مانگ</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">بەشدار نادیار</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">کارمەند نادیار</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">پشتیوانی ڕستگیری</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">یەکتێکردنی تایبەت</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    دەست پێ بکە
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 text-white py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6">
                ئایا تۆ ئامادەیی گۆڕینی سالۆنەکەت؟
              </h2>
              <p className="text-xl mb-8 opacity-90">
                بە سەدان پیشەیی جوانی یەکبوو کە BeautyFlow بەکاردەهێنن
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
                سێبینی آزاد دەست پێ بکە
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
            © 2024 BeautyFlow. هەموو مافێك پارێزراو.
          </footer>
        </div>
      </body>
    </html>
  );
}