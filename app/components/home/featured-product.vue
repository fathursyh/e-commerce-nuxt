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

      <template v-if="pending">
        <p>aa</p>
      </template>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-for="product in featuredProducts?.data" :key="product.id">
          <UiProductCard :product-item="product" />
        </template>
      </div>
    </section>
</template>

<script setup lang="ts">
    const { data: featuredProducts, pending } =
      await useFetch<ArrayResponse<Product>>(
      "http://localhost:8000/api/v1/products/featured",
      );
</script>