import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { id, user_id, username, email, comment } = await request.json();
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("comments")
    .insert({ book_id: Number(id), user_id, username, email, comment });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { comment_id } = await req.json();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
