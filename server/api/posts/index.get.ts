export default defineEventHandler(async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
      },
    })
    return posts
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des posts',
    })
  }
})
