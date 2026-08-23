'use client';

import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { StatCard, Card, Badge } from '@/components/ui';
import { mockDashboardStats, donationChartData, expenseChartData, mockDonations, mockEvents, mockAnnouncements } from '@/lib/mockData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const stats = mockDashboardStats;

  const formatCurrency = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <AdminLayout>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-5 mb-6 text-white">
        <div className="absolute right-4 top-0 text-8xl opacity-20 select-none">🐘</div>
        <p className="text-orange-100 text-sm font-devanagari">जय श्री गणेशा 🙏</p>
        <h1 className="text-2xl font-black mt-1">Ganesh Festival 2026</h1>
        <p className="text-orange-100 text-sm mt-1">शिवाजी नगर गणपती मंडळ • Admin Dashboard</p>
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-black">5</p>
            <p className="text-xs text-orange-100">Days Left</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-black">{formatCurrency(stats.totalDonations)}</p>
            <p className="text-xs text-orange-100">Today's Donations</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण सभासद" value={stats.totalMembers} icon="👥" subtitle="Total Members" />
        <StatCard title="स्वयंसेवक" value={stats.totalVolunteers} icon="🤝" subtitle="Volunteers" />
        <StatCard title="एकूण देणग्या" value={formatCurrency(stats.totalDonations)} icon="💰" subtitle="Total Donations" />
        <StatCard title="एकूण खर्च" value={formatCurrency(stats.totalExpenses)} icon="📋" subtitle="Total Expenses" />
        <StatCard title="येणारे कार्यक्रम" value={stats.upcomingEvents} icon="📅" subtitle="Upcoming Events" />
        <StatCard title="प्रायोजक" value={stats.totalSponsors} icon="🤲" subtitle="Sponsors" />
        <StatCard title="गॅलरी फोटो" value={stats.galleryPhotos} icon="📸" subtitle="Gallery Photos" />
        <StatCard title="नोंदणीकृत" value={stats.registeredParticipants} icon="🏆" subtitle="Participants" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Donation Chart */}
        <Card>
          <h3 className="font-bold text-stone-800 mb-4">💰 देणगी प्रवाह (Donation Trend)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={donationChartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₹${Number(v)/1000}k`} />
              <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Amount']} />
              <Bar dataKey="amount" fill="url(#donGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="donGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff7d15" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expense Chart */}
        <Card>
          <h3 className="font-bold text-stone-800 mb-4">📊 खर्च (Expenses by Category)</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={expenseChartData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {expenseChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {expenseChartData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-stone-600">{d.name}</span>
                  </div>
                  <span className="font-semibold text-stone-800">₹{(d.value/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Donations */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-stone-800">💰 Recent Donations</h3>
            <a href="/admin/donations" className="text-xs text-orange-500 font-semibold hover:underline">View all →</a>
          </div>
          <div className="space-y-3">
            {mockDonations.slice(0, 4).map(d => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-amber-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm">
                    {d.isAnonymous ? '?' : d.donorName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{d.isAnonymous ? 'Anonymous' : d.donorName}</p>
                    <p className="text-xs text-stone-400">{d.receiptNumber} • {new Date(d.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{d.amount.toLocaleString('en-IN')}</p>
                  <Badge variant={d.paymentStatus === 'success' ? 'green' : 'red'}>{d.paymentStatus}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events + Alerts */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-stone-800 mb-3">📅 Upcoming Events</h3>
            <div className="space-y-2">
              {mockEvents.slice(0, 3).map(ev => (
                <div key={ev.id} className="flex items-center gap-2.5 p-2 bg-orange-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-500 leading-none">{new Date(ev.date).toLocaleDateString('en', { month: 'short' })}</span>
                    <span className="text-base font-black text-orange-600 leading-none">{new Date(ev.date).getDate()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-800 truncate">{ev.titleMarathi}</p>
                    <p className="text-xs text-stone-400">{ev.startTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-stone-800 mb-3">🔔 Alerts</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-base">⚠️</span>
                <p className="text-xs text-amber-700 font-medium">3 volunteers have pending duty confirmations</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-rose-50 rounded-xl border border-rose-100">
                <span className="text-base">🚨</span>
                <p className="text-xs text-rose-700 font-medium">2 Lost & Found reports pending</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-xl border border-green-100">
                <span className="text-base">✅</span>
                <p className="text-xs text-green-700 font-medium">Blood donation camp: 58 registered</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
