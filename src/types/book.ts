import { Database, Tables, Enums } from "./supabase";

export type Book = Tables<"books">;

export type likes = Tables<"likes">;

export type comments = Tables<"comments">;

export type RecentBook = Book & {
  likes: [{ count: number }];
  comments: [{ count: number }];
};

export type BookData = Book & {
  likes: likes[];
  comments: comments[];
};
