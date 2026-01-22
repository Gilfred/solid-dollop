import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.id) {
    setResponseStatus(event, 400);
    return { error: "L'ID de la sous-catégorie est requis." };
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    setResponseStatus(event, 400);
    return { error: "L'ID de la sous-catégorie est invalide." };
  }

  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
        posts: true
      }
    });

    if (!subCategory) {
      setResponseStatus(event, 404);
      return { error: 'Sous-catégorie non trouvée.' };
    }

    return subCategory;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la sous-catégorie ${id}:`, error);
    setResponseStatus(event, 500);
    return {
      error: 'Impossible de récupérer la sous-catégorie.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
