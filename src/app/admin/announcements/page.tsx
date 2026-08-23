'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, Modal, Input, Select, EmptyState } from '@/components/ui';
import { mockAnnouncements } from '@/lib/mockData';
import type { Announcement, AnnouncementPriority } from '@/types';

const priorityOptions = [
  { value: 'normal', label: '📢 Normal' },
  { value: 'important', label: '⚠️ Important' },
  { value: 'emergency', label: '🚨 Emergency' },
];

const priorityConfig: Record<AnnouncementPriority, { color: string; icon: string }> = {
  normal: { color: 'blue', icon: '📢' },
  important: { color: 'amber', icon: '⚠️' },
  emergency: { color: 'rose', icon: '🚨' },
};

const priorityBadge: Record<AnnouncementPriority, 'saffron' | 'gold' | 'red'> = {
  normal: 'saffron', important: 'gold', emergency: 'red',
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', titleMarathi: '', content: '', contentMarathi: '', priority: 'normal' as AnnouncementPriority });

  const handleAdd = () => {
    const newAnn: Announcement = {
      id: `an${Date.now()}`, mandalId: 'mandal_001', ...form,
      isActive: true, createdBy: 'user_001', createdAt: new Date(),
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    setShowModal(false);
    setForm({ title: '', titleMarathi: '', content: '', contentMarathi: '', priority: 'normal' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete?')) setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="सूचना व्यवस्थापन"
        subtitle={`${announcements.filter(a => a.isActive).length} active announcements`}
        actions={<Button onClick={() => setShowModal(true)}>+ सूचना जोडा</Button>}
      />

      <div className="space-y-3">
        {announcements.map(ann => {
          const cfg = priorityConfig[ann.priority];
          return (
            <div key={ann.id} className={`bg-white rounded-2xl border overflow-hidden ${ann.priority === 'emergency' ? 'border-rose-200' : ann.priority === 'important' ? 'border-amber-200' : 'border-amber-100'}`}>
              <div className={`px-4 py-1 text-xs font-bold ${ann.priority === 'emergency' ? 'bg-rose-50 text-rose-700' : ann.priority === 'important' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                {cfg.icon} {ann.priority.toUpperCase()}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900">{ann.title}</h3>
                    {ann.titleMarathi && <p className="text-sm text-stone-600 font-devanagari">{ann.titleMarathi}</p>}
                    <p className="text-sm text-stone-500 mt-2">{ann.content}</p>
                    {ann.contentMarathi && <p className="text-sm text-stone-400 mt-1 font-devanagari">{ann.contentMarathi}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Badge variant={priorityBadge[ann.priority]}>{ann.priority}</Badge>
                    <p className="text-xs text-stone-400">{new Date(ann.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-amber-50">
                  <button className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100">✏️ Edit</button>
                  <button className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100">🔔 Notify</button>
                  <button onClick={() => handleDelete(ann.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100">🗑️</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {announcements.length === 0 && <EmptyState icon="📢" title="No announcements yet" />}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन सूचना" size="lg">
        <div className="space-y-4">
          <Input label="Title (English) *" placeholder="Announcement title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Input label="शीर्षक (मराठी)" placeholder="मराठी शीर्षक" value={form.titleMarathi} onChange={e => setForm({...form, titleMarathi: e.target.value})} />
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1.5">Content *</label>
            <textarea className="mandal-input resize-none" rows={3} placeholder="Announcement content in English..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1.5">आशय (मराठी)</label>
            <textarea className="mandal-input resize-none font-devanagari" rows={3} placeholder="मराठीत माहिती..." value={form.contentMarathi} onChange={e => setForm({...form, contentMarathi: e.target.value})} />
          </div>
          <Select label="Priority *" options={priorityOptions} value={form.priority} onChange={e => setForm({...form, priority: e.target.value as AnnouncementPriority})} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAdd}>प्रकाशित करा</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
