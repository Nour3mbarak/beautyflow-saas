export default function KuHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <a href="/" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">EN</a>
            <a href="/de" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">DE</a>
            <a href="/ar" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">AR</a>
            <a href="/ku" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">KU</a>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
        © 2024 BeautyFlow. هەموو مافێك پارێزراو.
      </footer>
    </div>
  );
}