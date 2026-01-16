"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithCode: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: UserProfile = {
  uid: 'mock-user-uid',
  email: 'demo@user.com',
  name: 'Subhra Biswas',
  balance: 0,
};

// The access code to log in
const ACCESS_CODE = 'Subhro2007';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user
    const session = localStorage.getItem('user_session');
    if (session) {
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const loginWithCode = async (code: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (code === ACCESS_CODE) {
      setUser(mockUser);
      localStorage.setItem('user_session', 'true');
    } else {
      throw new Error('Invalid access code');
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('user_session');
    setLoading(false);
  };

  const value = { user, loading, loginWithCode, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
