import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getUserActivityData = async (user_id: string) => {
  const supabase = createClient(cookies());

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

export const getUserComments = async (user_id: string) => {
  const supabase = createClient(cookies());
  return supabase
    .from("comments")
    .select(
      `
      *,
      books(*)
    `
    )
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
};

export const getUserLikes = async (user_id: string) => {
  const supabase = createClient(cookies());
  return supabase
    .from("likes")
    .select(
      `
      *,
      books(*)
    `
    )
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
};
