import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { book_id, user_id } = await req.json();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .match({ book_id, user_id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (data && data.length) {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .match({ book_id, user_id });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase.from("likes").insert({
      book_id: book_id,
      user_id: user_id,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  }
}
