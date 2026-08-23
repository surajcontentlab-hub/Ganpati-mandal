'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, Modal, Input, Select, EmptyState } from '@/components/ui';
import { mockEvents } from '@/lib/mockData';
import type { Event, EventCategory } from '@/types';

const categoryOptions = [
  { value: 'aarti', label: '🪔 Aarti' }, { value: 'bhajan', label: '🎵 Bhajan' },
  { value: 'dhol_tasha', label: '🥁 Dhol Tasha' }, { value: 'cultural', label: '🎭 Cultural' },
  { value: 'mahaprasad', label: '🍱 Mahaprasad' }, { value: 'blood_donation', label: '🩸 Blood Donation' },
  { value: 'social_work', label: '🤝 Social Work' }, { value: 'competition', label: '🏆 Competition' },
  { value: 'visarjan', label: '🚣 Visarjan' }, { value: 'other', label: '📌 Other' },
];

const categoryEmojis: Record<string, string> = {
  aarti: '🪔', bhajan: '🎵', dhol_tasha: '🥁', cultural: '🎭', mahaprasad: '🍱',
  blood_donation: '🩸', social_work: '🤝', competition: '🏆', visarjan: '🚣', other: '📌',
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '', titleMarathi: '', category: 'cultural' as EventCategory,
    date: '', startTime: '', endTime: '', venue: '', organizer: '',
    requiresRegistration: false, maxParticipants: '',
  });

  const handleAdd = () => {
    const newEvent: Event = {
      id: `ev${Date.now()}`, mandalId: 'mandal_001', ...form,
      date: new Date(form.date), maxParticipants: form.maxParticipants ? parseInt(form.maxParticipants) : undefined,
      registrationCount: 0, isActive: true, createdAt: new Date(),
    };
    setEvents(prev => [...prev, newEvent]);
    setShowModal(false);
    setForm({ title: '', titleMarathi: '', category: 'cultural', date: '', startTime: '', endTime: '', venue: '', organizer: '', requiresRegistration: false, maxParticipants: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete event?')) setEvents(prev => prev.filter(e => e.id !== id));
  };

  const toggleActive = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="कार्यक्रम व्यवस्थापन"
        subtitle={`${events.filter(e => e.isActive).length} active events`}
        actions={<Button onClick={() => setShowModal(true)}>+ कार्यक्रम जोडा</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-md ${event.isActive ? 'border-amber-100' : 'border-stone-200 opacity-60'}`}>
            {/* Event Banner */}
            <div className="h-24 bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center relative">
              <span className="text-4xl">{categoryEmojis[event.category] || '📅'}</span>
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => toggleActive(event.id)}>
                  <Badge variant={event.isActive ? 'green' : 'gray'}>{event.isActive ? 'Active' : 'Inactive'}</Badge>
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-stone-900 font-devanagari">{event.titleMarathi || event.title}</h3>
              <p className="text-stone-500 text-sm">{event.title}</p>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>📅</span>
                  <span>{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>⏰</span><span>{event.startTime} – {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>📍</span><span>{event.venue}</span>
                </div>
                {event.requiresRegistration && (
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>👥</span>
                    <span>{event.registrationCount}{event.maxParticipants ? `/${event.maxParticipants}` : ''} registered</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-amber-50">
                <button className="flex-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1.5 rounded-lg hover:bg-amber-100 font-semibold">✏️ Edit</button>
                <button onClick={() => handleDelete(event.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1.5 rounded-lg hover:bg-rose-100">🗑️</button>
                {event.requiresRegistration && (
                  <button className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1.5 rounded-lg hover:bg-orange-100">👥</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-white rounded-2xl border border-amber-100">
          <EmptyState icon="📅" title="No events yet" action={<Button onClick={() => setShowModal(true)}>+ Add Event</Button>} />
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन कार्यक्रम" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Event Name *" placeholder="Event name (English)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Input label="कार्यक्रमाचे नाव (मराठी)" placeholder="Event name (Marathi)" value={form.titleMarathi} onChange={e => setForm({...form, titleMarathi: e.target.value})} />
          <Select label="Category *" options={categoryOptions} value={form.category} onChange={e => setForm({...form, category: e.target.value as EventCategory})} />
          <Input label="Date *" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          <Input label="Start Time *" type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
          <Input label="End Time *" type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} />
          <Input label="Venue *" placeholder="Event location" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
          <Input label="Organizer" placeholder="Organizer name" value={form.organizer} onChange={e => setForm({...form, organizer: e.target.value})} />
          <div className="col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-500 w-4 h-4" checked={form.requiresRegistration} onChange={e => setForm({...form, requiresRegistration: e.target.checked})} />
              <span className="text-sm font-semibold text-stone-700">Requires Registration</span>
            </label>
          </div>
          {form.requiresRegistration && (
            <Input label="Max Participants" type="number" placeholder="Maximum participants" value={form.maxParticipants} onChange={e => setForm({...form, maxParticipants: e.target.value})} />
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleAdd}>कार्यक्रम जोडा</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
