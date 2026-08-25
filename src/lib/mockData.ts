import { Mandal, Member, Volunteer, Donation, Expense, Event, Announcement, Sponsor, GalleryAlbum, Competition } from '@/types';

// ==============================
// MOCK MANDAL
// ==============================
export const mockMandal: Mandal = {
  id: 'mandal_001',
  name: 'Shiv Premi Mitra Mandal',
  nameMarathi: 'शिव प्रेमी मित्र मंडळ 🚩',
  slug: 'अंत: अस्ती प्रारंभ ॥🚩',
  description: 'शिव प्रेमी मित्र मंडळ 🚩।\nस्थापना : २०१५. ।\nअंत: अस्ती प्रारंभ ॥🚩\n•॥गरुडा वर बैसूनी माझा कैवारी आला ॥•\nGHATKOPERASLFHAWEST🚨..!!',
  address: 'Ghatkopar west, mumbai',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400084',
  phone: '+91 95948 07562',
  email: '[shivpremimitramandal@gmail.com]',
  website: 'https://www.instagram.com/lalbatichakaivari15',
  presidentName: 'President Name',
  secretaryName: 'Secretary Name',
  foundedYear: 2015,
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
    crowdStatus: 'low',
    liveStreamUrl: '',
  },
  location: { lat: 18.5204, lng: 73.8567 },
  socialMedia: {
    facebook: '',
    instagram: 'https://www.instagram.com/lalbatichakaivari15',
    youtube: '',
    whatsapp: '9594807562',
  },
  paymentSettings: {
    upiId: 'kamblenik2003@oksbi',
    qrCodeUrl: '/payment-qr.png',
  },
  emergencyContacts: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ==============================
// EMPTY ARRAYS FOR FRESH START
// ==============================
export const mockMembers: Member[] = [];
export const mockVolunteers: Volunteer[] = [];
export const mockDonations: Donation[] = [];
export const mockExpenses: Expense[] = [];
export const mockEvents: Event[] = [];
export const mockAnnouncements: Announcement[] = [];
export const mockSponsors: Sponsor[] = [];
export const mockAlbums: GalleryAlbum[] = [];

// ==============================
// DASHBOARD STATS (ZEROED)
// ==============================
export const mockDashboardStats = {
  totalMembers: 0,
  totalVolunteers: 0,
  totalDonations: 0,
  totalExpenses: 0,
  balance: 0,
  upcomingEvents: 0,
  totalSponsors: 0,
  galleryPhotos: 0,
  todayDonations: 0,
  registeredParticipants: 0,
};

// ==============================
// CHART DATA (EMPTY)
// ==============================
export const donationChartData = [];
export const expenseChartData = [];

// ==============================
// TODAY'S PROGRAM
// ==============================
export const todayProgram = [];

// ==============================
// AARTI LYRICS
// ==============================
export const mockAarti = {
  id: 'a1',
  title: 'Sukhakarta Dukhharta',
  titleMarathi: 'सुखकर्ता दुखहर्ता',
  lyricsMarathi: `सुखकर्ता दुखहर्ता, वार्ता विघ्नाची।\nनुरवी पुरवी प्रेम कृपा जयाची॥\nसर्वांगी सुंदर उटी शेंदुराची।\nकंठी झळके माळ मुक्ताफळाची॥\n\nजय देव जय देव जय मंगलमूर्ती।\nदर्शनमात्रे मनकामना पुरती॥`,
  lyricsEnglish: `Sukhakarta Dukhharta, varta vighnaachi\nNuravi puravi prem krupa jayaachi\nSarvangee sundar uti shendurachi\nKanthi zhalake mala muktaphaLachi`,
  audioUrl: '',
  videoUrl: '',
};
