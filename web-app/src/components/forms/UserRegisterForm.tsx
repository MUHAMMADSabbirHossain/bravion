"use client";

import { authClient } from "@/lib/auth-client";
import { ChangeEvent, FormEvent, useState } from "react";
import GoogleAuthButton from "../buttons/GoogleAuthButton";

function UserRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
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

  async function handleUserRegisterFormSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    console.log(formData);

    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password -> min 8 characters by default
        name: formData.name, // user display name
        // image, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
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
      UserRegisterForm
      <form onSubmit={handleUserRegisterFormSubmit}>
        <fieldset>
          <legend>Personal Identification</legend>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleFormData}
            />
          </div>

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

        <button type="submit">Register</button>
      </form>
      <div>
        <GoogleAuthButton text={"Login with Google"} />
      </div>
    </section>
  );
}

export default UserRegisterForm;
