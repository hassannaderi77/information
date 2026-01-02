import TableUsers from "@/components/table/TableUsers";
import { getUsers } from "@/helper/getUsers";

export default async function SinglePage() {
  const users = await getUsers();

  
  const singleUsers = users.filter(user => user.married === "alone");

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-wrap gap-3">
      {singleUsers.map((user) => (
        <TableUsers key={user._id} user={user} />
      ))}
    </div>
  );
}