
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
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
    const body = await readBody(event);
    const { title, content, slug, author, description, image, categorie_id } = body;

    // Liste des champs modifiables
    const updatableFields = ['title', 'content', 'slug', 'author', 'description', 'image', 'categorie_id'];
    const hasValidUpdate = updatableFields.some(field =>
      field in body && body[field] !== undefined
    );

    if (!hasValidUpdate) {
      setResponseStatus(event, 400);
      return {
        error: `Au moins un champ (${updatableFields.join(', ')}) doit être fourni pour la mise à jour.`
      };
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title !== undefined ? title : undefined,
        content: content !== undefined ? content : undefined,
        slug: slug !== undefined ? slug : undefined,
        author: author !== undefined ? author : undefined,
        description: description !== undefined ? description : undefined,
        image: image !== undefined ? image : undefined,
        ...(categorie_id !== undefined ? {
          category: categorie_id ? { connect: { id: parseInt(categorie_id, 10) } } : { disconnect: true }
        } : {}),
      },
    });

    return updatedPost;

  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'article ${postId}:`, error);

    // Gérer l'erreur de slug unique
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        setResponseStatus(event, 409);
        return { error: 'Ce slug est déjà utilisé par un autre article.' };
    }

    // Gérer article non trouvé
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
        setResponseStatus(event, 404);
        return { error: 'Article non trouvé.' };
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la mise à jour de l\'article.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
