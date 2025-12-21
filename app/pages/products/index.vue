<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <section
        class="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold">Our Products</h1>
          <p class="text-gray-500 mt-1">Browse our top quality products</p>
        </div>
        <ProductsSearchFilters />
      </section>

      <section>
        <div
          v-if="isError"
          class="min-h-100 flex flex-col justify-center items-center text-error"
        >
          <Icon name="i-heroicons-exclamation-triangle" size="24" />
          <p class="text-center mb-2">Error fetching products.</p>
          <UButton variant="soft" color="error" @click="refetch()"
            >Reload</UButton
          >
        </div>

        <div
          v-else-if="isRefetching"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ProductsLoadingFallback v-for="n in 6" :key="n" />
        </div>

        <div v-else-if="productsData?.data && !isRefetching">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <template v-for="product in productsData?.data" :key="product?.id">
              <UiProductCard :product-item="product" />
            </template>
          </div>
          <div class="mt-8 w-full grid place-items-center">
            <UPagination
              :page="productsData.pagination.current_page"
              :total="productsData.pagination.total"
              :items-per-page="productsData.pagination.per_page"
              show-controls
            />
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20">
          <UIcon
            name="i-heroicons-archive-box-x-mark"
            class="w-12 h-12 text-gray-400"
          />
          <p class="mt-2 text-gray-600">
            No products found matching your criteria.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
  const { queryParams } = useProductState();
  const { fetchProducts } = useProductActions();

  const {
    data: productsData,
    suspense,
    isError,
    isRefetching,
    refetch,
  } = fetchProducts();
  await suspense();

  onBeforeRouteUpdate(({ query }) => {
    queryParams.value = query;
    refetch();
  });

  onBeforeRouteLeave(() => {
    queryParams.value = null;
  });
</script>
