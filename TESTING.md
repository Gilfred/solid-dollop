# Guide de Test des Endpoints Post & SubCategory

Ce document explique comment tester les endpoints de l'API Post et SubCategory.

---

## API POST

### 1. Créer un Article (POST /api/posts)
Cet endpoint utilise `multipart/form-data` car il accepte une image.

**Headers :**
- `Content-Type: multipart/form-data`

**Body (form-data) :**
- `title`: (String) Titre de l'article.
- `content`: (String) Contenu de l'article.
- `slug`: (String) Slug unique (ex: mon-article).
- `author`: (String) Nom de l'auteur.
- `description`: (String) Courte description.
- `image`: (File) Le fichier image à uploader.
- `sub_category_id`: (Number, optionnel) ID d'une sous-catégorie existante.

### 2. Lister les Articles (GET /api/posts)
Récupère tous les articles (sans le champ `content`).

**Headers :**
- `Accept: application/json`

### 3. Récupérer un Article par ID (GET /api/posts/:id)
Récupère les détails complets d'un article, y compris sa sous-catégorie.

### 4. Modifier un Article (PUT /api/posts/:id)
Met à jour un article existant. Cet endpoint utilise du JSON.

**Body (JSON) :**
```json
{
  "title": "Nouveau titre",
  "sub_category_id": 2
}
```

### 5. Supprimer un Article (DELETE /api/posts/:id)
Supprime un article et son image associée.

---

## API SUBCATEGORY

### 1. Créer une Sous-catégorie (POST /api/subCategory)
**Body (JSON) :**
```json
{
  "name": "Ma Sous-catégorie",
  "slug": "ma-sous-categorie",
  "description": "Description ici",
  "icon": "icon-name",
  "color": "#FF0000",
  "categoryId": 1
}
```

### 2. Lister les Sous-catégories (GET /api/subCategory)

### 3. Récupérer une Sous-catégorie par ID (GET /api/subCategory/:id)

### 4. Modifier une Sous-catégorie (PUT /api/subCategory/:id)

### 5. Supprimer une Sous-catégorie (DELETE /api/subCategory/:id)
