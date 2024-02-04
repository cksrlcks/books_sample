import { NextRequest, NextResponse } from "next/server";
import { getUserActivityData } from "@/services/activityServer";
import { getUser } from "@/services/authServer";
export async function GET(request: NextRequest) {
  //세션없으면 돌려보내기
  const {
    data: { user },
    error,
  } = await getUser();
  if (error || user === null) {
    return new Response("fail", { status: 400 });
  }

  try {
    const res = await getUserActivityData(user.id);
    return NextResponse.json(res);
  } catch (error) {
    return new Response("fail", { status: 400 });
  }
}
