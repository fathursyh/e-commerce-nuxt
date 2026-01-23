<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";

  const items: NavigationMenuItem[][] = [
    [
      {
        label: "Dashboard",
        icon: "i-heroicons-home",
        to: "/admin",
      },
      {
        label: "Products",
        icon: "i-heroicons-shopping-bag",
        to: "/admin/products",
      },
      {
        label: "Categories",
        icon: "i-heroicons-tag",
        to: "/admin/categories",

      },
         {
        label: "Reviews",
        icon: "i-heroicons-clipboard-document-list",
        to: "/admin/reviews",
      },
      {
        label: "Notifications",
        icon: "i-heroicons-inbox",
        badge: "4",
        to: "/admin/notifications",
      },
      {
        label: "Users",
        icon: "i-heroicons-users",
        to: "/admin/users",
      },
    ],
    [
      {
        label: "Help & Support",
        icon: "i-heroicons-information-circle",
        to: "https://github.com/nuxt/ui",
      },
      {
        label: "Logout",
        ui: { linkLeadingIcon: "text-error", link: "text-error" },
        icon: "i-heroicons-arrow-left-start-on-rectangle",
        to: "",
      },
    ],
  ];
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #header>
      <UDashboardSidebarCollapse variant="subtle" />
    </template>

    <template #default="{ collapsed }">
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
          src: 'https://github.com/benjamincanac.png',
        }"
        :label="collapsed ? undefined : 'Benjamin'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
