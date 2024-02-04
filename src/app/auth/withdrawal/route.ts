import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { user_id } = await request.json();
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  const { data, error } = await supabase.auth.admin.deleteUser(user_id);
  if (error) {
    return new Response("fail", { status: 400 });
  }

  if (!error) {
    const deleteLikes = async () => {
      return supabase.from("likes").delete().eq("user_id", user_id);
    };

    const deleteComments = async () => {
      return supabase.from("comments").delete().eq("user_id", user_id);
    };
    try {
      const res = await Promise.all([deleteLikes(), deleteComments()]);
      return new Response("success", { status: 200 });
    } catch (error) {
      return new Response("fail", { status: 400 });
    }
  }
}
