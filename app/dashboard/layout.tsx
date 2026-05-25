'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const NAV = [
  { href: '/dashboard',              icon: '📊', label: 'Übersicht'      },
  { href: '/dashboard/appointments', icon: '📅', label: 'Termine'        },
  { href: '/dashboard/services',     icon: '💇', label: 'Services'       },
  { href: '/dashboard/staff',        icon: '👥', label: 'Mitarbeiter'    },
  { href: '/dashboard/revenue',      icon: '💰', label: 'Umsatz'         },
  { href: '/dashboard/settings',     icon: '⚙️',  label: 'Einstellungen' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [salonName, setSalonName] = useState('');
  const [userName, setUserName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push('/login'); return; }

    setUserName(session.user.user_metadata?.full_name || session.user.email || '');

    const { data: salon } = await supabase
      .from('salons').select('name').eq('user_id', session.user.id).single();

    if (!salon) { router.push('/setup'); return; }
    setSalonName(salon.name);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white flex flex-col transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-black tracking-widest">✦ BEAUTYFLOW</span>
          </div>
          <p className="text-white/50 text-xs truncate">{salonName}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${active ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/50 text-xs mb-1 truncate">{userName}</p>
          <button onClick={handleLogout}
            className="text-white/70 hover:text-white text-sm transition">
            → Ausloggen
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <span className="text-xl">☰</span>
          </button>
          <span className="font-bold text-gray-900">✦ BEAUTYFLOW</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}