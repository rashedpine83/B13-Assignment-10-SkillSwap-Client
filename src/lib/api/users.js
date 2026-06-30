import { serverFetch } from "../core/server";

export const getAllUsers = async () => {
  return serverFetch("/api/users");
};

export const getUserById = async (id) => {
  return serverFetch(`/api/users/${id}`);
};

export const getUserByEmail = async (email) => {
  console.log("email", email);
  return await serverFetch(`/api/users-by-email/${email}`);
};
