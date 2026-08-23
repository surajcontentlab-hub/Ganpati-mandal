'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal } from '@/lib/mockData';
import { CrowdStatus, Button } from '@/components/ui';

export default function DarshanPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'timings' | 'info'>('live');
  const d = mockMandal.darshan;

  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 px-4 pt-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-bold font-devanagari">🙏 दर्शन</h1>
          <CrowdStatus status={d.crowdStatus} />
        </div>

        {/* Live Viewer */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-700 aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-3 animate-float">🐘</div>
            <p className="text-white font-bold font-devanagari text-lg">गणपती बाप्पा मोरया!</p>
            <p className="text-stone-300 text-sm mt-1">Live Darshan</p>
          </div>
          {/* Live Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Darshan Timings */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-yellow-300 text-xs font-devanagari mb-1">☀️ सकाळची वेळ</p>
            <p className="text-white font-bold text-sm">{d.morningTime}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-blue-300 text-xs font-devanagari mb-1">🌙 संध्याकाळची वेळ</p>
            <p className="text-white font-bold text-sm">{d.eveningTime}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-100 bg-white">
        {(['live', 'timings', 'info'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-orange-600 border-b-2 border-orange-500' : 'text-stone-500'}`}>
            {tab === 'live' ? '📺 Live' : tab === 'timings' ? '⏰ Timings' : 'ℹ️ Info'}
          </button>
        ))}
      </div>

      <div className="px-4 py-5">
        {activeTab === 'live' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-amber-100 p-4">
              <h3 className="font-bold text-stone-800 mb-3 font-devanagari">📸 आजचे दर्शन</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-square rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <span className="text-3xl">🐘</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'timings' && (
          <div className="space-y-3">
            {[
              { label: 'Morning Aarti', labelMr: 'सकाळची आरती', time: '6:00 AM', icon: '🪔' },
              { label: 'Abhishek', labelMr: 'अभिषेक', time: '7:00 AM', icon: '🙏' },
              { label: 'Madhyan Pooja', labelMr: 'मध्यान्ह पूजा', time: '12:00 PM', icon: '🌞' },
              { label: 'Evening Aarti', labelMr: 'संध्याकाळची आरती', time: '8:30 PM', icon: '🪔' },
              { label: 'Sheja Aarti', labelMr: 'शेजारती', time: '10:30 PM', icon: '🌙' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-amber-100">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-stone-800 font-devanagari">{item.labelMr}</p>
                  <p className="text-xs text-stone-400">{item.label}</p>
                </div>
                <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg text-sm">{item.time}</span>
              </div>
            ))}
            {d.specialTimings && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">✨ Special Timings (Ganesh Chaturthi)</p>
                <p className="text-sm text-amber-800">{d.specialTimings}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'info' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-amber-100 p-4">
              <h3 className="font-bold text-stone-800 mb-2">📍 Mandal Address</h3>
              <p className="text-stone-600 text-sm">{mockMandal.address}, {mockMandal.city} - {mockMandal.pincode}</p>
              <a href={`https://maps.google.com/?q=${mockMandal.location?.lat},${mockMandal.location?.lng}`} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" className="mt-3">🗺️ Get Directions</Button>
              </a>
            </div>
            <div className="bg-white rounded-xl border border-amber-100 p-4">
              <h3 className="font-bold text-stone-800 mb-2">📞 Contact</h3>
              <p className="text-stone-600 text-sm">📱 {mockMandal.phone}</p>
              <p className="text-stone-600 text-sm mt-1">✉️ {mockMandal.email}</p>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
