<template>
  <UButton color="neutral" variant="ghost" class="relative">
    <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5" />
    <ClientOnly>
      <UBadge :label="totalItems.toString()" color="error" class="absolute -top-1 -right-1" />
    </ClientOnly>
  </UButton>
</template>

<script setup lang="ts">
  const { totalItems } = useCart();
</script>