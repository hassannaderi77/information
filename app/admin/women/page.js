import TableUsers from "@/components/table/TableUsers";
import { getUsers } from "@/helper/getUsers";

export default async function WomenPage() {
  const users = await getUsers();

  
  const womenUsers = users.filter(user => user.gender === "women");

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-wrap gap-3">
      {womenUsers.map((user) => (
        <TableUsers key={user._id} user={user} />
      ))}
    </div>
  );
}