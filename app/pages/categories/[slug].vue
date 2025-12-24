<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <section
        class="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ category?.data.name }}
          </h1>
          <p class="text-gray-500 mt-1">{{ category?.data.description }}</p>
        </div>
      </section>
      <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <template
            v-for="product in category?.data.products"
            :key="product?.id"
          >
            <UiProductCard :product-item="product" />
          </template>
        </div>
        <div class="mt-4 w-full flex justify-end">
          <UButton
            variant="ghost"
            trailing-icon="i-heroicons-arrow-right"
            :to="`/products?category=${category?.data.id}`"
            @click="queryParams = {category: category?.data.id?.toString()!}"
            >More from {{ category?.data.name }}</UButton
          >
        </div>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { queryParams } = useProductState();
  const { slug } = route.params;
  const { getCategoryDetail } = useCategoryActions();
  const { data: category, suspense } = getCategoryDetail(slug as string);
  await suspense();
</script>
