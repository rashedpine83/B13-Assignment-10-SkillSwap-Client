// import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const authHeader = async () => {
//   const token = await getUserToken();
//   const header = token
//     ? {
//         authorization: `Bearer ${token}`,
//       }
//     : {};
//   return header;
// };

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // ...await authHeader(),
    },
    body: data ? JSON.stringify(data) : null,
  });

  return await res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  return await res.json();
};
