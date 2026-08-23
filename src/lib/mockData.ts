import { Mandal, Member, Volunteer, Donation, Expense, Event, Announcement, Sponsor, GalleryAlbum, Competition } from '@/types';

// ==============================
// MOCK MANDAL
// ==============================
export const mockMandal: Mandal = {
  id: 'mandal_001',
  name: 'Shivaji Nagar Ganpati Mandal',
  nameMarathi: 'शिवाजी नगर गणपती मंडळ',
  slug: 'shivaji-nagar-ganpati',
  description: 'Established in 1985, one of the most celebrated Ganpati Mandals in Pune.',
  address: '12, MG Road, Shivaji Nagar',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411005',
  phone: '+91 85918 61897',
  email: 'contact@shivajinagargp.org',
  website: 'https://shivajinagargp.org',
  presidentName: 'Rajesh Deshmukh',
  secretaryName: 'Amit Kulkarni',
  foundedYear: 1985,
  currentYear: 2026,
  isActive: true,
  isVerified: true,
  plan: 'professional',
  ganeshChaturthiDate: '2026-08-27',
  visarjanDate: '2026-09-06',
  darshan: {
    morningTime: '6:00 AM - 12:00 PM',
    eveningTime: '4:00 PM - 10:30 PM',
    specialTimings: 'Ganesh Chaturthi: 5:00 AM - 12:00 AM',
    crowdStatus: 'medium',
    liveStreamUrl: 'https://youtube.com/live/demo',
  },
  location: { lat: 18.5204, lng: 73.8567 },
  socialMedia: {
    facebook: 'https://facebook.com/shivajinagargp',
    instagram: 'https://instagram.com/shivajinagargp',
    youtube: 'https://youtube.com/shivajinagargp',
    whatsapp: '918591861897',
  },
  paymentSettings: {
    upiId: 'shivajinagargp@upi',
    qrCodeUrl: '/payment-qr.png',
  },
  emergencyContacts: [
    { id: 'e1', label: 'Help Desk', number: '020-25501234', type: 'help_desk' },
    { id: 'e2', label: 'Security', number: '9876543210', type: 'security' },
    { id: 'e3', label: 'Medical Help', number: '9876543211', type: 'medical' },
    { id: 'e4', label: 'Sahyadri Hospital', number: '020-67219999', type: 'hospital' },
    { id: 'e5', label: 'Police', number: '100', type: 'police' },
    { id: 'e6', label: 'Fire Brigade', number: '101', type: 'fire' },
    { id: 'e7', label: 'Ambulance', number: '108', type: 'ambulance' },
  ],
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date(),
};

// ==============================
// MOCK MEMBERS
// ==============================
export const mockMembers: Member[] = [
  { id: 'm1', mandalId: 'mandal_001', name: 'Rajesh Deshmukh', mobile: '9876543210', email: 'rajesh@email.com', role: 'president', joiningDate: new Date('2010-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm2', mandalId: 'mandal_001', name: 'Priya Joshi', mobile: '9876543211', email: 'priya@email.com', role: 'vice_president', joiningDate: new Date('2012-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm3', mandalId: 'mandal_001', name: 'Amit Kulkarni', mobile: '9876543212', email: 'amit@email.com', role: 'secretary', joiningDate: new Date('2015-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm4', mandalId: 'mandal_001', name: 'Sunita Pawar', mobile: '9876543213', email: 'sunita@email.com', role: 'treasurer', joiningDate: new Date('2016-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm5', mandalId: 'mandal_001', name: 'Rahul Shinde', mobile: '9876543214', email: 'rahul@email.com', role: 'event_manager', joiningDate: new Date('2018-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm6', mandalId: 'mandal_001', name: 'Kavita More', mobile: '9876543215', email: 'kavita@email.com', role: 'volunteer_coordinator', joiningDate: new Date('2019-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm7', mandalId: 'mandal_001', name: 'Suresh Patil', mobile: '9876543216', email: 'suresh@email.com', role: 'member', joiningDate: new Date('2020-01-01'), status: 'active', createdAt: new Date() },
  { id: 'm8', mandalId: 'mandal_001', name: 'Deepa Nair', mobile: '9876543217', email: 'deepa@email.com', role: 'member', joiningDate: new Date('2021-01-01'), status: 'inactive', createdAt: new Date() },
];

// ==============================
// MOCK VOLUNTEERS
// ==============================
export const mockVolunteers: Volunteer[] = [
  { id: 'v1', mandalId: 'mandal_001', volunteerId: 'VOL-2026-001', name: 'Aakash Shirke', mobile: '9123456789', team: 'crowd_management', status: 'active', createdAt: new Date() },
  { id: 'v2', mandalId: 'mandal_001', volunteerId: 'VOL-2026-002', name: 'Pooja Gaikwad', mobile: '9123456790', team: 'decoration', status: 'active', createdAt: new Date() },
  { id: 'v3', mandalId: 'mandal_001', volunteerId: 'VOL-2026-003', name: 'Nikhil Bhosale', mobile: '9123456791', team: 'security', status: 'active', createdAt: new Date() },
  { id: 'v4', mandalId: 'mandal_001', volunteerId: 'VOL-2026-004', name: 'Sneha Kadam', mobile: '9123456792', team: 'prasad', status: 'active', createdAt: new Date() },
  { id: 'v5', mandalId: 'mandal_001', volunteerId: 'VOL-2026-005', name: 'Ravi Yadav', mobile: '9123456793', team: 'parking', status: 'active', createdAt: new Date() },
  { id: 'v6', mandalId: 'mandal_001', volunteerId: 'VOL-2026-006', name: 'Anita Salve', mobile: '9123456794', team: 'medical', status: 'active', createdAt: new Date() },
];

// ==============================
// MOCK DONATIONS
// ==============================
export const mockDonations: Donation[] = [
  { id: 'd1', mandalId: 'mandal_001', receiptNumber: 'RCP-2026-001', donorName: 'Ganesh Iyer', donorMobile: '9887654321', amount: 5001, purpose: 'general', isAnonymous: false, paymentMethod: 'upi', paymentStatus: 'success', transactionId: 'TXN001', createdAt: new Date('2026-08-20') },
  { id: 'd2', mandalId: 'mandal_001', receiptNumber: 'RCP-2026-002', donorName: 'Meena Shah', donorMobile: '9887654322', amount: 2001, purpose: 'decoration', isAnonymous: false, paymentMethod: 'online', paymentStatus: 'success', transactionId: 'TXN002', createdAt: new Date('2026-08-21') },
  { id: 'd3', mandalId: 'mandal_001', receiptNumber: 'RCP-2026-003', donorName: 'Anonymous Donor', donorMobile: '9887654323', amount: 10001, purpose: 'prasad', isAnonymous: true, paymentMethod: 'cash', paymentStatus: 'success', createdAt: new Date('2026-08-22') },
  { id: 'd4', mandalId: 'mandal_001', receiptNumber: 'RCP-2026-004', donorName: 'Vinod Joshi', donorMobile: '9887654324', amount: 1001, purpose: 'event', isAnonymous: false, paymentMethod: 'upi', paymentStatus: 'success', transactionId: 'TXN004', createdAt: new Date('2026-08-22') },
  { id: 'd5', mandalId: 'mandal_001', receiptNumber: 'RCP-2026-005', donorName: 'Lata Marathe', donorMobile: '9887654325', amount: 501, purpose: 'general', isAnonymous: false, paymentMethod: 'upi', paymentStatus: 'success', transactionId: 'TXN005', createdAt: new Date('2026-08-22') },
];

// ==============================
// MOCK EXPENSES
// ==============================
export const mockExpenses: Expense[] = [
  { id: 'ex1', mandalId: 'mandal_001', title: 'Ganpati Murti', category: 'decoration', amount: 50000, date: new Date('2026-08-15'), vendor: 'Kamath Murti Kendra', paymentMethod: 'bank_transfer', createdBy: 'm4', createdAt: new Date() },
  { id: 'ex2', mandalId: 'mandal_001', title: 'Flower Decoration', category: 'decoration', amount: 25000, date: new Date('2026-08-20'), vendor: 'Patil Flowers', paymentMethod: 'cash', createdBy: 'm4', createdAt: new Date() },
  { id: 'ex3', mandalId: 'mandal_001', title: 'Sound System', category: 'sound', amount: 30000, date: new Date('2026-08-22'), vendor: 'Om Sound Services', paymentMethod: 'upi', createdBy: 'm4', createdAt: new Date() },
  { id: 'ex4', mandalId: 'mandal_001', title: 'LED Lighting', category: 'lighting', amount: 40000, date: new Date('2026-08-22'), vendor: 'Bright Lights Co', paymentMethod: 'bank_transfer', createdBy: 'm4', createdAt: new Date() },
  { id: 'ex5', mandalId: 'mandal_001', title: 'Mahaprasad Ingredients', category: 'prasad', amount: 20000, date: new Date('2026-08-21'), vendor: 'Fresh Mart', paymentMethod: 'cash', createdBy: 'm4', createdAt: new Date() },
  { id: 'ex6', mandalId: 'mandal_001', title: 'Security Guards', category: 'security', amount: 15000, date: new Date('2026-08-20'), vendor: 'Shield Security', paymentMethod: 'bank_transfer', createdBy: 'm4', createdAt: new Date() },
];

// ==============================
// MOCK EVENTS
// ==============================
export const mockEvents: Event[] = [
  { id: 'ev1', mandalId: 'mandal_001', title: 'Ganesh Chaturthi - Day 1', titleMarathi: 'गणेश चतुर्थी - दिवस १', category: 'aarti', date: new Date('2026-08-27'), startTime: '6:00 AM', endTime: '8:00 PM', venue: 'Main Mandap', requiresRegistration: false, registrationCount: 0, isActive: true, createdAt: new Date() },
  { id: 'ev2', mandalId: 'mandal_001', title: 'Mahaprasad', titleMarathi: 'महाप्रसाद', category: 'mahaprasad', date: new Date('2026-08-27'), startTime: '1:00 PM', endTime: '3:00 PM', venue: 'Hall Premises', requiresRegistration: false, registrationCount: 0, isActive: true, createdAt: new Date() },
  { id: 'ev3', mandalId: 'mandal_001', title: 'Classical Dance Competition', titleMarathi: 'शास्त्रीय नृत्य स्पर्धा', category: 'competition', date: new Date('2026-08-29'), startTime: '5:00 PM', endTime: '9:00 PM', venue: 'Cultural Stage', requiresRegistration: true, maxParticipants: 50, registrationCount: 32, isActive: true, createdAt: new Date() },
  { id: 'ev4', mandalId: 'mandal_001', title: 'Blood Donation Camp', titleMarathi: 'रक्तदान शिबीर', category: 'blood_donation', date: new Date('2026-08-30'), startTime: '9:00 AM', endTime: '2:00 PM', venue: 'Ground Floor Hall', requiresRegistration: true, maxParticipants: 100, registrationCount: 58, isActive: true, createdAt: new Date() },
  { id: 'ev5', mandalId: 'mandal_001', title: 'Aarti & Bhajan Sandhya', titleMarathi: 'आरती व भजन संध्या', category: 'bhajan', date: new Date('2026-09-01'), startTime: '7:30 PM', endTime: '10:00 PM', venue: 'Main Mandap', requiresRegistration: false, registrationCount: 0, isActive: true, createdAt: new Date() },
  { id: 'ev6', mandalId: 'mandal_001', title: 'Visarjan Procession', titleMarathi: 'विसर्जन मिरवणूक', category: 'visarjan', date: new Date('2026-09-06'), startTime: '8:00 AM', endTime: '6:00 PM', venue: 'Mandal to Ganesh Ghat', requiresRegistration: false, registrationCount: 0, isActive: true, createdAt: new Date() },
];

// ==============================
// MOCK ANNOUNCEMENTS
// ==============================
export const mockAnnouncements: Announcement[] = [
  { id: 'an1', mandalId: 'mandal_001', title: 'Grand Opening Ceremony', titleMarathi: 'उद्घाटन सोहळा', content: 'The Ganesh idol installation ceremony will begin at 6:00 AM on August 27th.', contentMarathi: 'गणेश मूर्ती स्थापना सोहळा २७ ऑगस्ट रोजी सकाळी ६ वाजता सुरू होईल.', priority: 'important', isActive: true, createdBy: 'm1', createdAt: new Date('2026-08-22') },
  { id: 'an2', mandalId: 'mandal_001', title: 'Traffic Advisory', content: 'MG Road will be closed from 5 PM to 11 PM daily. Use alternate routes.', contentMarathi: 'एमजी रस्ता दररोज सायंकाळी ५ ते रात्री ११ वाजेपर्यंत बंद राहील.', priority: 'normal', isActive: true, createdBy: 'm3', createdAt: new Date('2026-08-21') },
  { id: 'an3', mandalId: 'mandal_001', title: '🚨 Medical Emergency Drill', content: 'Emergency drill on August 26th at 4 PM. All volunteers must attend.', priority: 'emergency', isActive: true, createdBy: 'm1', createdAt: new Date('2026-08-20') },
];

// ==============================
// MOCK SPONSORS
// ==============================
export const mockSponsors: Sponsor[] = [
  { id: 'sp1', mandalId: 'mandal_001', businessName: 'Tata Motors', contactName: 'Rohit Sharma', phone: '9988776655', category: 'main', amount: 200000, website: 'https://tatamotors.com', isActive: true, createdAt: new Date() },
  { id: 'sp2', mandalId: 'mandal_001', businessName: 'Patil Sweets', contactName: 'Anil Patil', phone: '9988776656', category: 'prasad', amount: 50000, isActive: true, createdAt: new Date() },
  { id: 'sp3', mandalId: 'mandal_001', businessName: 'City Bank', contactName: 'Sneha Roy', phone: '9988776657', category: 'event', amount: 75000, website: 'https://citybank.in', isActive: true, createdAt: new Date() },
  { id: 'sp4', mandalId: 'mandal_001', businessName: 'Decor Dreams', contactName: 'Vijay More', phone: '9988776658', category: 'decoration', amount: 30000, isActive: true, createdAt: new Date() },
];

// ==============================
// MOCK GALLERY ALBUMS
// ==============================
export const mockAlbums: GalleryAlbum[] = [
  { id: 'al1', mandalId: 'mandal_001', title: 'Installation Day 2026', year: 2026, mediaCount: 45, isPublic: true, createdAt: new Date() },
  { id: 'al2', mandalId: 'mandal_001', title: 'Cultural Events 2026', year: 2026, mediaCount: 80, isPublic: true, createdAt: new Date() },
  { id: 'al3', mandalId: 'mandal_001', title: 'Visarjan 2025', year: 2025, mediaCount: 120, isPublic: true, createdAt: new Date() },
];

// ==============================
// DASHBOARD STATS
// ==============================
export const mockDashboardStats = {
  totalMembers: 8,
  totalVolunteers: 6,
  totalDonations: 18504,
  totalExpenses: 180000,
  balance: -161496,
  upcomingEvents: 5,
  totalSponsors: 4,
  galleryPhotos: 245,
  todayDonations: 11502,
  registeredParticipants: 90,
};

// ==============================
// CHART DATA
// ==============================
export const donationChartData = [
  { day: 'Aug 15', amount: 12000 },
  { day: 'Aug 16', amount: 8000 },
  { day: 'Aug 17', amount: 15000 },
  { day: 'Aug 18', amount: 22000 },
  { day: 'Aug 19', amount: 18000 },
  { day: 'Aug 20', amount: 30000 },
  { day: 'Aug 21', amount: 25000 },
  { day: 'Aug 22', amount: 18504 },
];

export const expenseChartData = [
  { name: 'Decoration', value: 75000, color: '#ff7d15' },
  { name: 'Sound', value: 30000, color: '#f59e0b' },
  { name: 'Lighting', value: 40000, color: '#e11d48' },
  { name: 'Prasad', value: 20000, color: '#16a34a' },
  { name: 'Security', value: 15000, color: '#7c3aed' },
];

// ==============================
// TODAY'S PROGRAM
// ==============================
export const todayProgram = [
  { time: '6:00 AM', title: 'Morning Aarti', titleMr: 'सकाळची आरती', icon: '🪔' },
  { time: '8:00 AM', title: 'Abhishek Pooja', titleMr: 'अभिषेक पूजा', icon: '🙏' },
  { time: '1:00 PM', title: 'Mahaprasad', titleMr: 'महाप्रसाद', icon: '🍱' },
  { time: '5:30 PM', title: 'Cultural Program', titleMr: 'सांस्कृतिक कार्यक्रम', icon: '🎭' },
  { time: '8:30 PM', title: 'Evening Aarti', titleMr: 'संध्याकाळची आरती', icon: '🪔' },
  { time: '9:00 PM', title: 'Bhajan Sandhya', titleMr: 'भजन संध्या', icon: '🎵' },
];

// ==============================
// AARTI LYRICS
// ==============================
export const mockAarti = {
  id: 'a1',
  title: 'Sukhakarta Dukhharta',
  titleMarathi: 'सुखकर्ता दुखहर्ता',
  lyricsMarathi: `सुखकर्ता दुखहर्ता, वार्ता विघ्नाची।
नुरवी पुरवी प्रेम कृपा जयाची॥
सर्वांगी सुंदर उटी शेंदुराची।
कंठी झळके माळ मुक्ताफळाची॥

जय देव जय देव जय मंगलमूर्ती।
दर्शनमात्रे मनकामना पुरती॥`,
  lyricsEnglish: `Sukhakarta Dukhharta, varta vighnaachi
Nuravi puravi prem krupa jayaachi
Sarvangee sundar uti shendurachi
Kanthi zhalake mala muktaphaLachi`,
  audioUrl: '',
  videoUrl: '',
};
