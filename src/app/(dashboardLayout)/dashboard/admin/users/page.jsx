// app/admin/users/page.jsx

import { getAllUsers } from "@/lib/api/users";
import UserManagement from "./UserManagement";

const AdminUsersManagementPage = async () => {
  const users = await getAllUsers();

  return <UserManagement users={users} />;
};

export default AdminUsersManagementPage;
