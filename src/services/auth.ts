const strapiURL = process.env.STRAPI_URL;

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await fetch(`${strapiURL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ identifier: username, password }),
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("signin error");
  }
}
