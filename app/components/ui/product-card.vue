<template>
  <UCard
    class="hover:ring-2 hover:ring-primary-500 transition-all duration-200"
  >
    <template #header>
      <NuxtLink class="relative" to="/">
        <NuxtImg
          v-if="productItem.images"
          :src="`${useRuntimeConfig().public.backend}/${
            productItem.images[0]?.image_path
          }`"
          :alt="productItem.name"
          class="w-full h-64 object-cover rounded-t-lg"
        />
        <div v-else class="w-full h-64 bg-muted grid place-items-center">
          <p class="text-muted">No Product Image.</p>
        </div>
        <UBadge v-if="itemInCart" color="primary" class="absolute top-3 left-3 appear min-h-6 min-w-6 grid place-items-center">{{ itemInCart }}</UBadge>
      </NuxtLink>
    </template>

    <div>
      <h4 class="font-semibold text-lg mb-1">{{ productItem.name }}</h4>

      <div class="flex items-center gap-1 mb-2">
        <div class="flex items-center text-yellow-400">
          <template v-if="productItem.average_rating">
            <UIcon
              v-for="i in productItem.average_rating"
              :key="i"
              name="i-heroicons-star-20-solid"
              class="w-4 h-4"
            />
            <template v-if="5 - productItem.average_rating !== 0">
              <UIcon
                v-for="j in 5 - productItem.average_rating"
                :key="j"
                name="i-heroicons-star"
                class="w-4 h-4"
              />
            </template>
          </template>
          <template v-else>
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons-star"
              class="w-4 h-4"
            />
          </template>
        </div>
        <span class="text-xs text-gray-500 font-medium">
          ({{ productItem.average_rating || 0 }})
          <span class="ml-1">{{ productItem.reviews_count || 0 }} reviews</span>
        </span>
      </div>

      <div class="flex justify-between items-center">
        <p>
          <span class="text-2xl font-bold text-gray-900 me-2">
            ${{ productItem.sale_price?.toFixed(2) || productItem.price }}
          </span>
          <span
            v-if="productItem.sale_price?.toFixed(2)"
            class="line-through text-muted text-sm"
          >
            ${{ productItem.price }}
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
  const props = defineProps<{
    productItem: Product;
  }>();

  const { cart } = useCartState();
  const { addToCart } = useCart();

  const itemInCart = computed(() => cart.value.find((item) => item.product_id === props.productItem.id)?.quantity);
</script>

<style>
  .appear {
    animation: fade-in 0.3s ease-out forwards;
  }

  @keyframes fade-in {
    from {
      scale: 0.5;
      opacity: 0;
      rotate: 180deg;
    }
  }
</style>
