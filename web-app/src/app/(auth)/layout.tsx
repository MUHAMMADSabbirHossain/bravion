import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { data: session, error } = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") || "" },
    },
  });
  //   console.log({ session, error });

  if (session?.user?.id || error !== null) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}

export default AuthLayout;
