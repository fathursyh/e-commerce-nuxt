<template>
  <!-- Navbar -->
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center gap-1">
          <!-- mobile -->
          <UDrawer v-model:open="drawerOpen" direction="left">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-bars-3"
              class="md:hidden"
            />

            <template #body>
              <menu class="w-40 h-full flex flex-col gap-2">
                <UButton
                  as="li"
                  variant="ghost"
                  color="neutral"
                  active-color="success"
                  to="/products"
                  @click="closeDrawer()"
                  >Products</UButton
                >
                <UButton
                  as="li"
                  variant="ghost"
                  color="neutral"
                  active-color="success"
                  to="/categories"
                  @click="closeDrawer()"
                  >Categories</UButton
                >
                <UButton
                  as="li"
                  variant="ghost"
                  color="neutral"
                  active-color="success"
                  to="/"
                  @click="closeDrawer()"
                  >Deals</UButton
                >
                <UButton
                  as="li"
                  variant="ghost"
                  color="neutral"
                  active-color="success"
                  to="/about"
                  @click="closeDrawer()"
                  >About</UButton
                >
              </menu>
            </template>
          </UDrawer>
          <NuxtLink to="/">
            <h1 class="text-xl font-bold text-gray-900">F-Commerce</h1>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <UButton
            variant="ghost"
            color="neutral"
            to="/products"
            active-color="success"
            >Products</UButton
          >
          <UButton
            variant="ghost"
            color="neutral"
            active-color="success"
            to="/categories"
            >Categories</UButton
          >
          <UButton variant="ghost" color="neutral" active-color="success"
            >Deals</UButton
          >
          <UButton
            variant="ghost"
            color="neutral"
            active-color="success"
            to="/about"
            >About</UButton
          >
        </div>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-2">
          <LazyProductsNavbarProductSearch hydrate-on-idle />
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
  const drawerOpen = ref(false);
  const closeDrawer = () => (drawerOpen.value = false);

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
