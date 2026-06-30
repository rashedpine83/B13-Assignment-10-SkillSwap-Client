import { serverFetch, serverMutation } from "../core/server";

export const createUser = async (newUser) => {
  return serverMutation("/api/users", newUser);
};

export const updateUser = async (email, data) => {
  const result = await serverMutation(`/api/users/${email}`, data, "PATCH");

  return result;
};
