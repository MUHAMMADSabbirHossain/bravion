import { betterAuthGetSeesion } from "@/lib/auth-client";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { ReactNode } from "react";

async function ProtectedLayout({ children }: { children: ReactNode }) {
  const { data: session, error } = await betterAuthGetSeesion({
    cookie: (await headers()).get("cookie") || "",
  });
  // console.log({session, error});

  if (session === null || !session?.user?.id || error !== null) {
    return unauthorized();
  }

  return <>{children}</>;
}

export default ProtectedLayout;
