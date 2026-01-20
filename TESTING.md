# Guide de Test des Endpoints Post

Ce document explique comment tester les endpoints de l'API Post.

## 1. Créer un Article (POST /api/posts)
Cet endpoint utilise `multipart/form-data` car il accepte une image.

**Headers :**
- `Content-Type: multipart/form-data` (La plupart des outils comme Postman le gèrent automatiquement).

**Body (form-data) :**
- `title`: (String) Titre de l'article.
- `content`: (String) Contenu de l'article.
- `slug`: (String) Slug unique (ex: mon-article).
- `author`: (String) Nom de l'auteur.
- `description`: (String) Courte description.
- `image`: (File) Le fichier image à uploader.
- `categorie_id`: (Number, optionnel) ID d'une catégorie existante.

---

## 2. Lister les Articles (GET /api/posts)
Récupère tous les articles (sans le champ `content` pour alléger la liste).

**Headers :**
- `Accept: application/json`

---

## 3. Récupérer un Article par ID (GET /api/posts/:id)
Récupère les détails complets d'un article, y compris sa catégorie.

**Paramètres :**
- `id`: L'identifiant numérique de l'article.

---

## 4. Modifier un Article (PUT /api/posts/:id)
Met à jour un article existant. Cet endpoint utilise du JSON.

**Headers :**
- `Content-Type: application/json`

**Body (JSON) :**
```json
{
  "title": "Nouveau titre",
  "content": "Nouveau contenu mis à jour",
  "author": "Nouvel Auteur"
}
```
*Note : Seuls les champs envoyés seront mis à jour.*

---

## 5. Supprimer un Article (DELETE /api/posts/:id)
Supprime un article et son image associée du serveur.

**Paramètres :**
- `id`: L'identifiant numérique de l'article.
