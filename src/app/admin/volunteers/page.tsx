'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, StatCard, SearchBar, Button, Badge, Modal, Input, Select, Table, EmptyState, Avatar } from '@/components/ui';
import { mockVolunteers } from '@/lib/mockData';
import type { Volunteer, VolunteerTeam } from '@/types';

const teamLabels: Record<VolunteerTeam, string> = {
  crowd_management: 'Crowd Mgmt', security: 'Security', decoration: 'Decoration',
  prasad: 'Prasad', cleaning: 'Cleaning', event_management: 'Event Mgmt',
  parking: 'Parking', medical: 'Medical',
};

const teamEmojis: Record<VolunteerTeam, string> = {
  crowd_management: '👥', security: '🛡️', decoration: '🎨', prasad: '🍱',
  cleaning: '🧹', event_management: '🎭', parking: '🅿️', medical: '🏥',
};

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(mockVolunteers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [form, setForm] = useState({ name: '', mobile: '', email: '', team: 'crowd_management' as VolunteerTeam });

  const filtered = volunteers.filter(v =>
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.mobile.includes(search)) &&
    (selectedTeam === 'all' || v.team === selectedTeam)
  );

  const handleAdd = () => {
    const id = Date.now().toString();
    const newVol: Volunteer = {
      id: `v${id}`, mandalId: 'mandal_001',
      volunteerId: `VOL-2026-00${volunteers.length + 1}`,
      ...form, status: 'active', createdAt: new Date(),
    };
    setVolunteers(prev => [...prev, newVol]);
    setShowModal(false);
    setForm({ name: '', mobile: '', email: '', team: 'crowd_management' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete volunteer?')) setVolunteers(prev => prev.filter(v => v.id !== id));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="स्वयंसेवक व्यवस्थापन"
        subtitle={`${volunteers.filter(v => v.status === 'active').length} active volunteers`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">🪪 Print IDs</Button>
            <Button size="sm" onClick={() => setShowModal(true)}>+ जोडा</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण" value={volunteers.length} icon="🤝" />
        <StatCard title="सक्रिय" value={volunteers.filter(v => v.status === 'active').length} icon="✅" />
        <StatCard title="पथके" value={Object.keys(teamLabels).length} icon="🏷️" />
        <StatCard title="कर्तव्ये" value="12" icon="📋" />
      </div>

      {/* Team Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-4">
        <button onClick={() => setSelectedTeam('all')} className={`chip flex-shrink-0 ${selectedTeam === 'all' ? 'chip-selected' : 'chip-unselected'}`}>All</button>
        {Object.entries(teamLabels).map(([k, v]) => (
          <button key={k} onClick={() => setSelectedTeam(k)} className={`chip flex-shrink-0 ${selectedTeam === k ? 'chip-selected' : 'chip-unselected'}`}>
            {teamEmojis[k as VolunteerTeam]} {v}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="नाव, मोबाइल..." />
      </div>

      {/* Volunteer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-white rounded-2xl border border-amber-100 p-4 hover:border-orange-200 transition-all hover:shadow-sm">
            <div className="flex items-start gap-3">
              <Avatar name={v.name} size="lg" photo={v.profilePhoto} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900">{v.name}</p>
                <p className="text-xs text-stone-400 font-mono">{v.volunteerId}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span>{teamEmojis[v.team]}</span>
                  <Badge variant="gold">{teamLabels[v.team]}</Badge>
                </div>
              </div>
              <Badge variant={v.status === 'active' ? 'green' : 'gray'}>{v.status}</Badge>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-50 flex items-center justify-between">
              <span className="text-xs text-stone-400">📱 {v.mobile}</span>
              <div className="flex gap-1">
                <button className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2 py-1 rounded-lg">🪪 ID</button>
                <button onClick={() => handleDelete(v.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-100 px-2 py-1 rounded-lg">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-amber-100">
          <EmptyState icon="🤝" title="No volunteers found" action={<Button onClick={() => setShowModal(true)}>+ Add Volunteer</Button>} />
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन स्वयंसेवक जोडा">
        <div className="space-y-4">
          <Input label="नाव *" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <Input label="मोबाइल *" placeholder="Mobile number" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
          <Input label="ईमेल" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <Select label="पथक (Team) *" value={form.team} onChange={e => setForm({...form, team: e.target.value as VolunteerTeam})}
            options={Object.entries(teamLabels).map(([v, l]) => ({ value: v, label: `${teamEmojis[v as VolunteerTeam]} ${l}` }))} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAdd}>जोडा</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
