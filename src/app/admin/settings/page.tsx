'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, Button, Input, Badge } from '@/components/ui';
import { mockMandal } from '@/lib/mockData';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [mandal, setMandal] = useState(mockMandal);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Mandal Profile', icon: '🏛️' },
    { id: 'darshan', label: 'Darshan Settings', icon: '🙏' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'emergency', label: 'Emergency', icon: '🚨' },
  ];

  return (
    <AdminLayout>
      <PageHeader title="सेटिंग्ज" subtitle="Manage mandal settings" />

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0 hidden md:block">
          <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-left border-b border-amber-50 last:border-0 transition-colors ${activeTab === tab.id ? 'bg-orange-50 text-orange-600' : 'text-stone-600 hover:bg-stone-50'}`}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Tab Pills */}
        <div className="md:hidden w-full">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`chip flex-shrink-0 ${activeTab === tab.id ? 'chip-selected' : 'chip-unselected'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 mb-4 text-sm font-semibold flex items-center gap-2">
              ✅ Settings saved successfully!
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-3">🏛️ Mandal Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Mandal Name (English)" value={mandal.name} onChange={e => setMandal({...mandal, name: e.target.value})} />
                <Input label="मंडळाचे नाव (मराठी)" value={mandal.nameMarathi || ''} onChange={e => setMandal({...mandal, nameMarathi: e.target.value})} />
                <Input label="Phone" value={mandal.phone} onChange={e => setMandal({...mandal, phone: e.target.value})} />
                <Input label="Email" value={mandal.email} onChange={e => setMandal({...mandal, email: e.target.value})} />
                <Input label="Website" value={mandal.website || ''} onChange={e => setMandal({...mandal, website: e.target.value})} />
                <Input label="Founded Year" type="number" value={mandal.foundedYear} onChange={e => setMandal({...mandal, foundedYear: parseInt(e.target.value)})} />
                <Input label="President Name" value={mandal.presidentName} onChange={e => setMandal({...mandal, presidentName: e.target.value})} />
                <Input label="Secretary Name" value={mandal.secretaryName} onChange={e => setMandal({...mandal, secretaryName: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-semibold text-amber-800 block mb-1.5">Address</label>
                <textarea className="mandal-input resize-none" rows={2} value={mandal.address} onChange={e => setMandal({...mandal, address: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input label="City" value={mandal.city} onChange={e => setMandal({...mandal, city: e.target.value})} />
                <Input label="State" value={mandal.state} onChange={e => setMandal({...mandal, state: e.target.value})} />
                <Input label="Pincode" value={mandal.pincode} onChange={e => setMandal({...mandal, pincode: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-semibold text-amber-800 block mb-1.5">Description</label>
                <textarea className="mandal-input resize-none" rows={3} value={mandal.description || ''} onChange={e => setMandal({...mandal, description: e.target.value})} />
              </div>
              <Button onClick={handleSave}>💾 Save Changes</Button>
            </div>
          )}

          {activeTab === 'darshan' && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-3">🙏 Darshan Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Morning Darshan Time" value={mandal.darshan.morningTime} onChange={e => setMandal({...mandal, darshan: {...mandal.darshan, morningTime: e.target.value}})} />
                <Input label="Evening Darshan Time" value={mandal.darshan.eveningTime} onChange={e => setMandal({...mandal, darshan: {...mandal.darshan, eveningTime: e.target.value}})} />
              </div>
              <Input label="Special Timings" value={mandal.darshan.specialTimings || ''} onChange={e => setMandal({...mandal, darshan: {...mandal.darshan, specialTimings: e.target.value}})} />
              <Input label="Live Stream URL" placeholder="YouTube/Facebook Live URL" value={mandal.darshan.liveStreamUrl || ''} onChange={e => setMandal({...mandal, darshan: {...mandal.darshan, liveStreamUrl: e.target.value}})} />
              <div>
                <label className="text-sm font-semibold text-amber-800 block mb-2">Crowd Status</label>
                <div className="flex gap-3">
                  {['low', 'medium', 'high'].map(s => (
                    <button key={s} onClick={() => setMandal({...mandal, darshan: {...mandal.darshan, crowdStatus: s as any}})}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${mandal.darshan.crowdStatus === s ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-amber-200 text-stone-600'}`}>
                      {s === 'low' ? '🟢' : s === 'medium' ? '🟡' : '🔴'} {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleSave}>💾 Save Changes</Button>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-3">💳 Payment Settings</h3>
              <Input
                label="UPI ID"
                placeholder="mandal@upi"
                value={mandal.paymentSettings?.upiId || ''}
                onChange={e =>
                  setMandal({
                    ...mandal,
                    paymentSettings: {
                      upiId: e.target.value,
                      paymentName: mandal.paymentSettings?.paymentName,
                      razorpayKeyId: mandal.paymentSettings?.razorpayKeyId,
                      qrCodeUrl: mandal.paymentSettings?.qrCodeUrl,
                    },
                  })
                }
              />
              <Input
                label="Payment Name"
                placeholder="Mandal Name for UPI"
                value={mandal.paymentSettings?.paymentName || ''}
                onChange={e =>
                  setMandal({
                    ...mandal,
                    paymentSettings: {
                      upiId: mandal.paymentSettings?.upiId,
                      paymentName: e.target.value,
                      razorpayKeyId: mandal.paymentSettings?.razorpayKeyId,
                      qrCodeUrl: mandal.paymentSettings?.qrCodeUrl,
                    },
                  })
                }
              />
              <Input
                label="QR Code URL (Image Link)"
                placeholder="https://..."
                value={mandal.paymentSettings?.qrCodeUrl || ''}
                onChange={e =>
                  setMandal({
                    ...mandal,
                    paymentSettings: {
                      upiId: mandal.paymentSettings?.upiId,
                      paymentName: mandal.paymentSettings?.paymentName,
                      razorpayKeyId: mandal.paymentSettings?.razorpayKeyId,
                      qrCodeUrl: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Razorpay Key ID"
                placeholder="rzp_live_..."
                value={mandal.paymentSettings?.razorpayKeyId || ''}
                onChange={e =>
                  setMandal({
                    ...mandal,
                    paymentSettings: {
                      upiId: mandal.paymentSettings?.upiId,
                      paymentName: mandal.paymentSettings?.paymentName,
                      razorpayKeyId: e.target.value,
                      qrCodeUrl: mandal.paymentSettings?.qrCodeUrl,
                    },
                  })
                }
              />
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 mb-1">⚠️ Security Note</p>
                <p className="text-xs text-amber-600">Never share your payment gateway secret keys. Only use the publishable/public keys here.</p>
              </div>
              <h4 className="font-bold text-stone-800 mt-4">Bank Details (for receipts)</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Account Name" placeholder="Account holder name" value={mandal.bankDetails?.accountName || ''} onChange={() => {}} />
                <Input label="Account Number" placeholder="Account number" value={mandal.bankDetails?.accountNumber || ''} onChange={() => {}} />
                <Input label="IFSC Code" placeholder="IFSC code" value={mandal.bankDetails?.ifsc || ''} onChange={() => {}} />
                <Input label="Bank Name" placeholder="Bank name" value={mandal.bankDetails?.bankName || ''} onChange={() => {}} />
              </div>
              <Button onClick={handleSave}>💾 Save Changes</Button>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">
              <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-3">📱 Social Media Links</h3>
              <Input label="🔵 Facebook" placeholder="https://facebook.com/..." value={mandal.socialMedia?.facebook || ''} onChange={e => setMandal({...mandal, socialMedia: {...mandal.socialMedia, facebook: e.target.value}})} />
              <Input label="📸 Instagram" placeholder="https://instagram.com/..." value={mandal.socialMedia?.instagram || ''} onChange={e => setMandal({...mandal, socialMedia: {...mandal.socialMedia, instagram: e.target.value}})} />
              <Input label="🎬 YouTube" placeholder="https://youtube.com/..." value={mandal.socialMedia?.youtube || ''} onChange={e => setMandal({...mandal, socialMedia: {...mandal.socialMedia, youtube: e.target.value}})} />
              <Input label="💬 WhatsApp Channel" placeholder="91XXXXXXXXXX" value={mandal.socialMedia?.whatsapp || ''} onChange={e => setMandal({...mandal, socialMedia: {...mandal.socialMedia, whatsapp: e.target.value}})} />
              <Button onClick={handleSave}>💾 Save Changes</Button>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-3 mb-4">🚨 Emergency Contacts</h3>
              <div className="space-y-3">
                {mandal.emergencyContacts.map((contact, i) => (
                  <div key={contact.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input className="mandal-input" placeholder="Label" value={contact.label} onChange={e => {
                        const updated = [...mandal.emergencyContacts];
                        updated[i] = { ...updated[i], label: e.target.value };
                        setMandal({ ...mandal, emergencyContacts: updated });
                      }} />
                      <input className="mandal-input" placeholder="Number" value={contact.number} onChange={e => {
                        const updated = [...mandal.emergencyContacts];
                        updated[i] = { ...updated[i], number: e.target.value };
                        setMandal({ ...mandal, emergencyContacts: updated });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="mt-4">💾 Save Changes</Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
