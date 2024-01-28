import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://localhost:1337/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.jwt,
    },
    credentials: "include",
  });

  const data = await res.json();

  return Response.json(data);
}
