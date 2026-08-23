'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, StatCard, SearchBar, Button, Badge, Avatar, Modal, Input, Select, Table, EmptyState } from '@/components/ui';
import { mockMembers } from '@/lib/mockData';
import type { Member, MemberRole } from '@/types';

const roleLabels: Record<MemberRole, string> = {
  president: 'President', vice_president: 'Vice President', secretary: 'Secretary',
  treasurer: 'Treasurer', event_manager: 'Event Manager', volunteer_coordinator: 'Vol. Coordinator',
  volunteer: 'Volunteer', member: 'Member',
};

const roleOptions = Object.entries(roleLabels).map(([v, l]) => ({ value: v, label: l }));

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', role: 'member' as MemberRole });

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.mobile.includes(search) ||
    m.role.includes(search.toLowerCase())
  );

  const openAdd = () => { setEditMember(null); setForm({ name: '', mobile: '', email: '', role: 'member' }); setShowModal(true); };
  const openEdit = (m: Member) => { setEditMember(m); setForm({ name: m.name, mobile: m.mobile, email: m.email || '', role: m.role }); setShowModal(true); };

  const handleSave = () => {
    if (editMember) {
      setMembers(prev => prev.map(m => m.id === editMember.id ? { ...m, ...form } : m));
    } else {
      const newMember: Member = { id: `m${Date.now()}`, mandalId: 'mandal_001', ...form, joiningDate: new Date(), status: 'active', createdAt: new Date() };
      setMembers(prev => [...prev, newMember]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this member?')) setMembers(prev => prev.filter(m => m.id !== id));
  };

  const toggleStatus = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="सभासद व्यवस्थापन"
        subtitle={`${members.filter(m => m.status === 'active').length} active members`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">📥 Export</Button>
            <Button size="sm" onClick={openAdd}>+ सभासद जोडा</Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण सभासद" value={members.length} icon="👥" />
        <StatCard title="सक्रिय" value={members.filter(m => m.status === 'active').length} icon="✅" />
        <StatCard title="निष्क्रिय" value={members.filter(m => m.status === 'inactive').length} icon="❌" />
        <StatCard title="पदाधिकारी" value={members.filter(m => !['member', 'volunteer'].includes(m.role)).length} icon="⭐" />
      </div>

      {/* Search */}
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="नाव, मोबाइल किंवा भूमिका शोधा..." />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
        <Table headers={['#', 'सभासद', 'मोबाइल', 'भूमिका', 'स्थिती', 'क्रिया']}>
          {filtered.map((m, i) => (
            <tr key={m.id}>
              <td className="text-stone-400 text-sm">{i + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} size="sm" photo={m.profilePhoto} />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{m.name}</p>
                    <p className="text-xs text-stone-400">{m.email || 'No email'}</p>
                  </div>
                </div>
              </td>
              <td className="text-sm text-stone-600">{m.mobile}</td>
              <td><Badge variant="gold">{roleLabels[m.role]}</Badge></td>
              <td>
                <button onClick={() => toggleStatus(m.id)}>
                  <Badge variant={m.status === 'active' ? 'green' : 'gray'}>{m.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                </button>
              </td>
              <td>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(m)} className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100">✏️</button>
                  <button onClick={() => handleDelete(m.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded-lg hover:bg-rose-100">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {filtered.length === 0 && <EmptyState icon="👥" title="No members found" subtitle="Try a different search or add a new member." action={<Button onClick={openAdd}>+ Add Member</Button>} />}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editMember ? 'सभासद संपादित करा' : 'नवीन सभासद जोडा'}>
        <div className="space-y-4">
          <Input label="पूर्ण नाव *" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <Input label="मोबाइल *" placeholder="10-digit mobile" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
          <Input label="ईमेल" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <Select label="भूमिका *" options={roleOptions} value={form.role} onChange={e => setForm({...form, role: e.target.value as MemberRole})} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>रद्द करा</Button>
            <Button className="flex-1" onClick={handleSave}>{editMember ? 'अपडेट करा' : 'जोडा'}</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
