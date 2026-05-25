'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  is_available: boolean;
  photo_url: string;
  working_hours_start: string;
  working_hours_end: string;
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    photo_url: '',
    working_hours_start: '09:00',
    working_hours_end: '18:00',
  });
  const [loading, setLoading] = useState(true);
  const [salonId, setSalonId] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const { data: salonData } = await supabase
        .from('salons')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (salonData) {
        setSalonId(salonData.id);

        const { data: staffData } = await supabase
          .from('staff')
          .select('*')
          .eq('salon_id', salonData.id);

        setStaff(staffData || []);

        const { data: servicesData } = await supabase
          .from('services')
          .select('id, name, icon')
          .eq('salon_id', salonData.id);

        setServices(servicesData || []);
      }
    } catch (error) {
      console.error('Error:', error);
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
        setFormData({ ...formData, photo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSpecialty = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(serviceName)
        ? prev.specialties.filter(s => s !== serviceName)
        : [...prev.specialties, serviceName]
    }));
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonId || formData.specialties.length === 0) {
      alert('Bitte mindestens eine Spezialität wählen!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('staff')
        .insert([{
          salon_id: salonId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialties: formData.specialties,
          photo_url: formData.photo_url,
          working_hours_start: formData.working_hours_start,
          working_hours_end: formData.working_hours_end,
        }])
        .select();

      if (error) throw error;

      setStaff([...staff, data[0]]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialties: [],
        photo_url: '',
        working_hours_start: '09:00',
        working_hours_end: '18:00',
      });
      setPhotoPreview('');
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteStaff = async (id: string) => {
    try {
      await supabase.from('staff').delete().eq('id', id);
      setStaff(staff.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="p-6">Lädt...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <a href="/dashboard" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">📊 Dashboard</a>
          <a href="/dashboard/services" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">💇 Services</a>
          <a href="/dashboard/staff" className="py-4 text-blue-600 font-bold border-b-2 border-blue-600">👥 Staff</a>
          <a href="/dashboard/appointments" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">📅 Appointments</a>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Personal verwalten</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            + Mitarbeiter hinzufügen
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Neuer Mitarbeiter</h3>
            <form onSubmit={handleAddStaff} className="space-y-5">
              {/* Foto Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Foto</label>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                        📷 Keine Foto
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg cursor-pointer text-gray-900"
                    />
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG oder WebP (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    placeholder="z.B. Maria Schmidt"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="maria@salon.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  placeholder="+49 30 123456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Arbeitszeiten */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🕐 Start Zeit</label>
                  <input
                    type="time"
                    value={formData.working_hours_start}
                    onChange={(e) => setFormData({ ...formData, working_hours_start: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🕕 End Zeit</label>
                  <input
                    type="time"
                    value={formData.working_hours_end}
                    onChange={(e) => setFormData({ ...formData, working_hours_end: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Spezialitäten */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Spezialitäten *</label>
                
                {services.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                    ⚠️ Bitte zuerst Services hinzufügen!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label key={service.id} className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(service.name)}
                          onChange={() => handleToggleSpecialty(service.name)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="ml-3 text-lg">{service.icon}</span>
                        <span className="ml-2 text-gray-900 font-semibold">{service.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  ✓ Speichern
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setPhotoPreview('');
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
                >
                  ✕ Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {staff.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-600">Noch keine Mitarbeiter hinzugefügt</p>
            <p className="text-gray-500">Füge dein erstes Mitglied hinzu, um zu starten</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Foto */}
                <div className="relative w-full h-48 bg-gray-200">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                      👤
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      member.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.is_available ? '✓ Verfügbar' : '✗ Nicht verfügbar'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  
                  {member.email && (
                    <p className="text-gray-600 text-sm mb-1">📧 {member.email}</p>
                  )}
                  {member.phone && (
                    <p className="text-gray-600 text-sm mb-3">📱 {member.phone}</p>
                  )}

                  {/* Arbeitszeiten */}
                  {member.working_hours_start && member.working_hours_end && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">⏰ Arbeitszeiten:</p>
                      <p className="text-sm text-blue-600 font-bold">
                        {member.working_hours_start} - {member.working_hours_end}
                      </p>
                    </div>
                  )}

                  {/* Spezialitäten */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Spezialitäten:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((spec, idx) => {
                          const service = services.find(s => s.name === spec);
                          return (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                              {service?.icon} {spec}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleDeleteStaff(member.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}//todo