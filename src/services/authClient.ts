import { createClient } from "@/lib/supabase/client";

//클라이언트는 쿠키필요없이 키로만 요청하는거라 미리 만들어두고 재사용가능한듯
const supabase = createClient();

export const signInWithPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

export const signOut = () => {
  return supabase.auth.signOut();
};

export const signUp = ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
    },
  });
};

export const getUser = () => {
  return supabase.auth.getUser();
};

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
};
