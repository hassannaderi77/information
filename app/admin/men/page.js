import TableUsers from "@/components/table/TableUsers";
import { getUsers } from "@/helper/getUsers";

export default async function MenPage() {
  const users = await getUsers();

  
  const menUsers = users.filter(user => user.gender === "men");

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-wrap gap-3">
      {menUsers.map((user) => (
        <TableUsers key={user._id} user={user} />
      ))}
    </div>
  );
}