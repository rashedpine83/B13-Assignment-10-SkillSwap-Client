import { getAllPayments } from "@/lib/api/payment";
import { getAllTasks } from "@/lib/api/tasks";
import { getAllUsers } from "@/lib/api/users";
import AdminChart from "./AdminChart";

const AdminOverviewPage = async () => {
  const payments = await getAllPayments();
  const tasks = await getAllTasks();
  const users = await getAllUsers();

  return <AdminChart payments={payments} tasks={tasks} users={users} />;
};

export default AdminOverviewPage;
