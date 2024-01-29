export type Book = {
  id: string;
  name: string;
  created_at: string;
  description?: string;
  cover_img_url: string;
  likes: string[];
  comments: Comment[];
  writter: string;
  publisher: string;
};

export type Comment = {
  username: string;
  comment: string;
  regDate: string;
};

export type RecentBook = Omit<Book, "comments" | "likes"> & {
  likes: [{ count: number }];
  comments: [{ count: number }];
};
