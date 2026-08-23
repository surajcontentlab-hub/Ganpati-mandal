// ==============================
// CORE TYPES
// ==============================

export type UserRole = 
  | 'super_admin' 
  | 'mandal_admin' 
  | 'treasurer' 
  | 'event_manager' 
  | 'volunteer' 
  | 'devotee';

export type Language = 'mr' | 'hi' | 'en';

export type SubscriptionPlan = 'free' | 'standard' | 'professional';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export type VolunteerStatus = 'assigned' | 'accepted' | 'completed' | 'absent';

export type CrowdStatus = 'low' | 'medium' | 'high';

export type AnnouncementPriority = 'normal' | 'important' | 'emergency';

export type LostFoundStatus = 'reported' | 'found' | 'resolved';

// ==============================
// USER TYPES
// ==============================

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  profilePhoto?: string;
  role: UserRole;
  mandalId?: string;
  language: Language;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==============================
// MANDAL TYPES
// ==============================

export interface Mandal {
  id: string;
  name: string;
  nameMarathi?: string;
  logo?: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website?: string;
  presidentName: string;
  secretaryName: string;
  foundedYear: number;
  currentYear: number;
  isActive: boolean;
  isVerified: boolean;
  plan: SubscriptionPlan;
  slug: string;
  bannerImage?: string;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    branch: string;
  };
  paymentSettings?: {
    upiId: string;
    paymentName?: string;
    razorpayKeyId?: string;
    qrCodeUrl?: string;
  };
  darshan: {
    morningTime: string;
    eveningTime: string;
    specialTimings?: string;
    crowdStatus: CrowdStatus;
    liveStreamUrl?: string;
    lastDarshanPhoto?: string;
  };
  visarjanDate?: string;
  ganeshChaturthiDate?: string;
  location?: {
    lat: number;
    lng: number;
  };
  emergencyContacts: EmergencyContact[];
  createdAt: Date;
  updatedAt: Date;
}

// ==============================
// MEMBER TYPES
// ==============================

export type MemberRole = 
  | 'president'
  | 'vice_president'
  | 'secretary'
  | 'treasurer'
  | 'event_manager'
  | 'volunteer_coordinator'
  | 'volunteer'
  | 'member';

export interface Member {
  id: string;
  mandalId: string;
  userId?: string;
  name: string;
  profilePhoto?: string;
  mobile: string;
  email?: string;
  role: MemberRole;
  team?: string;
  joiningDate: Date;
  status: 'active' | 'inactive';
  address?: string;
  createdAt: Date;
}

// ==============================
// VOLUNTEER TYPES
// ==============================

export type VolunteerTeam = 
  | 'crowd_management'
  | 'security'
  | 'decoration'
  | 'prasad'
  | 'cleaning'
  | 'event_management'
  | 'parking'
  | 'medical';

export interface Volunteer {
  id: string;
  mandalId: string;
  userId?: string;
  volunteerId: string;
  name: string;
  profilePhoto?: string;
  mobile: string;
  email?: string;
  team: VolunteerTeam;
  skills?: string[];
  availability?: string;
  status: 'active' | 'inactive';
  idCardQrCode?: string;
  validUntil?: Date;
  createdAt: Date;
}

export interface VolunteerDuty {
  id: string;
  mandalId: string;
  volunteerId: string;
  volunteerName: string;
  duty: string;
  team: VolunteerTeam;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: VolunteerStatus;
  notes?: string;
  createdAt: Date;
}

// ==============================
// DONATION TYPES
// ==============================

export type DonationPurpose = 
  | 'general'
  | 'decoration'
  | 'prasad'
  | 'event'
  | 'charity'
  | 'maintenance'
  | 'other';

export interface Donation {
  id: string;
  mandalId: string;
  receiptNumber: string;
  donorName: string;
  donorMobile: string;
  donorEmail?: string;
  amount: number;
  purpose: DonationPurpose;
  isAnonymous: boolean;
  paymentMethod: 'upi' | 'online' | 'cash' | 'cheque';
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paymentId?: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: Date;
}

// ==============================
// EXPENSE TYPES
// ==============================

export type ExpenseCategory = 
  | 'decoration'
  | 'lighting'
  | 'sound'
  | 'prasad'
  | 'security'
  | 'cleaning'
  | 'event'
  | 'transportation'
  | 'printing'
  | 'utilities'
  | 'other';

export interface Expense {
  id: string;
  mandalId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
  vendor?: string;
  description?: string;
  billUrl?: string;
  paymentMethod: 'cash' | 'upi' | 'bank_transfer' | 'cheque';
  approvedBy?: string;
  createdBy: string;
  createdAt: Date;
}

// ==============================
// EVENT TYPES
// ==============================

export type EventCategory = 
  | 'aarti'
  | 'bhajan'
  | 'dhol_tasha'
  | 'cultural'
  | 'mahaprasad'
  | 'blood_donation'
  | 'social_work'
  | 'competition'
  | 'visarjan'
  | 'other';

export interface Event {
  id: string;
  mandalId: string;
  title: string;
  titleMarathi?: string;
  description?: string;
  banner?: string;
  category: EventCategory;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  organizer?: string;
  requiresRegistration: boolean;
  maxParticipants?: number;
  registrationCount: number;
  isActive: boolean;
  tags?: string[];
  createdAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  mandalId: string;
  participantName: string;
  mobile: string;
  email?: string;
  age?: number;
  notes?: string;
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  createdAt: Date;
}

// ==============================
// COMPETITION TYPES
// ==============================

export type CompetitionType = 
  | 'drawing'
  | 'singing'
  | 'dance'
  | 'quiz'
  | 'essay'
  | 'fancy_dress'
  | 'rangoli'
  | 'other';

export type AgeCategory = 'below_6' | '6_to_12' | '13_to_18' | '18_plus' | 'open';

export interface Competition {
  id: string;
  mandalId: string;
  eventId?: string;
  title: string;
  type: CompetitionType;
  ageCategory: AgeCategory;
  date: Date;
  startTime: string;
  venue: string;
  judges?: string[];
  prizes?: {
    first: string;
    second: string;
    third: string;
  };
  maxParticipants?: number;
  registrationCount: number;
  results?: CompetitionResult[];
  isActive: boolean;
  createdAt: Date;
}

export interface CompetitionResult {
  rank: number;
  participantName: string;
  participantId: string;
  prize?: string;
}

// ==============================
// AARTI TYPES
// ==============================

export interface Aarti {
  id: string;
  mandalId: string;
  title: string;
  titleMarathi?: string;
  type: 'morning' | 'evening' | 'special' | 'custom';
  lyricsMarathi?: string;
  lyricsHindi?: string;
  lyricsEnglish?: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: number;
  isActive: boolean;
  createdAt: Date;
}

// ==============================
// ANNOUNCEMENT TYPES
// ==============================

export interface Announcement {
  id: string;
  mandalId: string;
  title: string;
  titleMarathi?: string;
  content: string;
  contentMarathi?: string;
  imageUrl?: string;
  priority: AnnouncementPriority;
  expiryDate?: Date;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

// ==============================
// GALLERY TYPES
// ==============================

export interface GalleryAlbum {
  id: string;
  mandalId: string;
  title: string;
  year: number;
  coverImage?: string;
  description?: string;
  mediaCount: number;
  isPublic: boolean;
  createdAt: Date;
}

export interface GalleryMedia {
  id: string;
  albumId: string;
  mandalId: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  size?: number;
  uploadedBy: string;
  createdAt: Date;
}

// ==============================
// SPONSOR TYPES
// ==============================

export type SponsorCategory = 
  | 'main'
  | 'event'
  | 'decoration'
  | 'prasad'
  | 'supporting';

export interface Sponsor {
  id: string;
  mandalId: string;
  businessName: string;
  logo?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  category: SponsorCategory;
  amount?: number;
  website?: string;
  socialLink?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

// ==============================
// LOST & FOUND TYPES
// ==============================

export type LostFoundType = 'person' | 'item';

export interface LostFoundReport {
  id: string;
  mandalId: string;
  type: LostFoundType;
  name: string;
  description: string;
  photo?: string;
  lastSeenLocation?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  dateTime: Date;
  contactName: string;
  contactMobile: string;
  status: LostFoundStatus;
  resolvedAt?: Date;
  createdAt: Date;
}

// ==============================
// EMERGENCY CONTACT TYPES
// ==============================

export interface EmergencyContact {
  id: string;
  label: string;
  number: string;
  type: 'help_desk' | 'security' | 'medical' | 'hospital' | 'police' | 'fire' | 'ambulance';
}

// ==============================
// NOTIFICATION TYPES
// ==============================

export interface Notification {
  id: string;
  mandalId: string;
  title: string;
  body: string;
  type: 'event' | 'aarti' | 'darshan' | 'donation' | 'competition' | 'emergency' | 'announcement';
  target: 'all' | 'members' | 'volunteers' | 'participants';
  isRead?: boolean;
  sentAt: Date;
}

// ==============================
// DASHBOARD TYPES
// ==============================

export interface DashboardStats {
  totalMembers: number;
  totalVolunteers: number;
  totalDonations: number;
  totalExpenses: number;
  balance: number;
  upcomingEvents: number;
  totalSponsors: number;
  galleryPhotos: number;
  todayDonations: number;
  registeredParticipants: number;
}

// ==============================
// REPORT TYPES
// ==============================

export type ReportType = 
  | 'donation'
  | 'expense'
  | 'member'
  | 'volunteer'
  | 'event'
  | 'competition'
  | 'sponsor';

export interface ReportFilter {
  type: ReportType;
  startDate?: Date;
  endDate?: Date;
  category?: string;
  status?: string;
}

// ==============================
// AUDIT LOG TYPES
// ==============================

export interface AuditLog {
  id: string;
  mandalId: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details?: string;
  ipAddress?: string;
  createdAt: Date;
}
