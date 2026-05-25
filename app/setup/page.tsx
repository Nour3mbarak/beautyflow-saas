'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SetupPage() {
  const [form, setForm] = useState({
    name: '', address: '', phone: '', email: '',
    description: '', opening_time: '09:00', closing_time: '18:00',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.name.trim()) { setError('Salon Name erforderlich!'); setLoading(false); return; }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/login'); return; }

      const { error: insertError } = await supabase.from('salons').insert([{
        user_id: session.user.id,
        name: form.name.trim(),
        address: form.address,
        phone: form.phone,
        email: form.email,
        description: form.description,
        opening_time: form.opening_time,
        closing_time: form.closing_time,
      }]);

      if (insertError) { setError(insertError.message); return; }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );

  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-black focus:outline-none transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
            ✦ BEAUTYFLOW
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Salon einrichten</h1>
          <p className="text-gray-500">Fast fertig – richte deinen Salon ein</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">❌ {error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Salon Name *">
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                required autoComplete="organization" placeholder="z.B. Beauty Plus Salon" className={inputClass} />
            </Field>

            <Field label="Adresse">
              <input type="text" value={form.address} onChange={e => set('address', e.target.value)}
                autoComplete="street-address" placeholder="Hauptstrasse 123, 10115 Berlin" className={inputClass} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Telefon">
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  autoComplete="tel" placeholder="+49 30 123456" className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  autoComplete="email" placeholder="info@salon.de" className={inputClass} />
              </Field>
            </div>

            <Field label="Beschreibung">
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                rows={3} placeholder="Beschreibe deinen Salon..." className={inputClass} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="🕐 Öffnungszeit">
                <input type="time" value={form.opening_time} onChange={e => set('opening_time', e.target.value)} className={inputClass} />
              </Field>
              <Field label="🕕 Schließungszeit">
                <input type="time" value={form.closing_time} onChange={e => set('closing_time', e.target.value)} className={inputClass} />
              </Field>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition disabled:opacity-40">
              {loading ? 'Wird gespeichert...' : 'Salon einrichten →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}