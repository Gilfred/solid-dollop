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
    const posts = await prisma.post.findMany({
      include: {
        subCategory: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return posts.map((post) => {
      const { content, ...postWithoutContent } = post;
      return postWithoutContent;
    });
  } catch (error) {
    console.error("Erreur lors de la r\xE9cup\xE9ration des articles :", error);
    setResponseStatus(event, 500);
    return {
      error: "Impossible de lire les donn\xE9es des articles.",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
