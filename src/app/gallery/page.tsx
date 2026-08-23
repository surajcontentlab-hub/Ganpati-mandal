'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockAlbums } from '@/lib/mockData';

const mockPhotos = Array.from({ length: 16 }, (_, i) => ({
  id: i, emoji: ['🐘', '🙏', '🎭', '🪔', '🎵', '🌸', '🎊', '🏛️'][i % 8],
}));

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-stone-900 font-devanagari mb-1">📸 गॅलरी</h1>
        <p className="text-sm text-stone-500 mb-5">Photos & Videos from Ganesh Festival</p>

        {selectedAlbum === null ? (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-800 font-devanagari">📁 Albums</h2>
            <div className="grid grid-cols-2 gap-3">
              {mockAlbums.map(album => (
                <div key={album.id} onClick={() => setSelectedAlbum(album.id)}
                  className="bg-white rounded-2xl border border-amber-100 overflow-hidden cursor-pointer hover:border-orange-300 transition-all hover:shadow-sm">
                  <div className="h-28 bg-gradient-to-br from-orange-100 to-amber-100 grid grid-cols-2 gap-1 p-2">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="bg-orange-50 rounded-lg flex items-center justify-center text-xl border border-amber-100">
                        {['🐘','🙏','🎭','🪔'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-stone-900 text-sm">{album.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{album.year} • {album.mediaCount} photos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-2 text-orange-600 font-semibold text-sm mb-4">
              ← सर्व Albums
            </button>
            <h2 className="text-lg font-bold text-stone-900 mb-4 font-devanagari">
              {mockAlbums.find(a => a.id === selectedAlbum)?.title}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {mockPhotos.map(photo => (
                <div key={photo.id} className="aspect-square bg-orange-50 rounded-xl flex items-center justify-center text-3xl border border-amber-100 hover:scale-105 transition-transform cursor-pointer">
                  {photo.emoji}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
