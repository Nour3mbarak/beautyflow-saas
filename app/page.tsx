export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
          <div className="flex gap-6">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            <div className="flex gap-2">
              <a href="/" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">EN</a>
              <a href="/de" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">DE</a>
              <a href="/ar" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">AR</a>
              <a href="/ku" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">KU</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Beauty Salon Management
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your salon. Grow your business.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </section>


      {/* Features */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
    Why Choose BeautyFlow?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Feature 1 */}
    <div className="text-center">
      <div className="text-5xl mb-4">📅</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Scheduling</h3>
      <p className="text-gray-600">Manage appointments effortlessly with real-time updates</p>
    </div>
    
    {/* Feature 2 */}
    <div className="text-center">
      <div className="text-5xl mb-4">💰</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Control</h3>
      <p className="text-gray-600">Track revenue, expenses, and profit in one place</p>
    </div>
    
    {/* Feature 3 */}
    <div className="text-center">
      <div className="text-5xl mb-4">👥</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Team Management</h3>
      <p className="text-gray-600">Monitor staff performance and commissions easily</p>
    </div>
    
    {/* Feature 4 */}
    <div className="text-center">
      <div className="text-5xl mb-4">⭐</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Loyalty</h3>
      <p className="text-gray-600">Build stronger relationships with VIP and rewards</p>
    </div>
    
    {/* Feature 5 */}
    <div className="text-center">
      <div className="text-5xl mb-4">📊</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics</h3>
      <p className="text-gray-600">Make decisions based on real-time data</p>
    </div>
    
    {/* Feature 6 */}
    <div className="text-center">
      <div className="text-5xl mb-4">🌍</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Language</h3>
      <p className="text-gray-600">Support for English, Deutsch, العربية, and کوردی</p>
    </div>
  </div>
</section>
{/* Pricing */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
      Simple Pricing
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Starter */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
        <p className="text-gray-600 mb-4">For solo professionals</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">$29</span>
          <span className="text-gray-600">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Up to 250 customers</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">5 staff members</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Online booking</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Customer loyalty</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </div>

      {/* Professional */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-2">
          Most Popular
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
        <p className="text-gray-600 mb-4">For growing salons</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">$79</span>
          <span className="text-gray-600">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Up to 1000 customers</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">12 staff members</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Advanced analytics</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Team commissions</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </div>

      {/* Enterprise */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
        <p className="text-gray-600 mb-4">For large operations</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">$199</span>
          <span className="text-gray-600">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Unlimited customers</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Unlimited staff</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Priority support</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Custom integrations</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </div>
    </div>
  </div>
</section>

{/* CTA */}
<section className="bg-blue-600 text-white py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-6">
      Ready to Transform Your Salon?
    </h2>
    <p className="text-xl mb-8 opacity-90">
      Join hundreds of beauty professionals using BeautyFlow
    </p>
    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
      Start Free Trial
    </button>
  </div>
</section>




      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
        © 2024 BeautyFlow. All rights reserved.
      </footer>
    </div>
  );
}