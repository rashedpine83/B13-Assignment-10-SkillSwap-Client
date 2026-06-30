// import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (
  path,
  data,
  options = {},
  method = "POST",
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options,
    },
    body: data ? JSON.stringify(data) : null,
  });

  return await res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  return await res.json();
};
