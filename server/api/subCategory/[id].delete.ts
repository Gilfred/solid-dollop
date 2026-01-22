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
    await prisma.subCategory.delete({
      where: { id }
    });

    setResponseStatus(event, 204);
    return null;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la sous-catégorie ${id}:`, error);

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      setResponseStatus(event, 404);
      return { error: 'Sous-catégorie non trouvée.' };
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la suppression de la sous-catégorie.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
