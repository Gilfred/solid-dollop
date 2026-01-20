export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '')

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID invalide',
    })
  }

  try {
    await prisma.category.delete({
      where: { id },
    })

    return { message: 'Catégorie supprimée avec succès' }
  } catch (error) {
    console.error(error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Catégorie non trouvée',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression de la catégorie',
    })
  }
})
