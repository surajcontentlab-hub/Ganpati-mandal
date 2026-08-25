'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockMandal } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { Button, Input } from '@/components/ui';

const navItems = [
  { href: '/admin', label: 'Dashboard', labelMr: 'डॅशबोर्ड', icon: '📊', exact: true },
  { href: '/admin/users', label: 'User Approvals', labelMr: 'वापरकर्ता मंजुरी', icon: '👤' },
  { href: '/admin/members', label: 'Members', labelMr: 'सभासद', icon: '👥' },
  { href: '/admin/volunteers', label: 'Volunteers', labelMr: 'स्वयंसेवक', icon: '🤝' },
  { href: '/admin/donations', label: 'Donations', labelMr: 'देणग्या', icon: '💰' },
  { href: '/admin/expenses', label: 'Expenses', labelMr: 'खर्च', icon: '📋' },
  { href: '/admin/events', label: 'Events', labelMr: 'कार्यक्रम', icon: '📅' },
  { href: '/admin/competitions', label: 'Competitions', labelMr: 'स्पर्धा', icon: '🏆' },
  { href: '/admin/gallery', label: 'Gallery', labelMr: 'गॅलरी', icon: '📸' },
  { href: '/admin/announcements', label: 'Announcements', labelMr: 'सूचना', icon: '📢' },
  { href: '/admin/sponsors', label: 'Sponsors', labelMr: 'प्रायोजक', icon: '🤲' },
  { href: '/admin/lost-found', label: 'Lost & Found', labelMr: 'हरवले-सापडले', icon: '🔍' },
  { href: '/admin/reports', label: 'Reports', labelMr: 'अहवाल', icon: '📈' },
  { href: '/admin/settings', label: 'Settings', labelMr: 'सेटिंग्ज', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, login } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile === '9657798459' && password === 'Survase@321') {
      login({
        id: 'admin_1',
        name: 'Suraj Survase',
        mobile: '9657798459',
        email: 'admin@ganpatimitra.com',
        role: 'mandal_admin',
        mandalId: 'mandal_001',
        language: 'mr',
        isLoggedIn: true,
      });
      setError('');
    } else {
      setError('Invalid mobile number or password');
    }
  };

  if (!user || user.role !== 'mandal_admin') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-amber-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg mb-4">
              🙏
            </div>
            <h1 className="text-2xl font-bold text-stone-900">Admin Login</h1>
            <p className="text-stone-500 text-sm">GanpatiMitra Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold text-center">{error}</div>}
            
            <Input 
              label="Mobile Number" 
              placeholder="9876543210" 
              value={mobile} 
              onChange={e => setMobile(e.target.value)} 
              required 
            />
            <Input 
              label="Password" 
              type="password"
              placeholder="admin123" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />

            <Button className="w-full mt-2" type="submit">Login to Dashboard</Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-orange-600 font-medium hover:underline">
              ← Back to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-amber-100 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        {/* Logo */}
        <div className="p-5 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl shadow-md">
              🙏
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm leading-tight">GanpatiMitra</p>
              <p className="text-xs text-orange-500 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Mandal Info */}
        <div className="mx-3 mt-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="font-bold text-stone-800 text-xs leading-tight">{mockMandal.nameMarathi || mockMandal.name}</p>
          <p className="text-orange-500 text-xs mt-0.5">Ganesh Festival {mockMandal.currentYear}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 mt-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`sidebar-item ${isActive(item.href, item.exact) ? 'active' : ''}`}>
              <span className="text-lg">{item.icon}</span>
              <div>
                <div className="leading-tight">{item.labelMr}</div>
                <div className="text-xs opacity-70">{item.label}</div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom User */}
        <div className="p-4 border-t border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold flex items-center justify-center text-sm">
              RD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-800 truncate">Rajesh Deshmukh</p>
              <p className="text-xs text-orange-500">Mandal Admin</p>
            </div>
            <Link href="/" className="text-stone-400 hover:text-orange-500 text-lg" title="Go to Public Site">🏠</Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-amber-100 px-4 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-xl bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-600 transition-all">
              ☰
            </button>
            <div>
              <p className="font-bold text-stone-900 text-sm">
                {navItems.find(n => isActive(n.href, n.exact))?.labelMr || 'Admin'}
              </p>
              <p className="text-xs text-stone-400">
                {new Date().toLocaleDateString('mr-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl bg-orange-50 hover:bg-orange-100 flex items-center justify-center transition-all">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <Link href="/" className="text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-all">
              View Site →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
