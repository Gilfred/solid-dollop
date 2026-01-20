import { defineEventHandler, setResponseStatus } from 'h3'
import { readPosts } from '../../utils/db'

export default defineEventHandler(async (event) => {
  // Récupérer l'ID depuis les paramètres de la route
  const postId = event.context.params.id

  if (!postId) {
    setResponseStatus(event, 400) // Bad Request
    return { error: "L'ID de l'article est requis." } // juste le message corrigé
  }

  const id = parseInt(postId) // parse une seule fois
  if (isNaN(id)) {
    setResponseStatus(event, 400)
    return { error: "ID invalide." } // gestion cas ID non numérique
  }

  try {
    const posts = await readPosts()

    // Chercher le post correspondant à l'ID
    const post = posts.find((p) => p.id === id)

    if (!post) {
      setResponseStatus(event, 404) // Not Found
      return { error: "Article non trouvé." }
    }

    return post
  } catch (error: any) {
    setResponseStatus(event, 500)
    return {
      error: "Impossible de lire les données des articles.",
      details: error.message
    }
  }
})
