import { serverFetch } from "../core/server";

export const getCompletedTasksByFreelancerEmail = async (freelancerEmail) => {
  return serverFetch(`/api/completed-tasks?freelancerEmail=${freelancerEmail}`);
};
