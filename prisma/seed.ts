import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  const category = await prisma.categorie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      categorie: 'Général',
      description: 'Catégorie par défaut pour tous les posts.',
    },
  })

  const post = await prisma.post.upsert({
    where: { slug: 'mon-premier-post' },
    update: {},
    create: {
      title: 'Mon premier post',
      content: 'Ceci est le contenu de mon premier post sur ce nouveau blog.',
      slug: 'mon-premier-post',
      author: 'Admin',
      description: 'Une courte description du premier post.',
      categorie_id: category.id,
    },
  })

  console.log({ category, post })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
