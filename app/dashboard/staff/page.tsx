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
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: '',
  });
  const [loading, setLoading] = useState(true);
  const [salonId, setSalonId] = useState('');

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
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

        const { data } = await supabase
          .from('staff')
          .select('*')
          .eq('salon_id', salonData.id);

        setStaff(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonId) return;

    try {
      const { data, error } = await supabase
        .from('staff')
        .insert([{
          salon_id: salonId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialties: formData.specialties.split(',').map(s => s.trim()),
        }])
        .select();

      if (error) throw error;

      setStaff([...staff, data[0]]);
      setFormData({ name: '', email: '', phone: '', specialties: '' });
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
    <div className="p-6">
      <div className="bg-white shadow mb-6">
        <div className="flex gap-6 px-6 py-4">
          <a href="/dashboard" className="text-gray-600">Dashboard</a>
          <a href="/dashboard/services" className="text-gray-600">Services</a>
          <a href="/dashboard/staff" className="font-bold text-blue-600">Staff</a>
          <a href="/dashboard/appointments" className="text-gray-600">Appointments</a>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Personal</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleAddStaff} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Spezialitäten"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Speichern
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{member.name}</h3>
            <p className="text-gray-600">{member.email}</p>
            <p className="text-gray-600">{member.phone}</p>
            <button
              onClick={() => handleDeleteStaff(member.id)}
              className="mt-3 w-full bg-red-600 text-white py-2 rounded"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}