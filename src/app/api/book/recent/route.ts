import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");
  const supabase = createClient(cookies());

  if (filter === "recent") {
    const { data, error } = await supabase
      .from("books")
      .select(
        `
      *,
      likes(count),
      comments(count)
      `
      )
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) {
      return new Response("fail", { status: 400 });
    }

    return NextResponse.json(data);
  }

  if (filter === "likes") {
    const { data, error } = await supabase.from("books").select(
      `
        *,
        likes(count),
        comments(count)
        `
    );
    if (error) {
      return new Response("fail", { status: 400 });
    }

    const sortedData = data
      .sort((a, b) => b.likes[0].count - a.likes[0].count)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }

  if (filter === "comments") {
    const { data, error } = await supabase.from("books").select(
      `
        *,
        likes(count),
        comments(count)
        `
    );
    if (error) {
      return new Response("fail", { status: 400 });
    }

    const sortedData = data
      .sort((a, b) => b.comments[0].count - a.comments[0].count)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }
}
