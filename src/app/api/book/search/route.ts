import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sw = searchParams.get("sw");
  const supabase = createClient(cookies());

  if (!sw || sw.trim().length < 1) {
    return new Response("검색어를 입력해주세요", { status: 400 });
  }
  const { data, error } = await supabase
    .from("books")
    .select(
      `
    *,
    likes(count),
    comments(count)
    `
    )
    .ilike("name_writter", `%${sw}%`)
    .order("created_at", { ascending: false });

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
