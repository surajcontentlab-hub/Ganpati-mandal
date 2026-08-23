'use client';

import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal } from '@/lib/mockData';
import { Button } from '@/components/ui';

const typeConfig = {
  help_desk: { icon: '🆘', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  security: { icon: '🛡️', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  medical: { icon: '🏥', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  hospital: { icon: '🏨', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' },
  police: { icon: '👮', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  fire: { icon: '🚒', color: 'from-red-500 to-red-600', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  ambulance: { icon: '🚑', color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
};

function EmergencyButton({ contact }: { contact: typeof mockMandal.emergencyContacts[0] }) {
  const cfg = typeConfig[contact.type];

  const handleCall = () => {
    const confirmed = window.confirm(`Are you sure you want to call ${contact.label}?\n\n${contact.number}\n\nThis will initiate a phone call.`);
    if (confirmed) window.location.href = `tel:${contact.number}`;
  };

  return (
    <button onClick={handleCall} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 ${cfg.bg} ${cfg.border} hover:shadow-md transition-all active:scale-95`}>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.color} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
        {cfg.icon}
      </div>
      <div className="text-left flex-1">
        <p className={`font-bold text-base ${cfg.text}`}>{contact.label}</p>
        <p className="text-stone-500 text-sm font-mono">{contact.number}</p>
      </div>
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${cfg.color} flex items-center justify-center text-white text-sm`}>
        📞
      </div>
    </button>
  );
}

export default function EmergencyPage() {
  const contacts = mockMandal.emergencyContacts;

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl p-5 text-center text-white mb-6">
          <div className="text-4xl mb-2 animate-pulse">🚨</div>
          <h1 className="text-xl font-bold font-devanagari">आपत्कालीन मदत</h1>
          <p className="text-rose-100 text-sm mt-1">Emergency Help - त्वरित संपर्क करा</p>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          <p className="text-sm text-amber-700">खालील बटणे दाबल्यावर फोन कॉल होईल. कृपया योग्य कारणासाठीच वापरा.</p>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          {contacts.map(contact => (
            <EmergencyButton key={contact.id} contact={contact} />
          ))}
        </div>

        {/* Lost Person Form Quick Link */}
        <div className="mt-6 bg-white rounded-2xl border border-amber-100 p-4">
          <h3 className="font-bold text-stone-800 font-devanagari mb-3">👶 हरवलेली व्यक्ती?</h3>
          <p className="text-sm text-stone-500 mb-3">जर कोणी हरवले असेल तर खाली नोंदणी करा.</p>
          <a href="/lost-found">
            <Button className="w-full">🔍 Lost & Found Report करा</Button>
          </a>
        </div>

        {/* Mandal HQ Info */}
        <div className="mt-4 bg-orange-50 border border-orange-100 rounded-xl p-4">
          <h3 className="font-bold text-orange-700 font-devanagari mb-1">🏛️ Mandal Headquarters</h3>
          <p className="text-sm text-stone-600">{mockMandal.address}, {mockMandal.city}</p>
          <p className="text-sm text-stone-500 mt-1">📞 {mockMandal.phone}</p>
        </div>
      </div>
    </PublicLayout>
  );
}
