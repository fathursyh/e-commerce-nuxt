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
          <UButton variant="ghost" color="neutral" to="/products" active-color="success"
            >Products</UButton
          >
          <UButton variant="ghost" color="neutral" active-color="success">Categories</UButton>
          <UButton variant="ghost" color="neutral" active-color="success">Deals</UButton>
          <UButton variant="ghost" color="neutral" active-color="success">About</UButton>
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-2">
          <UButton
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            color="neutral"
          />
          <UiCartDropdown />

          <UButton
            v-if="!isAuthenticated"
            variant="solid"
            icon="i-heroicons-arrow-right-end-on-rectangle"
            to="/login"
            size="lg"
            :ui="{ base: 'lg:w-24' }"
          >
            Login
          </UButton>

          <UDropdownMenu
            v-else
            :items="userMenuItems"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton icon="i-heroicons-user" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const { isAuthenticated } = useAuthState();
  const { logoutUser } = useAuthActions();
  const userMenuItems = [
    [
      {
        label: "Profile",
        icon: "i-heroicons-user-circle",
        onSelect: () => navigateTo("/profile"),
      },
      {
        label: "Orders",
        icon: "i-heroicons-shopping-bag",
        onSelect: () => navigateTo("/orders"),
      },
      {
        label: "Settings",
        icon: "i-heroicons-cog-6-tooth",
        onSelect: () => navigateTo("/settings"),
      },
    ],
    [
      {
        label: "Sign Out",
        icon: "i-heroicons-arrow-right-on-rectangle",
        onSelect: () => logoutUser(),
      },
    ],
  ];
</script>
