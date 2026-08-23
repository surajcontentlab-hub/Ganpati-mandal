'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, StatCard, SearchBar, Button, Badge, Modal, Input, Select, Table, EmptyState } from '@/components/ui';
import { mockExpenses } from '@/lib/mockData';
import type { Expense, ExpenseCategory } from '@/types';

const categoryLabels: Record<string, string> = {
  decoration: 'Decoration', lighting: 'Lighting', sound: 'Sound', prasad: 'Prasad',
  security: 'Security', cleaning: 'Cleaning', event: 'Event', transportation: 'Transportation',
  printing: 'Printing', utilities: 'Utilities', other: 'Other',
};

const categoryColors: Record<string, string> = {
  decoration: 'saffron', lighting: 'gold', sound: 'gold', prasad: 'green',
  security: 'red', cleaning: 'gray', event: 'saffron', other: 'gray',
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'decoration' as ExpenseCategory, amount: '', vendor: '', description: '', paymentMethod: 'cash', date: new Date().toISOString().split('T')[0] });

  const filtered = expenses.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.vendor || '').toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((a, e) => a + e.amount, 0);
  const today = new Date().toDateString();
  const todayTotal = expenses.filter(e => new Date(e.date).toDateString() === today).reduce((a, e) => a + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const handleAdd = () => {
    const newExpense: Expense = {
      id: `ex${Date.now()}`, mandalId: 'mandal_001',
      ...form, amount: parseInt(form.amount) || 0,
      date: new Date(form.date), paymentMethod: form.paymentMethod as any,
      createdBy: 'user_001', createdAt: new Date(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    setShowModal(false);
    setForm({ title: '', category: 'decoration', amount: '', vendor: '', description: '', paymentMethod: 'cash', date: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete expense?')) setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <AdminLayout>
      <PageHeader
        title="खर्च व्यवस्थापन"
        subtitle={`Total: ₹${total.toLocaleString('en-IN')}`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">📥 Export</Button>
            <Button size="sm" onClick={() => setShowModal(true)}>+ खर्च जोडा</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण खर्च" value={`₹${total.toLocaleString('en-IN')}`} icon="📋" />
        <StatCard title="आजचा खर्च" value={`₹${todayTotal.toLocaleString('en-IN')}`} icon="📅" />
        <StatCard title="नोंदी" value={expenses.length} icon="📄" />
        <StatCard title="सर्वाधिक" value={topCategory ? categoryLabels[topCategory[0]] : '-'} icon="🏆" />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
        {Object.entries(categoryTotals).slice(0, 5).map(([cat, amt]) => (
          <div key={cat} className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <p className="text-xs text-stone-500 mb-1">{categoryLabels[cat]}</p>
            <p className="font-bold text-orange-600 text-sm">₹{(amt/1000).toFixed(1)}k</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="खर्चाचे नाव, vendor..." />
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
        <Table headers={['Title', 'Category', 'Amount', 'Vendor', 'Date', 'Method', '']}>
          {filtered.map(e => (
            <tr key={e.id}>
              <td>
                <p className="font-semibold text-sm text-stone-900">{e.title}</p>
                {e.description && <p className="text-xs text-stone-400 truncate max-w-[150px]">{e.description}</p>}
              </td>
              <td><Badge variant={(categoryColors[e.category] as any) || 'gray'}>{categoryLabels[e.category]}</Badge></td>
              <td className="font-bold text-rose-600">₹{e.amount.toLocaleString('en-IN')}</td>
              <td className="text-sm text-stone-500">{e.vendor || '-'}</td>
              <td className="text-xs text-stone-400">{new Date(e.date).toLocaleDateString('en-IN')}</td>
              <td className="text-xs text-stone-500 uppercase">{e.paymentMethod.replace('_', ' ')}</td>
              <td>
                <button onClick={() => handleDelete(e.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded-lg hover:bg-rose-100">🗑️</button>
              </td>
            </tr>
          ))}
        </Table>
        {filtered.length === 0 && <EmptyState icon="📋" title="No expenses found" />}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन खर्च जोडा">
        <div className="space-y-4">
          <Input label="Title *" placeholder="Expense title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Select label="Category *" value={form.category} onChange={e => setForm({...form, category: e.target.value as ExpenseCategory})}
            options={Object.entries(categoryLabels).map(([v, l]) => ({ value: v, label: l }))} />
          <Input label="Amount *" type="number" placeholder="Amount in ₹" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          <Input label="Date *" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          <Input label="Vendor" placeholder="Vendor name" value={form.vendor} onChange={e => setForm({...form, vendor: e.target.value})} />
          <Select label="Payment Method" value={form.paymentMethod} onChange={e => setForm({...form, paymentMethod: e.target.value})}
            options={[{ value: 'cash', label: 'Cash' }, { value: 'upi', label: 'UPI' }, { value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'cheque', label: 'Cheque' }]} />
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1.5">Description</label>
            <textarea className="mandal-input resize-none" rows={2} placeholder="Description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAdd}>Add Expense</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
