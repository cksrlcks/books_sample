import { NextRequest, NextResponse } from "next/server";
import { getBooks } from "@/services/post";
import { useParams } from "next/navigation";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || "";
  const limit = searchParams.get("limit") || "";

  const { data, error } = await getBooks({
    page,
    limit,
  });

  if (error) {
    console.log(error);
    return new Response("fail", { status: 400 });
  }

  return NextResponse.json(data);
}
