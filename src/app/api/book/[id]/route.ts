import { NextRequest, NextResponse } from "next/server";
import { getBook } from "@/services/post";
export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { data, error } = await getBook(id);
  if (error) {
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
