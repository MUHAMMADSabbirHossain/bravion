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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }, // Authorized redirect URIs must set server domain with in google console before deployed to product
    },
    plugins: [
        admin({
        // defaultRole: "regular",
        // adminRoles: ["admin"],
        // adminUserIds: [
        //   "nqjDP6VVIdEn9QdyO81rAQXW91YPa194",
        //   "AAUQqn22ruKrUwj5LWXTyU520VTIG5u9",
        // ],
        // impersonationSessionDuration: 60 * 60 * 24, // 1 day
        // defaultBanReason: "Spamming",
        // defaultBanExpiresIn: 60 * 60 * 24, // 1 day
        // bannedUserMessage:
        //   "You have been banned from this application. Please contact support if you believe this is an error.",
        }),
    ],
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false,
            },
        },
    },
});
//# sourceMappingURL=auth.js.map