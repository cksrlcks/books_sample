import { NextRequest, NextResponse } from "next/server";
import { getUserLikes } from "@/services/activity";
import { getUser } from "@/services/auth";
export async function GET(request: NextRequest) {
  //세션없으면 돌려보내기
  const {
    data: { user },
    error,
  } = await getUser();
  if (error || user === null) {
    return new Response("fail", { status: 400 });
  }

  const { data: likes, error: likesError } = await getUserLikes(user.id);
  if (likesError) {
    return new Response("fail", { status: 400 });
  }
  return NextResponse.json(likes);
}
