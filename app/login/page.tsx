'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log('Login data:', data);  // ← NEU
    console.log('Login error:', error); // ← NEU

    if (error) { setError(error.message); return; }

    const { data: salon, error: salonError } = await supabase
      .from('salons')
      .select('id')
      .eq('user_id', data.user.id)
      .single();

    console.log('Salon:', salon);       // ← NEU
    console.log('Salon error:', salonError); // ← NEU

    router.push(salon ? '/dashboard' : '/setup');
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
            ✦ BEAUTYFLOW
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Konto erstellen</h1>
          <p className="text-gray-500">Starte dein Salon-Business</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vollständiger Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-black focus:outline-none transition"
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-black focus:outline-none transition"
                placeholder="dein@salon.de"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-black focus:outline-none transition"
                placeholder="Min. 8 Zeichen"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition disabled:opacity-40"
            >
              {loading ? 'Wird erstellt...' : 'Registrieren →'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Bereits registriert?{' '}
            <Link href="/login" className="text-black font-bold hover:underline">Einloggen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}