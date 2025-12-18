<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <section
        class="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <h1 class="text-3xl font-bold">Our Products</h1>

        <ProductsSearchFilters @filter-change="onFilterChange" />
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
  import { useQuery } from "@tanstack/vue-query";
  const { products } = useProductApi();
  const { query } = useRoute();
  const queryParams = ref(query);
  const {
    data: productsData,
    suspense,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [products.key, queryParams],
    queryFn: () => products.call(queryParams.value),
    staleTime: 1000 * 60 * 10,
  });
  await suspense();

  const onFilterChange = (value: { search: string; category: string }) => {
    if (
      queryParams.value.category === value.category &&
      queryParams.value.search === value.search
    )
      return;
    queryParams.value = value;
    refetch();
  };
</script>
