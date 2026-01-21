<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [[{
  label: 'Vue d\'ensemble',
  icon: 'i-heroicons-squares-2x2',
  to: '/admin',
}, {
  label: 'Articles',
  icon: 'i-heroicons-document-duplicate',
  to: '/admin/articles',
  badge: '123'
}, {
  label: 'Catégories',
  icon: 'i-heroicons-folder',
  to: '/admin/categories',
  badge: '12'
}, {
  label: 'Abonnés',
  icon: 'i-heroicons-user-group',
  to: '/admin/followers',
  badge: '1.2K'
}, {
  label: 'Analytiques',
  icon: 'i-heroicons-chart-bar',
  to: '/admin/analytics',
}], [{
  label: 'Paramètres',
  icon: 'i-heroicons-cog-8-tooth',
  to: '/admin/settings'
}, {
  label: 'Support',
  icon: 'i-heroicons-lifebuoy',
  to: '/admin/support'
}]]
</script>

<template>
  <UDashboardSidebar 
    collapsible 
    resizable
    :ui="{
      root: 'border-r border-purple-100 dark:border-purple-900/30 bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20',
      body: 'gap-6 py-4'
    }"
  >
    <template #header="{ collapsed }">
      <div class="px-4 py-5">
        <div v-if="!collapsed" class="flex items-center gap-3">
          <div class="relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span class="text-white font-bold text-lg tracking-tight relative z-10">LD</span>
            <div class="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm"></div>
          </div>
          <div>
            <h2 class="font-semibold text-base bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Luxe & Design</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Dashboard Admin</p>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <div class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span class="text-white font-bold text-sm relative z-10">LD</span>
          </div>
        </div>
      </div>
    </template>

    <template #default="{ collapsed }">
      <div class="px-4">
        <UButton
          :label="collapsed ? undefined : 'Rechercher...'"
          icon="i-heroicons-magnifying-glass"
          color="neutral"
          variant="soft"
          block
          :square="collapsed"
          class="!bg-purple-50 dark:!bg-purple-950/30 hover:!bg-purple-100 dark:hover:!bg-purple-900/40 !text-purple-900 dark:!text-purple-100 !border !border-purple-200/50 dark:!border-purple-800/50 !rounded-xl transition-all duration-200"
        >
          <template v-if="!collapsed" #trailing>
            <UKbd value="⌘K" size="xs" class="!bg-purple-100 dark:!bg-purple-900/50 !text-purple-700 dark:!text-purple-300 !border-purple-300 dark:!border-purple-700" />
          </template>
        </UButton>
      </div>

      <div class="px-4 mt-2">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[0]"
          orientation="vertical"
          :ui="{
            wrapper: 'space-y-1',
            item: {
              base: 'group relative transition-all duration-200 !rounded-xl overflow-hidden',
              padding: 'px-3 py-2.5',
              active: '!bg-gradient-to-r !from-purple-600 !to-indigo-600 !text-white !shadow-lg !shadow-purple-500/25 !font-semibold',
              inactive: '!text-gray-700 dark:!text-gray-300 hover:!bg-purple-50 dark:hover:!bg-purple-950/40 hover:!text-purple-700 dark:hover:!text-purple-300',
              icon: {
                base: 'w-5 h-5 flex-shrink-0',
                active: '!text-white',
                inactive: '!text-gray-500 dark:!text-gray-400 group-hover:!text-purple-600 dark:group-hover:!text-purple-400'
              },
              label: {
                base: '!font-medium !text-sm truncate',
              },
              badge: {
                base: '!rounded-lg !px-2 !py-0.5 !text-xs !font-semibold',
                active: '!bg-white/20 !text-white',
                inactive: '!bg-purple-100 dark:!bg-purple-900/50 !text-purple-700 dark:!text-purple-300'
              }
            }
          }"
        />
      </div>

      <div class="px-4 mt-auto">
        <div v-if="!collapsed" class="h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-800 to-transparent mb-4" />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[1]"
          orientation="vertical"
          :ui="{
            wrapper: 'space-y-1',
            item: {
              base: 'group relative transition-all duration-200 !rounded-xl',
              padding: 'px-3 py-2.5',
              active: '!bg-gradient-to-r !from-purple-600 !to-indigo-600 !text-white !shadow-lg !shadow-purple-500/25 !font-semibold',
              inactive: '!text-gray-600 dark:!text-gray-400 hover:!bg-purple-50 dark:hover:!bg-purple-950/40 hover:!text-purple-700 dark:hover:!text-purple-300',
              icon: {
                base: 'w-5 h-5 flex-shrink-0',
                active: '!text-white',
                inactive: '!text-gray-500 dark:!text-gray-400 group-hover:!text-purple-600 dark:group-hover:!text-purple-400'
              },
              label: {
                base: '!font-medium !text-sm',
              }
            }
          }"
        />
      </div>
    </template>

    <template #footer="{ collapsed }">
      <div class="p-4 border-t border-purple-100 dark:border-purple-900/30 bg-gradient-to-t from-purple-50/50 to-transparent dark:from-purple-950/20">
        <UButton
          :avatar="{ src: 'https://github.com/benjamincanac.png' }"
          :label="collapsed ? undefined : 'Zakaria L.'"
          color="neutral"
          variant="ghost"
          block
          :square="collapsed"
          class="group !rounded-xl hover:!bg-purple-50 dark:hover:!bg-purple-950/40 !text-gray-700 dark:!text-gray-300 hover:!text-purple-700 dark:hover:!text-purple-300 transition-all duration-200"
        >
          <template v-if="!collapsed" #trailing>
            <UIcon name="i-heroicons-chevron-up-down" class="w-4 h-4 !text-gray-400 group-hover:!text-purple-600 dark:group-hover:!text-purple-400 transition-colors" />
          </template>
        </UButton>
      </div>
    </template>
  </UDashboardSidebar>
</template>

<style scoped>
/* Styles personnalisés pour forcer les couleurs purple/indigo */
</style>