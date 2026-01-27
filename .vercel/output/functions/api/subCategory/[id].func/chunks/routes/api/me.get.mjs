import { d as defineEventHandler, a as auth } from '../../_/nitro.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  });
  console.log("Session r\xE9cup\xE9r\xE9e dans me.get.ts :", session);
  return {
    user: (session == null ? void 0 : session.user) || null
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
