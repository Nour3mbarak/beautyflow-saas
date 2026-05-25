'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  service_id: string;
  notes: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    appointment_date: '',
    appointment_time: '',
    service_id: '',
    staff_id: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [salonId, setSalonId] = useState('');

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

        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select('*')
          .eq('salon_id', salonData.id)
          .order('appointment_date', { ascending: false });

        setAppointments(appointmentsData || []);

        const { data: servicesData } = await supabase
          .from('services')
          .select('id, name, icon')
          .eq('salon_id', salonData.id);

        setServices(servicesData || []);

        const { data: staffData } = await supabase
          .from('staff')
          .select('id, name')
          .eq('salon_id', salonData.id);

        setStaff(staffData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonId) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          salon_id: salonId,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          service_id: formData.service_id,
          staff_id: formData.staff_id || null,
          notes: formData.notes,
          status: 'pending',
        }])
        .select();

      if (error) throw error;

      setAppointments([data[0], ...appointments]);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        appointment_date: '',
        appointment_time: '',
        service_id: '',
        staff_id: '',
        notes: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status } : a
      ));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      setAppointments(appointments.filter(a => a.id !== id));
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
          <a href="/dashboard/staff" className="py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-600">👥 Staff</a>
          <a href="/dashboard/appointments" className="py-4 text-blue-600 font-bold border-b-2 border-blue-600">📅 Appointments</a>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Termine verwalten</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            + Termin hinzufügen
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Neuer Termin</h3>
            <form onSubmit={handleAddAppointment} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kundenname *</label>
                  <input
                    type="text"
                    placeholder="Max Mustermann"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="max@example.com"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    placeholder="+49 30 123456"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
                  <select
                    value={formData.service_id}
                    onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="">Service wählen</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Datum *</label>
                  <input
                    type="date"
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Uhrzeit *</label>
                  <input
                    type="time"
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mitarbeiter</label>
                  <select
                    value={formData.staff_id}
                    onChange={(e) => setFormData({ ...formData, staff_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="">Nicht zugewiesen</option>
                    {staff.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notizen</label>
                <textarea
                  placeholder="Zusätzliche Informationen..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  rows={3}
                />
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

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-600">Noch keine Termine hinzugefügt</p>
            <p className="text-gray-500">Füge deinen ersten Termin hinzu</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">👤 Kunde</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">📞 Kontakt</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">📅 Datum</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">🕐 Uhrzeit</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, idx) => (
                  <tr key={apt.id} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{apt.customer_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {apt.customer_email && <p>{apt.customer_email}</p>}
                      {apt.customer_phone && <p>{apt.customer_phone}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.appointment_date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{apt.appointment_time}</td>
                    <td className="px-6 py-4">
                      <select
                        value={apt.status}
                        onChange={(e) => updateStatus(apt.id, e.target.value)}
                        className={`px-3 py-2 rounded-full text-sm font-bold text-white border-0 cursor-pointer ${
                          apt.status === 'confirmed' ? 'bg-green-600 hover:bg-green-700' :
                          apt.status === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' :
                          'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="confirmed">✓ Bestätigt</option>
                        <option value="cancelled">✕ Abgebrochen</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
                      >
                        🗑️ Löschen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}