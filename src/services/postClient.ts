import { createClient } from "@/lib/supabase/client";
import { User } from "@/types/user";

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

export const setLike = ({ id, user }: { id: string; user: User }) => {
  return supabase.from("likes").insert({
    book_id: id,
    user_id: user.id,
    email: user.email,
    username: user.username,
  });
};

export const deleteLike = (id: string) => {
  return supabase.from("likes").delete().eq("id", id);
};
