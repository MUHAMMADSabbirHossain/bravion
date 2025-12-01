// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma.js";
// import { admin, customSession } from "better-auth/plugins";
// // If your Prisma file is located elsewhere, you can change the path
// // import { PrismaClient } from "@/generated/prisma/client";

// // const prisma = new PrismaClient();

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql", // or "mysql", "sqlite", ...etc
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   trustedOrigins: ["http://localhost:3000"], // All the frontend client URLs
//   advanced: {
//     defaultCookieAttributes: {
//       secure: true, // Set to true for production. The secure: true flag requires HTTPS, which you don't have in local development.
//       sameSite: "none", // Change from "none" to "lax" for local development
//       partitioned: true,
//     },
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }, // Authorized redirect URIs must set server domain with in google console before deployed to product
//   },
//   // user: {
//   //   additionalFields: {
//   //     role: {
//   //       type: "string",
//   //       input: false,
//   //     },
//   //   },
//   // },
//   plugins: [
//     admin({
//       // defaultRole: "regular",
//       // adminRoles: ["admin"],
//       // adminUserIds: [
//       //   "nqjDP6VVIdEn9QdyO81rAQXW91YPa194",
//       //   "AAUQqn22ruKrUwj5LWXTyU520VTIG5u9",
//       // ],
//       // impersonationSessionDuration: 60 * 60 * 24, // 1 day
//       // defaultBanReason: "Spamming",
//       // defaultBanExpiresIn: 60 * 60 * 24, // 1 day
//       // bannedUserMessage: "You have been banned from this application. Please contact support if you believe this is an error.",
//     }),
//     customSession(async ({ session, user }, ctx) => {
//       console.log({ session, user });
//       // console.log(`Role: `, user?.role);
//       const roles = await prisma.user.findUnique({
//         where: { id: user?.id },
//         select: { name: true, role: true },
//       });
//       console.log("Roles:", roles);

//       return {
//         session,
//         user: {
//           ...user,
//           newField: "newField",
//         },
//       };
//     }),
//   ],
// });

// type Session = typeof auth.$Infer.Session;

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { admin, customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000"],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin(),
    customSession(async ({ session, user }, ctx) => {
      console.log({ session, user });
      // console.log(`Role: `, user?.role);
      const roles = await prisma.user.findUnique({
        where: { id: user?.id },
        select: { name: true, accounts: true },
      });
      console.log("Roles:", roles);

      return {
        session,
        user: {
          ...user,
          newField: "newField",
        },
      };
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
