import { serverFetch } from "../core/server";

export const getUserForFreelancer = async (role = "freelancer") => {
  return serverFetch(`/api/users?role=${role}`);
};

export const getAllUsers = async () => {
  return serverFetch("/api/users");
};
