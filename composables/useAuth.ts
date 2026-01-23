import { createAuthClient } from "better-auth/client";

export const useAuth = () => {
  const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    fetchOptions: { credentials: "include" }, // obligatoire
  });

  const session = useState("session", () => null);

  const loginWithGoogle = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const logout = async () => {
    await authClient.signOut();
    session.value = null;
  };

  const fetchSession = async () => {
    try {
      const res = await $fetch("/api/me", { credentials: "include" });
      session.value = res.user || null;
    } catch (e) {
      console.error("SESSION CLIENT ❌", e);
      session.value = null;
    }
  };

  return { session, loginWithGoogle, logout, fetchSession };
};
