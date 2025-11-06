import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userRole: 'admin' | 'support' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: 'admin' | 'support' }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'support' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const role = localStorage.getItem('userRole') as 'admin' | 'support' | null;
        setUserRole(role);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const role = localStorage.getItem('userRole') as 'admin' | 'support' | null;
        setUserRole(role);
      } else {
        setUserRole(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string; role?: 'admin' | 'support' }> => {
    try {
      // Check if admin credentials
      if (email === 'admin@volkswagen.com' && password === 'Volkswagen@2025') {
        // Create a session for admin (using Supabase auth)
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@volkswagen.com',
          password: 'Volkswagen@2025Admin!Secure'
        });

        if (error) {
          // If admin doesn't exist, create it
          const { error: signUpError } = await supabase.auth.signUp({
            email: 'admin@volkswagen.com',
            password: 'Volkswagen@2025Admin!Secure',
            options: {
              data: {
                role: 'admin'
              }
            }
          });

          if (signUpError) {
            return { success: false, error: signUpError.message };
          }

          // Try signing in again
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email: 'admin@volkswagen.com',
            password: 'Volkswagen@2025Admin!Secure'
          });

          if (retryError) {
            return { success: false, error: retryError.message };
          }

          setUser(retryData.user);
          setUserRole('admin');
          localStorage.setItem('userRole', 'admin');
          return { success: true, role: 'admin' };
        }

        setUser(data.user);
        setUserRole('admin');
        localStorage.setItem('userRole', 'admin');
        return { success: true, role: 'admin' };
      }

      // Check dealership users table
      const { data: dealershipUsers, error: queryError } = await supabase
        .from('dealership_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (queryError || !dealershipUsers) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Create Supabase session for dealership user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        // If user doesn't exist in auth, create them
        const { error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              role: 'support',
              dealership_name: dealershipUsers.dealership_name
            }
          }
        });

        if (signUpError) {
          return { success: false, error: signUpError.message };
        }

        // Try signing in again
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (retryError) {
          return { success: false, error: retryError.message };
        }

        setUser(retryData.user);
        setUserRole('support');
        localStorage.setItem('userRole', 'support');
        return { success: true, role: 'support' };
      }

      setUser(data.user);
      setUserRole('support');
      localStorage.setItem('userRole', 'support');
      return { success: true, role: 'support' };

    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
