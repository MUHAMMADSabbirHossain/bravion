import { authClient } from "@/lib/auth-client";

function GoogleAuthButton({ text = "GoogleAuthButton" }) {
  async function handleGoogleAuth() {
    console.log("clicked");

    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/dashboard", // Your frontend callback
    });
    console.log({ data });
  }

  return <button onClick={handleGoogleAuth}>{text}</button>;
}

export default GoogleAuthButton;
