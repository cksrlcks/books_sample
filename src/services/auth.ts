import { createClient } from "@/lib/supabase/client";

//context api를 위한 client용 client
//csr에서는 client 미리 만들어두고 재사용가능
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

export const getUserActivityData = async (user_id: string) => {
  const getUserLikes = () => {
    return supabase.from("likes").select("*").eq("user_id", user_id);
  };

  const getUserComments = () => {
    return supabase.from("comments").select("*").eq("user_id", user_id);
  };

  return Promise.all([getUserLikes(), getUserComments()])
    .then((data) => {
      return { likes: data[0], comments: data[1] };
    })
    .catch((error) => {
      throw new Error(error);
    });
};
