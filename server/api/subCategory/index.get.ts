import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: {
        category: true,
      },
    });
  return subCategories;
} catch (error) {
    console.error('Erreur lors de la récupération des sous-catégories :', error);
    
    setResponseStatus(event, 500);
    return {
      error: 'Impossible de récupérer les sous-catégories.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});