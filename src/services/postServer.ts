import { createClient } from "@/lib/supabase/server";
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
