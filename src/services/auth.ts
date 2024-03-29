import { createClient } from "@/lib/supabase/client";

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
        full_name: username,
        name: username,
      },
    },
  });
};

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_NEXT_URL}/auth/callback`,
    },
  });
};

export const passwordChange = ({ new_password }: { new_password: string }) => {
  return supabase.auth.updateUser({ password: new_password });
};

export const findPassword = ({ email }: { email: string }) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_NEXT_URL}/mypage/password_reset`,
  });
};
