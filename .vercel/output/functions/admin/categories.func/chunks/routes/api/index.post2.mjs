import { d as defineEventHandler, r as readBody, s as setResponseStatus, c as prisma } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, slug, description, icon, color, categoryId } = body;
    if (!name || !slug || !description || !icon || !color || !categoryId) {
      setResponseStatus(event, 400);
      return { error: 'Champs manquants. "name", "slug", "description", "icon", "color" et "categoryId" sont requis.' };
    }
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { slug }
    });
    if (existingSubCategory) {
      setResponseStatus(event, 409);
      return { error: "Une sous-cat\xE9gorie avec ce slug existe d\xE9j\xE0." };
    }
    const newSubCategory = await prisma.subCategory.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        category: {
          connect: { id: parseInt(categoryId, 10) }
        }
      },
      include: {
        category: true
      }
    });
    setResponseStatus(event, 201);
    return newSubCategory;
  } catch (error) {
    console.error("Erreur lors de la cr\xE9ation de la sous-cat\xE9gorie :", error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      setResponseStatus(event, 409);
      return { error: "Une sous-cat\xE9gorie avec ce slug existe d\xE9j\xE0." };
    }
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la cr\xE9ation de la sous-cat\xE9gorie.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
