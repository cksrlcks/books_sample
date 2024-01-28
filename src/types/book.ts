export type Book = {
  bookId: string;
  name: string;
  regDate: string;
  description?: string;
  coverImageUrl?: string;
  likes: string[];
  comments: Comment[];
};

export type Comment = {
  username: string;
  comment: string;
  regDate: string;
};

export type RecentBook = Omit<Book, "comments" | "likes"> & {
  likes: number;
  comments: number;
};
