'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Badge, Modal, Input, EmptyState } from '@/components/ui';
import { mockAlbums } from '@/lib/mockData';
import type { GalleryAlbum } from '@/types';

export default function GalleryAdminPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(mockAlbums);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [form, setForm] = useState({ title: '', year: '2026', description: '' });

  const handleAdd = () => {
    const newAlbum: GalleryAlbum = {
      id: `al${Date.now()}`, mandalId: 'mandal_001',
      title: form.title, year: parseInt(form.year), description: form.description,
      mediaCount: 0, isPublic: true, createdAt: new Date(),
    };
    setAlbums(prev => [newAlbum, ...prev]);
    setShowModal(false);
    setForm({ title: '', year: '2026', description: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete album?')) setAlbums(prev => prev.filter(a => a.id !== id));
  };

  const mockPhotos = Array.from({ length: 12 }, (_, i) => ({ id: i, emoji: ['🐘', '🙏', '🎭', '🪔', '🎵', '🌸'][i % 6] }));

  return (
    <AdminLayout>
      <PageHeader
        title="गॅलरी व्यवस्थापन"
        subtitle={`${albums.reduce((a, al) => a + al.mediaCount, 0)} total photos & videos`}
        actions={<Button onClick={() => setShowModal(true)}>+ Album जोडा</Button>}
      />

      {selectedAlbum ? (
        // Album Detail View
        <div>
          <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 font-semibold text-sm">
            ← सर्व Albums
          </button>
          <h2 className="text-xl font-bold text-stone-900 mb-4">{selectedAlbum.title}</h2>
          <div className="mb-4">
            <label className="btn-primary text-sm cursor-pointer">
              📤 Upload Photos
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mockPhotos.map(photo => (
              <div key={photo.id} className="aspect-square bg-orange-50 rounded-xl flex items-center justify-center border border-amber-100 hover:border-orange-300 transition-all cursor-pointer relative group">
                <span className="text-3xl">{photo.emoji}</span>
                <button className="absolute top-1 right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 items-center justify-center hidden group-hover:flex">✕</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Albums List View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map(album => (
            <div key={album.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-orange-200 transition-all hover:shadow-md cursor-pointer">
              {/* Album Cover */}
              <div className="h-36 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative" onClick={() => setSelectedAlbum(album)}>
                <div className="grid grid-cols-2 gap-1 p-3">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl border border-amber-100">
                      {['🐘', '🙏', '🎭', '🪔'][i]}
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant={album.isPublic ? 'green' : 'gray'}>{album.isPublic ? 'Public' : 'Private'}</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900">{album.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-stone-400">{album.year} • {album.mediaCount} photos</span>
                  <div className="flex gap-1">
                    <button onClick={() => setSelectedAlbum(album)} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-lg">📂 Open</button>
                    <button onClick={() => handleDelete(album.id)} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded-lg">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन Album">
        <div className="space-y-4">
          <Input label="Album Name *" placeholder="e.g. Installation Day 2026" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Input label="Year *" type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
          <div>
            <label className="text-sm font-semibold text-amber-800 block mb-1.5">Description</label>
            <textarea className="mandal-input resize-none" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAdd}>जोडा</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
