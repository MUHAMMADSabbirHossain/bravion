import { betterAuthGetSeesion } from "@/lib/auth-client";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

async function DashboardPage() {
  const { data: session, error } = await betterAuthGetSeesion({
    cookie: (await headers()).get("cookie") || "",
  });
  // console.log({session, error});

  if (session === null || !session?.user?.id || error !== null) {
    return unauthorized();
  }

  return <div>DashboardPage</div>;
}

export default DashboardPage;
