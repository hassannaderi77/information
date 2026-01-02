import TableUsers from "@/components/table/TableUsers";
import { getUsers } from "@/helper/getUsers";


export default async function AllPage() {
  const users = await getUsers();

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-wrap gap-3">
      {users.map((user) => (
        <TableUsers key={user._id} user={user} />
      ))}
    </div>
  );
}