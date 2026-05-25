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
  staff_id: string;
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

        // Load appointments
        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select('*')
          .eq('salon_id', salonData.id)
          .order('appointment_date', { ascending: false });

        setAppointments(appointmentsData || []);

        // Load services
        const { data: servicesData } = await supabase
          .from('services')
          .select('id, name, icon')
          .eq('salon_id', salonData.id);

        setServices(servicesData || []);

        // Load staff
        const { data: staffData } = await supabase
          .from('staff')
          .select('id, name')
          .eq('salon_id', salonData.id);

        setStaff(staffData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
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
      console.error('Error adding appointment:', error);
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
      console.error('Error updating status:', error);
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
      console.error('Error deleting appointment:', error);
    }
  };

  if (loading) return <div className="p-6">Lädt...</div>;

  return (
    <div className="p-6">
      {/* Navigation */}
      <div className="bg-white shadow mb-6">
        <div className="flex gap-6 px-6 py-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
          <a href="/dashboard/services" className="text-gray-600 hover:text-gray-900">Dienstleistungen</a>
          <a href="/dashboard/staff" className="text-gray-600 hover:text-gray-900">Personal</a>
          <a href="/dashboard/appointments" className="font-bold text-blue-600">Termine</a>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Termine</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Termin hinzufügen
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleAddAppointment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Kundenname"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                required
                className="px-3 py-2 border rounded"
              />
              <select
                value={formData.service_id}
                onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                required
                className="px-3 py-2 border rounded"
              >
                <option value="">Dienstleistung wählen</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                ))}
              </select>
              <select
                value={formData.staff_id}
                onChange={(e) => setFormData({ ...formData, staff_id: e.target.value })}
                className="px-3 py-2 border rounded"
              >
                <option value="">Mitarbeiter (optional)</option>
                {staff.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Notizen"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Termin erstellen
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Kunde</th>
              <th className="px-4 py-3 text-left">Datum</th>
              <th className="px-4 py-3 text-left">Uhrzeit</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{apt.customer_name}</td>
                <td className="px-4 py-3">{apt.appointment_date}</td>
                <td className="px-4 py-3">{apt.appointment_time}</td>
                <td className="px-4 py-3">
                  <select
                    value={apt.status}
                    onChange={(e) => updateStatus(apt.id, e.target.value)}
                    className={`px-2 py-1 rounded text-white text-sm ${
                      apt.status === 'confirmed' ? 'bg-green-600' :
                      apt.status === 'pending' ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Bestätigt</option>
                    <option value="cancelled">Abgebrochen</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteAppointment(apt.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}