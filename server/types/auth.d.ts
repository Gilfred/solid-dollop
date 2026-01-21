import type { auth } from "../utils/auth";

declare module "h3" {
  interface H3EventContext {
    user: typeof auth.$Infer.User | null;
    session: typeof auth.$Infer.Session | null;
  }
}

export {};
