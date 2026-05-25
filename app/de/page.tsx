export const metadata = {
  title: "BeautyFlow",
  description: "Salon Management Platform",
};

export default function DeHome() {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <nav className="border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
              <div className="flex gap-6">
                <a href="/" className="text-gray-700 hover:text-gray-900">Startseite</a>
                <a href="#features" className="text-gray-700 hover:text-gray-900">Funktionen</a>
                <a href="#pricing" className="text-gray-700 hover:text-gray-900">Preise</a>
                <a href="#contact" className="text-gray-700 hover:text-gray-900">Kontakt</a>
                <div className="flex gap-2">
                  <a href="/" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">EN</a>
                  <a href="/de" className="px-2 py-1 rounded bg-blue-600 text-white text-sm">DE</a>
                  <a href="/ar" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">AR</a>
                  <a href="/ku" className="px-2 py-1 rounded hover:bg-gray-200 text-sm">KU</a>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero */}
          <section className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Salonverwaltung
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Verwalte deinen Salon. Wachse dein Business.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Jetzt starten
            </button>
          </section>

          {/* Features */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
    Warum BeautyFlow wählen?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center">
      <div className="text-5xl mb-4">📅</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligente Planung</h3>
      <p className="text-gray-600">Verwalte Termine mühelos mit Echtzeit-Updates</p>
    </div>
    <div className="text-center">
      <div className="text-5xl mb-4">💰</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Finanzielle Kontrolle</h3>
      <p className="text-gray-600">Verfolge Einnahmen, Ausgaben und Gewinne an einem Ort</p>
    </div>
    <div className="text-center">
      <div className="text-5xl mb-4">👥</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Team-Management</h3>
      <p className="text-gray-600">Überwache die Leistung und Provisionen deines Teams</p>
    </div>
    <div className="text-center">
      <div className="text-5xl mb-4">⭐</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Kundenloyalität</h3>
      <p className="text-gray-600">Baue stärkere Beziehungen mit VIP und Rewards auf</p>
    </div>
    <div className="text-center">
      <div className="text-5xl mb-4">📊</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Analytik</h3>
      <p className="text-gray-600">Triff Entscheidungen auf Basis von Echtzeit-Daten</p>
    </div>
    <div className="text-center">
      <div className="text-5xl mb-4">🌍</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Mehrsprachig</h3>
      <p className="text-gray-600">Unterstützung für English, Deutsch, العربية und کوردی</p>
    </div>
  </div>
</section>

{/* Pricing */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
      Einfache Preisgestaltung
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
        <p className="text-gray-600 mb-4">Für solo Profis</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">€29</span>
          <span className="text-gray-600">/Monat</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Bis zu 250 Kunden</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">5 Mitarbeiter</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Online Buchung</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Kundenloyalität</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Jetzt starten
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-2">
          Am beliebtesten
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
        <p className="text-gray-600 mb-4">Für wachsende Salons</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">€79</span>
          <span className="text-gray-600">/Monat</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Bis zu 1000 Kunden</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">12 Mitarbeiter</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Erweiterte Analytik</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Team-Provisionen</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Jetzt starten
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
        <p className="text-gray-600 mb-4">Für große Operationen</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">€199</span>
          <span className="text-gray-600">/Monat</span>
        </div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Unbegrenzte Kunden</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Unbegrenzte Mitarbeiter</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Prioritäts-Support</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">Benutzerdefinierte Integrationen</span>
          </li>
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Jetzt starten
        </button>
      </div>
    </div>
  </div>
</section>

{/* CTA */}
<section className="bg-blue-600 text-white py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-6">
      Bereit, deinen Salon zu transformieren?
    </h2>
    <p className="text-xl mb-8 opacity-90">
      Schließ dich hunderten von Beauty-Profis an, die BeautyFlow nutzen
    </p>
    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
      Kostenlose Testversion starten
    </button>
  </div>
</section>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
            © 2024 BeautyFlow. Alle Rechte vorbehalten.
          </footer>
        </div>
      </body>
    </html>
  );
}