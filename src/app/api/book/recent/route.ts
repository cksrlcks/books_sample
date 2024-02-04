import { NextRequest, NextResponse } from "next/server";
import {
  getMostCommentedBooks,
  getMostLikedBooks,
  getRecentBooks,
} from "@/services/postServer";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  if (filter === "recent") {
    const { data, error } = await getRecentBooks();
    if (error) {
      return new Response("fail", { status: 400 });
    }

    return NextResponse.json(data);
  }

  if (filter === "likes") {
    const { data, error } = await getMostLikedBooks();
    if (error) {
      return new Response("fail", { status: 400 });
    }

    const sortedData = data
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }

  if (filter === "comments") {
    const { data, error } = await getMostCommentedBooks();
    if (error) {
      return new Response("fail", { status: 400 });
    }

    const sortedData = data
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 5);
    return NextResponse.json(sortedData);
  }
}
