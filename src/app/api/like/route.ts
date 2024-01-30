import { NextRequest, NextResponse } from "next/server";
import { setLike, deleteLike } from "@/services/post";

export async function POST(req: Request) {
  const { book_id, user_id } = await req.json();

  const { data, error } = await setLike({ book_id, user_id });

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { like_id } = await req.json();

  const { data, error } = await deleteLike(like_id);

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
