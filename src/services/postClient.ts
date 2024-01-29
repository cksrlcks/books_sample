import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getBooks = () => {
  return supabase.from("books").select(
    `
    *,
    likes(count)
    `
  );
};

export const getRecentBooks = () => {
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
export const getBook = () => {};
