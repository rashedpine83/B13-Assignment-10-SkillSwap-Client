import { serverMutation } from "../core/server";

export const createCompleteTask = async (newCompleteTask) => {
  return serverMutation("/api/completed-tasks", newCompleteTask);
};
