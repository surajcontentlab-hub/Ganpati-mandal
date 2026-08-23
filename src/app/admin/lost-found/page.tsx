'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, StatCard, Table, EmptyState } from '@/components/ui';

const mockReports = [
  { id: 'lf1', type: 'person' as const, name: 'छोटा मुलगा - राहुल', status: 'reported', dateTime: '2026-08-22 14:30', location: 'Main Gate', contact: '9876543210', description: '8 years old, red shirt, blue pants', contactName: 'Suresh Patil' },
  { id: 'lf2', type: 'item' as const, name: 'चामड्याची पर्स', status: 'found', dateTime: '2026-08-22 11:00', location: 'Prasad Counter', contact: '9876543211', description: 'Brown leather purse with ID inside', contactName: 'Meena Shah' },
  { id: 'lf3', type: 'person' as const, name: 'वृद्ध महिला', status: 'resolved', dateTime: '2026-08-21 17:00', location: 'Darshan Line', contact: '9876543212', description: '70 years old, white saree', contactName: 'Amit Kumar' },
];

const statusBadge: Record<string, 'saffron' | 'gold' | 'green'> = { reported: 'saffron', found: 'gold', resolved: 'green' };

export default function LostFoundAdminPage() {
  const [reports, setReports] = useState(mockReports);

  const updateStatus = (id: string, status: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <AdminLayout>
      <PageHeader title="हरवले-सापडले" subtitle="Lost & Found Management" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण तक्रारी" value={reports.length} icon="🔍" />
        <StatCard title="नोंदवलेल्या" value={reports.filter(r => r.status === 'reported').length} icon="🔴" />
        <StatCard title="सापडलेल्या" value={reports.filter(r => r.status === 'found').length} icon="🟡" />
        <StatCard title="सोडवलेल्या" value={reports.filter(r => r.status === 'resolved').length} icon="🟢" />
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
        <Table headers={['Type', 'Name', 'Location', 'Date/Time', 'Contact', 'Status', 'Actions']}>
          {reports.map(r => (
            <tr key={r.id}>
              <td>
                <span className={`text-lg ${r.type === 'person' ? '👤' : '📦'}`}>{r.type === 'person' ? '👤' : '📦'}</span>
              </td>
              <td>
                <p className="font-semibold text-sm font-devanagari">{r.name}</p>
                <p className="text-xs text-stone-400 truncate max-w-[120px]">{r.description}</p>
              </td>
              <td className="text-sm text-stone-500">{r.location}</td>
              <td className="text-xs text-stone-400">{r.dateTime}</td>
              <td>
                <p className="text-sm">{r.contactName}</p>
                <p className="text-xs text-stone-400">{r.contact}</p>
              </td>
              <td><Badge variant={statusBadge[r.status]}>{r.status}</Badge></td>
              <td>
                <div className="flex gap-1">
                  <button onClick={() => updateStatus(r.id, 'found')} className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded-lg">Found</button>
                  <button onClick={() => updateStatus(r.id, 'resolved')} className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-1 rounded-lg">Resolve</button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {reports.length === 0 && <EmptyState icon="🔍" title="No lost & found reports" />}
      </div>
    </AdminLayout>
  );
}
