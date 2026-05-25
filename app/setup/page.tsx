'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [salonName, setSalonName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [openingTime, setOpeningTime] = useState('09:00');
  const [closingTime, setClosingTime] = useState('18:00');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!salonName.trim()) {
      setError('Salon Name erforderlich!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/salon/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: salonName,
          address,
          phone,
          email,
          description,
          opening_time: openingTime,
          closing_time: closingTime,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Setup failed');
      }
    } catch (err: any) {
      setError(err.message || 'Fehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Richte dein Salon ein</h2>
          <p className="text-gray-600 mb-8">Fülle die Informationen deines Salons aus</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Salon Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Salon Name *
              </label>
              <input
                type="text"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder="z.B. Beauty Plus Salon"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder="Hauptstrasse 123, 10115 Berlin"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  placeholder="+49 30 123456"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  placeholder="info@salon.de"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                rows={4}
                placeholder="Beschreibe dein Salon und deine Dienstleistungen..."
              />
            </div>

            {/* Opening Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🕐 Öffnungszeit
                </label>
                <input
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🕕 Schließungszeit
                </label>
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Wird gespeichert...' : 'Salon einrichten'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}