import { defineEventHandler, readMultipartFormData, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      setResponseStatus(event, 400);
      return { error: 'Requête invalide, formulaire manquant.' };
    }

    // Extraire les champs texte et le fichier image
    const titleEntry = formData.find((p) => p.name === 'title');
    const contentEntry = formData.find((p) => p.name === 'content');
    const slugEntry = formData.find((p) => p.name === 'slug');
    const authorEntry = formData.find((p) => p.name === 'author');
    const descriptionEntry = formData.find((p) => p.name === 'description');
    const imageFile = formData.find((p) => p.name === 'image');
    const subCategoryIdEntry = formData.find((p) => p.name === 'sub_category_id');

    // Valider que tous les champs sont présents
    if (!titleEntry || !contentEntry || !slugEntry || !authorEntry || !descriptionEntry || !imageFile || !imageFile.filename) {
      setResponseStatus(event, 400);
      return { error: 'Champs manquants. "title", "content", "slug", "author", "description" et "image" sont requis.' };
    }

    const title = titleEntry.data.toString('utf-8');
    const content = contentEntry.data.toString('utf-8');
    const slug = slugEntry.data.toString('utf-8');
    const author = authorEntry.data.toString('utf-8');
    const description = descriptionEntry.data.toString('utf-8');
    const subCategoryId = subCategoryIdEntry ? parseInt(subCategoryIdEntry.data.toString('utf-8'), 10) : undefined;

    // === Validation du type de fichier (Image) ===
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (imageFile.type && !allowedMimeTypes.includes(imageFile.type)) {
      setResponseStatus(event, 400);
      return { error: 'Format d\'image non supporté. Utilisez JPEG, PNG, WEBP ou GIF.' };
    }

    // === Gestion de l'upload de l'image avec useStorage ===
    const storage = useStorage();
    
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = imageFile.filename;
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const newFilename = `post-${uniqueSuffix}${extension}`;
    
    // Chemin où stocker le fichier
    const storagePath = `public/images/${newFilename}`;
    
    // Sauvegarder le fichier avec useStorage
    await storage.setItem(storagePath, imageFile.data);
    
    // L'URL pour accéder au fichier
    const imageUrl = `/images/${newFilename}`;

    // === Vérifier si le slug existe déjà ===
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      setResponseStatus(event, 409); // Conflict
      return { error: 'Un article avec ce slug existe déjà.' };
    }

    // === Création du nouvel article avec Prisma ===
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author,
        description,
        image: imageUrl,
        ...(subCategoryId && !isNaN(subCategoryId) ? {
          subCategory: {
            connect: { id: subCategoryId }
          }
        } : {}),
      },
    });

    // Renvoyer l'article créé avec un statut 201
    setResponseStatus(event, 201);
    return newPost;

  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);

    // Gérer l'erreur de slug unique
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      setResponseStatus(event, 409);
      return { error: 'Un article avec ce slug existe déjà.' };
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la création de l\'article.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});