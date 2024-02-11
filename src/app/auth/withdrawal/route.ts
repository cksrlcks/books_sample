import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

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
  //프로필 삭제부터
  const { error: profileDeleteError } = await supabase
    .from("profile")
    .delete()
    .eq("id", user_id);

  if (profileDeleteError) {
    console.log(profileDeleteError);
    return NextResponse.json(profileDeleteError, { status: 400 });
  }

  const { data, error } = await supabase.auth.admin.deleteUser(user_id);

  if (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }

  if (!error) {
    const deleteLikes = async () => {
      return supabase.from("likes").delete().eq("user_id", user_id);
    };

    const deleteComments = async () => {
      return supabase.from("comments").delete().eq("user_id", user_id);
    };
    try {
      await Promise.all([deleteLikes(), deleteComments()]);
      return new Response("success", { status: 200 });
    } catch (error) {
      NextResponse.json(error, { status: 400 });
    }
  }
}
