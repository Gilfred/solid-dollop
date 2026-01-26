import { auth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  // Ne pas intercepter les routes Better Auth
  if (event.path.startsWith("/api/auth")) return;

  // Seules les pages protégées
  const protectedPaths = ["/admin","/user"];
  if (!protectedPaths.some(p => event.path.startsWith(p))) return;

  const session = await auth.api.getSession({ headers: event.headers });
  console.log("Session récupérée côté serveur :", session);

  if (!session) {
    event.context.session = null;
    event.context.user = null;
    throw createError({ statusCode: 401, statusMessage: "Non autorisé" });
  }
  


  event.context.session = session.session;
  event.context.user = session.user;
});
