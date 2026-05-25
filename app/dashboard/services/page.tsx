'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  icon: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '30',
    icon: '💇',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [salonId, setSalonId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading data...');
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setError('Session error');
        return;
      }
      
      if (!session) {
        console.error('No session');
        setError('Not logged in');
        return;
      }

      console.log('User ID:', session.user.id);

      const { data: salonData, error: salonError } = await supabase
        .from('salons')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (salonError) {
        console.error('Salon error:', salonError);
        setError('Salon nicht gefunden - bitte Setup durchführen!');
        return;
      }

      if (!salonData) {
        console.error('No salon data');
        setError('Salon nicht gefunden');
        return;
      }

      console.log('Salon ID:', salonData.id);
      setSalonId(salonData.id);

      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('salon_id', salonData.id);

      if (servicesError) {
        console.error('Services error:', servicesError);
        return;
      }

      console.log('Services loaded:', servicesData);
      setServices(servicesData || []);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!salonId) {
      setError('Salon ID nicht gefunden!');
      return;
    }

    if (!formData.name.trim()) {
      setError('Service Name erforderlich!');
      return;
    }

    if (!formData.price) {
      setError('Preis erforderlich!');
      return;
    }

    try {
      console.log('Adding service...', {
        salon_id: salonId,
        name: formData.name,
        price: parseFloat(formData.price),
      });

      const { data, error: insertError } = await supabase
        .from('services')
        .insert([{
          salon_id: salonId,
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          duration_minutes: parseInt(formData.duration_minutes),
          icon: formData.icon,
        }])
        .select();

      if (insertError) {
        console.error('Insert error:', insertError);
        setError('Error: ' + insertError.message);
        return;
      }

      console.log('Service added:', data);
      setServices([...services, data[0]]);
      setFormData({
        name: '',
        description: '',
        price: '',
        duration_minutes: '30',
        icon: '💇',
      });
      setShowForm(false);
    } catch (err: any) {
      console.error('Error:', err);
      setError('Error: ' + err.message);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (deleteError) {
        setError('Error: ' + deleteError.message);
        return;
      }

      setServices(services.filter(s => s.id !== id));
    } catch (err: any) {
      setError('Error: ' + err.message);
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
          <a href="/dashboard/services" className="py-4 text-blue-600 font-bold border-b-2 border-blue-600">💇 Services</a>
          <a href="/dashboard/staff" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">👥 Staff</a>
          <a href="/dashboard/appointments" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">📅 Appointments</a>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            ❌ {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dienstleistungen verwalten</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            + Service hinzufügen
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Neuer Service</h3>
            <form onSubmit={handleAddService} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name *</label>
                <input
                  type="text"
                  placeholder="z.B. Haarschnitt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Beschreibung</label>
                <textarea
                  placeholder="Beschreibe den Service..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preis (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dauer (Min)</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    placeholder="💇"
                    maxLength={2}
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none text-center text-2xl"
                  />
                </div>
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
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
                >
                  ✕ Abbrechen
                </button>
              </div>
            </form>
          </div>
        )}

        {services.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-600">Noch keine Services hinzugefügt</p>
            <p className="text-gray-500">Füge deinen ersten Service hinzu</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                
                {service.description && (
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                )}

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">Preis</p>
                      <p className="text-2xl font-bold text-blue-600">{service.price}€</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Dauer</p>
                      <p className="text-2xl font-bold text-blue-600">{service.duration_minutes}min</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
                >
                  🗑️ Löschen
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}