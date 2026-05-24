export default function ArHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <a href="/" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">EN</a>
            <a href="/de" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">DE</a>
            <a href="/ar" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">AR</a>
            <a href="/ku" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">KU</a>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
        © 2024 BeautyFlow. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}