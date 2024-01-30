"use client";
import { createClient } from "@/lib/supabase/client";
import {
  signInWithGoogle,
  signInWithPassword,
  signOut,
  signUp,
} from "@/services/authClient";
import { User } from "@/types/user";
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  OAuthResponse,
  Session,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  user: User | null;
  signOut: () => Promise<{
    error: AuthError | null;
  }>;

  signInWithGoogle: () => Promise<OAuthResponse>;
  signInWithPassword: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthTokenResponsePassword>;
  signUp: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => Promise<AuthResponse>;
};

//타입을 넣어줘도 쓰는곳에서 못읽음???
export const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut,
  signInWithGoogle,
  signInWithPassword,
  signUp,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signOut,
    signInWithGoogle,
    signInWithPassword,
    signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);