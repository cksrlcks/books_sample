import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getNotices = ({
  limit,
  page,
}: {
  limit: string;
  page: string;
}) => {
  const supabase = createClient(cookies());
  if (limit && page) {
    const start = Number(page) * Number(limit);
    const end = start + Number(limit) - 1;
    return supabase
      .from("notice")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);
  } else {
    return supabase
      .from("notice")
      .select("*")
      .order("created_at", { ascending: false });
  }
};
