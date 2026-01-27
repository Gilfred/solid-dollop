<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout' as const,
})
import CategorieTable from '~/components/admin/CategorieTable.vue'  
import CreateCategoriesModal from '~/components/admin/CreateCategoriesModal.vue';
</script>
<template>
    
        
         <CategorieTable />
         <CreateCategoriesModal />
 
</template>
