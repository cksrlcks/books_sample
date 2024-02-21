import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("books")
    .select(
      `
      *,
      likes(*),
      comments(*)
    `
    )
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { coverImgUrl, name, writter, publisher, description } =
    await request.json();
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("books")
    .update({
      cover_img_url: coverImgUrl,
      name,
      writter,
      publisher,
      description,
    })
    .eq("id", params.id);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("books")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
