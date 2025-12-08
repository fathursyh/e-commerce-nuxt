<template>
  <!-- Navbar -->
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/">
            <h1 class="text-2xl font-bold text-gray-900">F-Commerce</h1>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <UButton variant="ghost" color="neutral">Shop</UButton>
          <UButton variant="ghost" color="neutral">Categories</UButton>
          <UButton variant="ghost" color="neutral">Deals</UButton>
          <UButton variant="ghost" color="neutral">About</UButton>
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-2">
          <UButton icon="i-heroicons-magnifying-glass" variant="ghost" color="neutral" />
          <UiCartDropdown />
          <!-- User Dropdown -->
          <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
            <UButton icon="i-heroicons-user" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const userMenuItems = [
    [
      {
        label: "Profile",
        icon: "i-heroicons-user-circle",
        click: () => navigateTo("/profile"),
      },
      {
        label: "Orders",
        icon: "i-heroicons-shopping-bag",
        click: () => navigateTo("/orders"),
      },
      {
        label: "Settings",
        icon: "i-heroicons-cog-6-tooth",
        click: () => navigateTo("/settings"),
      },
    ],
    [
      {
        label: "Sign Out",
        icon: "i-heroicons-arrow-right-on-rectangle",
        click: () => {
          // Handle sign out
        },
      },
    ],
  ];
</script>