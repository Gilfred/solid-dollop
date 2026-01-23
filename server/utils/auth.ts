import { betterAuth } from "better-auth";
<<<<<<< HEAD

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
=======
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
      baseURL: "http://localhost:3000", 
    database: prismaAdapter(prisma, {
        provider: "mysql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
>>>>>>> upstream/dev-zak
});
