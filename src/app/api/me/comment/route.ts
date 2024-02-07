import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/actions";

export async function GET(request: NextRequest) {
  const supabase = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || user === null) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  } else {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
      *,
      books(*)
    `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  }
}
