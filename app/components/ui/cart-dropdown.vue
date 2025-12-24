<template>
  <UDropdownMenu :items="items">
    <template #currency>
      <span class="w-full text-center text-lg text-primary">
        {{ formatCurrency(totalPrice) }}
      </span>
    </template>
    <template #cart>
      <UButton :ui="{ base: 'w-full justify-center' }">View Cart</UButton>
    </template>
    <UButton :color="$route.name === 'cart' ? 'success' : 'neutral'" variant="ghost" class="relative">
      <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5" />
      <ClientOnly>
        <UBadge :label="totalItems.toString()" color="error" class="absolute -top-1 right-0" size="sm" />
      </ClientOnly>
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
  import type { DropdownMenuItem } from "@nuxt/ui";
  const { totalItems, totalPrice } = useCart();
  const items: DropdownMenuItem[] = [
    {
      label: "Subtotal",
      ui: { itemLabel: "w-full text-center" },
    },
    {
      type: "label",
      ui: { itemLabel: "w-full text-center text-lg" },
      slot: "currency",
    },
    {
      type: "link",
      to: "/cart",
      slot: "cart",
    },
  ];
</script>