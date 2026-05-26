'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Staff {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo_url: string;
  description: string;
  working_hours_start: string;
  working_hours_end: string;
  service_ids: string[];
}

interface Service {
  id: string;
  name: string;
  icon: string;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [salonId, setSalonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    photo_url: '',
    description: '',
    working_hours_start: '09:00',
    working_hours_end: '18:00',
    service_ids: [] as string[],
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: salon } = await supabase
        .from('salons')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (!salon) return;
      setSalonId(salon.id);

      // Load Staff
      const { data: staffData } = await supabase
        .from('staff')
        .select('*')
        .eq('salon_id', salon.id)
        .order('name');
      setStaff(staffData || []);

      // Load Services
      const { data: servicesData } = await supabase
        .from('services')
        .select('id, name, icon')
        .eq('salon_id', salon.id);
      setServices(servicesData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setForm(f => ({ ...f, photo_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleService = (serviceId: string) => {
    setForm(f => ({
      ...f,
      service_ids: f.service_ids.includes(serviceId)
        ? f.service_ids.filter(id => id !== serviceId)
        : [...f.service_ids, serviceId]
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { 
      setError('Name erforderlich'); 
      return; 
    }

    try {
      const { data, error: err } = await supabase
        .from('staff')
        .insert([{
          salon_id: salonId,
          name: form.name.trim(),
          position: form.position.trim(),
          email: form.email,
          phone: form.phone,
          photo_url: form.photo_url,
          description: form.description,
          working_hours_start: form.working_hours_start,
          working_hours_end: form.working_hours_end,
          service_ids: form.service_ids,
        }])
        .select()
        .single();

      if (err) { 
        setError(err.message); 
        return; 
      }

      setStaff([...staff, data]);
      setForm({
        name: '',
        position: '',
        email: '',
        phone: '',
        photo_url: '',
        description: '',
        working_hours_start: '09:00',
        working_hours_end: '18:00',
        service_ids: [],
      });
      setPhotoPreview('');
      setShowForm(false);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (err) { 
        setError(err.message); 
        return; 
      }

      setStaff(staff.filter(s => s.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Mitarbeiter</h1>
          <p className="text-gray-500 mt-1">{staff.length} Mitarbeiter</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition"
        >
          + Hinzufügen
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          ❌ {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-black text-gray-900 mb-5">Neuer Mitarbeiter</h2>
          <form onSubmit={handleAdd} className="space-y-6">
            {/* Foto */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Foto</label>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
                      📷
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-black file:text-white hover:file:bg-gray-800"
                  />
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Name & Position */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="Anna Müller"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Position</label>
                <input
                  type="text"
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  placeholder="Friseurin"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="anna@salon.de"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+49 30 123456"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
            </div>

            {/* Arbeitszeiten */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">🕐 Start Zeit</label>
                <input
                  type="time"
                  value={form.working_hours_start}
                  onChange={e => setForm(f => ({ ...f, working_hours_start: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">🕕 End Zeit</label>
                <input
                  type="time"
                  value={form.working_hours_end}
                  onChange={e => setForm(f => ({ ...f, working_hours_end: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                />
              </div>
            </div>

            {/* Beschreibung */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beschreibung</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="z.B. Spezialisiert auf Haarschnitte und Färben"
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Services</label>
              {services.length === 0 ? (
                <p className="text-sm text-gray-500">Keine Services vorhanden</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {services.map(service => (
                    <label
                      key={service.id}
                      className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-black hover:bg-gray-50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={form.service_ids.includes(service.id)}
                        onChange={() => handleToggleService(service.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="ml-3 text-lg">{service.icon}</span>
                      <span className="ml-2 text-gray-900 font-semibold">{service.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition"
              >
                ✓ Speichern
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setPhotoPreview('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Abbrechen
              </button>
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
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
            >
              {/* Foto */}
              {s.photo_url && (
                <img
                  src={s.photo_url}
                  alt={s.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              {/* Info */}
              <h3 className="font-black text-gray-900 text-lg">{s.name}</h3>
              {s.position && <p className="text-gray-500 text-sm mb-3">{s.position}</p>}

              {/* Kontakt */}
              {s.email && <p className="text-sm text-gray-500 mb-1">✉️ {s.email}</p>}
              {s.phone && <p className="text-sm text-gray-500 mb-3">📞 {s.phone}</p>}

              {/* Arbeitszeiten */}
              {s.working_hours_start && s.working_hours_end && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-xs font-bold text-gray-700 mb-1">⏰ Arbeitszeiten</p>
                  <p className="text-sm font-bold text-gray-900">
                    {s.working_hours_start} - {s.working_hours_end}
                  </p>
                </div>
              )}

              {/* Services */}
              {s.service_ids && s.service_ids.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-700 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {s.service_ids.map(serviceId => {
                      const svc = services.find(sv => sv.id === serviceId);
                      return svc ? (
                        <span key={serviceId} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                          {svc.icon} {svc.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Beschreibung */}
              {s.description && (
                <p className="text-sm text-gray-600 mb-4 italic">{s.description}</p>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(s.id)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl transition text-sm"
              >
                🗑️ Entfernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}