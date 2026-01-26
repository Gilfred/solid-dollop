import { d as defineEventHandler, f as readMultipartFormData, s as setResponseStatus, c as prisma } from '../../_/nitro.mjs';
import { v2 } from 'cloudinary';
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
  var _a;
  try {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      setResponseStatus(event, 400);
      return {
        error: "Requ\xEAte invalide, formulaire manquant ou vide."
      };
    }
    const getField = (name) => formData.find((p) => p.name === name);
    const titleEntry = getField("title");
    const contentEntry = getField("content");
    const slugEntry = getField("slug");
    const authorEntry = getField("author");
    const descriptionEntry = getField("description");
    const imageFile = getField("image");
    const subCategoryIdEntry = getField("sub_category_id");
    const missingFields = [];
    if (!titleEntry) missingFields.push("title");
    if (!contentEntry) missingFields.push("content");
    if (!slugEntry) missingFields.push("slug");
    if (!imageFile || !imageFile.filename) missingFields.push("image");
    if (!subCategoryIdEntry) missingFields.push("sub_category_id");
    if (missingFields.length > 0) {
      setResponseStatus(event, 400);
      return {
        error: `Champs manquants: ${missingFields.join(", ")}`
      };
    }
    const title = titleEntry.data.toString("utf-8");
    const content = contentEntry.data.toString("utf-8");
    const slug = slugEntry.data.toString("utf-8");
    const author = (authorEntry == null ? void 0 : authorEntry.data.toString("utf-8")) || null;
    const description = (descriptionEntry == null ? void 0 : descriptionEntry.data.toString("utf-8")) || null;
    const subCategoryId = parseInt(subCategoryIdEntry.data.toString("utf-8"), 10);
    if (isNaN(subCategoryId)) {
      setResponseStatus(event, 400);
      return {
        error: "sub_category_id doit \xEAtre un nombre valide"
      };
    }
    const subCategoryExists = await prisma.subCategory.findUnique({
      where: { id: subCategoryId }
    });
    if (!subCategoryExists) {
      setResponseStatus(event, 400);
      return {
        error: "La sous-cat\xE9gorie sp\xE9cifi\xE9e n'existe pas"
      };
    }
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (imageFile.type && !allowedMimeTypes.includes(imageFile.type.toLowerCase())) {
      setResponseStatus(event, 400);
      return {
        error: "Format d'image non support\xE9. Utilisez JPEG, PNG, WEBP ou GIF."
      };
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = imageFile.filename;
    let extension = ".jpg";
    if (originalName.includes(".")) {
      const ext = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
      const mimeToExt = {
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif"
      };
      extension = mimeToExt[((_a = imageFile.type) == null ? void 0 : _a.toLowerCase()) || ""] || ext;
    }
    const baseName = originalName.includes(".") ? originalName.substring(0, originalName.lastIndexOf(".")) : originalName;
    const safeFilename = baseName.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").toLowerCase();
    const newFilename = `post-${uniqueSuffix}-${safeFilename}${extension}`;
    const storagePath = newFilename;
    const uploadResult = await v2.uploader.upload(
      `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`,
      {
        folder: "blog_posts",
        public_id: `post-${uniqueSuffix}-${safeFilename}`
      }
    );
    const imageUrl = uploadResult.secure_url;
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });
    if (existingPost) {
      setResponseStatus(event, 409);
      return {
        error: "Un article avec ce slug existe d\xE9j\xE0"
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author,
        description,
        image: imageUrl,
        subCategoryId
      },
      include: {
        subCategory: {
          include: {
            category: true
          }
        }
      }
    });
    setResponseStatus(event, 201);
    return {
      success: true,
      message: "Article cr\xE9\xE9 avec succ\xE8s",
      data: newPost
    };
  } catch (error) {
    console.error("Erreur lors de la cr\xE9ation de l'article:", error);
    if (error instanceof Error) {
      if ("code" in error) {
        switch (error.code) {
          case "P2002":
            setResponseStatus(event, 409);
            return { error: "Un article avec ce slug existe d\xE9j\xE0" };
          case "P2003":
            setResponseStatus(event, 400);
            return { error: "La sous-cat\xE9gorie sp\xE9cifi\xE9e n'existe pas" };
        }
      }
    }
    setResponseStatus(event, 500);
    return {
      error: "Une erreur est survenue lors de la cr\xE9ation de l'article."
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
