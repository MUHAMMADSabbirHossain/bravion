"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  async function handleLogoutButton() {
    console.log(`Logout button clicked.`);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          // redirect("/login");
        },
      },
    });
  }

  return <button onClick={handleLogoutButton}>LogoutButton</button>;
}

export default LogoutButton;
