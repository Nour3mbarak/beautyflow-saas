'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface MonthData { month: string; revenue: number; count: number; }

export default function RevenuePage() {
  const [total, setTotal] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [topServices, setTopServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: salon } = await supabase.from('salons').select('id').eq('user_id', session.user.id).single();
      if (!salon) return;

      const { data: appointments } = await supabase
        .from('appointments').select('*')
        .eq('salon_id', salon.id).eq('status', 'completed');

      const appts = appointments || [];
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toISOString().split('T')[0];

      setTotal(appts.reduce((s, a) => s + (a.price || 0), 0));
      setThisMonth(appts.filter(a => a.date >= monthStart).reduce((s, a) => s + (a.price || 0), 0));
      setThisWeek(appts.filter(a => a.date >= weekStart).reduce((s, a) => s + (a.price || 0), 0));

      // Monthly breakdown
      const byMonth: Record<string, MonthData> = {};
      appts.forEach(a => {
        const m = a.date?.substring(0, 7) || '';
        if (!byMonth[m]) byMonth[m] = { month: m, revenue: 0, count: 0 };
        byMonth[m].revenue += a.price || 0;
        byMonth[m].count += 1;
      });
      setMonthlyData(Object.values(byMonth).sort((a, b) => b.month.localeCompare(a.month)).slice(0, 6));

      // Top services
      const byService: Record<string, { revenue: number; count: number }> = {};
      appts.forEach(a => {
        const n = a.service_name || 'Unbekannt';
        if (!byService[n]) byService[n] = { revenue: 0, count: 0 };
        byService[n].revenue += a.price || 0;
        byService[n].count += 1;
      });
      setTopServices(Object.entries(byService).map(([name, d]) => ({ name, ...d })).sort((a, b) => b.revenue - a.revenue).slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Lädt...</div>;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Umsatz</h1>
        <p className="text-gray-500 mt-1">Nur abgeschlossene Termine</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Gesamtumsatz', value: total, icon: '💰', color: 'bg-amber-50 text-amber-700' },
          { label: 'Dieser Monat', value: thisMonth, icon: '📅', color: 'bg-green-50 text-green-700' },
          { label: 'Diese Woche', value: thisWeek, icon: '📈', color: 'bg-blue-50 text-blue-700' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} text-2xl mb-4`}>{icon}</div>
            <div className="text-3xl font-black text-gray-900 mb-1">{value.toFixed(2)}€</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-gray-900 mb-6">Monatlicher Umsatz</h2>
          {monthlyData.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Noch keine Daten</div>
          ) : (
            <div className="space-y-4">
              {monthlyData.map(({ month, revenue, count }) => (
                <div key={month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{month}</span>
                    <span className="font-black text-gray-900">{revenue.toFixed(2)}€ <span className="text-gray-400 font-normal">({count} Termine)</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full transition-all"
                      style={{ width: `${(revenue / maxRevenue) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top services */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-gray-900 mb-6">Top Services</h2>
          {topServices.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Noch keine Daten</div>
          ) : (
            <div className="space-y-3">
              {topServices.map(({ name, revenue, count }, i) => (
                <div key={name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-gray-300">#{i + 1}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{name}</p>
                      <p className="text-xs text-gray-500">{count}× gebucht</p>
                    </div>
                  </div>
                  <span className="font-black text-gray-900">{revenue.toFixed(2)}€</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}