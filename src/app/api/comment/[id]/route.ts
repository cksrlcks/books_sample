import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { setComment } from "@/services/post";
export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("book_id", id);
  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { user_id, username, email, comment } = await request.json();
  const { data, error } = await setComment({
    book_id: id,
    user_id,
    username,
    email,
    comment,
  });

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
