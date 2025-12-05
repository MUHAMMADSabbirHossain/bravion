"use client";

import { authClient } from "@/lib/auth-client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import GoogleAuthButton from "../buttons/GoogleAuthButton";

function UserLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleFormData(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUserLoginFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(formData);

    const { data, error } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks
        onRequest: (ctx) => {
          // show loading
          console.log(`Request Loading...`, ctx);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(`User Rgistered...`, ctx);
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
          console.log(`Register Failed...`, ctx);
        },
      }
    );
  }

  return (
    <section>
      UserLoginForm
      <form onSubmit={handleUserLoginFormSubmit}>
        <fieldset>
          <legend>Personal Identification</legend>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleFormData}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleFormData}
            />
          </div>
        </fieldset>

        <button type="submit">Login</button>
      </form>
      <div>
        <Link href="/forget-password/email-otp">Forget Password</Link>
      </div>
      <div>
        <GoogleAuthButton text={"Login with Google"} />
      </div>
    </section>
  );
}

export default UserLoginForm;
