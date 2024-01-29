import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
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
    .eq("id", id)
    .single();

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
