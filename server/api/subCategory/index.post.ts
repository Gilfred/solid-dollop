import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, slug, description, icon, color, categoryId } = body;

    // Validation des champs requis
    if (!name || !slug || !description || !icon || !color || !categoryId) {
      setResponseStatus(event, 400);
      return { error: 'Champs manquants. "name", "slug", "description", "icon", "color" et "categoryId" sont requis.' };
    }

    // Vérifier si le slug existe déjà
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { slug }
    });

    if (existingSubCategory) {
      setResponseStatus(event, 409);
      return { error: 'Une sous-catégorie avec ce slug existe déjà.' };
    }

    // Création de la sous-catégorie
    const newSubCategory = await prisma.subCategory.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        category: {
          connect: { id: parseInt(categoryId, 10) }
        }
      },
      include: {
        category: true
      }
    });

    setResponseStatus(event, 201);
    return newSubCategory;

  } catch (error) {
    console.error('Erreur lors de la création de la sous-catégorie :', error);

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      setResponseStatus(event, 409);
      return { error: 'Une sous-catégorie avec ce slug existe déjà.' };
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la création de la sous-catégorie.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
