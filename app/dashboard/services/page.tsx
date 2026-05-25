'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Service {
  id: string; name: string; description: string;
  price: number; duration_minutes: number; icon: string;
}

const ICONS = ['💇', '💅', '🧖', '💆', '✂️', '🪮', '💄', '🧴', '🛁', '🌿'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [salonId, setSalonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', duration_minutes: '30', icon: '💇' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: salon } = await supabase.from('salons').select('id').eq('user_id', session.user.id).single();
      if (!salon) { setError('Salon nicht gefunden'); return; }

      setSalonId(salon.id);
      const { data } = await supabase.from('services').select('*').eq('salon_id', salon.id).order('created_at');
      setServices(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.price) { setError('Name und Preis erforderlich'); return; }

    const { data, error: err } = await supabase.from('services').insert([{
      salon_id: salonId,
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      duration_minutes: parseInt(form.duration_minutes),
      icon: form.icon,
    }]).select().single();

    if (err) { setError(err.message); return; }
    setServices([...services, data]);
    setForm({ name: '', description: '', price: '', duration_minutes: '30', icon: '💇' });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('services').delete().eq('id', id);
    if (err) { setError(err.message); return; }
    setServices(services.filter(s => s.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">{services.length} Dienstleistungen</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-black text-white font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
          + Hinzufügen
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">❌ {error}</div>}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-black text-gray-900 mb-5">Neuer Service</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            {/* Icon picker */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {ICONS.map(ic => (
                  <button key={ic} type="button" onClick={() => setForm(f => ({ ...f, icon: ic }))}
                    className={`text-2xl p-2 rounded-lg border-2 transition ${form.icon === ic ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required placeholder="z.B. Haarschnitt"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beschreibung</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={2} placeholder="Optional..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preis (€) *</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  required placeholder="29.99"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Dauer (Min)</label>
                <input type="number" value={form.duration_minutes} onChange={e => setForm(f => ({ ...f, duration_minutes: e.target.value }))}
                  placeholder="30"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition">✓ Speichern</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">Abbrechen</button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">💇</div>
          <p className="text-gray-500 font-medium">Noch keine Services</p>
          <p className="text-gray-400 text-sm">Füge deinen ersten Service hinzu</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-black text-gray-900 mb-1">{s.name}</h3>
              {s.description && <p className="text-gray-500 text-sm mb-4">{s.description}</p>}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gray-900">{s.price}€</span>
                <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">{s.duration_minutes} Min</span>
              </div>
              <button onClick={() => handleDelete(s.id)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl transition text-sm">
                🗑️ Löschen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}