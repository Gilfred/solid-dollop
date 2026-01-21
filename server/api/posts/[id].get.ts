
import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  
  const params = event.context.params;
  
  if (!params || !params.id) {
    setResponseStatus(event, 400); // Code HTTP 400: Bad Request
    return { error: "L'ID de l'article est requis." };
  }

  // Conversion de l'ID en nombre entier
  const postId = parseInt(params.id, 10);

  // Validation que l'ID est bien un nombre valide
  if (isNaN(postId)) {
    setResponseStatus(event, 400); // Code HTTP 400: Bad Request
    return { error: 'L\'ID de l\'article est invalide.' };
  }

  try {
    // Recherche de l'article dans la base de données avec Prisma
    // Inclut également les données de la catégorie associée
    const post = await prisma.post.findUnique({
      where: { id: postId }, // Clause WHERE pour filtrer par ID
      include: { category: true } // Jointure avec la table Category
    });

    // Si aucun article n'est trouvé, retourner une erreur 404
    if (!post) {

      setResponseStatus(event, 404); // Code 404  Not Found
      return { error: 'Article non trouvé.' };
    }

    // Retourner l'article trouvé avec statut 200 par défaut
    return post;
    
  } catch (error) {
    // Gestion des erreurs imprévues (ex: problèmes de connexion à la BDD)
    console.error(`Erreur lors de la récupération de l'article ${postId}:`, error);
    
    setResponseStatus(event, 500); // Code HTTP 500: Internal Server Error
    return {
      error: 'Impossible de lire les données de l\'article.',
      // Ne renvoyer le détail de l'erreur qu'en développement
      details: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
});
