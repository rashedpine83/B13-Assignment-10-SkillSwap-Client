import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientTasks = async (emailId, status = "open") => {
  const res = await fetch(
    `${baseUrl}/api/tasks?emailId=${emailId}&status=${status}`,
  );

  return res.json();
};
export const getAllTasks = async (page) => {
  return serverFetch(`/api/tasks?page=${page}`);
};

export const getTaskById = async (taskId) => {
  return serverFetch(`/api/tasks/${taskId}`, {});
};

// export const getTask = async (query = "") => {
//   return serverFetch(`/api/tasks${query ? `?${query}` : ""}`);
// };

export const getTask = async (query = "") => {
  const result = await serverFetch(`/api/tasks${query ? `?${query}` : ""}`);

  // Support different API structures
  return Array.isArray(result) ? result : result?.tasks || result?.data || [];
};

export const getSingleTask = async (id) => {
  return serverFetch(`/api/tasks/${id}`);
};

export const getTaskByClientEmail = async (email) => {
  return serverFetch(`/api/tasks/email?email=${encodeURIComponent(email)}`);
};
