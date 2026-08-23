'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockMandal } from '@/lib/mockData';

const bottomNav = [
  { href: '/', icon: '🏠', label: 'मुख्यपृष्ठ', exact: true },
  { href: '/darshan', icon: '🙏', label: 'दर्शन' },
  { href: '/events', icon: '📅', label: 'कार्यक्रम' },
  { href: '/donate', icon: '💰', label: 'देणगी' },
  { href: '/profile', icon: '👤', label: 'प्रोफाइल' },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Top Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100' : 'bg-white border-b border-amber-100'}`}>
        <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-base shadow">
              🙏
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm leading-none">GanpatiMitra</p>
              <p className="text-orange-500 text-xs font-devanagari">{mockMandal.nameMarathi || mockMandal.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-base">
              🔔
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
            <Link href="/admin" className="text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1.5 rounded-lg transition-all">
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-100">
        <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
          {bottomNav.map(item => (
            <Link key={item.href} href={item.href}
              className={`nav-item flex-1 ${isActive(item.href, item.exact) ? 'active' : ''}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="font-devanagari text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
