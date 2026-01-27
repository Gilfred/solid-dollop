import { d as defineEventHandler, s as setResponseStatus, c as prisma } from '../../../_/nitro.mjs';
import 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:os';
import 'node:tty';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:child_process';
import 'node:fs/promises';
import 'node:util';
import 'node:process';
import 'node:async_hooks';
import 'path';
import 'fs';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'chokidar';
import 'anymatch';

const _id__get = defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.id) {
    setResponseStatus(event, 400);
    return { error: "L'ID de l'article est requis." };
  }
  const postId = parseInt(params.id, 10);
  if (isNaN(postId)) {
    setResponseStatus(event, 400);
    return { error: "L'ID de l'article est invalide." };
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      // Clause WHERE pour filtrer par ID
      include: {
        subCategory: {
          include: {
            category: true
          }
        }
      }
      // Jointure avec la table SubCategory
    });
    if (!post) {
      setResponseStatus(event, 404);
      return { error: "Article non trouv\xE9." };
    }
    return post;
  } catch (error) {
    console.error(`Erreur lors de la r\xE9cup\xE9ration de l'article ${postId}:`, error);
    setResponseStatus(event, 500);
    return {
      error: "Impossible de lire les donn\xE9es de l'article.",
      // Ne renvoyer le détail de l'erreur qu'en développement
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
