import { Database, Tables, Enums } from "./supabase";

export type Book = Tables<"books">;

export type likes = Tables<"likes">;

export type comments = Tables<"comments">;

export type RecentBook = Omit<Book, "comments" | "likes"> & {
  likes: [{ count: number }];
  comments: [{ count: number }];
};
