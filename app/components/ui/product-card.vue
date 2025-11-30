<template>
     <UCard
          class="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <template #header>
            <div class="relative">
              <img
                :src="productItem.images[0]?.image_path"
                :alt="productItem.name"
                class="w-full h-64 object-cover rounded-t-lg"
              >
              <UBadge
                color="primary"
                class="absolute top-3 left-3"
              />
            </div>
          </template>

          <div>
            <h4 class="font-semibold text-lg mb-2">{{ productItem.name }}</h4>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">
                ${{ productItem.price.toFixed(2) }}
              </span>
              <UButton
                icon="i-heroicons-shopping-cart"
                size="sm"
                color="primary"
              >
                Add to Cart
              </UButton>
            </div>
          </div>
        </UCard>
</template>

<script setup lang="ts">
    defineProps<{
        productItem: Product,
    }>();
</script>