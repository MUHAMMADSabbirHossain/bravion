"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, unauthorized } from "next/navigation";

function SendVerificationOtpPage() {
  const {
    data: session,
    isPending,
    isRefetching,
    refetch,
    error,
  } = authClient.useSession();
  console.log({ session, error });

  if (session?.user?.emailVerified === true && error !== null) {
    redirect("/email-otp/success-verification-otp");
  }

  async function handleSendVerificationOtp() {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: session?.user?.email as string, // required
      type: "email-verification", // required
    });
    console.log({ data, error });

    if (data?.success === true && error === null) {
      redirect("/email-otp/check-verification-otp");
    }
  }

  return (
    <>
      <p>SendVerificationOtpPage</p>
      <button onClick={handleSendVerificationOtp}>Send OTP</button>
    </>
  );
}

export default SendVerificationOtpPage;
