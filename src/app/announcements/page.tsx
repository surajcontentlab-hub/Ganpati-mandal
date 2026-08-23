'use client';

import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal, mockAnnouncements } from '@/lib/mockData';

export default function AnnouncementsPage() {
  return (
    <PublicLayout>
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-stone-900 font-devanagari mb-1">📢 सूचना</h1>
        <p className="text-sm text-stone-500 mb-5">Important announcements from Mandal</p>

        <div className="space-y-3">
          {mockAnnouncements.map(ann => (
            <div key={ann.id} className={`rounded-2xl border overflow-hidden ${ann.priority === 'emergency' ? 'border-rose-200' : ann.priority === 'important' ? 'border-amber-200' : 'border-amber-100'}`}>
              <div className={`px-4 py-2 text-xs font-bold flex items-center gap-2 ${ann.priority === 'emergency' ? 'bg-rose-600 text-white' : ann.priority === 'important' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'}`}>
                {ann.priority === 'emergency' ? '🚨 EMERGENCY' : ann.priority === 'important' ? '⚠️ IMPORTANT' : '📢 ANNOUNCEMENT'}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-stone-900">{ann.title}</h3>
                {ann.titleMarathi && <p className="font-bold text-orange-700 font-devanagari text-sm">{ann.titleMarathi}</p>}
                <p className="text-stone-600 text-sm mt-2">{ann.content}</p>
                {ann.contentMarathi && <p className="text-stone-500 text-sm mt-1 font-devanagari">{ann.contentMarathi}</p>}
                <p className="text-xs text-stone-300 mt-3">{new Date(ann.createdAt).toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
