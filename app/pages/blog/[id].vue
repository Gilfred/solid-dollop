<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Post } from '../../../types/post'

const route = useRoute()
const id = computed(() => parseInt(route.params.id as string))

const { data: post, pending } = await useFetch<Post | null>(
  `/api/posts/${id.value}`,
  { default: () => null }
)
</script>

<template>
  <div class="relative min-h-screen bg-slate-50">
    <!-- Background Hero avec parallax effect -->
    <div v-if="post" class="hero-bg fixed top-0 left-0 right-0 z-0">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-50"></div>
    </div>

    <!-- Header -->
    <div class="relative z-20">
      <AppHeader />
    </div>

    <!-- Contenu Article -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-20">
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>

      <!-- Article Content -->
      <article v-else-if="post" class="space-y-8">
        
        <!-- Header Article avec image principale -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
          <div class="relative h-96 overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <!-- Category Badge -->
            <div class="absolute top-6 left-6">
              <span class="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                {{ post.subCategory.name || 'Article' }}
              </span>
            </div>
          </div>

          <!-- Article Info -->
          <div class="p-8 md:p-12">
            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-purple-600" />
                <span>{{ new Date(post.created_at).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                }) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-user" class="w-5 h-5 text-purple-600" />
                <span>{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 text-purple-600" />
                <span>{{ post.readtime || '5 min' }} de lecture</span>
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {{ post.title }}
            </h1>

            <!-- Excerpt/Intro -->
            <p v-if="post.excerpt" class="text-xl text-gray-600 leading-relaxed mb-8 italic">
              {{ post.excerpt }}
            </p>

            <!-- Share Buttons -->
            <div class="flex gap-3 mb-8">
              <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UIcon name="i-simple-icons-facebook" class="w-4 h-4" />
                <span class="text-sm">Partager</span>
              </button>
              <button class="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-4 h-4" />
                <span class="text-sm">Tweet</span>
              </button>
              <button class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <UIcon name="i-heroicons-bookmark" class="w-4 h-4" />
                <span class="text-sm">Sauvegarder</span>
              </button>
            </div>

            <!-- Content -->
            <div class="prose prose-lg prose-slate max-w-none text-justify leading-relaxed">
            <!-- Article Content -->
            <div v-html="post.content" class="text-gray-700 mb-6 leading-relaxed prose prose-lg prose-slate max-w-none text-justify"></div>
            </div>

            <!-- Tags -->
            <div v-if="post.tags && post.tags.length" class="mt-12 pt-8 border-t border-gray-200">
              <h3 class="text-sm font-semibold text-gray-600 mb-3">Mots-clés :</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Author Card -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border">
          <div class="flex items-start gap-6">
            <div class="flex-shrink-0">
             
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ post.author }}</h3>
              <p class="text-gray-600 leading-relaxed">
                Passionné(e) de design d'intérieur et d'architecture, je partage mes découvertes et coups de cœur pour vous inspirer dans vos projets de décoration.
              </p>
              <div class="flex gap-3 mt-4">
                <button class="text-purple-600 hover:text-purple-700 transition-colors">
                  <UIcon name="i-simple-icons-instagram" class="w-5 h-5" />
                </button>
                <button class="text-purple-600 hover:text-purple-700 transition-colors">
                  <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
                </button>
                <button class="text-purple-600 hover:text-purple-700 transition-colors">
                  <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Ces articles pourraient venir d'une requête API -->
            <div v-for="i in 3" :key="i" class="group cursor-pointer">
              <div class="relative h-40 rounded-lg overflow-hidden mb-3">
                <img
                  :src="`https://images.unsplash.com/photo-${1600210000000 + i * 1000}?w=400`"
                  alt="Article similaire"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                Article connexe numéro {{ i }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Comments Section (optionnel) -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-100 border">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Commentaires</h2>
          <div class="text-center py-12 text-gray-500">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Soyez le premier à commenter cet article</p>
            <UButton color="primary" class="mt-4  bg-amber-400 hover:bg-amber-500 rounded-full">Laisser un commentaire</UButton>
          </div>
        </div>
      </article>

      <!-- Error State -->
      <div v-else class="text-center py-20">
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-xl max-w-md mx-auto">
          <UIcon name="i-heroicons-exclamation-circle" class="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-gray-700 mb-2">Article introuvable</h2>
          <p class="text-gray-600 mb-6">Désolé, cet article n'existe pas ou a été supprimé.</p>
          <UButton color="primary" to="/blog" size="lg">
            Retour aux articles
          </UButton>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

