'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { Button, Badge } from '@/components/ui';

const mockReports: { id: string; type: 'person' | 'item'; name: string; status: string; dateTime: string; location: string; contact: string; description: string }[] = [
  { id: 'lf1', type: 'person', name: 'छोटा मुलगा - राहुल', status: 'reported', dateTime: '2026-08-22 14:30', location: 'Main Gate', contact: '9876543210', description: '8 years old, wearing red shirt and blue pants' },
  { id: 'lf2', type: 'item', name: 'चामड्याची पर्स', status: 'found', dateTime: '2026-08-22 11:00', location: 'Prasad Counter', contact: '9876543211', description: 'Brown leather purse with ID inside' },
];

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'report_new'>('reports');
  const [form, setForm] = useState({ type: 'person', name: '', description: '', location: '', contactName: '', contactMobile: '', age: '', gender: 'male' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setActiveTab('reports'); }, 2000);
  };

  const statusConfig: Record<string, { variant: 'green' | 'saffron' | 'gold', label: string }> = {
    reported: { variant: 'saffron', label: '🔴 Reported' },
    found: { variant: 'gold', label: '🟡 Found' },
    resolved: { variant: 'green', label: '🟢 Resolved' },
  };

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-stone-900 font-devanagari mb-1">🔍 हरवले-सापडले</h1>
        <p className="text-sm text-stone-500 mb-4">Lost & Found Reports</p>

        {/* Tabs */}
        <div className="flex bg-orange-50 rounded-xl p-1 mb-5 border border-amber-100">
          <button onClick={() => setActiveTab('reports')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'reports' ? 'bg-white shadow text-orange-600' : 'text-stone-500'}`}>
            📋 नोंदी
          </button>
          <button onClick={() => setActiveTab('report_new')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'report_new' ? 'bg-white shadow text-orange-600' : 'text-stone-500'}`}>
            + नवीन तक्रार
          </button>
        </div>

        {activeTab === 'reports' ? (
          <div className="space-y-3">
            {mockReports.map(report => (
              <div key={report.id} className="bg-white rounded-2xl border border-amber-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{report.type === 'person' ? '👤' : '📦'}</span>
                      <Badge variant="gold">{report.type === 'person' ? 'Person' : 'Item'}</Badge>
                    </div>
                    <h3 className="font-bold text-stone-900 font-devanagari">{report.name}</h3>
                    <p className="text-sm text-stone-500 mt-1">{report.description}</p>
                  </div>
                  <Badge variant={statusConfig[report.status].variant}>{statusConfig[report.status].label}</Badge>
                </div>
                <div className="space-y-1 text-xs text-stone-400">
                  <div>📍 {report.location}</div>
                  <div>⏰ {report.dateTime}</div>
                  <div>📞 Contact: {report.contact}</div>
                </div>
                <Button size="sm" variant="secondary" className="mt-3 w-full">📞 संपर्क करा</Button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-bold text-green-700 font-devanagari">तक्रार नोंदवली गेली!</p>
                <p className="text-stone-400 text-sm">Our team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex bg-stone-100 rounded-xl p-1">
                  <button type="button" onClick={() => setForm({...form, type: 'person'})}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.type === 'person' ? 'bg-orange-500 text-white' : 'text-stone-500'}`}>
                    👤 व्यक्ती (Person)
                  </button>
                  <button type="button" onClick={() => setForm({...form, type: 'item'})}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.type === 'item' ? 'bg-orange-500 text-white' : 'text-stone-500'}`}>
                    📦 वस्तू (Item)
                  </button>
                </div>

                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5 font-devanagari">
                    {form.type === 'person' ? 'व्यक्तीचे नाव' : 'वस्तूचे नाव'} *
                  </label>
                  <input required className="mandal-input" placeholder={form.type === 'person' ? 'Person name' : 'Item name'}
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>

                {form.type === 'person' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-amber-800 block mb-1.5">वय (Age)</label>
                      <input type="number" className="mandal-input" placeholder="Age" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-amber-800 block mb-1.5">लिंग (Gender)</label>
                      <select className="mandal-input" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                        <option value="male">Male / पुरुष</option>
                        <option value="female">Female / महिला</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5">वर्णन (Description) *</label>
                  <textarea required className="mandal-input resize-none" rows={3}
                    placeholder={form.type === 'person' ? 'Physical description, clothing...' : 'Item description, color, brand...'}
                    value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>

                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5">शेवटचे ठिकाण (Last Seen Location) *</label>
                  <input required className="mandal-input" placeholder="Where was person/item last seen?"
                    value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700 mb-3">Your Contact Details</p>
                  <div className="space-y-3">
                    <input className="mandal-input" placeholder="Your name *" value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} />
                    <input className="mandal-input" placeholder="Your mobile *" value={form.contactMobile} onChange={e => setForm({...form, contactMobile: e.target.value})} />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">🔍 तक्रार नोंदवा</Button>
              </>
            )}
          </form>
        )}
      </div>
    </PublicLayout>
  );
}
