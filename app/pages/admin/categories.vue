<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout' as const,
   headerAction: { label: 'Créer un catégorie', to: '/admin/categories/create', class: 'bg-green-600 text-white hover:bg-blue-700' }
})
</script>
<template>
  <div class="space-y-4">

    <!-- Table des articles ici... -->
  </div>
</template>
