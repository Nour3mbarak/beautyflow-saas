export const metadata = {
  title: "BeautyFlow",
  description: "منصة إدارة صالونات التجميل",
};

export default function ArHome() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <nav className="border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex gap-6">
                <a href="/" className="text-gray-700 hover:text-gray-900">English</a>
                <a href="/de" className="text-gray-700 hover:text-gray-900">Deutsch</a>
                <a href="/ar" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">العربية</a>
                <a href="/ku" className="text-gray-700 hover:text-gray-900">کوردی</a>
              </div>
              <div className="flex gap-6">
                <a href="/ar" className="text-gray-700 hover:text-gray-900">الرئيسية</a>
                <a href="#features" className="text-gray-700 hover:text-gray-900">المميزات</a>
                <a href="#pricing" className="text-gray-700 hover:text-gray-900">الأسعار</a>
                <a href="#contact" className="text-gray-700 hover:text-gray-900">اتصل بنا</a>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
            </div>
          </nav>

          {/* Hero */}
          <section className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              إدارة صالون التجميل
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              أدر صالونك. نمّ عملك.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              ابدأ الآن
            </button>
          </section>

          {/* Features */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              لماذا تختار BeautyFlow؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">الجدولة الذكية</h3>
                <p className="text-gray-600">أدر المواعيد بسهولة مع التحديثات الفورية</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">التحكم المالي</h3>
                <p className="text-gray-600">تابع الإيرادات والنفقات والأرباح في مكان واحد</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة الفريق</h3>
                <p className="text-gray-600">راقب أداء الموظفين والعمولات بسهولة</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ولاء العملاء</h3>
                <p className="text-gray-600">بناء علاقات أقوى مع VIP والمكافآت</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">التحليلات</h3>
                <p className="text-gray-600">اتخذ قرارات بناءً على بيانات فورية</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">متعدد اللغات</h3>
                <p className="text-gray-600">دعم English و Deutsch و العربية و کوردی</p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                أسعار بسيطة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">البداية</h3>
                  <p className="text-gray-600 mb-4">للمهنيين المستقلين</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">29</span>
                    <span className="text-gray-600"> ر.س/شهر</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">حتى 250 عميل</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">5 موظفين</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">الحجز الإلكتروني</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">ولاء العملاء</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    ابدأ الآن
                  </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-2">
                    الأكثر شهرة
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">احترافي</h3>
                  <p className="text-gray-600 mb-4">للصالونات المتنامية</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">79</span>
                    <span className="text-gray-600"> ر.س/شهر</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">حتى 1000 عميل</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">12 موظف</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">تحليلات متقدمة</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">عمولات الفريق</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    ابدأ الآن
                  </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">مؤسسة</h3>
                  <p className="text-gray-600 mb-4">للعمليات الكبيرة</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">199</span>
                    <span className="text-gray-600"> ر.س/شهر</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">عملاء غير محدودين</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">موظفين غير محدودين</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">دعم الأولوية</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 ml-2">✓</span>
                      <span className="text-gray-700">التكاملات المخصصة</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 text-white py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6">
                هل أنت مستعد لتحويل صالونك؟
              </h2>
              <p className="text-xl mb-8 opacity-90">
                انضم إلى مئات محترفي الجمال الذين يستخدمون BeautyFlow
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
                ابدأ النسخة التجريبية المجانية
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
            © 2024 BeautyFlow. جميع الحقوق محفوظة.
          </footer>
        </div>
      </body>
    </html>
  );
}