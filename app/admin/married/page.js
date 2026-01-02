import TableUsers from "@/components/table/TableUsers";
import { getUsers } from "@/helper/getUsers";

export default async function MarriedPage() {
  const users = await getUsers();

  
  const marriedUsers = users.filter(user => user.married === "married");

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-wrap gap-3">
      {marriedUsers.map((user) => (
        <TableUsers key={user._id} user={user} />
      ))}
    </div>
  );
}