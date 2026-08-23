'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { PageHeader, StatCard, SearchBar, Button, Badge, Modal, Input, Select, Table, EmptyState } from '@/components/ui';
import { mockDonations, mockMandal } from '@/lib/mockData';
import type { Donation } from '@/types';
import QRCode from 'qrcode';

const purposeLabels: Record<string, string> = {
  general: 'General', decoration: 'Decoration', prasad: 'Prasad', event: 'Event', charity: 'Charity', other: 'Other',
};

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<'details' | 'payment_cash' | 'payment_online' | 'receipt'>('details');
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [dynamicQrUrl, setDynamicQrUrl] = useState<string>('');
  
  const [form, setForm] = useState({ 
    donorName: '', 
    donorMobile: '', 
    amount: '', 
    purpose: 'general', 
    paymentMethod: 'cash' as 'cash' | 'online' 
  });

  const filtered = donations.filter(d =>
    d.donorName.toLowerCase().includes(search.toLowerCase()) ||
    d.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
    d.donorMobile.includes(search)
  );

  const total = filtered.reduce((a, d) => a + d.amount, 0);
  const today = new Date().toDateString();
  const todayTotal = donations.filter(d => new Date(d.createdAt).toDateString() === today).reduce((a, d) => a + d.amount, 0);

  const openNewDonation = () => {
    setForm({ donorName: '', donorMobile: '', amount: '', purpose: 'general', paymentMethod: 'cash' });
    setStep('details');
    setCurrentDonation(null);
    setShowModal(true);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.paymentMethod === 'cash') {
      setStep('payment_cash');
    } else {
      generateUPIQr();
      setStep('payment_online');
    }
  };

  const getUpiUrl = () => {
    const upiId = mockMandal.paymentSettings?.upiId || '';
    const paymentName = mockMandal.paymentSettings?.paymentName || mockMandal.name;
    const amount = form.amount;
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(paymentName)}&am=${amount}&cu=INR`;
  };

  const generateUPIQr = async () => {
    try {
      const url = getUpiUrl();
      const qrDataUrl = await QRCode.toDataURL(url, { width: 250, margin: 2 });
      setDynamicQrUrl(qrDataUrl);
    } catch (err) {
      console.error('QR generation failed', err);
    }
  };

  const processPayment = (status: 'success' | 'failed' | 'pending') => {
    const newDonation: Donation = {
      id: `d${Date.now()}`, 
      mandalId: 'mandal_001',
      receiptNumber: `RCP-2026-${String(donations.length + 1).padStart(3, '0')}`,
      donorName: form.donorName,
      donorMobile: form.donorMobile,
      amount: parseInt(form.amount) || 0,
      purpose: form.purpose as any,
      isAnonymous: false,
      paymentMethod: form.paymentMethod,
      paymentStatus: status,
      createdAt: new Date(),
    };
    
    if (status === 'success') {
      setDonations(prev => [newDonation, ...prev]);
      setCurrentDonation(newDonation);
      setStep('receipt');
    } else if (status === 'failed') {
      alert('Payment marked as failed.');
      setShowModal(false);
    } else {
      alert('Payment marked as pending.');
      setShowModal(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (!currentDonation) return;
    
    const message = `🙏 Thank you for your generous donation to ${mockMandal.name}.

*Donation Receipt*
Receipt No: ${currentDonation.receiptNumber}
Donor Name: ${currentDonation.donorName}
Amount: ₹${currentDonation.amount.toLocaleString('en-IN')}
Payment Method: ${currentDonation.paymentMethod === 'cash' ? 'Cash' : 'Online'}
Date: ${new Date(currentDonation.createdAt).toLocaleDateString('en-IN')}

Your support helps us organize Ganpati celebrations and social activities.

गणपती बाप्पा मोरया! 🪔🙏`;

    const encodedMessage = encodeURIComponent(message);
    const formattedNumber = form.donorMobile.startsWith('+91') 
      ? form.donorMobile.replace('+', '') 
      : `91${form.donorMobile}`;
      
    window.open(`https://wa.me/${formattedNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleExport = () => {
    const headers = ['Receipt No', 'Donor Name', 'Mobile', 'Amount (Rs)', 'Purpose', 'Payment Method', 'Date', 'Status'];
    const rows = filtered.map(d => [
      d.receiptNumber,
      d.donorName,
      d.donorMobile,
      d.amount,
      purposeLabels[d.purpose],
      d.paymentMethod.toUpperCase(),
      new Date(d.createdAt).toLocaleDateString('en-IN'),
      d.paymentStatus.toUpperCase()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Donations_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="देणगी व्यवस्थापन"
        subtitle={`Total: ₹${total.toLocaleString('en-IN')}`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleExport}>📥 Export CSV</Button>
            <Button size="sm" onClick={openNewDonation}>+ देणगी जोडा (Add Donation)</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard title="एकूण देणग्या" value={`₹${total.toLocaleString('en-IN')}`} icon="💰" />
        <StatCard title="आजच्या देणग्या" value={`₹${todayTotal.toLocaleString('en-IN')}`} icon="📅" />
        <StatCard title="देणगीदार" value={donations.length} icon="👥" />
        <StatCard title="यशस्वी" value={donations.filter(d => d.paymentStatus === 'success').length} icon="✅" />
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="नाव, मोबाइल, रिसिप्ट नंबर..." />
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
        <Table headers={['Receipt', 'Donor', 'Amount', 'Purpose', 'Method', 'Date', 'Status', '']}>
          {filtered.map(d => (
            <tr key={d.id}>
              <td className="font-mono text-xs text-stone-500">{d.receiptNumber}</td>
              <td>
                <div>
                  <p className="font-semibold text-sm">{d.donorName}</p>
                  <p className="text-xs text-stone-400">{d.donorMobile}</p>
                </div>
              </td>
              <td className="font-bold text-orange-600">₹{d.amount.toLocaleString('en-IN')}</td>
              <td><Badge variant="gold">{purposeLabels[d.purpose]}</Badge></td>
              <td className="text-xs text-stone-500 uppercase">{d.paymentMethod}</td>
              <td className="text-xs text-stone-500">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
              <td><Badge variant={d.paymentStatus === 'success' ? 'green' : d.paymentStatus === 'pending' ? 'saffron' : 'red'}>{d.paymentStatus}</Badge></td>
              <td>
                <button className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-lg hover:bg-orange-100">
                  🧾 Receipt
                </button>
              </td>
            </tr>
          ))}
        </Table>
        {filtered.length === 0 && <EmptyState icon="💰" title="No donations found" />}
      </div>

      {/* Donation Flow Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="नवीन देणगी (New Donation)" size="md">
        
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <Input required label="Donor Name *" placeholder="Full name" value={form.donorName} onChange={e => setForm({...form, donorName: e.target.value})} />
            <Input required label="Mobile *" placeholder="10-digit number" value={form.donorMobile} onChange={e => setForm({...form, donorMobile: e.target.value})} />
            <Input required label="Amount (₹) *" type="number" placeholder="Amount in ₹" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            <Select label="Purpose" value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})}
              options={Object.entries(purposeLabels).map(([v, l]) => ({ value: v, label: l }))} />
            
            <div>
              <label className="text-sm font-semibold text-amber-800 block mb-2">Payment Method *</label>
              <div className="flex bg-stone-100 rounded-xl p-1">
                <button type="button" onClick={() => setForm({...form, paymentMethod: 'online'})}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.paymentMethod === 'online' ? 'bg-orange-500 text-white shadow' : 'text-stone-500'}`}>
                  🟢 Online Payment
                </button>
                <button type="button" onClick={() => setForm({...form, paymentMethod: 'cash'})}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${form.paymentMethod === 'cash' ? 'bg-orange-500 text-white shadow' : 'text-stone-500'}`}>
                  💵 Cash Payment
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" className="flex-1">Next →</Button>
            </div>
          </form>
        )}

        {step === 'payment_cash' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-xs font-bold text-amber-700 uppercase mb-2">Payment Method: CASH</p>
              <p className="text-3xl font-black text-stone-900">₹{parseInt(form.amount).toLocaleString('en-IN')}</p>
              <p className="text-sm text-stone-600 mt-2">Donor: <span className="font-semibold">{form.donorName}</span> ({form.donorMobile})</p>
            </div>
            <p className="text-sm text-stone-500 text-center">Please collect cash from the donor and confirm below.</p>
            
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1" onClick={() => setStep('details')}>← Back</Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => processPayment('success')}>✅ Confirm Cash Received</Button>
            </div>
          </div>
        )}

        {step === 'payment_online' && (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <p className="text-xs font-bold text-orange-700 uppercase mb-2">Online Payment Verification</p>
              <p className="text-3xl font-black text-stone-900">₹{parseInt(form.amount).toLocaleString('en-IN')}</p>
            </div>

            {/* Configured QR Code OR Dynamic QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
              <p className="font-bold text-stone-800 mb-3">{mockMandal.paymentSettings?.paymentName || mockMandal.name}</p>
              
              {dynamicQrUrl ? (
                <img src={dynamicQrUrl} alt="UPI QR Code" className="w-48 h-48 mb-2" />
              ) : mockMandal.paymentSettings?.qrCodeUrl ? (
                <img src={mockMandal.paymentSettings.qrCodeUrl} alt="Mandal QR Code" className="w-48 h-48 object-contain mb-2" />
              ) : (
                <div className="w-48 h-48 bg-stone-100 flex items-center justify-center text-stone-400 mb-2">No QR Configured</div>
              )}
              
              <p className="text-xs text-stone-500 font-mono mb-4">{mockMandal.paymentSettings?.upiId}</p>
              
              <a href={getUpiUrl()} className="w-full">
                <Button variant="secondary" className="w-full">📲 Pay via UPI App (Deep Link)</Button>
              </a>
            </div>

            <p className="text-xs text-center text-stone-500">Wait for the donor to complete the payment, then mark the status below.</p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="danger" className="w-full" onClick={() => processPayment('failed')}>❌ Mark Failed</Button>
              <Button variant="secondary" className="w-full text-stone-600" onClick={() => processPayment('pending')}>⏳ Mark Pending</Button>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-3" onClick={() => processPayment('success')}>✅ Mark as Successful</Button>
          </div>
        )}

        {step === 'receipt' && currentDonation && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✅</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900">Donation Successful</h3>
              <p className="text-stone-500 text-sm">Receipt has been generated.</p>
            </div>

            {/* Receipt Preview */}
            <div className="bg-white border-2 border-dashed border-stone-300 rounded-xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-stone-900">{mockMandal.name}</h4>
                  <p className="text-xs text-stone-500">{mockMandal.phone}</p>
                </div>
                <div className="text-right">
                  <Badge variant="gold">PAID — {currentDonation.paymentMethod.toUpperCase()}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t border-stone-100 pt-3">
                <div className="flex justify-between"><span className="text-stone-500">Receipt No:</span> <span className="font-semibold font-mono">{currentDonation.receiptNumber}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Donor Name:</span> <span className="font-semibold">{currentDonation.donorName}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Mobile:</span> <span>{currentDonation.donorMobile}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Date:</span> <span>{new Date(currentDonation.createdAt).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Payment Method:</span> <span className="font-semibold uppercase">{currentDonation.paymentMethod}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-200 text-center">
                <p className="text-xs text-stone-500">Donation Amount</p>
                <p className="text-2xl font-black text-stone-900">₹{currentDonation.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center gap-2" onClick={handleWhatsAppShare}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.711.927 2.806.928 3.181 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.766-5.77zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.737-10.56 10.561-10.56 5.824 0 10.559 4.736 10.559 10.559 0 5.824-4.735 10.56-10.56 10.56z"/></svg>
                Send Receipt on WhatsApp
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="w-full">📥 Download PDF</Button>
                <Button variant="secondary" className="w-full">🖨️ Print Receipt</Button>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        )}

      </Modal>
    </AdminLayout>
  );
}
