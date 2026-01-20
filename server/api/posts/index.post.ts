import { defineEventHandler, readMultipartFormData, setResponseStatus } from 'h3';
import { writeFile, mkdir } from 'fs/promises';
import { resolve, extname } from 'path';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      setResponseStatus(event, 400); // Bad Request
      return { error: 'Requête invalide, formulaire manquant.' };
    }

    // Extraire les champs texte et le fichier image
    const titleEntry = formData.find((p) => p.name === 'title');
    const contentEntry = formData.find((p) => p.name === 'content');
    const slugEntry = formData.find((p) => p.name === 'slug');
    const authorEntry = formData.find((p) => p.name === 'author');
    const descriptionEntry = formData.find((p) => p.name === 'description');
    const imageFile = formData.find((p) => p.name === 'image');
    const categoryIdEntry = formData.find((p) => p.name === 'categorie_id');

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
    const categoryId = categoryIdEntry ? parseInt(categoryIdEntry.data.toString('utf-8'), 10) : undefined;

    // === Gestion de l'upload de l'image ===
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = extname(imageFile.filename);
    const newFilename = `post-${uniqueSuffix}${extension}`;
    const imagesDir = resolve('public', 'images');
    const imagePath = resolve(imagesDir, newFilename);

    // S'assurer que le dossier images existe
    await mkdir(imagesDir, { recursive: true });

    // Écrire le fichier image sur le disque
    await writeFile(imagePath, imageFile.data);
    const imageUrl = `/images/${newFilename}`; // URL publique de l'image

    // === Création du nouvel article avec Prisma ===
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author,
        description,
        image: imageUrl,
        categorie_id: categoryId && !isNaN(categoryId) ? categoryId : null,
      },
    });

    // Renvoyer l'article créé avec un statut 201
    setResponseStatus(event, 201); // Created
    return newPost;

  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);

    // Gérer l'erreur de slug unique
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        setResponseStatus(event, 409);
        return { error: 'Un article avec ce slug existe déjà.' };
    }

    setResponseStatus(event, 500); // Internal Server Error
    return {
      error: 'Une erreur est survenue lors de la création de l\'article.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
