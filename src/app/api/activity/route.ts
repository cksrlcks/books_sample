import { NextRequest, NextResponse } from "next/server";
import { getUserActivityData } from "@/services/auth";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) return new Response("fail", { status: 400 });

  try {
    const res = await getUserActivityData(user_id);
    return NextResponse.json(res);
  } catch (error) {
    return new Response("fail", { status: 400 });
  }
}
