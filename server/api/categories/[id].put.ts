export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '')

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID invalide',
    })
  }

  try {
    const body = await readBody(event)
    const { name, description } = body

    const updatedCategorie = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    })

    return updatedCategorie
  } catch (error) {
    console.error(error)
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Catégorie non trouvée',
        })
      }
      if (error.code === 'P2002') {
        throw createError({
          statusCode: 409,
          statusMessage: 'Une catégorie avec ce nom existe déjà',
        })
      }
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour de la catégorie',
    })
  }
})
