import { User } from "@supabase/supabase-js";

export const getUserName = (user: User) => {
  if (user) {
    const metadata = user.user_metadata;
    return metadata.name || metadata.full_name || metadata.username || "";
  } else {
    return "";
  }
};
