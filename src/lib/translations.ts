// ==============================
// TRANSLATIONS
// ==============================

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    darshan: 'Darshan',
    events: 'Events',
    donate: 'Donate',
    profile: 'Profile',
    
    // Home
    appName: 'GanpatiMitra',
    tagline: 'Connect. Manage. Celebrate.',
    welcomeMessage: 'Jay Shri Ganesha',
    todayProgram: "Today's Program",
    upcomingEvents: 'Upcoming Events',
    countdown: 'Days to Ganesh Chaturthi',
    
    // Quick Actions
    darshanAction: 'Darshan',
    donateAction: 'Donate',
    eventsAction: 'Events',
    aartiAction: 'Aarti',
    galleryAction: 'Gallery',
    announcementsAction: 'Announcements',
    locationAction: 'Location',
    helpAction: 'Emergency Help',
    
    // Donation
    donationTitle: 'Make a Donation',
    donorName: 'Donor Name',
    donorMobile: 'Mobile Number',
    donorEmail: 'Email (Optional)',
    amount: 'Amount',
    purpose: 'Purpose',
    anonymous: 'Donate Anonymously',
    payNow: 'Pay Now',
    totalDonations: 'Total Donations',
    totalExpenses: 'Total Expenses',
    balance: 'Balance',
    donors: 'Donors',
    
    // Events
    registerEvent: 'Register',
    eventDate: 'Date',
    eventTime: 'Time',
    eventVenue: 'Venue',
    
    // Members
    members: 'Members',
    addMember: 'Add Member',
    memberName: 'Name',
    memberRole: 'Role',
    memberStatus: 'Status',
    
    // Volunteers
    volunteers: 'Volunteers',
    volunteerTeam: 'Team',
    addVolunteer: 'Add Volunteer',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    loading: 'Loading...',
    noData: 'No data found',
    active: 'Active',
    inactive: 'Inactive',
    status: 'Status',
    actions: 'Actions',
    date: 'Date',
    name: 'Name',
    mobile: 'Mobile',
    email: 'Email',
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    close: 'Close',
    view: 'View',
    download: 'Download',
    share: 'Share',
    
    // Dashboard
    dashboard: 'Dashboard',
    totalMembers: 'Total Members',
    totalVolunteers: 'Total Volunteers',
    upcomingEventsCount: 'Upcoming Events',
    totalSponsors: 'Total Sponsors',
    
    // Errors
    errorGeneric: 'Something went wrong. Please try again.',
    errorNoInternet: 'No internet connection.',
    errorNotFound: 'Page not found.',
    errorUnauthorized: 'You are not authorized to view this page.',
  },
  mr: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    darshan: 'दर्शन',
    events: 'कार्यक्रम',
    donate: 'देणगी',
    profile: 'प्रोफाइल',
    
    // Home
    appName: 'गणपतीमित्र',
    tagline: 'आपल्या मंडळाचा डिजिटल साथीदार',
    welcomeMessage: 'जय श्री गणेशा',
    todayProgram: 'आजचे कार्यक्रम',
    upcomingEvents: 'येणारे कार्यक्रम',
    countdown: 'गणेश चतुर्थी पर्यंत दिवस',
    
    // Quick Actions
    darshanAction: 'दर्शन',
    donateAction: 'देणगी',
    eventsAction: 'कार्यक्रम',
    aartiAction: 'आरती',
    galleryAction: 'फोटो',
    announcementsAction: 'सूचना',
    locationAction: 'स्थान',
    helpAction: 'आपत्कालीन मदत',
    
    // Donation
    donationTitle: 'देणगी करा',
    donorName: 'देणगीदाराचे नाव',
    donorMobile: 'मोबाइल नंबर',
    donorEmail: 'ईमेल (ऐच्छिक)',
    amount: 'रक्कम',
    purpose: 'उद्देश',
    anonymous: 'नाव न सांगता देणगी',
    payNow: 'आत्ता पैसे द्या',
    totalDonations: 'एकूण देणग्या',
    totalExpenses: 'एकूण खर्च',
    balance: 'शिल्लक',
    donors: 'देणगीदार',
    
    // Events
    registerEvent: 'नोंदणी करा',
    eventDate: 'तारीख',
    eventTime: 'वेळ',
    eventVenue: 'ठिकाण',
    
    // Members
    members: 'सभासद',
    addMember: 'सभासद जोडा',
    memberName: 'नाव',
    memberRole: 'भूमिका',
    memberStatus: 'स्थिती',
    
    // Volunteers
    volunteers: 'स्वयंसेवक',
    volunteerTeam: 'पथक',
    addVolunteer: 'स्वयंसेवक जोडा',
    
    // Common
    save: 'जतन करा',
    cancel: 'रद्द करा',
    edit: 'संपादित करा',
    delete: 'हटवा',
    search: 'शोधा',
    filter: 'फिल्टर',
    export: 'निर्यात',
    loading: 'लोड होत आहे...',
    noData: 'माहिती सापडली नाही',
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    status: 'स्थिती',
    actions: 'क्रिया',
    date: 'तारीख',
    name: 'नाव',
    mobile: 'मोबाइल',
    email: 'ईमेल',
    description: 'वर्णन',
    amount: 'रक्कम',
    category: 'श्रेणी',
    back: 'मागे',
    next: 'पुढे',
    submit: 'सादर करा',
    close: 'बंद करा',
    view: 'पाहा',
    download: 'डाउनलोड',
    share: 'शेअर करा',
    
    // Dashboard
    dashboard: 'डॅशबोर्ड',
    totalMembers: 'एकूण सभासद',
    totalVolunteers: 'एकूण स्वयंसेवक',
    upcomingEventsCount: 'येणारे कार्यक्रम',
    totalSponsors: 'एकूण प्रायोजक',
    
    // Errors
    errorGeneric: 'काहीतरी चूक झाली. पुन्हा प्रयत्न करा.',
    errorNoInternet: 'इंटरनेट कनेक्शन नाही.',
    errorNotFound: 'पान सापडले नाही.',
    errorUnauthorized: 'या पानाची परवानगी नाही.',
  },
  hi: {
    // Navigation
    home: 'मुख्य पृष्ठ',
    darshan: 'दर्शन',
    events: 'कार्यक्रम',
    donate: 'दान',
    profile: 'प्रोफ़ाइल',
    
    // Home
    appName: 'गणपतीमित्र',
    tagline: 'अपने मंडल का डिजिटल साथी',
    welcomeMessage: 'जय श्री गणेश',
    todayProgram: 'आज के कार्यक्रम',
    upcomingEvents: 'आगामी कार्यक्रम',
    countdown: 'गणेश चतुर्थी तक दिन',
    
    // Quick Actions
    darshanAction: 'दर्शन',
    donateAction: 'दान',
    eventsAction: 'कार्यक्रम',
    aartiAction: 'आरती',
    galleryAction: 'गैलरी',
    announcementsAction: 'घोषणाएं',
    locationAction: 'स्थान',
    helpAction: 'आपातकालीन सहायता',
    
    // Donation
    donationTitle: 'दान करें',
    donorName: 'दानकर्ता का नाम',
    donorMobile: 'मोबाइल नंबर',
    donorEmail: 'ईमेल (वैकल्पिक)',
    amount: 'राशि',
    purpose: 'उद्देश्य',
    anonymous: 'गुमनाम दान',
    payNow: 'अभी भुगतान करें',
    totalDonations: 'कुल दान',
    totalExpenses: 'कुल खर्च',
    balance: 'शेष राशि',
    donors: 'दानकर्ता',
    
    // Events
    registerEvent: 'पंजीकरण',
    eventDate: 'तारीख',
    eventTime: 'समय',
    eventVenue: 'स्थान',
    
    // Members
    members: 'सदस्य',
    addMember: 'सदस्य जोड़ें',
    memberName: 'नाम',
    memberRole: 'भूमिका',
    memberStatus: 'स्थिति',
    
    // Volunteers
    volunteers: 'स्वयंसेवक',
    volunteerTeam: 'टीम',
    addVolunteer: 'स्वयंसेवक जोड़ें',
    
    // Common
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    export: 'निर्यात',
    loading: 'लोड हो रहा है...',
    noData: 'डेटा नहीं मिला',
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    status: 'स्थिति',
    actions: 'क्रियाएं',
    date: 'तारीख',
    name: 'नाम',
    mobile: 'मोबाइल',
    email: 'ईमेल',
    description: 'विवरण',
    amount: 'राशि',
    category: 'श्रेणी',
    back: 'वापस',
    next: 'अगला',
    submit: 'जमा करें',
    close: 'बंद करें',
    view: 'देखें',
    download: 'डाउनलोड',
    share: 'शेयर करें',
    
    // Dashboard
    dashboard: 'डैशबोर्ड',
    totalMembers: 'कुल सदस्य',
    totalVolunteers: 'कुल स्वयंसेवक',
    upcomingEventsCount: 'आगामी कार्यक्रम',
    totalSponsors: 'कुल प्रायोजक',
    
    // Errors
    errorGeneric: 'कुछ गलत हो गया। फिर कोशिश करें।',
    errorNoInternet: 'इंटरनेट कनेक्शन नहीं।',
    errorNotFound: 'पृष्ठ नहीं मिला।',
    errorUnauthorized: 'आपको इस पृष्ठ तक पहुंच नहीं है।',
  }
} as const;

export function t(key: TranslationKey, lang: keyof typeof translations = 'mr'): string {
  return translations[lang][key] as string || translations.en[key] as string || key;
}
