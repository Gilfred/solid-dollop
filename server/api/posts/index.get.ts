import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        description: true,
        image: true,
        categorie_id: true,
        created_at: true,
        updated_at: true,
        // on omet content volontairement
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
