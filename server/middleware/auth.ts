import { auth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  // Skip auth check for Better Auth's own routes
  if (event.path.startsWith("/api/auth")) {
    return;
  }

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  event.context.session = session.session;
  event.context.user = session.user;
});
