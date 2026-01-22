export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, slug, description } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Le nom de la catégorie est requis',
      })
    }

    const newCategorie = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      } as any, // il me permet d'ajuster le type ici par rapport au schéma Prisma
    })

    setResponseStatus(event, 201)
    return newCategorie
  } catch (error) {
    console.error(error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Une catégorie avec ce nom existe déjà',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création de la catégorie',
    })
  }
})
