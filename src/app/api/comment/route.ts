import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { deleteComment, getComment, setComment } from "@/services/post";

export async function POST(request: Request) {
  const { id, user_id, username, email, comment } = await request.json();
  const { data, error } = await setComment({
    book_id: Number(id),
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

export async function DELETE(req: Request) {
  const { comment_id } = await req.json();
  const { data, error } = await deleteComment(comment_id);

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
