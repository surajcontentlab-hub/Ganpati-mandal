'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, Modal, Input, Select, EmptyState, StatCard } from '@/components/ui';

const competitionTypes = [
  { value: 'drawing', label: '🎨 Drawing' }, { value: 'singing', label: '🎵 Singing' },
  { value: 'dance', label: '💃 Dance' }, { value: 'quiz', label: '❓ Quiz' },
  { value: 'essay', label: '📝 Essay' }, { value: 'fancy_dress', label: '👗 Fancy Dress' },
  { value: 'rangoli', label: '🌸 Rangoli' },
];

const ageCategories = [
  { value: 'below_6', label: 'Below 6 years' }, { value: '6_to_12', label: '6-12 years' },
  { value: '13_to_18', label: '13-18 years' }, { value: '18_plus', label: '18+ years' },
  { value: 'open', label: 'Open Category' },
];

const mockCompetitions = [
  { id: 'c1', title: 'Drawing Competition', type: 'drawing', ageCategory: '6_to_12', date: '2026-08-29', startTime: '4:00 PM', venue: 'Hall A', registrationCount: 45, maxParticipants: 60, isActive: true },
  { id: 'c2', title: 'Singing Competition', type: 'singing', ageCategory: 'open', date: '2026-08-30', startTime: '6:00 PM', venue: 'Cultural Stage', registrationCount: 20, maxParticipants: 30, isActive: true },
  { id: 'c3', title: 'Rangoli Competition', type: 'rangoli', ageCategory: '18_plus', date: '2026-09-01', startTime: '10:00 AM', venue: 'Ground Floor', registrationCount: 15, maxParticipants: 25, isActive: true },
];

const typeEmojis: Record<string, string> = {
  drawing: '🎨', singing: '🎵', dance: '💃', quiz: '❓', essay: '📝', fancy_dress: '👗', rangoli: '🌸',
};

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState(mockCompetitions);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'drawing', ageCategory: 'open', date: '', startTime: '', venue: '', maxParticipants: '' });

  const handleAdd = () => {
    const newComp = { id: `c${Date.now()}`, ...form, registrationCount: 0, maxParticipants: parseInt(form.maxParticipants) || 50, isActive: true };
    setCompetitions(prev => [...prev, newComp]);
    setShowModal(false);
    setForm({ title: '', type: 'drawing', ageCategory: 'open', date: '', startTime: '', venue: '', maxParticipants: '' });
  };

  const ageCategoryLabel: Record<string, string> = {
    below_6: 'Below 6', '6_to_12': '6-12 yrs', '13_to_18': '13-18 yrs', '18_plus': '18+', open: 'Open',
  };

  return (
    <AdminLayout>
      <PageHeader
        title="स्पर्धा व्यवस्थापन"
        subtitle="Competition Management"
        actions={<Button onClick={() => setShowModal(true)}>+ स्पर्धा जोडा</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण स्पर्धा" value={competitions.length} icon="🏆" />
        <StatCard title="एकूण नोंदणी" value={competitions.reduce((a, c) => a + c.registrationCount, 0)} icon="👥" />
        <StatCard title="उपलब्ध जागा" value={competitions.reduce((a, c) => a + (c.maxParticipants - c.registrationCount), 0)} icon="🎟️" />
        <StatCard title="सक्रिय" value={competitions.filter(c => c.isActive).length} icon="✅" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitions.map(comp => (
          <div key={comp.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-orange-200 hover:shadow-sm transition-all">
            <div className="h-24 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
              <span className="text-4xl">{typeEmojis[comp.type] || '🏆'}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-stone-900">{comp.title}</h3>
              <div className="flex gap-2 mt-1">
                <Badge variant="gold">{comp.type}</Badge>
                <Badge variant="saffron">{ageCategoryLabel[comp.ageCategory]}</Badge>
              </div>
              <div className="mt-3 space-y-1 text-xs text-stone-500">
                <div>📅 {comp.date} • ⏰ {comp.startTime}</div>
                <div>📍 {comp.venue}</div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>Registration</span>
                  <span className="font-semibold">{comp.registrationCount}/{comp.maxParticipants}</span>
                </div>
                <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full" style={{ width: `${(comp.registrationCount / comp.maxParticipants) * 100}%` }} />
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-amber-50">
                <button className="flex-1 text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-1.5 rounded-lg">👥 Participants</button>
                <button className="flex-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1.5 rounded-lg">🏅 Results</button>
                <button className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1.5 rounded-lg">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन स्पर्धा" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Competition Name *" placeholder="Name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Select label="Type *" options={competitionTypes} value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
          <Select label="Age Category *" options={ageCategories} value={form.ageCategory} onChange={e => setForm({...form, ageCategory: e.target.value})} />
          <Input label="Date *" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          <Input label="Start Time *" type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} />
          <Input label="Venue *" placeholder="Competition venue" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
          <Input label="Max Participants" type="number" placeholder="50" value={form.maxParticipants} onChange={e => setForm({...form, maxParticipants: e.target.value})} />
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleAdd}>जोडा</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
