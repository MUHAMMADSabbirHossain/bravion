"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, unauthorized } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function CheckVerificationOtpPage() {
  const [otp, setOtp] = useState("");

  const {
    data: session,
    isPending,
    isRefetching,
    refetch,
    error,
  } = authClient.useSession();
  console.log({ session, error });

  function handleCheckVerificationOtpChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    console.log(event.target.value);

    setOtp(event.target.value);
  }

  async function handleCheckVerificationOtpSubmit(event: FormEvent) {
    event.preventDefault();

    console.log(otp);

    const { data, error } = await authClient.emailOtp.checkVerificationOtp({
      email: session?.user?.email as string,
      type: "email-verification",
      otp,
    });
    console.log({ data, error });

    if (data?.success === true && error === null) {
      alert("OTP is valid");
      redirect("/email-otp/success-verification-otp");
    } else {
      alert("Invalid OTP");
      redirect("/email-otp/send-verification-otp");
    }
  }
  return (
    <>
      CheckVerificationOtpPage
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

export default CheckVerificationOtpPage;
