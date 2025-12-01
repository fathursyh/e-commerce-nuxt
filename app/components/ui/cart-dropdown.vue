<template>
     <UButton color="neutral" variant="ghost" class="relative">
                <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5" />
                <UBadge
                  :label="totalItems || 0"
                  color="error"
                  class="absolute -top-1 -right-1"
                />
              </UButton>
</template>

<script setup lang="ts">
    const { totalItems } = useCart();
</script>