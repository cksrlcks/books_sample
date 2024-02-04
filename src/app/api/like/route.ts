import { NextRequest, NextResponse } from "next/server";
import { setLike, deleteLike, getLike } from "@/services/postServer";

export async function POST(req: Request) {
  const { book_id, user_id } = await req.json();

  //이미 있으면 리턴
  const { data: like, error: likeError } = await getLike({ book_id, user_id });
  if (like && like.length) {
    return new Response("already", { status: 200 });
  }
  if (likeError) {
    return new Response("fail", { status: 400 });
  }

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
