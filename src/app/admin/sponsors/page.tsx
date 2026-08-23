'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, Modal, Input, Select, EmptyState } from '@/components/ui';
import { mockSponsors } from '@/lib/mockData';
import type { Sponsor, SponsorCategory } from '@/types';

const categoryLabels: Record<SponsorCategory, string> = {
  main: 'Main Sponsor', event: 'Event Sponsor', decoration: 'Decoration Sponsor',
  prasad: 'Prasad Sponsor', supporting: 'Supporting',
};

const categoryIcons: Record<SponsorCategory, string> = {
  main: '🏆', event: '🎭', decoration: '🎨', prasad: '🍱', supporting: '🤝',
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ businessName: '', contactName: '', phone: '', email: '', category: 'supporting' as SponsorCategory, amount: '', website: '', description: '' });

  const handleAdd = () => {
    const newSponsor: Sponsor = {
      id: `sp${Date.now()}`, mandalId: 'mandal_001', ...form,
      amount: form.amount ? parseInt(form.amount) : undefined,
      isActive: true, createdAt: new Date(),
    };
    setSponsors(prev => [...prev, newSponsor]);
    setShowModal(false);
    setForm({ businessName: '', contactName: '', phone: '', email: '', category: 'supporting', amount: '', website: '', description: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete sponsor?')) setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const totalAmount = sponsors.reduce((a, s) => a + (s.amount || 0), 0);

  return (
    <AdminLayout>
      <PageHeader
        title="प्रायोजक व्यवस्थापन"
        subtitle={`Total sponsorship: ₹${totalAmount.toLocaleString('en-IN')}`}
        actions={<Button onClick={() => setShowModal(true)}>+ प्रायोजक जोडा</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map(sp => (
          <div key={sp.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-orange-200 transition-all hover:shadow-md">
            <div className="h-20 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center justify-center relative border-b border-amber-100">
              <span className="text-4xl">{categoryIcons[sp.category]}</span>
              <div className="absolute top-2 right-2">
                <Badge variant="gold">{categoryLabels[sp.category]}</Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-stone-900">{sp.businessName}</h3>
              {sp.contactName && <p className="text-sm text-stone-500">{sp.contactName}</p>}
              {sp.amount && <p className="text-lg font-black text-orange-600 mt-1">₹{sp.amount.toLocaleString('en-IN')}</p>}
              <div className="mt-2 space-y-0.5 text-xs text-stone-400">
                {sp.phone && <div>📞 {sp.phone}</div>}
                {sp.website && <div>🌐 {sp.website}</div>}
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-amber-50">
                <button className="flex-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1.5 rounded-lg">✏️ Edit</button>
                <button onClick={() => handleDelete(sp.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1.5 rounded-lg">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sponsors.length === 0 && (
        <div className="bg-white rounded-2xl border border-amber-100">
          <EmptyState icon="🤲" title="No sponsors yet" action={<Button onClick={() => setShowModal(true)}>+ Add Sponsor</Button>} />
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन प्रायोजक" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Business Name *" placeholder="Company/Business name" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} />
          <Select label="Category *" value={form.category} onChange={e => setForm({...form, category: e.target.value as SponsorCategory})}
            options={Object.entries(categoryLabels).map(([v, l]) => ({ value: v, label: `${categoryIcons[v as SponsorCategory]} ${l}` }))} />
          <Input label="Contact Person" placeholder="Contact name" value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} />
          <Input label="Phone" placeholder="Phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <Input label="Email" placeholder="email@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <Input label="Sponsorship Amount (₹)" type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          <Input label="Website" placeholder="https://..." value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
        </div>
        <div className="mt-4">
          <label className="text-sm font-semibold text-amber-800 block mb-1.5">Description</label>
          <textarea className="mandal-input resize-none" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="flex gap-3 mt-5">
          <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleAdd}>जोडा</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
