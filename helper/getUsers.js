export async function getUsers() {
  const res = await fetch(`http://localhost:3000/api/users`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.users;
}