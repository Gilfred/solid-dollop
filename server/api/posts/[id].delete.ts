import { defineEventHandler, setResponseStatus } from 'h3';
import { unlink } from 'fs/promises';
import { resolve } from 'path';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.id) {
    setResponseStatus(event, 400);
    return { error: 'L\'ID de l\'article est requis.' };
  }

  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    setResponseStatus(event, 400); // Bad Request
    return { error: 'L\'ID de l\'article est invalide.' };
  }

  try {
    // 1. Trouver l'article pour récupérer le chemin de l'image
    const postToDelete = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!postToDelete) {
      setResponseStatus(event, 404); // Not Found
      return { error: 'Article non trouvé.' };
    }

    // 2. Suppression de l'image associée si elle existe
    if (postToDelete.image) {
      const imageName = postToDelete.image.split('/').pop();
      if (imageName) {
        const imagePath = resolve('public', 'images', imageName);
        try {
          await unlink(imagePath);
        } catch (unlinkError) {
          if (unlinkError instanceof Error && 'code' in unlinkError && unlinkError.code !== 'ENOENT') {
            console.error(`Impossible de supprimer le fichier image ${imagePath}:`, unlinkError);
          }
        }
      }
    }

    // 3. Suppression de l'article de la base de données
    await prisma.post.delete({
      where: { id: postId }
    });

    // Renvoyer une réponse 204 No Content
    setResponseStatus(event, 204);
    return null;

  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article ${postId}:`, error);
    setResponseStatus(event, 500); // Internal Server Error
    return {
      error: 'Une erreur est survenue lors de la suppression de l\'article.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
