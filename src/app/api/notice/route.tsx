import { NextRequest, NextResponse } from "next/server";
import { getNotices } from "@/services/notice";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || "";
  const limit = searchParams.get("limit") || "";

  const { data, error } = await getNotices({
    page,
    limit,
  });

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
