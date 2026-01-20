
import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.id) {
    setResponseStatus(event, 400);
    return { error: 'L\'ID de l\'article est requis.' };
  }

  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    setResponseStatus(event, 400);
    return { error: 'L\'ID de l\'article est invalide.' };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { category: true }
    });

    if (!post) {
      setResponseStatus(event, 404);
      return { error: 'Article non trouvé.' };
    }

    return post;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${postId}:`, error);
    setResponseStatus(event, 500);
    return {
      error: 'Impossible de lire les données de l\'article.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
