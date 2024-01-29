import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("books")
    .select(
      `
    *,
    likes(count),
    comments(count)
    `
    )
    .limit(5);

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
