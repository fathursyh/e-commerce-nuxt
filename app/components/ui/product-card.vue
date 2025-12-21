<template>
  <UCard
    class="hover:ring-2 hover:ring-primary-500 transition-all duration-200"
  >
    <template #header>
      <NuxtLink class="relative" to="/">
        <NuxtImg
          v-if="productItem.images.length > 0"
          :src="productItem.images[0]?.image_path"
          :alt="productItem.name"
          class="w-full h-64 object-cover rounded-t-lg"
        />
        <div v-else class="w-full h-64 bg-muted grid place-items-center">
          <p class="text-muted">No Product Image.</p>
        </div>
        <UBadge color="primary" class="absolute top-3 left-3" />
      </NuxtLink>
    </template>

    <div>
      <h4 class="font-semibold text-lg mb-2">{{ productItem.name }}</h4>
      <div class="flex justify-between items-center">
        <p>
          <span class="text-2xl font-bold text-gray-900 me-2">
            ${{ productItem.sale_price?.toFixed(2) }}
          </span>
          <span v-if="productItem.price !== 0" class="line-through text-muted">
            {{ productItem.price }}
          </span>
        </p>
        <div class="flex flex-col gap-2">
          <UButton
            icon="i-heroicons-shopping-cart"
            size="sm"
            color="primary"
            @click="
              addToCart({
                product_id: productItem.id,
                name: productItem.name,
                price: productItem.effective_price,
                quantity: 1,
              })
            "
          >
            Add to Cart
          </UButton>
          <UButton
            variant="ghost"
            size="sm"
            color="error"
            class="text-pink-500 w-full"
            leading-icon="i-heroicons-heart"
            >Save Item</UButton
          >
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  defineProps<{
    productItem: Product;
  }>();
  const { addToCart } = useCart();
</script>
