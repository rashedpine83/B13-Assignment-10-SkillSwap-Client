import { getAllTasks } from "@/lib/api/tasks";
import BrowseTasksClient from "./BrowseTaskClient";

const BrowseTaskspage = async ({ searchParams }) => {
  const params = await searchParams;

  // const query = new URLSearchParams(Object.entries(params || {})).toString();

  const tasks = await getAllTasks(params.page);

  return <BrowseTasksClient tasksData={tasks} />;
};

export default BrowseTaskspage;
