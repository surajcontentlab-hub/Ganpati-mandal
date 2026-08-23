'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockAarti } from '@/lib/mockData';
import { Button } from '@/components/ui';

const aartiSchedule = [
  { type: 'morning', title: 'काकड आरती', time: '5:30 AM', icon: '🌅' },
  { type: 'morning2', title: 'पहाटेची आरती', time: '7:00 AM', icon: '☀️' },
  { type: 'noon', title: 'मध्यान्ह आरती', time: '12:00 PM', icon: '🌞' },
  { type: 'evening', title: 'संध्याकाळची आरती', time: '7:30 PM', icon: '🌆' },
  { type: 'night', title: 'शेजारती', time: '10:30 PM', icon: '🌙' },
];

export default function AartiPage() {
  const [activeLang, setActiveLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [showLyrics, setShowLyrics] = useState(false);

  const getLyrics = () => {
    if (activeLang === 'mr') return mockAarti.lyricsMarathi;
    if (activeLang === 'en') return mockAarti.lyricsEnglish;
    return mockAarti.lyricsMarathi;
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-700 to-amber-600 px-4 pt-5 pb-8 text-center">
        <div className="text-5xl mb-3 animate-float">🪔</div>
        <h1 className="text-2xl font-bold text-white font-devanagari">आरती</h1>
        <p className="text-orange-100 text-sm mt-1">Aarti Schedule & Lyrics</p>
      </div>

      {/* Schedule */}
      <div className="px-4 py-5">
        <h2 className="text-base font-bold text-stone-800 font-devanagari mb-3">📅 आरती वेळापत्रक</h2>
        <div className="space-y-2">
          {aartiSchedule.map(item => (
            <div key={item.type} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-orange-200 transition-all">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-stone-800 font-devanagari">{item.title}</p>
              </div>
              <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aarti Lyrics */}
      <div className="px-4 pb-5">
        <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-amber-100">
            <h2 className="font-bold text-stone-900 font-devanagari">{mockAarti.titleMarathi}</h2>
            <p className="text-stone-500 text-sm">{mockAarti.title}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex border-b border-amber-100">
            {[{ k: 'mr', l: 'मराठी' }, { k: 'hi', l: 'हिंदी' }, { k: 'en', l: 'English' }].map(({ k, l }) => (
              <button key={k} onClick={() => setActiveLang(k as any)}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${activeLang === k ? 'text-orange-600 border-b-2 border-orange-500' : 'text-stone-500'}`}>
                {l}
              </button>
            ))}
          </div>

          <div className="p-4">
            <pre className="font-devanagari text-stone-700 text-sm leading-relaxed whitespace-pre-wrap">{getLyrics()}</pre>
          </div>

          <div className="p-4 pt-0 flex gap-3">
            <Button variant="secondary" size="sm" className="flex-1">🎵 Audio सुरू करा</Button>
            <Button variant="secondary" size="sm" className="flex-1">📤 Share</Button>
          </div>
        </div>
      </div>

      {/* Video Aarti */}
      <div className="px-4 pb-6">
        <div className="bg-stone-800 rounded-2xl aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">▶️</div>
            <p className="text-white text-sm font-devanagari">आरती व्हिडिओ पाहा</p>
            <p className="text-stone-400 text-xs mt-1">Tap to play Aarti video</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
