'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Staff {
  id: string; name: string; role: string; email: string; phone: string; color: string;
}

const COLORS = ['#f87171','#fb923c','#facc15','#4ade80','#60a5fa','#a78bfa','#f472b6','#34d399'];

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [salonId, setSalonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', role: '', email: '', phone: '', color: COLORS[0] });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: salon } = await supabase.from('salons').select('id').eq('user_id', session.user.id).single();
      if (!salon) return;
      setSalonId(salon.id);
      const { data } = await supabase.from('staff').select('*').eq('salon_id', salon.id).order('name');
      setStaff(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name erforderlich'); return; }

    const { data, error: err } = await supabase.from('staff').insert([{
      salon_id: salonId, name: form.name.trim(), role: form.role.trim(),
      email: form.email, phone: form.phone, color: form.color,
    }]).select().single();

    if (err) { setError(err.message); return; }
    setStaff([...staff, data]);
    setForm({ name: '', role: '', email: '', phone: '', color: COLORS[0] });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('staff').delete().eq('id', id);
    if (err) { setError(err.message); return; }
    setStaff(staff.filter(s => s.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Mitarbeiter</h1>
          <p className="text-gray-500 mt-1">{staff.length} Mitarbeiter</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-black text-white font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
          + Hinzufügen
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">❌ {error}</div>}

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-black text-gray-900 mb-5">Neuer Mitarbeiter</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Farbe</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))}
                    style={{ backgroundColor: c }}
                    className={`w-8 h-8 rounded-full border-4 transition ${form.color === c ? 'border-black scale-110' : 'border-transparent'}`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required placeholder="Anna Müller"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Position</label>
                <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  placeholder="Friseurin"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  autoComplete="email" placeholder="anna@salon.de"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Telefon</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  autoComplete="tel" placeholder="+49 30 123456"
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

      {staff.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">👥</div>
          <p className="text-gray-500 font-medium">Noch keine Mitarbeiter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black"
                  style={{ backgroundColor: s.color }}>
                  {s.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-gray-900">{s.name}</h3>
                  <p className="text-gray-500 text-sm">{s.role || 'Mitarbeiter'}</p>
                </div>
              </div>
              {s.email && <p className="text-sm text-gray-500 mb-1">✉️ {s.email}</p>}
              {s.phone && <p className="text-sm text-gray-500 mb-4">📞 {s.phone}</p>}
              <button onClick={() => handleDelete(s.id)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl transition text-sm">
                🗑️ Entfernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
//todo
