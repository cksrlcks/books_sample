import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getUser() {
  const supabase = createClient(cookies());
  return supabase.auth.getUser();
}
