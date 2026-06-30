"use server";
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createTask = async (newTask, options) => {
  return serverMutation("/api/tasks", newTask, options.headers);
};

export const updateTask = async (id, data) => {
  const result = serverMutation(`/api/tasks/${id}`, data, "", "PATCH");

  return result;
};

export const deleteTask = async (id) => {
  const result = await serverMutation(`/api/tasks/${id}`, null, "DELETE");

  revalidatePath("/dashboard/admin/tasks");

  return result;
};
