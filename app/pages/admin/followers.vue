<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout' as const,
  headerAction: { label: 'Supprimer un abonné', to: '/admin/followers/delete', class: 'bg-red-600 text-white hover:bg-blue-700' 
 }
})
</script>

<template>
  <div class="space-y-4">
  
    <!-- Table des articles ici... -->
  </div>
</template>
