import { serverFetch } from "../core/server";

export const getReviewsByFreelancerEmail = async (freelancerEmail) => {
  return serverFetch(`/api/reviews?freelancerEmail=${freelancerEmail}`);
};

export const getAllReviews = async () => {
  return serverFetch("/api/reviews");
};
