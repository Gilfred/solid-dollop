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
    return { error: "L'ID de la sous-cat\xE9gorie est requis." };
  }
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    setResponseStatus(event, 400);
    return { error: "L'ID de la sous-cat\xE9gorie est invalide." };
  }
  try {
    const body = await readBody(event);
    const { name, slug, description, icon, color, categoryId } = body;
    const updatableFields = ["name", "slug", "description", "icon", "color", "categoryId"];
    const hasValidUpdate = updatableFields.some((field) => field in body && body[field] !== void 0);
    if (!hasValidUpdate) {
      setResponseStatus(event, 400);
      return { error: `Au moins un champ (${updatableFields.join(", ")}) doit \xEAtre fourni pour la mise \xE0 jour.` };
    }
    const updatedSubCategory = await prisma.subCategory.update({
      where: { id },
      data: {
        name: name !== void 0 ? name : void 0,
        slug: slug !== void 0 ? slug : void 0,
        description: description !== void 0 ? description : void 0,
        icon: icon !== void 0 ? icon : void 0,
        color: color !== void 0 ? color : void 0,
        ...categoryId !== void 0 ? {
          category: categoryId ? { connect: { id: parseInt(categoryId, 10) } } : { disconnect: true }
        } : {}
      },
      include: {
        category: true
      }
    });
    return updatedSubCategory;
  } catch (error) {
    console.error(`Erreur lors de la mise \xE0 jour de la sous-cat\xE9gorie ${id}:`, error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      setResponseStatus(event, 409);
      return { error: "Ce slug est d\xE9j\xE0 utilis\xE9 par une autre sous-cat\xE9gorie." };
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
      setResponseStatus(event, 404);
      return { error: "Sous-cat\xE9gorie non trouv\xE9e." };
    }
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la mise \xE0 jour de la sous-cat\xE9gorie.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
