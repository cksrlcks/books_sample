export type Notice = {
  id: string;
  title: string;
  regDate: string;
  content: string;
};

export type RecentNotice = Omit<Notice, "content">;
