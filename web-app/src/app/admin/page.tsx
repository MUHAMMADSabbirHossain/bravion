import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";

async function AdminPage() {
  const { data: session, error } = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") || "" },
    },
  });
  console.log({ session, error });

  if (session === null || !session?.user?.id || error !== null) {
    return unauthorized();
  }

  if (
    session === null ||
    !session?.user?.id ||
    session?.user?.role !== "admin" ||
    error !== null
  ) {
    return forbidden();
  }

  return <>AdminPage</>;
}

export default AdminPage;
