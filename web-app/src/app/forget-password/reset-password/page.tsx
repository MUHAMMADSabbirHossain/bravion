"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function ResetForgetPasswordPage() {
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const searchParams = useSearchParams();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleResetPasswordSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(formData);

    const { data, error } = await authClient.emailOtp.resetPassword({
      email: searchParams.get("email") as string,
      otp: formData.otp,
      password: formData.password,
    });
    console.log({ data, error });

    if (data?.success === true && error === null) {
      alert("Password reset successfully.");
      redirect("/auth/login");
    } else {
      alert(JSON.stringify(error));
    }
  }

  return (
    <>
      ResetForgetPasswordPage
      <section>
        <form>
          <fieldset>
            <legend>Reset Password</legend>
            <div>
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData?.otp}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <button type="submit" onClick={handleResetPasswordSubmit}>
            Reset Password
          </button>
        </form>
      </section>
    </>
  );
}

export default ResetForgetPasswordPage;
