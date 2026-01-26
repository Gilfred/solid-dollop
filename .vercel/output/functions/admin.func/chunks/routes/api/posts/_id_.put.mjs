import { d as defineEventHandler, s as setResponseStatus, r as readBody, c as prisma } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { title, content, slug, author, description, image, sub_category_id } = body;
    const updatableFields = ["title", "content", "slug", "author", "description", "image", "sub_category_id"];
    const hasValidUpdate = updatableFields.some(
      (field) => field in body && body[field] !== void 0
    );
    if (!hasValidUpdate) {
      setResponseStatus(event, 400);
      return {
        error: `Au moins un champ (${updatableFields.join(", ")}) doit \xEAtre fourni pour la mise \xE0 jour.`
      };
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title !== void 0 ? title : void 0,
        content: content !== void 0 ? content : void 0,
        slug: slug !== void 0 ? slug : void 0,
        author: author !== void 0 ? author : void 0,
        description: description !== void 0 ? description : void 0,
        image: image !== void 0 ? image : void 0,
        ...sub_category_id !== void 0 ? {
          subCategory: sub_category_id ? { connect: { id: parseInt(sub_category_id, 10) } } : { disconnect: true }
        } : {}
      }
    });
    return updatedPost;
  } catch (error) {
    console.error(`Erreur lors de la mise \xE0 jour de l'article ${postId}:`, error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      setResponseStatus(event, 409);
      return { error: "Ce slug est d\xE9j\xE0 utilis\xE9 par un autre article." };
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
      setResponseStatus(event, 404);
      return { error: "Article non trouv\xE9." };
    }
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la mise \xE0 jour de l'article.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
