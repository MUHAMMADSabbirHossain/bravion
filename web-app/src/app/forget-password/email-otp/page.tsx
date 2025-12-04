"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

function ForgetPasswordEmailOtpPage() {
  const [email, setEmail] = useState("");

  async function handleForgetEmailSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(email);

    if (email === "") {
      alert("Email is required");
      return;
    }

    const { data, error } = await authClient.forgetPassword.emailOtp({
      email,
    });
    console.log({ data, error });

    if (data?.success === true && error === null) {
      // alert("Email sent");
      redirect(`/forget-password/reset-password?email=${email}`);
    } else {
      alert(JSON.stringify(error));
    }
  }

  return (
    <>
      ForgetPasswordEmailOtpPage
      <section>
        <form onSubmit={handleForgetEmailSubmit}>
          <fieldset>
            <legend>ForgetPasswordEmailOtpPage</legend>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default ForgetPasswordEmailOtpPage;
