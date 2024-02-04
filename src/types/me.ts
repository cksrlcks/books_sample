import { Book, likes, comments } from "./book";

export type Like = likes & {
  books: Book;
};

export type Comment = comments & {
  books: Book;
};
