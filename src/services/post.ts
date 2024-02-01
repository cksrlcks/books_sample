import { createClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const getBooks = () => {
  const supabase = createClient(cookies());
  return supabase
    .from("books")
    .select(
      `
        *,
        likes(*),
        comments(*)
      `
    )
    .order("created_at", { ascending: false });
};

export const getRecentBooks = () => {
  const supabase = createClient(cookies());
  return supabase
    .from("books")
    .select(
      `
        *,
        likes(*),
        comments(*)
      `
    )
    .order("created_at", { ascending: false })
    .limit(5);
};

export const getMostLikedBooks = () => {
  const supabase = createClient(cookies());
  return supabase.from("books").select(
    `
      *,
      likes(*),
      comments(*)
      `
  );
};

export const getMostCommentedBooks = () => {
  const supabase = createClient(cookies());
  return supabase.from("books").select(
    `
      *,
      likes(*),
      comments(*)
      `
  );
};

export const getBook = (bookId: string) => {
  const supabase = createClient(cookies());
  return supabase
    .from("books")
    .select(
      `
      *,
      likes(*),
      comments(*)
    `
    )
    .eq("id", bookId)
    .single();
};

export const setLike = ({
  book_id,
  user_id,
}: {
  book_id: number;
  user_id: string;
}) => {
  const supabase = createClient(cookies());
  return supabase.from("likes").insert({
    book_id: book_id,
    user_id: user_id,
  });
};

export const deleteLike = (id: string) => {
  const supabase = createClient(cookies());
  return supabase.from("likes").delete().eq("id", id);
};

export const getLike = ({
  book_id,
  user_id,
}: {
  book_id: number;
  user_id: string;
}) => {
  const supabase = createClient(cookies());
  return supabase.from("likes").select("*").match({ book_id, user_id });
};

export const search = (sw: string) => {
  const supabase = createClient(cookies());
  return supabase
    .from("books")
    .select(
      `
        *,
        likes(*),
        comments(*)
      `
    )
    .ilike("name_writter", `%${sw}%`)
    .order("created_at", { ascending: false });
};
