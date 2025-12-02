import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { admin } from "better-auth/plugins";
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
  plugins: [admin()],
});
