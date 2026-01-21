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

    // Retourner les posts sans la valeur du champ content
    return posts.map((post: any) => {
      // Créer un nouvel objet sans la propriété content
      const { content, ...postWithoutContent } = post;
      return postWithoutContent;
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    setResponseStatus(event, 500);
    return {
      error: 'Impossible de lire les données des articles.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});