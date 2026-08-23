'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockEvents } from '@/lib/mockData';
import { Badge, Button } from '@/components/ui';
import type { EventCategory } from '@/types';

const categoryLabels: Record<string, string> = {
  all: 'सर्व', aarti: 'आरती', bhajan: 'भजन', cultural: 'सांस्कृतिक',
  mahaprasad: 'महाप्रसाद', blood_donation: 'रक्तदान', competition: 'स्पर्धा', visarjan: 'विसर्जन',
};

const categoryIcons: Record<string, string> = {
  aarti: '🪔', bhajan: '🎵', cultural: '🎭', mahaprasad: '🍱',
  blood_donation: '🩸', competition: '🏆', visarjan: '🚣', other: '📌',
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [registerModal, setRegisterModal] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', mobile: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = activeFilter === 'all' ? mockEvents : mockEvents.filter(e => e.category === activeFilter);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setRegisterModal(null); setSubmitted(false); }, 2000);
  };

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-stone-900 font-devanagari mb-1">📅 कार्यक्रम</h1>
        <p className="text-sm text-stone-500 mb-4">Ganesh Festival 2026 Events</p>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-5">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button key={key} onClick={() => setActiveFilter(key)}
              className={`chip flex-shrink-0 ${activeFilter === key ? 'chip-selected' : 'chip-unselected'}`}>
              {key !== 'all' && <span>{categoryIcons[key] || '📌'}</span>}
              <span className="font-devanagari">{label}</span>
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filtered.map(event => (
            <div key={event.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-orange-200 transition-all hover:shadow-sm">
              {/* Event Banner */}
              <div className="h-28 bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center relative">
                <span className="text-5xl">{categoryIcons[event.category] || '📅'}</span>
                <div className="absolute top-3 right-3">
                  <Badge variant={event.requiresRegistration ? 'saffron' : 'green'}>
                    {event.requiresRegistration ? 'Registration Required' : 'Free Entry'}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-stone-900 text-base font-devanagari">{event.titleMarathi}</h3>
                <p className="text-stone-500 text-sm">{event.title}</p>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>📅</span> {new Date(event.date).toLocaleDateString('mr-IN', { day: 'numeric', month: 'long' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>⏰</span> {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>📍</span> {event.venue}
                  </div>
                  {event.requiresRegistration && event.maxParticipants && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <span>👥</span> {event.registrationCount}/{event.maxParticipants} registered
                    </div>
                  )}
                </div>

                {event.requiresRegistration && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span>Registration Progress</span>
                      <span>{Math.round((event.registrationCount / (event.maxParticipants || 1)) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                        style={{ width: `${(event.registrationCount / (event.maxParticipants || 1)) * 100}%` }} />
                    </div>
                    <Button onClick={() => setRegisterModal(event.id)} size="sm" className="mt-3 w-full">
                      🙋 नोंदणी करा (Register)
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {registerModal && (
        <div className="modal-overlay" onClick={() => setRegisterModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-amber-100">
              <h2 className="text-lg font-bold text-stone-900 font-devanagari">नोंदणी करा</h2>
              <button onClick={() => setRegisterModal(null)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">✕</button>
            </div>
            <div className="p-5">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="font-bold text-green-700 font-devanagari">नोंदणी यशस्वी!</p>
                  <p className="text-stone-500 text-sm mt-1">You have been registered successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-amber-800 block mb-1.5">नाव (Name) *</label>
                    <input required className="mandal-input" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-amber-800 block mb-1.5">मोबाइल *</label>
                    <input required className="mandal-input" placeholder="10-digit mobile number" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-amber-800 block mb-1.5">ईमेल (Optional)</label>
                    <input className="mandal-input" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <Button type="submit" className="w-full" size="lg">✅ नोंदणी पूर्ण करा</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
