'use client';

import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal } from '@/lib/mockData';
import { Button } from '@/components/ui';

export default function LocationPage() {
  const { lat, lng } = mockMandal.location || { lat: 18.5204, lng: 73.8567 };
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-stone-900 font-devanagari mb-1">📍 स्थान</h1>
        <p className="text-sm text-stone-500 mb-4">Mandal Location & Directions</p>

        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl h-56 flex flex-col items-center justify-center mb-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
          <div className="relative text-center">
            <div className="text-5xl mb-3">📍</div>
            <p className="font-bold text-green-700">{mockMandal.name}</p>
            <p className="text-green-600 text-sm">{mockMandal.city}</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl border border-amber-100 p-4 mb-4">
          <h3 className="font-bold text-stone-900 mb-3 font-devanagari">🏛️ पत्ता (Address)</h3>
          <p className="text-stone-600">{mockMandal.address}</p>
          <p className="text-stone-600">{mockMandal.city}, {mockMandal.state} - {mockMandal.pincode}</p>
          <div className="mt-4 flex gap-3">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full">🗺️ Google Maps वर पाहा</Button>
            </a>
            <a href={`https://maps.google.com/dir//${lat},${lng}`} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="secondary" className="w-full">🚗 Directions</Button>
            </a>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <div className="text-2xl mb-1">🚪</div>
            <p className="text-xs font-bold text-stone-700 font-devanagari">प्रवेशद्वार</p>
            <p className="text-xs text-stone-500 mt-0.5">Main Gate - MG Road</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <div className="text-2xl mb-1">🚗</div>
            <p className="text-xs font-bold text-stone-700 font-devanagari">पार्किंग</p>
            <p className="text-xs text-stone-500 mt-0.5">Free parking nearby</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <div className="text-2xl mb-1">🚌</div>
            <p className="text-xs font-bold text-stone-700 font-devanagari">बस मार्ग</p>
            <p className="text-xs text-stone-500 mt-0.5">Bus Route: 4, 12, 21</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-3 text-center">
            <div className="text-2xl mb-1">🏠</div>
            <p className="text-xs font-bold text-stone-700 font-devanagari">जवळील खुणा</p>
            <p className="text-xs text-stone-500 mt-0.5">Near City Mall</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <h3 className="font-bold text-orange-700 mb-2 font-devanagari">📞 संपर्क</h3>
          <p className="text-stone-600 text-sm">📞 {mockMandal.phone}</p>
          <p className="text-stone-600 text-sm mt-1">✉️ {mockMandal.email}</p>
        </div>
      </div>
    </PublicLayout>
  );
}
