import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { admin, createAuthMiddleware, emailOTP } from "better-auth/plugins";
import { nodemailerSendMail } from "./nodemailer.js";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/generated/prisma/client";

// const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000"], // All the frontend client URLs
  advanced: {
    defaultCookieAttributes: {
      secure: true, // Set to true for production. The secure: true flag requires HTTPS, which you don't have in local development.
      sameSite: "none", // Change from "none" to "lax" for local development
      partitioned: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }, // Authorized redirect URIs must set server domain with in google console before deployed to product
  },
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
          console.log({ email, otp });
        } else if (type === "email-verification") {
          // Send the OTP for email verification
          console.log("Email verification", { email, otp });

          try {
            const info = await nodemailerSendMail({
              to: email,
              subject: "Email Verification",
              html: `<p>Hello, ${email}. We received a request to verify your email.</p>
              </br>
              <p>Your verification code: </p><b>${otp}</b>`,
            });
            // console.log({ info });
          } catch (error) {
            console.log({ error });
          } finally {
            console.error("nodemailer function finished.");
          }
        } else {
          // Send the OTP for password reset
          console.log("Password reset", { email, otp });

          try {
            const info = await nodemailerSendMail({
              to: email,
              subject: "Reset Account Password",
              html: `<p>Hello, ${email}. We received a request to reset your password.</p>
              </br>
              <p>Your verification code: </p><b>${otp}</b>`,
            });
            console.log({ info });
          } catch (error) {
            console.log({ error });
          } finally {
            console.error("Reset password function finished.");
          }
        }
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // console.log({ ctx });

      if (
        ctx.path === "/sign-up/email" ||
        ctx.path === "/email-otp/reset-password" ||
        ctx.path === "/change-password"
      ) {
        const password = ctx.body.password;
        const confirmPassword = ctx.body.confirmPassword;
        // TODO!!!!: ues zod and validate

        if (false) {
          throw new APIError("BAD_REQUEST", {
            message: "Password not strong enough",
          });
        }
      }
    }),
  },
});
