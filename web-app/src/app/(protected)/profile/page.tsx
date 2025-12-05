import { betterAuthGetSeesion } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";
import { unauthorized } from "next/navigation";

async function ProfilePage() {
  const { data: session, error } = await betterAuthGetSeesion({
    cookie: (await headers()).get("cookie") || "",
  });
  // console.log({ session, error });

  return (
    <>
      ProfilePage
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      {session?.user?.emailVerified === true ? (
        <p>Verified</p>
      ) : (
        <Link href={"/email-otp/send-verification-otp"}>
          Please verify your account.
        </Link>
      )}
    </>
  );
}

export default ProfilePage;
