'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { mockMandal, mockDonations } from '@/lib/mockData';
import { Button, Badge } from '@/components/ui';

const amounts = [101, 501, 1001, 2001, 5001];
const purposes = ['general', 'decoration', 'prasad', 'event', 'charity', 'other'];
const purposeLabels: Record<string, string> = {
  general: 'सर्वसाधारण', decoration: 'सजावट', prasad: 'प्रसाद', event: 'कार्यक्रम', charity: 'दान', other: 'इतर',
};

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('general');
  const [form, setForm] = useState({ name: '', mobile: '', email: '', anonymous: false });
  const [step, setStep] = useState<'form' | 'payment' | 'qr' | 'success'>('form');
  const [activeTab, setActiveTab] = useState<'donate' | 'transparency'>('donate');

  const totalAmount = selectedAmount || parseInt(customAmount) || 0;
  const totalDonations = mockDonations.reduce((a, d) => a + d.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount > 0) setStep('payment');
  };

  const handlePayment = (method: string) => {
    setStep('success');
    
    // Construct WhatsApp message
    const donorName = form.anonymous ? 'देणगीदार (Anonymous)' : (form.name || 'देणगीदार');
    const amount = totalAmount;
    
    const message = `नमस्कार ${donorName} 🙏\n\nगणपती मंडळासाठी आपण दिलेल्या ₹${amount} देणगीबद्दल मनःपूर्वक धन्यवाद! (पेमेंट: ${method})\n\nगणपती बाप्पा मोरया! 🌺`;
    
    // Clean mobile number and add country code if needed
    let mobile = form.mobile.replace(/\D/g, '');
    if (mobile.length === 10) {
      mobile = '91' + mobile;
    }
    
    const whatsappUrl = `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <PublicLayout>
      {/* Tabs */}
      <div className="flex border-b border-amber-100 bg-white sticky top-14 z-10">
        <button onClick={() => setActiveTab('donate')} className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'donate' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-stone-500'}`}>
          💰 देणगी द्या
        </button>
        <button onClick={() => setActiveTab('transparency')} className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'transparency' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-stone-500'}`}>
          📊 पारदर्शकता
        </button>
      </div>

      {activeTab === 'donate' ? (
        <div className="px-4 py-5">
          {step === 'form' && (
            <>
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 mb-5 text-white text-center">
                <p className="text-3xl mb-2">🙏</p>
                <p className="font-bold text-lg font-devanagari">गणपती बाप्पाला देणगी द्या</p>
                <p className="text-orange-100 text-sm">Your donation helps celebrate the festival</p>
              </div>

              {/* Amount Selection */}
              <h3 className="font-bold text-stone-800 mb-3 font-devanagari">रक्कम निवडा</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {amounts.map(amt => (
                  <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${selectedAmount === amt ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-stone-800 border-amber-200 hover:border-orange-300'}`}>
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
                <div className="col-span-3">
                  <input
                    type="number"
                    placeholder="किंवा रक्कम टाका (Custom Amount)"
                    className="mandal-input"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  />
                </div>
              </div>

              {/* Purpose */}
              <h3 className="font-bold text-stone-800 mb-3 mt-4 font-devanagari">उद्देश</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {purposes.map(p => (
                  <button key={p} onClick={() => setPurpose(p)}
                    className={`chip font-devanagari ${purpose === p ? 'chip-selected' : 'chip-unselected'}`}>
                    {purposeLabels[p]}
                  </button>
                ))}
              </div>

              {/* Donor Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5 font-devanagari">देणगीदाराचे नाव *</label>
                  <input required={!form.anonymous} disabled={form.anonymous} className="mandal-input" placeholder="Your full name"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5">मोबाइल *</label>
                  <input required className="mandal-input" placeholder="10-digit mobile"
                    value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-amber-800 block mb-1.5">ईमेल (Optional)</label>
                  <input className="mandal-input" placeholder="email@example.com" type="email"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-orange-500" checked={form.anonymous} onChange={e => setForm({...form, anonymous: e.target.checked})} />
                  <span className="text-sm text-stone-600 font-devanagari">नाव न सांगता देणगी (Anonymous Donation)</span>
                </label>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-700 font-devanagari">एकूण रक्कम</span>
                    <span className="font-black text-stone-900 text-lg">₹{totalAmount.toLocaleString('en-IN') || '0'}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={totalAmount <= 0}>
                  💳 पुढे जा (Proceed to Pay)
                </Button>
              </form>
            </>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-4 text-center">
                <p className="text-3xl font-black">₹{totalAmount.toLocaleString('en-IN')}</p>
                <p className="text-orange-100 text-sm mt-1">{purposeLabels[purpose]}</p>
              </div>

              <h3 className="font-bold text-stone-800 font-devanagari">पेमेंट पद्धत निवडा</h3>

              <div className="space-y-3">
                <button onClick={() => setStep('qr')} className="w-full flex items-center gap-3 bg-white border-2 border-amber-200 hover:border-orange-400 rounded-xl p-4 transition-all">
                  <span className="text-2xl">💳</span>
                  <div className="text-left">
                    <p className="font-bold text-stone-800">Online Payment</p>
                    <p className="text-xs text-stone-400">Card / UPI / Net Banking</p>
                  </div>
                  <span className="ml-auto text-orange-500">→</span>
                </button>
                <button onClick={() => handlePayment('Cash')} className="w-full flex items-center gap-3 bg-white border-2 border-amber-200 hover:border-orange-400 rounded-xl p-4 transition-all">
                  <span className="text-2xl">💵</span>
                  <div className="text-left">
                    <p className="font-bold text-stone-800">Cash Payment</p>
                    <p className="text-xs text-stone-400">Pay in cash at mandal</p>
                  </div>
                  <span className="ml-auto text-orange-500">→</span>
                </button>
              </div>
              <button onClick={() => setStep('form')} className="w-full text-center text-sm text-stone-400 hover:text-stone-600 mt-2">← Back</button>
            </div>
          )}

          {step === 'qr' && (
            <div className="space-y-4 text-center">
              <h3 className="font-bold text-stone-800 font-devanagari">स्कॅन करून पेमेंट करा</h3>
              <p className="text-stone-500 text-sm">Please scan the QR code to pay</p>
              <div className="bg-white p-4 rounded-xl border border-amber-200 inline-block">
                <img 
                  src="/payment-qr.png.png" 
                  alt="Payment QR Code" 
                  className="w-48 h-48 object-contain rounded-lg mx-auto" 
                />
              </div>
              <p className="text-3xl font-black mt-2">₹{totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm font-bold text-orange-600 mb-4">{mockMandal.paymentSettings?.upiId}</p>
              
              <Button onClick={() => handlePayment('Online')} className="w-full" size="lg">
                ✅ पेमेंट केले (I have paid)
              </Button>
              <button onClick={() => setStep('payment')} className="w-full text-center text-sm text-stone-400 hover:text-stone-600 mt-2">← Back</button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-10">
              <div className="w-24 h-24 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-4 text-5xl">
                ✅
              </div>
              <h2 className="text-2xl font-black text-green-700 font-devanagari">देणगी यशस्वी!</h2>
              <p className="text-stone-500 text-sm mt-2">Thank you for your generous donation of</p>
              <p className="text-3xl font-black text-stone-900 mt-1">₹{totalAmount.toLocaleString('en-IN')}</p>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-5 text-left">
                <p className="text-xs font-bold text-orange-600 mb-2">RECEIPT - RCP-2026-006</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-stone-500">Donor</span><span className="font-semibold">{form.anonymous ? 'Anonymous' : form.name}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">Amount</span><span className="font-semibold">₹{totalAmount.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">Purpose</span><span className="font-semibold">{purposeLabels[purpose]}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">Date</span><span className="font-semibold">{new Date().toLocaleDateString()}</span></div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Button variant="secondary" className="flex-1">⬇️ Download Receipt</Button>
                <Button className="flex-1">📤 Share</Button>
              </div>
              <button onClick={() => setStep('form')} className="mt-4 text-sm text-stone-400 hover:text-stone-600">+ Make another donation</button>
            </div>
          )}
        </div>
      ) : (
        /* Transparency Tab */
        <div className="px-4 py-5 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-devanagari">📊 आर्थिक पारदर्शकता</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-green-700">₹{(totalDonations/1000).toFixed(1)}k</p>
              <p className="text-xs text-green-600 font-devanagari mt-1">एकूण देणग्या</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-rose-700">₹180k</p>
              <p className="text-xs text-rose-600 font-devanagari mt-1">एकूण खर्च</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-600 font-devanagari mb-1">एकूण देणगीदार</p>
            <p className="text-3xl font-black text-amber-700">{mockDonations.length}</p>
          </div>

          <div className="bg-white rounded-xl border border-amber-100">
            <div className="px-4 py-3 border-b border-amber-100">
              <h3 className="font-bold text-stone-800 font-devanagari">अलीकडील देणग्या</h3>
            </div>
            <div className="divide-y divide-amber-50">
              {mockDonations.map(d => (
                <div key={d.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{d.isAnonymous ? 'Anonymous' : d.donorName}</p>
                    <p className="text-xs text-stone-400">{new Date(d.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold text-orange-600">₹{d.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
