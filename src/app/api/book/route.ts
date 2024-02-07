import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || "";
  const limit = searchParams.get("limit") || "";

  const supabase = createClient(cookies());

  if (page && limit) {
    const start = Number(page) * Number(limit);
    const end = start + Number(limit) - 1;
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
      .range(start, end);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase
      .from("books")
      .select(
        `
        *,
        likes(*),
        comments(*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }
}
