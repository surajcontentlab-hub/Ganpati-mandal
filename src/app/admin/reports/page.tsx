'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, StatCard } from '@/components/ui';
import { mockDonations, mockExpenses, mockMembers, mockVolunteers, mockEvents, donationChartData, expenseChartData } from '@/lib/mockData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const reportTypes = [
  { id: 'donation', label: 'Donation Report', labelMr: 'देणगी अहवाल', icon: '💰' },
  { id: 'expense', label: 'Expense Report', labelMr: 'खर्च अहवाल', icon: '📋' },
  { id: 'member', label: 'Member Report', labelMr: 'सभासद अहवाल', icon: '👥' },
  { id: 'volunteer', label: 'Volunteer Report', labelMr: 'स्वयंसेवक अहवाल', icon: '🤝' },
  { id: 'event', label: 'Event Report', labelMr: 'कार्यक्रम अहवाल', icon: '📅' },
];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('donation');

  const totalDonations = mockDonations.reduce((a, d) => a + d.amount, 0);
  const totalExpenses = mockExpenses.reduce((a, e) => a + e.amount, 0);

  return (
    <AdminLayout>
      <PageHeader
        title="अहवाल"
        subtitle="Generate & download reports"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">📊 Export PDF</Button>
            <Button variant="secondary" size="sm">📥 Export Excel</Button>
          </div>
        }
      />

      {/* Report Type Selector */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6">
        {reportTypes.map(r => (
          <button key={r.id} onClick={() => setActiveReport(r.id)}
            className={`chip flex-shrink-0 text-sm ${activeReport === r.id ? 'chip-selected' : 'chip-unselected'}`}>
            {r.icon} {r.label}
          </button>
        ))}
      </div>

      {/* Donation Report */}
      {activeReport === 'donation' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="एकूण देणग्या" value={`₹${totalDonations.toLocaleString('en-IN')}`} icon="💰" />
            <StatCard title="देणगीदार" value={mockDonations.length} icon="👥" />
            <StatCard title="सरासरी" value={`₹${Math.round(totalDonations / mockDonations.length).toLocaleString('en-IN')}`} icon="📊" />
            <StatCard title="यशस्वी" value={mockDonations.filter(d => d.paymentStatus === 'success').length} icon="✅" />
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 p-5">
            <h3 className="font-bold text-stone-800 mb-4">Daily Donation Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={donationChartData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7d15" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff7d15" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${Number(v)/1000}k`} />
                <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString('en-IN')}`} />
                <Area type="monotone" dataKey="amount" stroke="#ff7d15" strokeWidth={2} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100 flex justify-between items-center">
              <h3 className="font-bold text-stone-800">Detailed Donation List</h3>
              <Button size="sm" variant="secondary">📥 Download</Button>
            </div>
            <table className="mandal-table w-full">
              <thead>
                <tr><th>Receipt</th><th>Donor</th><th>Amount</th><th>Purpose</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {mockDonations.map(d => (
                  <tr key={d.id}>
                    <td className="font-mono text-xs">{d.receiptNumber}</td>
                    <td>{d.isAnonymous ? 'Anonymous' : d.donorName}</td>
                    <td className="font-bold text-orange-600">₹{d.amount.toLocaleString('en-IN')}</td>
                    <td className="capitalize">{d.purpose}</td>
                    <td className="text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td><span className={`text-xs font-semibold ${d.paymentStatus === 'success' ? 'text-green-600' : 'text-red-500'}`}>{d.paymentStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expense Report */}
      {activeReport === 'expense' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="एकूण खर्च" value={`₹${totalExpenses.toLocaleString('en-IN')}`} icon="📋" />
            <StatCard title="खर्चाच्या नोंदी" value={mockExpenses.length} icon="📄" />
            <StatCard title="सरासरी" value={`₹${Math.round(totalExpenses / mockExpenses.length).toLocaleString('en-IN')}`} icon="📊" />
            <StatCard title="शिल्लक" value={`₹${(totalDonations - totalExpenses).toLocaleString('en-IN')}`} icon="💵" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3 className="font-bold text-stone-800 mb-4">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={expenseChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {expenseChartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3 className="font-bold text-stone-800 mb-4">Category Details</h3>
              <div className="space-y-2">
                {expenseChartData.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-sm text-stone-600">{d.name}</span>
                    </div>
                    <span className="font-bold text-sm">₹{d.value.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Report */}
      {activeReport === 'member' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="एकूण सभासद" value={mockMembers.length} icon="👥" />
            <StatCard title="सक्रिय" value={mockMembers.filter(m => m.status === 'active').length} icon="✅" />
            <StatCard title="पदाधिकारी" value={mockMembers.filter(m => !['member', 'volunteer'].includes(m.role)).length} icon="⭐" />
            <StatCard title="या वर्षी" value={mockMembers.filter(m => new Date(m.joiningDate).getFullYear() === 2026).length} icon="🆕" />
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100 flex justify-between items-center">
              <h3 className="font-bold text-stone-800">Member Details</h3>
              <Button size="sm" variant="secondary">📥 Download</Button>
            </div>
            <table className="mandal-table w-full">
              <thead><tr><th>#</th><th>Name</th><th>Mobile</th><th>Role</th><th>Joining Date</th><th>Status</th></tr></thead>
              <tbody>
                {mockMembers.map((m, i) => (
                  <tr key={m.id}>
                    <td className="text-stone-400">{i + 1}</td>
                    <td className="font-semibold">{m.name}</td>
                    <td>{m.mobile}</td>
                    <td className="capitalize">{m.role.replace('_', ' ')}</td>
                    <td className="text-xs">{new Date(m.joiningDate).toLocaleDateString()}</td>
                    <td><span className={`text-xs font-semibold ${m.status === 'active' ? 'text-green-600' : 'text-stone-400'}`}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Volunteer Report */}
      {activeReport === 'volunteer' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="एकूण स्वयंसेवक" value={mockVolunteers.length} icon="🤝" />
            <StatCard title="सक्रिय" value={mockVolunteers.filter(v => v.status === 'active').length} icon="✅" />
            <StatCard title="पथके" value="8" icon="🏷️" />
            <StatCard title="कर्तव्ये" value="12" icon="📋" />
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100 flex justify-between items-center">
              <h3 className="font-bold text-stone-800">Volunteer Details</h3>
              <Button size="sm" variant="secondary">📥 Download</Button>
            </div>
            <table className="mandal-table w-full">
              <thead><tr><th>#</th><th>Volunteer ID</th><th>Name</th><th>Team</th><th>Mobile</th><th>Status</th></tr></thead>
              <tbody>
                {mockVolunteers.map((v, i) => (
                  <tr key={v.id}>
                    <td className="text-stone-400">{i + 1}</td>
                    <td className="font-mono text-xs text-orange-600">{v.volunteerId}</td>
                    <td className="font-semibold">{v.name}</td>
                    <td className="capitalize text-sm">{v.team.replace('_', ' ')}</td>
                    <td>{v.mobile}</td>
                    <td><span className={`text-xs font-semibold ${v.status === 'active' ? 'text-green-600' : 'text-stone-400'}`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Event Report */}
      {activeReport === 'event' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="एकूण कार्यक्रम" value={mockEvents.length} icon="📅" />
            <StatCard title="सक्रिय" value={mockEvents.filter(e => e.isActive).length} icon="✅" />
            <StatCard title="नोंदणी आवश्यक" value={mockEvents.filter(e => e.requiresRegistration).length} icon="📝" />
            <StatCard title="एकूण नोंदणी" value={mockEvents.reduce((a, e) => a + e.registrationCount, 0)} icon="👥" />
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-amber-100"><h3 className="font-bold text-stone-800">Event Details</h3></div>
            <table className="mandal-table w-full">
              <thead><tr><th>Event</th><th>Date</th><th>Time</th><th>Venue</th><th>Registered</th></tr></thead>
              <tbody>
                {mockEvents.map(ev => (
                  <tr key={ev.id}>
                    <td><p className="font-semibold text-sm">{ev.titleMarathi || ev.title}</p></td>
                    <td className="text-xs">{new Date(ev.date).toLocaleDateString()}</td>
                    <td className="text-xs">{ev.startTime}</td>
                    <td className="text-sm text-stone-500">{ev.venue}</td>
                    <td>{ev.requiresRegistration ? `${ev.registrationCount}${ev.maxParticipants ? `/${ev.maxParticipants}` : ''}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
