'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Language, UserRole } from '@/types';

interface AppUser {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  mandalId: string;
  language: Language;
  isLoggedIn: boolean;
}

interface AppContextType {
  user: AppUser | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (user: AppUser) => void;
  logout: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultUser: AppUser = {
  id: 'user_001',
  name: 'Rajesh Deshmukh',
  mobile: '9876543210',
  email: 'rajesh@email.com',
  role: 'mandal_admin',
  mandalId: 'mandal_001',
  language: 'mr',
  isLoggedIn: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(defaultUser);
  const [language, setLanguage] = useState<Language>('mr');
  const [activeModule, setActiveModule] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const login = useCallback((u: AppUser) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  return (
    <AppContext.Provider value={{ user, language, setLanguage, login, logout, activeModule, setActiveModule, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
