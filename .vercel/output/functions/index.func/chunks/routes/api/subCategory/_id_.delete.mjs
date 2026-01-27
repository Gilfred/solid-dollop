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

const _id__delete = defineEventHandler(async (event) => {
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
    await prisma.subCategory.delete({
      where: { id }
    });
    setResponseStatus(event, 204);
    return null;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la sous-cat\xE9gorie ${id}:`, error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
      setResponseStatus(event, 404);
      return { error: "Sous-cat\xE9gorie non trouv\xE9e." };
    }
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la suppression de la sous-cat\xE9gorie.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
