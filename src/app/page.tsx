'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal, mockEvents, mockAnnouncements, todayProgram } from '@/lib/mockData';
import { CrowdStatus } from '@/components/ui';

function useCountdown(targetDate: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, [targetDate]);
  return days;
}

const quickActions = [
  { icon: '🙏', label: 'दर्शन', href: '/darshan', color: 'from-orange-400 to-amber-400' },
  { icon: '💰', label: 'देणगी', href: '/donate', color: 'from-amber-400 to-yellow-400' },
  { icon: '📅', label: 'कार्यक्रम', href: '/events', color: 'from-rose-400 to-pink-400' },
  { icon: '🪔', label: 'आरती', href: '/aarti', color: 'from-orange-500 to-red-400' },
  { icon: '📸', label: 'फोटो', href: '/gallery', color: 'from-purple-400 to-violet-400' },
  { icon: '📢', label: 'सूचना', href: '/announcements', color: 'from-blue-400 to-cyan-400' },
  { icon: '📍', label: 'स्थान', href: '/location', color: 'from-green-400 to-teal-400' },
  { icon: '🚨', label: 'मदत', href: '/emergency', color: 'from-red-500 to-rose-500' },
];

export default function HomePage() {
  const daysLeft = useCountdown(mockMandal.ganeshChaturthiDate || '2026-08-27');

  return (
    <PublicLayout>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0500 0%, #2d1000 50%, #1a0800 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl" />
        <div className="absolute bottom-4 right-4 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl" />

        <div className="relative px-4 pt-6 pb-8 text-center">
          {/* Mandal Name */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-orange-400 text-xs font-semibold">🏆 Mumbai's Beloved Ganesh Ustav Mandal Since 2015</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1 font-devanagari">
            जय श्री गणेशा 🙏
          </h1>
          <p className="text-orange-300 text-sm font-devanagari mb-4">शिव प्रेमी मित्र मंडळ • Ganesh Ustav 2026</p>

          {/* Ganpati Icon */}
          <div className="relative w-36 h-36 mx-auto mb-5">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 border-2 border-orange-500/40 flex items-center justify-center animate-pulse-ring">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400/20 to-amber-400/20 flex items-center justify-center text-7xl">
                🐘
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center animate-spin-slow text-base border-2 border-amber-300">
              ✨
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 inline-block">
            <p className="text-orange-300 text-xs mb-1 font-devanagari">गणेश चतुर्थी पर्यंत</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">{daysLeft}</span>
              <span className="text-orange-300 text-sm">दिवस</span>
            </div>
            <p className="text-amber-300 text-xs mt-1">14 September 2026</p>
          </div>

          {/* Crowd Status */}
          <div className="mt-4 flex justify-center">
            <CrowdStatus status={mockMandal.darshan.crowdStatus} />
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="px-4 py-5">
        <h2 className="text-base font-bold text-stone-800 mb-3 font-devanagari">त्वरित सेवा</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(action => (
            <Link key={action.href} href={action.href} className="quick-action group">
              <div className={`quick-action-icon bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>
              <span className="text-xs font-semibold text-stone-700 font-devanagari leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TODAY'S PROGRAM ===== */}
      <section className="px-4 pb-5">
        <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-amber-100">
            <h2 className="font-bold text-stone-800 font-devanagari">🗓 आजचे कार्यक्रम</h2>
            <span className="text-xs text-orange-500 font-medium">
              {new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long' })}
            </span>
          </div>
          <div className="divide-y divide-amber-50">
            {todayProgram.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50/50 transition-colors">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-800 font-devanagari">{item.titleMr}</p>
                  <p className="text-xs text-stone-500">{item.title}</p>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARSHAN INFO ===== */}
      <section className="px-4 pb-5">
        <Link href="/darshan">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-4 cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <p className="text-white/80 text-xs font-semibold mb-1">🙏 Live Darshan</p>
            <p className="text-white text-lg font-bold font-devanagari">दर्शन वेळ</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-yellow-200 text-xs">☀️ सकाळ:</span>
                <span className="text-white text-xs font-semibold">{mockMandal.darshan.morningTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-200 text-xs">🌙 संध्याकाळ:</span>
                <span className="text-white text-xs font-semibold">{mockMandal.darshan.eveningTime}</span>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-semibold">
              Live पाहा →
            </div>
          </div>
        </Link>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="px-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-stone-800 font-devanagari">📅 येणारे कार्यक्रम</h2>
          <Link href="/events" className="text-xs font-semibold text-orange-500 hover:text-orange-700">सर्व पाहा →</Link>
        </div>
        <div className="space-y-3">
          {mockEvents.slice(0, 3).map(event => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="bg-white rounded-xl border border-amber-100 p-3 flex items-center gap-3 hover:border-orange-300 transition-all hover:shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex flex-col items-center justify-center flex-shrink-0 border border-orange-100">
                  <span className="text-xs font-bold text-orange-600">
                    {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                  </span>
                  <span className="text-lg font-black text-orange-500 leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800 text-sm truncate font-devanagari">{event.titleMarathi}</p>
                  <p className="text-xs text-stone-500">{event.startTime} • {event.venue}</p>
                </div>
                {event.requiresRegistration && (
                  <span className="text-xs bg-orange-50 text-orange-600 font-semibold px-2 py-1 rounded-lg border border-orange-100 flex-shrink-0">
                    नोंदणी
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ANNOUNCEMENTS ===== */}
      <section className="px-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-stone-800 font-devanagari">📢 ताज्या सूचना</h2>
          <Link href="/announcements" className="text-xs font-semibold text-orange-500">सर्व →</Link>
        </div>
        <div className="space-y-2">
          {mockAnnouncements.map(ann => (
            <div key={ann.id} className={`rounded-xl p-3 border ${ann.priority === 'emergency' ? 'bg-rose-50 border-rose-200' : ann.priority === 'important' ? 'bg-amber-50 border-amber-200' : 'bg-white border-amber-100'}`}>
              <div className="flex items-start gap-2">
                <span>{ann.priority === 'emergency' ? '🚨' : ann.priority === 'important' ? '⚠️' : '📢'}</span>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{ann.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{ann.contentMarathi || ann.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DONATE CTA ===== */}
      <section className="px-4 pb-6">
        <Link href="/donate">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 text-center cursor-pointer hover:shadow-xl transition-all">
            <p className="text-white text-2xl mb-2">🙏</p>
            <p className="text-white font-bold text-lg font-devanagari">मंडळाला देणगी द्या</p>
            <p className="text-amber-100 text-sm mt-1">₹101 पासून सुरुवात करा</p>
            <div className="mt-3 inline-flex bg-white text-orange-600 font-bold text-sm px-5 py-2 rounded-xl">
              आत्ता द्या →
            </div>
          </div>
        </Link>
      </section>
    </PublicLayout>
  );
}
