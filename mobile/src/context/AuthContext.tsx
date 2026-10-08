import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProfileRecord, UserPreferencesRecord } from '../types/database';

interface AuthContextType {
  user: ProfileRecord | null;
  preferences: UserPreferencesRecord | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileRecord>) => Promise<boolean>;
  updatePreferences: (updates: Partial<UserPreferencesRecord>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ProfileRecord | null>(null);
  const [preferences, setPreferences] = useState<UserPreferencesRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user profile & preferences from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      if (!isSupabaseConfigured) return;
      const { data: profile, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile && !profError) {
        setUser(profile as ProfileRecord);
      }

      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (prefs) {
        setPreferences(prefs as UserPreferencesRecord);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setPreferences(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Please add valid keys to .env');
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Please add valid keys to .env');
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Signup failed' };
    }
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setPreferences(null);
  };

  const updateProfile = async (updates: Partial<ProfileRecord>): Promise<boolean> => {
    if (!user || !isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      if (error) throw error;
      setUser(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      console.error('Update profile error:', err);
      return false;
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferencesRecord>): Promise<boolean> => {
    if (!user || !isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id);
      if (error) throw error;
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      console.error('Update preferences error:', err);
      return false;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        preferences,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        updatePreferences,
      }}
    >
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
