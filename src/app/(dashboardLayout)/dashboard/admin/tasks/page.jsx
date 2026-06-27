import { getAllTasks } from "@/lib/api/tasks";
import TaskTable from "@/components/Dashboard/TaskTable";

const AdminTaskManagementPage = async () => {
  const tasks = await getAllTasks();

  return (
    <div className="p-6">
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default AdminTaskManagementPage;
