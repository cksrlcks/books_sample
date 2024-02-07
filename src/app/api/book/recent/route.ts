import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/actions";
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
        likes(*),
        comments(*)
      `
      )
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  if (filter === "likes") {
    const { data, error } = await supabase.from("books").select(
      `
        *,
        likes(*),
        comments(*)
        `
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sortedData = data
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }

  if (filter === "comments") {
    const { data, error } = await supabase.from("books").select(
      `
        *,
        likes(*),
        comments(*)
        `
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sortedData = data
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }
}
