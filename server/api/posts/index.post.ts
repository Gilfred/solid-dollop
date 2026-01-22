import { defineEventHandler, readMultipartFormData, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      setResponseStatus(event, 400);
      return { 
        error: 'Requête invalide, formulaire manquant ou vide.'
      };
    }

    // Extraire les champs
    const getField = (name: string) => formData.find(p => p.name === name);
    
    const titleEntry = getField('title');
    const contentEntry = getField('content');
    const slugEntry = getField('slug');
    const authorEntry = getField('author');
    const descriptionEntry = getField('description');
    const imageFile = getField('image');
    const subCategoryIdEntry = getField('sub_category_id');

    // Validation des champs requis
    const missingFields = [];
    if (!titleEntry) missingFields.push('title');
    if (!contentEntry) missingFields.push('content');
    if (!slugEntry) missingFields.push('slug');
    if (!imageFile || !imageFile.filename) missingFields.push('image');
    if (!subCategoryIdEntry) missingFields.push('sub_category_id');

    if (missingFields.length > 0) {
      setResponseStatus(event, 400);
      return { 
        error: `Champs manquants: ${missingFields.join(', ')}`
      };
    }

    // Extraire les valeurs
    const title = titleEntry.data.toString('utf-8');
    const content = contentEntry.data.toString('utf-8');
    const slug = slugEntry.data.toString('utf-8');
    const author = authorEntry?.data.toString('utf-8') || null;
    const description = descriptionEntry?.data.toString('utf-8') || null;
    const subCategoryId = parseInt(subCategoryIdEntry.data.toString('utf-8'), 10);

    // Validation de subCategoryId
    if (isNaN(subCategoryId)) {
      setResponseStatus(event, 400);
      return { 
        error: 'sub_category_id doit être un nombre valide'
      };
    }

    // Vérifier que la sous-catégorie existe
    const subCategoryExists = await prisma.subCategory.findUnique({
      where: { id: subCategoryId }
    });

    if (!subCategoryExists) {
      setResponseStatus(event, 400);
      return { 
        error: 'La sous-catégorie spécifiée n\'existe pas'
      };
    }

    // Validation du type de fichier
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (imageFile.type && !allowedMimeTypes.includes(imageFile.type.toLowerCase())) {
      setResponseStatus(event, 400);
      return { 
        error: 'Format d\'image non supporté. Utilisez JPEG, PNG, WEBP ou GIF.'
      };
    }

    // === Gestion de l'upload de l'image ===
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = imageFile.filename;
    
    let extension = '.jpg';
    if (originalName.includes('.')) {
      const ext = originalName.substring(originalName.lastIndexOf('.')).toLowerCase();
      const mimeToExt: Record<string, string> = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp',
        'image/gif': '.gif'
      };
      extension = mimeToExt[imageFile.type?.toLowerCase() || ''] || ext;
    }
    
    const baseName = originalName.includes('.') 
      ? originalName.substring(0, originalName.lastIndexOf('.'))
      : originalName;
    
    const safeFilename = baseName
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    const newFilename = `posts/${uniqueSuffix}-${safeFilename}${extension}`;
    let imageUrl: string;
    let storageMethod: 'vercel-blob' | 'local' = 'local';
    
    // Vérifier le token Blob
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    // Détecter si c'est un token de test/masqué
    const isTestToken = !blobToken || blobToken.includes('******') || blobToken.length < 30;
    
    if (isTestToken) {
      storageMethod = 'local';
    } else {
      try {
        const { put } = await import('@vercel/blob');
        const blob = await put(newFilename, imageFile.data, {
          access: 'public',
        });
        
        imageUrl = blob.url;
        storageMethod = 'vercel-blob';
      } catch (blobError: any) {
        storageMethod = 'local';
      }
    }
    
    // Fallback au stockage local si Vercel Blob échoue
    if (storageMethod === 'local') {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      
      const filePath = path.join(uploadsDir, newFilename.replace('posts/', ''));
      await fs.writeFile(filePath, imageFile.data);
      
      imageUrl = `/uploads/${newFilename.replace('posts/', '')}`;
    }

    // Vérifier si le slug existe déjà
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      setResponseStatus(event, 409);
      return { 
        error: 'Un article avec ce slug existe déjà'
      };
    }

    // Création de l'article
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author,
        description,
        image: imageUrl,
        subCategoryId,
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
      message: 'Article créé avec succès',
      data: newPost,
      storage: storageMethod
    };

  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);

    if (error instanceof Error) {
      if ('code' in error) {
        switch (error.code) {
          case 'P2002':
            setResponseStatus(event, 409);
            return { error: 'Un article avec ce slug existe déjà' };
          case 'P2003':
            setResponseStatus(event, 400);
            return { error: 'La sous-catégorie spécifiée n\'existe pas' };
        }
      }
    }

    setResponseStatus(event, 500);
    return {
      error: 'Une erreur est survenue lors de la création de l\'article.'
    };
  }
});