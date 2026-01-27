<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

interface Category {
  id: number
  value: string
  label: string
  icon: string
}

interface Post {
  id?: number
  category: string
  sub_category_id: number | null
  title: string
  content: string
  description: string
  images: File[]
  author?: string
}

// Props pour ouvrir/fermer le modal depuis le parent
const props = defineProps<{
  modelValue: boolean
  postToEdit?: Post
}>
const emit = defineEmits(['update:modelValue', 'saved'])

const isOpen = ref(props.modelValue)
const editingArticle = ref<Post | null>(props.postToEdit || null)

// Formulaire réactif
const form = reactive<Post>({
  category: '',
  sub_category_id: null,
  title: '',
  content: '',
  description: '',
  images: [],
  author: ''
})

// Categories
const categories = ref<Category[]>([])
const loadingCategories = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/subCategory')
    if (!res.ok) throw new Error('Erreur API catégories')
    const data = await res.json()
    categories.value = data.map((cat: any) => ({
      id: cat.id,
      value: cat.name,
      label: cat.name,
      icon: cat.icon || 'i-heroicons-collection'
    }))
  } catch (err) {
    console.error(err)
  } finally {
    loadingCategories.value = false
  }
})

// Watch pour remplir le formulaire si on édite
onMounted(() => {
  if (editingArticle.value) {
    Object.assign(form, editingArticle.value)
  }
})

// Gestion des fichiers
const handleFiles = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  form.images = Array.from(target.files)
}

const removeImage = (index: number) => form.images.splice(index, 1)

// Validation
const isFormValid = computed(() => form.category && form.title && form.content && form.description)

// Fermer modal
const closeModal = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  editingArticle.value = null
}

// Soumission
const submit = async () => {
  if (!isFormValid.value) return

  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('content', form.content)
  formData.append('description', form.description)
  formData.append('author', form.author || '')
  formData.append('sub_category_id', String(form.sub_category_id))
  if (form.images.length > 0) formData.append('image', form.images[0])

  try {
    let response
    if (editingArticle.value && editingArticle.value.id) {
      // Edition
      response = await fetch(`/api/posts/${editingArticle.value.id}`, {
        method: 'PUT',
        body: formData
      })
    } else {
      // Création
      response = await fetch('/api/posts', { method: 'POST', body: formData })
    }

    if (!response.ok) throw new Error('Erreur API')

    const data = await response.json()
    alert(editingArticle.value ? 'Article modifié ✅' : 'Article créé ✅')
    closeModal()
    emit('saved', data) // pour rafraîchir le tableau parent
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

// Max length
const titleMaxLength = 100
const descriptionMaxLength = 250

</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200/60 dark:border-gray-800 animate-in fade-in zoom-in duration-300">

      <!-- HEADER -->
      <div class="px-6 py-5 border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-purple-950/20 dark:to-indigo-950/20 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ editingArticle ? 'Modifier l’article' : 'Créer un article' }}</h3>
          <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- BODY (identique au modal création) -->
      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        <!-- Catégorie -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Catégorie <span class="text-red-500">*</span></label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button v-for="cat in categories" :key="cat.value"
              @click="form.sub_category_id = cat.id; form.category = cat.value"
              :class="[
                'group relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200',
                form.category === cat.value
                  ? 'border-purple-600 dark:border-indigo-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-900'
              ]"
            >
              <span>{{ cat.label }}</span>
            </button>
          </div>
        </div>

        <!-- Titre, Description, Contenu, Upload Images (comme ton modal actuel) -->
        <!-- ... Tu peux copier exactement le contenu que tu avais pour le body ... -->

      </div>

      <!-- FOOTER -->
      <div class="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-2xl flex items-center justify-between">
        <button @click="closeModal" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all">Annuler</button>
        <button @click="submit" :disabled="!isFormValid" class="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          {{ editingArticle ? 'Enregistrer les modifications' : 'Créer l’article' }}
        </button>
      </div>

    </div>
  </div>
</template>
