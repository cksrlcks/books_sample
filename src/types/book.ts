export type Book = {
  id: string;
  name: string;
  created_at: string;
  description?: string;
  cover_img_url: string;
  likes: likes[];
  comments: comments[];
  writter: string;
  publisher: string;
};

export type likes = {
  id: string;
  user_id: string;
  username: string;
  created_at: string;
  book_Id: string;
  email: string;
};

export type comments = {
  id: string;
  user_id: string;
  username: string;
  comment: string;
  created_at: string;
  book_Id: string;
  email: string;
};

export type RecentBook = Omit<Book, "comments" | "likes"> & {
  likes: [{ count: number }];
  comments: [{ count: number }];
};
