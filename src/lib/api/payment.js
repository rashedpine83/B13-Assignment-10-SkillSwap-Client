import { serverFetch } from "@/lib/core/server";

export const getAllPayments = async () => {
  return serverFetch("/api/payments");
};

export const getPaymentsByEmail = async (email) => {
  const data = await serverFetch(
    `/api/payments/email?email=${encodeURIComponent(email)}`,
  );

  return data;
};
