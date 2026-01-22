
<script setup lang="ts">
import { ref } from 'vue'
import ArticleTable from './ArticleTable.vue'
import CreateArticleModal from './CreateArticleModal.vue'

const isModalOpen = ref(false)
const editingArticle = ref(null)

function openModal(article: any = null) {
  editingArticle.value = article
  isModalOpen.value = true
}

function closeModal() {
  editingArticle.value = null
  isModalOpen.value = false
}
</script>

<template>
  <!-- Table avec bouton Modifier -->
  <ArticleTable @edit-article="openModal" />

  <!-- Modal -->
 <CreateArticleModal
  v-if="modalOpen"
  :article="editingArticle"
  @close="modalOpen = false"
/>

</template>
