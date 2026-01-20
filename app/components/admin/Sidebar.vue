<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'


const items: NavigationMenuItem[][] = [[{
  label: 'Accueil',
  icon: 'i-lucide-house',
  active: true
}, {
  label: 'Posts',
  icon: 'i-lucide-inbox',
  badge: '4'
}, {
  label: 'Abonnés',
  icon: 'i-lucide-users'
}, {
  label: 'Settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: 'General'
  }, {
    label: 'Members'
  }, {
    label: 'Notifications'
  }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt/ui',
  target: '_blank'
}]]
</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' } " >
    

    <template #header="{ collapsed }">
  <div class="flex items-center justify-center h-8 ">
    <span
      v-if="!collapsed"
      class="font-bold text-lg tracking-wide text-indigo-800 "
    >
      Admin Panel
    </span>

    <span
      v-else
      class="font-bold text-indigo-800 text-lg tracking-wide"
    >
      AP
    </span>
  </div>
</template>


    <template #default="{ collapsed }">
      <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
      </UButton>

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
		
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
		
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png'
        }"
        :label="collapsed ? undefined : 'Zakaria L.'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
	
  </UDashboardSidebar>
</template>

