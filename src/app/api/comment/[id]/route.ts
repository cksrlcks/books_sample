import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getComment, setComment } from "@/services/post";
export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { data, error } = await getComment({
    id: Number(id),
  });
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
