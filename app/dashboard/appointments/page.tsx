'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Appointment {
  id: string; client_name: string; client_phone: string;
  service_name: string; staff_name: string; date: string;
  time: string; price: number; status: string; notes: string;
}

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Geplant', completed: 'Abgeschlossen', cancelled: 'Storniert',
};
const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [salonId, setSalonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    client_name: '', client_phone: '', service_name: '', staff_name: '',
    date: new Date().toISOString().split('T')[0], time: '10:00',
    price: '', status: 'scheduled', notes: '',
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: salon } = await supabase.from('salons').select('id').eq('user_id', session.user.id).single();
      if (!salon) return;
      setSalonId(salon.id);

      const [apptRes, svcRes, staffRes] = await Promise.all([
        supabase.from('appointments').select('*').eq('salon_id', salon.id).order('date', { ascending: false }).order('time'),
        supabase.from('services').select('name, price').eq('salon_id', salon.id),
        supabase.from('staff').select('name').eq('salon_id', salon.id),
      ]);

      setAppointments(apptRes.data || []);
      setServices(svcRes.data || []);
      setStaff(staffRes.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client_name.trim()) { setError('Kundenname erforderlich'); return; }

    const { data, error: err } = await supabase.from('appointments').insert([{
      salon_id: salonId, ...form, price: parseFloat(form.price) || 0,
    }]).select().single();

    if (err) { setError(err.message); return; }
    setAppointments([data, ...appointments]);
    setShowForm(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error: err } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (err) { setError(err.message); return; }
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('appointments').delete().eq('id', id);
    if (err) { setError(err.message); return; }
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Termine</h1>
          <p className="text-gray-500 mt-1">{appointments.length} gesamt</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-black text-white font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
          + Neuer Termin
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">❌ {error}</div>}

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-black text-gray-900 mb-5">Neuer Termin</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kundenname *</label>
                <input type="text" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                  required placeholder="Maria Schmidt"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Telefon</label>
                <input type="tel" value={form.client_phone} onChange={e => setForm(f => ({ ...f, client_phone: e.target.value }))}
                  autoComplete="tel" placeholder="+49 30 123456"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service</label>
                <select value={form.service_name} onChange={e => {
                    const svc = services.find(s => s.name === e.target.value);
                    setForm(f => ({ ...f, service_name: e.target.value, price: svc?.price?.toString() || f.price }));
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition bg-white">
                  <option value="">Auswählen...</option>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mitarbeiter</label>
                <select value={form.staff_name} onChange={e => setForm(f => ({ ...f, staff_name: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition bg-white">
                  <option value="">Auswählen...</option>
                  {staff.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Datum</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Uhrzeit</label>
                <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preis (€)</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notizen</label>
                <input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Optional..."
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

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['all', 'scheduled', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>
            {f === 'all' ? 'Alle' : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-gray-500 font-medium">Keine Termine gefunden</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 rounded-xl p-3 text-center min-w-[60px]">
                  <div className="text-xs text-gray-500 font-medium">{a.date}</div>
                  <div className="text-lg font-black text-gray-900">{a.time}</div>
                </div>
                <div>
                  <p className="font-black text-gray-900">{a.client_name}</p>
                  <p className="text-sm text-gray-500">{a.service_name}{a.staff_name ? ` · ${a.staff_name}` : ''}</p>
                  {a.client_phone && <p className="text-xs text-gray-400">{a.client_phone}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {a.price > 0 && <span className="font-black text-gray-900">{a.price}€</span>}
                <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 cursor-pointer ${STATUS_COLORS[a.status]}`}>
                  {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-600 transition text-lg">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}