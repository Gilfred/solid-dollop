<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'  // composant Vue pour icônes

import type { Category } from '../../../types/categorie' // <-- ton fichier types

// Simule la récupération de l'utilisateur connecté
const currentUser = 'Zaki AGOKOLI'

// Ouverture du modal
const isOpen = ref(false)

// Formulaire réactif
interface Post {
  category: string
  title: string
  content: string
  description: string
  images: File[]
  author?: string
}

const form = reactive<Post>({
  category: '',
  title: '',
  content: '',
  description: '',
  images: [],
  author: ''
})

// Liste des catégories typées
const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/api/categories')
    categories.value = await res.json() as Category[]
  } catch (error) {
    console.error('Erreur lors du chargement des catégories', error)
  }
})

// Gestion des fichiers upload
const handleFiles = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  form.images = Array.from(target.files)
}

// Supprimer une image
const removeImage = (index: number) => {
  form.images.splice(index, 1)
}

// Validation
const isFormValid = computed(() => {
  return form.category && form.title && form.content && form.description
})

// Compteurs
const titleMaxLength = 80
const descriptionMaxLength = 160

// Soumission
const submit = async () => {
  if (!isFormValid.value) return;

  if (form.author === 'self') {
    form.author = currentUser;
  }

  const formData = new FormData();

  // Changement ici pour correspondre au backend
  formData.append('title', form.title);
  formData.append('content', form.content);
  formData.append('description', form.description);
  formData.append('author', form.author || '');

  // Générer un slug simple (ex: basé sur le titre)
  const slug = form.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  formData.append('slug', slug);

  // Catégorie
  formData.append('categorie_id', form.category.toString()); // Assure-toi que form.category est bien l'ID numérique

  // Image (le backend attend un seul fichier nommé 'image')
  if (form.images.length > 0) {
    formData.append('image', form.images[0]);
  }

  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Erreur du serveur ❌', text);
      return;
    }

    const data = await res.json();
    console.log('Article créé ✅', data);

    // reset
    Object.assign(form, {
      category: '',
      title: '',
      content: '',
      description: '',
      images: [],
      author: '',
    });

    isOpen.value = false;
  } catch (error) {
    console.error('Erreur ❌', error);
  }
};

</script>
<template>
  <!-- BOUTON OUVRIR LE MODAL -->
  <button
    @click="isOpen = true"
    size="md"
    class="ml-auto inline-flex items-center gap-2 px-4 py-2 m-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold max-w-[200px] rounded-xl shadow-md float-right shadow-purple-500/40 hover:shadow-md hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Créer un article
  </button>

  <!-- MODAL OVERLAY -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click.self="isOpen = false"
  >
    <!-- CONTAINER MODAL -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200/60 dark:border-gray-800 animate-in fade-in zoom-in duration-300">
      
      <!-- HEADER -->
      <div class="px-6 py-5 border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-purple-950/20 dark:to-indigo-950/20 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Créer un article</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Partagez votre contenu avec votre audience</p>
            </div>
          </div>
          
          <button
            @click="isOpen = false"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- BODY SCROLLABLE -->
      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        
        <!-- CATÉGORIE -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Catégorie <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
  v-for="cat in categories"
  :key="cat.id"
  @click="form.category = cat.id"
  :class="[
    'group relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200',
    form.category === cat.id
      ? 'border-purple-600 dark:border-indigo-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30'
      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-900'
  ]"
>
  <Icon
    :icon="cat.icon" 
    class="w-5 h-5 transition-colors"
    :class="form.category === cat.id ? 'text-purple-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-purple-500 dark:group-hover:text-indigo-400'"
  />
  <span :class="['text-sm font-medium', form.category === cat.id ? 'text-purple-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300']">
    {{ cat.name }}
  </span>
</button>

          </div>
        </div>

        <!-- TITRE -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Titre <span class="text-red-500">*</span>
            </label>
            <span class="text-xs text-gray-400">{{ form.title.length }}/{{ titleMaxLength }}</span>
          </div>
          <input
            type="text"
            v-model="form.title"
            :maxlength="titleMaxLength"
            placeholder="Donnez un titre accrocheur à votre article..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all"
          />
        </div>

        <!-- DESCRIPTION -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description <span class="text-red-500">*</span>
            </label>
            <span class="text-xs text-gray-400">{{ form.description.length }}/{{ descriptionMaxLength }}</span>
          </div>
          <textarea
            v-model="form.description"
            :maxlength="descriptionMaxLength"
            placeholder="Résumez votre article en quelques mots..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all resize-none"
            rows="2"
          ></textarea>
        </div>

        <!-- CONTENU -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Contenu <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.content"
            placeholder="Rédigez le contenu complet de votre article..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all resize-none"
            rows="6"
          ></textarea>
        </div>

        <!-- UPLOAD IMAGES -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Images (optionnel)</label>
          
          <label class="group cursor-pointer block">
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-purple-400 dark:hover:border-indigo-600 hover:bg-purple-50/30 dark:hover:bg-indigo-950/20 transition-all duration-200">
              <svg class="w-10 h-10 mx-auto text-gray-400 group-hover:text-purple-500 dark:group-hover:text-indigo-400 transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-indigo-400">Cliquez pour télécharger des images</p>
              <p class="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 10MB</p>
            </div>
            <input type="file" multiple accept="image/*" @change="handleFiles" class="hidden" />
          </label>

          <div v-if="form.images.length > 0" class="grid grid-cols-2 gap-3 mt-3">
            <div v-for="(file, index) in form.images" :key="index" class="group relative flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <svg class="w-5 h-5 text-purple-500 dark:text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{{ file.name }}</span>
              <button @click="removeImage(index)" class="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- AUTEUR -->
        <div class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/50 dark:border-indigo-800/50">
          <input type="checkbox" v-model="form.author" true-value="self" id="author-checkbox" class="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-900 cursor-pointer" />
          <label for="author-checkbox" class="flex-1 cursor-pointer">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Définir l'auteur comme <span class="font-bold text-purple-600 dark:text-indigo-400">{{ currentUser }}</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Votre nom apparaîtra sur cet article</p>
          </label>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-2xl flex items-center justify-between">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          <span class="text-red-500">*</span> Champs obligatoires
        </p>
        
        <div class="flex gap-3">
          <button @click="isOpen = false" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all">
            Annuler
          </button>
          <button @click="submit" :disabled="!isFormValid" :class="['inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:via-indigo-600 disabled:hover:to-purple-700']">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Créer l'article
          </button>
        </div>
      </div>
    </div>
  </div>
</template>