"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

function VerifyEmailPage() {
  const [otp, setOtp] = useState("");

  const {
    data: session,
    isPending,
    isRefetching,
    refetch,
    error,
  } = authClient.useSession();
  console.log({ session, error });

  useEffect(() => {
    if (session?.user?.emailVerified === true) {
      redirect("/email-otp/success-verification-otp");
    }
  });

  function handleCheckVerificationOtpChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    console.log(event.target.value);

    setOtp(event.target.value);
  }

  async function handleCheckVerificationOtpSubmit(event: FormEvent) {
    event.preventDefault();

    const { data, error } = await authClient.emailOtp.verifyEmail({
      email: session?.user?.email as string,
      otp,
    });
    console.log({ data, error });

    if (
      data?.status === true &&
      data?.user?.emailVerified === true &&
      error === null
    ) {
      alert("OTP is valid");
      redirect("/email-otp/success-verification-otp");
    } else {
      alert(JSON.stringify(error));
      redirect("/email-otp/send-verification-otp");
    }
  }

  return (
    <>
      VerifyEmailPage
      <form onSubmit={handleCheckVerificationOtpSubmit}>
        <fieldset>
          <legend>Email Verification OTP</legend>
          <div>
            <label htmlFor="otp">OTP code</label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={handleCheckVerificationOtpChange}
            />
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default VerifyEmailPage;
