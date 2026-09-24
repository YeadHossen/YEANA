import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginDemoAdmin: () => void;
  loginDemoTraveler: () => void;
  signup: (email: string, fullName: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  deleteAccount: () => Promise<boolean>;
}

const DEFAULT_DEMO_TRAVELER: UserProfile = {
  id: 'usr-traveler-01',
  full_name: 'Anika Rahman',
  email: 'anika.travel@yeana.bd',
  phone: '+880 1712-345678',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  role: 'user',
  bio: 'Passionate backpacker exploring every corner of beautiful Bangladesh. Love mountain treks & local foods.',
  preferred_language: 'en'
};

const DEFAULT_DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  full_name: 'YEANA Admin',
  email: 'admin@yeana.com.bd',
  phone: '+880 1800-999000',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  role: 'admin',
  bio: 'Platform Lead & Verified Destination Curator at YEANA Bangladesh.',
  preferred_language: 'en'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      // Clear legacy localStorage so the user is never kept logged in across app restarts
      localStorage.removeItem('yeana_user');

      // Only restore user if actively logged in during this specific browser/app session
      const sessionSaved = sessionStorage.getItem('yeana_session_user');
      return sessionSaved ? JSON.parse(sessionSaved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Clear legacy persistent storage
    try {
      localStorage.removeItem('yeana_user');
    } catch (e) {}

    async function checkSession() {
      // Only restore Supabase session if this active app session has logged in
      const hasActiveSession = sessionStorage.getItem('yeana_session_user');
      if (hasActiveSession && isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile as UserProfile);
              sessionStorage.setItem('yeana_session_user', JSON.stringify(profile));
            }
          }
        } catch (err) {
          console.error('Error fetching Supabase session:', err);
        }
      }
      setIsLoading(false);
    }

    checkSession();
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (profile) {
            setUser(profile as UserProfile);
            sessionStorage.setItem('yeana_session_user', JSON.stringify(profile));
            setIsLoading(false);
            return true;
          }
        }
      }

      // Fallback local login for current session
      const isAdminEmail = email.toLowerCase().trim() === 'admin@yeana.com.bd' || email.toLowerCase().trim() === 'admin@yeana.bd';
      const fallbackUser: UserProfile = {
        id: `usr-${Date.now()}`,
        full_name: email.split('@')[0],
        email: email,
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: isAdminEmail ? 'admin' : 'user',
        bio: 'Explorer discovering Bangladesh with YEANA.',
        preferred_language: 'en'
      };
      setUser(fallbackUser);
      sessionStorage.setItem('yeana_session_user', JSON.stringify(fallbackUser));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      return false;
    }
  };

  const loginDemoAdmin = () => {
    setUser(DEFAULT_DEMO_ADMIN);
    sessionStorage.setItem('yeana_session_user', JSON.stringify(DEFAULT_DEMO_ADMIN));
  };

  const loginDemoTraveler = () => {
    setUser(DEFAULT_DEMO_TRAVELER);
    sessionStorage.setItem('yeana_session_user', JSON.stringify(DEFAULT_DEMO_TRAVELER));
  };

  const signup = async (email: string, fullName: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        if (data.user) {
          const newProfile: UserProfile = {
            id: data.user.id,
            full_name: fullName,
            email: email,
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            role: 'user',
            preferred_language: 'en'
          };
          setUser(newProfile);
          sessionStorage.setItem('yeana_session_user', JSON.stringify(newProfile));
          setIsLoading(false);
          return true;
        }
      }

      // Fallback local registration for current session
      const newProfile: UserProfile = {
        id: `usr-${Date.now()}`,
        full_name: fullName,
        email: email,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'user',
        bio: 'New traveler on YEANA.',
        preferred_language: 'en'
      };
      setUser(newProfile);
      sessionStorage.setItem('yeana_session_user', JSON.stringify(newProfile));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    setUser(null);
    sessionStorage.removeItem('yeana_session_user');
    localStorage.removeItem('yeana_user');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    sessionStorage.setItem('yeana_session_user', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').update(updates).eq('id', user.id);
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('profiles').delete().eq('id', user.id);
          await supabase.auth.signOut();
        } catch (err) {
          console.warn('Supabase profile delete warning:', err);
        }
      }
      // Purge local sessions and cached user identity
      sessionStorage.removeItem('yeana_session_user');
      localStorage.removeItem('yeana_user');
      setUser(null);
      return true;
    } catch (e) {
      console.error('Delete account error:', e);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isLoading,
      login,
      loginDemoAdmin,
      loginDemoTraveler,
      signup,
      logout,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
