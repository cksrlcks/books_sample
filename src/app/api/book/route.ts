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

export async function POST(request: NextRequest) {
  const { coverImgUrl, name, writter, publisher, description } =
    await request.json();
  const supabase = createClient(cookies());

  //관리자인지 체크
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "not allowed" }, { status: 500 });

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();
  if (profile.role !== "admin") {
    return NextResponse.json({ error: "not allowed" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("books")
    .insert({
      cover_img_url: coverImgUrl,
      name,
      writter,
      publisher,
      description,
    })
    .select();

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
