export default defineEventHandler(async () => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des catégories',
    })
  }
})
