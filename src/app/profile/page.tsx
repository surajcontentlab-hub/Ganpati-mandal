'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
export default function ProfilePage() {
  const { user, login } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'language' | 'notifications'>('profile');
  const [language, setLanguage] = useState<'mr' | 'hi' | 'en'>('mr');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);

  // Initialize edit form when user loads
  React.useEffect(() => {
    if (user) {
      setEditForm({ name: user.name || '', email: user.email || '', mobile: user.mobile || '' });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // In a real app, import supabase from '@/lib/supabase' and update table
      // const { supabase } = await import('@/lib/supabase');
      // await supabase.from('mandal_users').update(editForm).eq('id', user.id);
      
      // Update local context to reflect changes instantly
      login({ ...user, ...editForm });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err: any) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // In a real app, call logout context function or supabase auth signout
    window.location.href = '/login';
  };

  if (!user) {
    return <PublicLayout><div className="p-8 text-center"><p>Please login first.</p><Button className="mt-4" onClick={() => window.location.href='/login'}>Go to Login</Button></div></PublicLayout>;
  }

  return (
    <PublicLayout>
      <div className="px-4 py-5">
        {/* Avatar & Name */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3 shadow-lg uppercase">
            {user.name.substring(0, 2)}
          </div>
          <h2 className="text-lg font-bold text-stone-900">{user.name}</h2>
          <p className="text-sm text-orange-500 capitalize">{user.role.replace('_', ' ')}</p>
          <p className="text-xs text-stone-400 mt-1">📱 {user.mobile}</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-orange-50 rounded-xl p-1 mb-5 border border-amber-100">
          {[{ k: 'profile', l: '👤 Profile' }, { k: 'language', l: '🌐 Language' }, { k: 'notifications', l: '🔔 Alerts' }].map(({ k, l }) => (
            <button key={k} onClick={() => setActiveTab(k as any)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === k ? 'bg-white shadow text-orange-600' : 'text-stone-500'}`}>
              {l}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="space-y-3">
            {!isEditing ? (
              <>
                {[
                  { icon: '👤', label: 'Full Name', value: user.name },
                  { icon: '📱', label: 'Mobile', value: user.mobile },
                  { icon: '✉️', label: 'Email', value: user.email || 'Not provided' },
                  { icon: '⭐', label: 'Role', value: user.role.replace('_', ' ').toUpperCase() },
                ].map(item => (
                  <div key={item.label} className="bg-white rounded-xl border border-amber-100 p-3 flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-stone-400">{item.label}</p>
                      <p className="font-semibold text-stone-800 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" className="w-full mt-2" onClick={() => setIsEditing(true)}>✏️ Edit Profile</Button>
                <Button variant="danger" className="w-full" onClick={handleLogout}>🚪 Logout</Button>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-amber-100 p-4 space-y-4">
                <h3 className="font-bold text-stone-800">Edit Your Details</h3>
                
                <div>
                  <label className="text-xs font-bold text-stone-500 mb-1 block">Full Name</label>
                  <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-stone-500 mb-1 block">Email</label>
                  <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm" type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-stone-500 mb-1 block">Mobile (Cannot change)</label>
                  <input className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm bg-stone-100" value={editForm.mobile} disabled />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={handleSaveProfile} disabled={loading}>{loading ? 'Saving...' : '💾 Save'}</Button>
                  <Button variant="secondary" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'language' && (
          <div className="space-y-3">
            <p className="text-sm text-stone-500 mb-3">Choose your preferred language</p>
            {[{ code: 'mr', name: 'मराठी', native: 'Marathi', flag: '🇮🇳' }, { code: 'hi', name: 'हिंदी', native: 'Hindi', flag: '🇮🇳' }, { code: 'en', name: 'English', native: 'English', flag: '🌐' }].map(lang => (
              <button key={lang.code} onClick={() => setLanguage(lang.code as any)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${language === lang.code ? 'border-orange-400 bg-orange-50' : 'border-amber-100 bg-white hover:border-orange-200'}`}>
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-stone-900">{lang.name}</p>
                  <p className="text-xs text-stone-400">{lang.native}</p>
                </div>
                {language === lang.code && <span className="ml-auto text-orange-500 text-xl">✓</span>}
              </button>
            ))}
            <Button className="w-full">💾 Save Language</Button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            <p className="text-sm text-stone-500 mb-3">Manage your notification preferences</p>
            {[
              { label: 'Aarti Reminders', labelMr: 'आरतीची आठवण', enabled: true },
              { label: 'Event Alerts', labelMr: 'कार्यक्रम सूचना', enabled: true },
              { label: 'Donation Confirmation', labelMr: 'देणगी पुष्टी', enabled: true },
              { label: 'Emergency Alerts', labelMr: 'आपत्कालीन सूचना', enabled: true },
              { label: 'Competition Results', labelMr: 'स्पर्धा निकाल', enabled: false },
            ].map((notif, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-amber-100 p-3">
                <div>
                  <p className="font-semibold text-stone-800 text-sm font-devanagari">{notif.labelMr}</p>
                  <p className="text-xs text-stone-400">{notif.label}</p>
                </div>
                <div className={`w-12 h-6 rounded-full flex items-center transition-all cursor-pointer ${notif.enabled ? 'bg-orange-500' : 'bg-stone-200'} ${notif.enabled ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
