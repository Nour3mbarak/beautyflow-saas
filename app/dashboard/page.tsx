'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ services: 0, staff: 0, appointments: 0, revenue: 0 });
  const [salonName, setSalonName] = useState('');
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: salon } = await supabase
        .from('salons').select('id, name').eq('user_id', session.user.id).single();
      if (!salon) return;

      setSalonName(salon.name);

      const [servicesRes, staffRes, appointmentsRes] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }).eq('salon_id', salon.id),
        supabase.from('staff').select('id', { count: 'exact' }).eq('salon_id', salon.id),
        supabase.from('appointments').select('*').eq('salon_id', salon.id),
      ]);

      const appointments = appointmentsRes.data || [];
      const revenue = appointments
        .filter(a => a.status === 'completed')
        .reduce((sum, a) => sum + (a.price || 0), 0);

      const today = new Date().toISOString().split('T')[0];
      const todayAppts = appointments.filter(a => a.date === today);

      setStats({
        services: servicesRes.count || 0,
        staff: staffRes.count || 0,
        appointments: appointments.length,
        revenue,
      });
      setTodayAppointments(todayAppts);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Services',    value: stats.services,    icon: '💇', href: '/dashboard/services',     color: 'bg-blue-50 text-blue-700'   },
    { label: 'Mitarbeiter', value: stats.staff,        icon: '👥', href: '/dashboard/staff',        color: 'bg-purple-50 text-purple-700'},
    { label: 'Termine',     value: stats.appointments, icon: '📅', href: '/dashboard/appointments', color: 'bg-green-50 text-green-700'  },
    { label: 'Umsatz',      value: `${stats.revenue}€`, icon: '💰', href: '/dashboard/revenue',     color: 'bg-amber-50 text-amber-700'  },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400 text-lg">Lädt...</div>
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Guten Tag! 👋</h1>
        <p className="text-gray-500 text-lg">{salonName}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon, href, color }) => (
          <Link key={label} href={href}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition group">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} text-2xl mb-4`}>
              {icon}
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </Link>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">Heutige Termine</h2>
          <Link href="/dashboard/appointments" className="text-sm text-gray-500 hover:text-black transition">
            Alle anzeigen →
          </Link>
        </div>

        {todayAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📅</div>
            <p>Keine Termine für heute</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map(appt => (
              <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-gray-900">{appt.client_name}</p>
                  <p className="text-sm text-gray-500">{appt.service_name} · {appt.time}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full
                  ${appt.status === 'completed' ? 'bg-green-100 text-green-700' :
                    appt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'}`}>
                  {appt.status === 'completed' ? 'Abgeschlossen' :
                   appt.status === 'cancelled' ? 'Storniert' : 'Geplant'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[
          { href: '/dashboard/services', label: 'Service hinzufügen', icon: '➕' },
          { href: '/dashboard/staff', label: 'Mitarbeiter verwalten', icon: '👤' },
          { href: '/dashboard/appointments', label: 'Termin buchen', icon: '📋' },
        ].map(({ href, label, icon }) => (
          <Link key={href} href={href}
            className="bg-black text-white rounded-2xl p-5 hover:bg-gray-800 transition flex items-center gap-3 font-bold">
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}