import { createAuthClient } from "better-auth/client";

export const useAuth = () => {
  const authClient = createAuthClient({
    baseURL: "http://localhost:3000",

    fetchOptions: {
      credentials: "include", // indispensable pour les cookies
    },

  });

  const session = useState<any | null>("session", () => null);

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  
  const loginWithGithub = async () => {
    await authClient.signIn.social({ provider: "github" });
  };

  async function createUser() {
    try {
      const result = await authClient.signUp.email({
        name: "Fred1",
        email: "zred1@gmail.com",
        password: "password123"
      });

      console.log("Utilisateur créé avec succès :", result);
    }
    catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  }

  const loginWithEmail = async (
    email: string,
    password: string,
    rememberMe: boolean = true
  ) => {
    const result = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });
    console.log("Erreur de connexion :", result.error);
    console.log("Erreur de connexion :", result);


    if (result?.error) {
      throw new Error(result.error.message || "Email ou mot de passe incorrect");

    }

    return result;
  };



  const logout = async () => {
    await authClient.signOut();
    session.value = null;
  };

  const fetchSession = async () => {
    try {
      const res: any = await $fetch("/api/me", {
        credentials: "include",
      });

      session.value = res.user || null;
    } catch (error) {
      session.value = null;
    }
  };

  return {
    session,
    loginWithGoogle,
    loginWithEmail,
    logout,
    fetchSession,
    createUser,
  };
  return { session, loginWithGoogle, logout, fetchSession };


};
