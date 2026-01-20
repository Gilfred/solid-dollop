export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '')

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID invalide',
    })
  }

  try {
    const categorie = await prisma.category.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    })

    if (!categorie) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Catégorie non trouvée',
      })
    }

    return categorie
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) throw error
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération de la catégorie',
    })
  }
})
