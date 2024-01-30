import { createClient } from "@/lib/supabase/server";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const getBooks = () => {
  const supabase = createClient(cookies());
  return supabase.from("books").select(
    `
    *,
    likes(count)
    `
  );
};

export const getRecentBooks = () => {
  const supabase = createClient(cookies());
  return supabase
    .from("books")
    .select(
      `
    *,
    likes(count)
    `
    )
    .limit(5);
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
  book_id: string;
  user_id: User;
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
