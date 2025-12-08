<template>
  <UCard class="p-4">
    <div class="flex gap-4">
      <img
        v-if="item.product?.images?.length"
        :src="item.product?.images?.[0]?.image_path"
        :alt="item.product?.name"
        class="w-24 h-24 object-cover rounded-lg"
      >
      <div v-else class="w-24 h-24 rounded-lg bg-neutral-100" />
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ item.product?.name }}
        </h3>
        <div class="mt-1 space-y-1">
          <p class="text-sm text-gray-600">Color:</p>
        </div>
        <p class="mt-2 text-lg font-bold text-primary">
          ${{ item.price.toFixed(2) }}
        </p>
      </div>

      <div class="flex flex-col items-end justify-between">
        <LazyUiConfirmationDialog
          hydrate-on-idle
          :text="`Remove ${item.product?.name} from your cart?`"
          confirm-text="Remove"
          @on-confirm="removeFromCart(item)"
        >
          <UButton
            icon="i-heroicons-trash"
            color="error"
            variant="ghost"
            size="sm"
          />
        </LazyUiConfirmationDialog>
        <div class="flex items-center gap-2">
          <UButton
            icon="i-heroicons-minus"
            size="sm"
            color="neutral"
            variant="outline"
            :disabled="item.quantity <= 1"
            @click="updateQty(item.id!, item.quantity - 1)"
          />
          <span class="w-12 text-center font-semibold">{{
            item.quantity
          }}</span>
          <UButton
            icon="i-heroicons-plus"
            size="sm"
            color="neutral"
            variant="outline"
            @click="updateQty(item.id!, item.quantity + 1)"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  const { updateQty, removeFromCart } = useCart();

  defineProps<{
    item: CartItem;
  }>();
</script>
