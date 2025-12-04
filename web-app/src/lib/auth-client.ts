import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { cache } from "react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:5000",
  fetchOptions: {
    credentials: "include", // Include cookies for authentication
  },
  plugins: [adminClient(), emailOTPClient()],
});

// TODO: cache() is not working.
export const betterAuthGetSeesion = cache(async function (
  headers: HeadersInit
) {
  console.log("betterAuthGetSession");

  return await authClient.getSession({
    fetchOptions: {
      headers,
    },
  });
});
