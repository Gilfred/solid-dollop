import { auth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  // ⚠️ NE PAS intercepter les routes Better Auth
  if (event.path.startsWith("/api/auth")) {
    return; // on laisse Better Auth gérer la route
  }

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  console.log("Session récupérée côté serveur :", session)
  const protectedPaths = ["/admin", "/user"]
   if (!protectedPaths.some(p => event.path.startsWith(p))) return

  if (!session) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  event.context.session = session.session;
  event.context.user = session.user;
});
