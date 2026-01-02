import { notFound } from "next/navigation";
import EditUser from "@/components/editUser/EditUser";

async function getUser(id) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/user/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export default async function Page({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { id } = params;

  const user = await getUser(id);
  if (!user) notFound();

  return <EditUser user={user} />;
}
