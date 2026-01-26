import { d as defineEventHandler, s as setResponseStatus, c as prisma } from '../../../_/nitro.mjs';
import { unlink } from 'fs/promises';
import { resolve } from 'path';
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
import 'fs';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'chokidar';
import 'anymatch';

const _id__delete = defineEventHandler(async (event) => {
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
    const postToDelete = await prisma.post.findUnique({
      where: { id: postId }
    });
    if (!postToDelete) {
      setResponseStatus(event, 404);
      return { error: "Article non trouv\xE9." };
    }
    if (postToDelete.image) {
      const imageName = postToDelete.image.split("/").pop();
      if (imageName) {
        const imagePath = resolve("public", "images", imageName);
        try {
          await unlink(imagePath);
        } catch (unlinkError) {
          if (unlinkError instanceof Error && "code" in unlinkError && unlinkError.code !== "ENOENT") {
            console.error(`Impossible de supprimer le fichier image ${imagePath}:`, unlinkError);
          }
        }
      }
    }
    await prisma.post.delete({
      where: { id: postId }
    });
    setResponseStatus(event, 204);
    return null;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article ${postId}:`, error);
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la suppression de l'article.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
