<template>
     <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h3 class="text-3xl font-bold text-gray-900">Featured Products</h3>
          <p class="text-gray-600 mt-2">Handpicked items just for you</p>
        </div>
        <UButton variant="ghost" trailing-icon="i-heroicons-arrow-right">
          View All
        </UButton>
      </div>

      <div v-if="isError" class="h-32 w-full grid place-items-center">
        <div class="flex flex-col justify-center items-center text-error">
          <Icon name="i-heroicons-exclamation-circle" size="24" />
          <p>Error fetching products.</p>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-for="product in featuredProducts?.data" :key="product?.id">
          <UiProductCard :product-item="product" />
        </template>
      </div>
    </section>
</template>

<script setup lang="ts">
  import { useQuery } from "@tanstack/vue-query";

  const { getFeatured } = useProductApi();
    const { data: featuredProducts, suspense, isError } = useQuery({ queryKey: ["featured"], queryFn: getFeatured });
    onServerPrefetch(async() => await suspense());
</script>