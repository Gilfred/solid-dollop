import { defineEventHandler, readBody, setResponseStatus } from 'h3';
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
    const body = await readBody(event);
    const { name, slug, description, icon, color, categoryId } = body;

    const updatableFields = ['name', 'slug', 'description', 'icon', 'color', 'categoryId'];
    const hasValidUpdate = updatableFields.some(field => field in body && body[field] !== undefined);

    if (!hasValidUpdate) {
      setResponseStatus(event, 400);
      return { error: `Au moins un champ (${updatableFields.join(', ')}) doit être fourni pour la mise à jour.` };
    }

    const updatedSubCategory = await prisma.subCategory.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        slug: slug !== undefined ? slug : undefined,
        description: description !== undefined ? description : undefined,
        icon: icon !== undefined ? icon : undefined,
        color: color !== undefined ? color : undefined,
        ...(categoryId !== undefined ? {
          category: categoryId ? { connect: { id: parseInt(categoryId, 10) } } : { disconnect: true }
        } : {}),
      },
      include: {
        category: true
      }
    });

    return updatedSubCategory;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la sous-catégorie ${id}:`, error);

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      setResponseStatus(event, 409);
      return { error: 'Ce slug est déjà utilisé par une autre sous-catégorie.' };
    }

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      setResponseStatus(event, 404);
      return { error: 'Sous-catégorie non trouvée.' };
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la mise à jour de la sous-catégorie.',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
