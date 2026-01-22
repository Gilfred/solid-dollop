// CORRIGEZ ce fichier :
import { betterAuth } from "better-auth";  // Enlevez "process" de l'import
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_SECRET || "",  // Note: GOOGLE_CLIENT_SECRET est une erreur
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
});