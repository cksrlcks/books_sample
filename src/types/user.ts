export type User = {
  id: string;
  username?: string;
  email?: string;
  image?: string;
  user_metadata?: {
    avatar_url?: string;
    name?: string;
    username?: string;
    full_name?: string;
  };
};
