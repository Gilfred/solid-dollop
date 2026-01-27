<script setup lang="ts">
  import { useAuth } from "../../../composables/useAuth"

definePageMeta({
  layout: 'dashboard-layout',


})


</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <AdminArticles />
  </div>
</template>


