'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: '', address: '', phone: '', email: '',
    description: '', opening_time: '09:00', closing_time: '18:00',
  });
  const [salonId, setSalonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: salon } = await supabase.from('salons').select('*').eq('user_id', session.user.id).single();
      if (!salon) return;
      setSalonId(salon.id);
      setForm({
        name: salon.name || '', address: salon.address || '',
        phone: salon.phone || '', email: salon.email || '',
        description: salon.description || '',
        opening_time: salon.opening_time || '09:00',
        closing_time: salon.closing_time || '18:00',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    const { error: err } = await supabase.from('salons').update(form).eq('id', salonId);
    if (err) { setError(err.message); }
    else { setSuccess('Einstellungen gespeichert!'); }
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Bist du sicher? Alle Daten werden gelöscht!')) return;
    await supabase.from('salons').delete().eq('id', salonId);
    await supabase.auth.signOut();
    router.push('/');
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-black focus:outline-none transition";

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Einstellungen</h1>
        <p className="text-gray-500 mt-1">Salon-Informationen bearbeiten</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">❌ {error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">✅ {success}</div>}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <h2 className="text-lg font-black text-gray-900 mb-6">Salon-Informationen</h2>
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Salon Name *</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
              required autoComplete="organization" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adresse</label>
            <input type="text" value={form.address} onChange={e => set('address', e.target.value)}
              autoComplete="street-address" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Telefon</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                autoComplete="tel" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                autoComplete="email" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beschreibung</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={3} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">🕐 Öffnungszeit</label>
              <input type="time" value={form.opening_time} onChange={e => set('opening_time', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">🕕 Schließungszeit</label>
              <input type="time" value={form.closing_time} onChange={e => set('closing_time', e.target.value)} className={inputClass} />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition disabled:opacity-40">
            {saving ? 'Wird gespeichert...' : '✓ Speichern'}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8">
        <h2 className="text-lg font-black text-red-600 mb-2">Gefahrenzone</h2>
        <p className="text-gray-500 text-sm mb-4">Diese Aktionen können nicht rückgängig gemacht werden.</p>
        <button onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm">
          🗑️ Salon & Konto löschen
        </button>
      </div>
    </div>
  );
}