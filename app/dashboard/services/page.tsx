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
  const [salonId, setSalonId] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      // Get salon ID
      const { data: salonData } = await supabase
        .from('salons')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (salonData) {
        setSalonId(salonData.id);

        // Get services
        const { data } = await supabase
          .from('services')
          .select('*')
          .eq('salon_id', salonData.id);

        setServices(data || []);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!salonId) return;

    try {
      const { data, error } = await supabase
        .from('services')
        .insert([{
          salon_id: salonId,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          duration_minutes: parseInt(formData.duration_minutes),
          icon: formData.icon,
        }])
        .select();

      if (error) throw error;

      setServices([...services, data[0]]);
      setFormData({
        name: '',
        description: '',
        price: '',
        duration_minutes: '30',
        icon: '💇',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await supabase
        .from('services')
        .delete()
        .eq('id', id);

      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) return <div className="p-6">Lädt...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dienstleistungen</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Dienstleistung hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleAddService} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Beschreibung"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                step="0.01"
                placeholder="Preis (€)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Dauer (min)"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Icon (Emoji)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Speichern
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow">
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-lg font-bold">{service.name}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-blue-600 font-bold">{service.price}€</p>
                <p className="text-gray-500 text-sm">{service.duration_minutes} min</p>
              </div>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}