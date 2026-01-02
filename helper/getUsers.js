export async function getUsers() {

  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/users`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.users;
}