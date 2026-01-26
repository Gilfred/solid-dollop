import { d as defineEventHandler, c as prisma, s as setResponseStatus } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return subCategories;
  } catch (error) {
    console.error("Erreur lors de la r\xE9cup\xE9ration des sous-cat\xE9gories :", error);
    setResponseStatus(event, 500);
    return {
      error: "Impossible de r\xE9cup\xE9rer les sous-cat\xE9gories.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
