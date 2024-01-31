import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getBooks } from "@/services/post";
export async function GET(request: NextRequest) {
  const supabase = createClient(cookies());

  const { data, error } = await getBooks();

  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
