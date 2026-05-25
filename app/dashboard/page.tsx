'use client';

import { useAuth } from '@/app/context/Authcontext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Lädt...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="bg-white shadow px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Willkommen, {user.email}!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Du bist erfolgreich angemeldet. Das ist dein privates Dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Termine</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Kunden</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Umsatz</h3>
              <p className="text-3xl font-bold text-purple-600">€0</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Team</h3>
              <p className="text-3xl font-bold text-orange-600">0</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-2">🎉 Willkommen zu BeautyFlow!</h3>
            <p className="text-blue-800">
              Dein Dashboard ist bereit. Später werden wir hier Termine, Kunden, Umsatz und mehr anzeigen.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
