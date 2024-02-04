import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { search } from "@/services/postServer";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sw = searchParams.get("sw");
  const supabase = createClient(cookies());

  if (!sw || sw.trim().length < 1) {
    return new Response("검색어를 입력해주세요", { status: 400 });
  }
  const { data, error } = await search(sw);

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
