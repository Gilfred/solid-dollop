// server/api/auth/[...].ts
import { auth } from "../../utils/auth";

export default defineEventHandler( (event) => {
  // Utilisez l'API handler de Better Auth directement
  return auth.handler(toWebRequest(event));
<<<<<<< HEAD
});
=======


});
>>>>>>> upstream/dev-zak
