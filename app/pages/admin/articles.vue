<script setup lang="ts">
import CreateArticleModal from '~/components/admin/CreateArticleModal.vue';

definePageMeta({
  layout: 'dashboard-layout',
     headerAction: { label: 'Créer un article', to: '/admin/categories/create', class: 'bg-green-600 text-white hover:bg-blue-700' }

})

// Contrôle l'ouverture du modal depuis le parent
const isModalOpen = ref(false)
</script>
<template>
<CreateArticleModal v-model="isModalOpen" />
  <ArticleTable />
  
</template>
