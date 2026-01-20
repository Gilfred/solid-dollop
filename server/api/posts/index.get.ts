
import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    // Récupérer tous les posts avec leurs catégories, triés par date de création (plus récent d'abord)
    const posts = await prisma.post.findMany({
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return posts;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    setResponseStatus(event, 500);
    return {
      error: 'Impossible de lire les données des articles.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
