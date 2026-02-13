import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut, openSignIn, openSignUp } = useClerk();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      setUser({
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        name: clerkUser.fullName || clerkUser.username || '',
        avatar: clerkUser.imageUrl,
        plan: 'free', // Default to free plan for now
      });
    } else if (isLoaded && !isSignedIn) {
      setUser(null);
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  // Deprecated methods - kept for compatibility but redirect to Clerk flow
  const login = async (_email: string, _password: string) => {
    openSignIn();
  };

  const signup = async (_name: string, _email: string, _password: string) => {
    openSignUp();
  };

  const googleLogin = async () => {
    openSignIn(); // Defaults to sign in modal
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const updateUser = (_userData: Partial<User>) => {
    // console.warn("updateUser is not fully implemented with Clerk yet");
    // In a real app, this would update Clerk metadata or your own DB
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        googleLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
