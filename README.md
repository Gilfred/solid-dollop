# Nuxt Backend API with Better Auth

Ce projet est un backend Nuxt (API only) utilisant **Better Auth** pour la gestion de l'authentification avec Prisma et MySQL.

## 🚀 Installation

### 1. Liste des packages à installer

Les packages suivants sont nécessaires pour l'authentification :
- `better-auth`: Le cœur de l'authentification.
- `@prisma/client` & `prisma`: Pour la gestion de la base de données.

### 2. Commandes d'installation

```bash
# Installation des dépendances
pnpm install

# Ajout de Better Auth
pnpm add better-auth
# Ajout du driver MySQL
pnpm add mysql2
```

> **Note sur pnpm 10+** : Si vous voyez un avertissement concernant les "Ignored build scripts", vous devrez peut-être exécuter `pnpm approve-builds` pour que Prisma fonctionne correctement.

## ⚙️ Configuration

### 1. Variables d'environnement (.env)

Créez un fichier `.env` à la racine du projet et configurez les variables suivantes :

```env
DATABASE_URL="mysql://user:password@localhost:3306/votre_base"

# Secret pour Better Auth (générez une chaîne aléatoire longue)
BETTER_AUTH_SECRET="votre_secret_tres_long_et_aleatoire"
# URL de base de votre API
BETTER_AUTH_URL="http://localhost:3000"
```

### 2. Base de données (Prisma)

Le schéma Prisma (`prisma/schema.prisma`) doit contenir les tables requises par Better Auth : `User`, `Session`, `Account`, et `Verification`.

Après avoir mis à jour le schéma, lancez :
```bash
# Utilisation de npx pour une meilleure compatibilité
npx prisma generate
npx prisma db push
```

*Si vous rencontrez une erreur `MODULE_NOT_FOUND` avec Prisma, assurez-vous d'avoir bien fait `pnpm install` et éventuellement `pnpm approve-builds`.*

### 3. Initialisation de Better Auth

Le fichier `server/utils/auth.ts` initialise Better Auth avec l'adaptateur Prisma.

### 4. Route API Auth

La route catch-all `server/api/auth/[...all].ts` expose les points d'entrée de Better Auth.

## 🔒 Utilisation et Protection des routes

### Middleware d'authentification

Le middleware `server/middleware/auth.ts` récupère automatiquement la session à chaque requête et l'injecte dans `event.context.user` et `event.context.session`.

### Exemple de route protégée

Pour protéger une route, vérifiez la présence de `event.context.user` :

```typescript
// server/api/protected-route.ts
export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  return { message: "Accès autorisé", user };
});
```

## 🧪 Tests des APIs avec Postman ou Insomnia

### 1. Gestion de l'Authentification (Better Auth)

Better Auth fonctionne principalement avec des **cookies de session**. Voici comment procéder pour tester vos routes protégées :

#### A. Inscription (Sign-Up)
- **Méthode** : `POST`
- **URL** : `http://localhost:3000/api/auth/sign-up/email`
- **Body (JSON)** :
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

#### B. Connexion (Sign-In) - **Étape Cruciale**
- **Méthode** : `POST`
- **URL** : `http://localhost:3000/api/auth/sign-in/email`
- **Body (JSON)** :
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Dans Postman** : Une fois que vous envoyez cette requête, Postman va automatiquement stocker les cookies (`better-auth.session_token`) reçus dans la réponse.

#### C. Accès aux routes protégées
Une fois connecté, Postman renverra automatiquement le cookie de session lors des requêtes suivantes vers le même domaine (`localhost`).
- **Test de session** : `GET http://localhost:3000/api/me`
- Si vous recevez une erreur `401 Unauthorized`, vérifiez l'onglet **Cookies** dans Postman pour vous assurer que `better-auth.session_token` est présent pour `localhost`.

> **Astuce Alternative** : Si les cookies ne fonctionnent pas dans votre client API, vous pouvez utiliser le header `Authorization`. Après le sign-in, récupérez le `token` dans la réponse (si disponible) ou depuis les cookies et envoyez-le ainsi : `Authorization: Bearer <votre_token>`.

#### D. Déconnexion (Sign-Out)
- **Méthode** : `POST`
- **URL** : `http://localhost:3000/api/auth/sign-out`
- **Body** : `{}` (un objet vide est requis)

### 2. Guide Complet des Endpoints
Pour un guide détaillé de tous les endpoints (Posts, Categories, SubCategories), consultez le fichier **[TESTING.md](./TESTING.md)**.

## 🛠 Commandes utiles

- `pnpm dev` : Lancer le serveur de développement.
- `npx prisma studio` : Explorer la base de données.
