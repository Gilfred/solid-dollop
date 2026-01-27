
<template>
  <UDashboardGroup>
    <!-- Sidebar -->
    <Sidebar />

    <!-- Panel -->
    <UDashboardPanel>
      <AdminDashboardHeader />
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>
