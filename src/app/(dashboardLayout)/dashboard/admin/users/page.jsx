import { getAllUsers } from "@/lib/api/users";

import UserManagement from "./UserManagement";

const AdminUsersManagementPage = async () => {
  const users = await getAllUsers();
  console.log("users", users);

  return <UserManagement users={users} />;
};

export default AdminUsersManagementPage;
