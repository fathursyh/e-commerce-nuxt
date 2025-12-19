<template>
  <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
    <UInput
      v-model="search as string"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Search products..."
      class="flex-1 md:w-64"
    />
    <USelectMenu
      v-model="selectedCategory as number"
      placeholder="Filter by Category"
      class="w-48"
      :items="data?.data.map((item) => ({ id: item.id, label: item.name }))"
      value-key="id"
      selected-icon="i-heroicons-check"
      trailing-icon="i-heroicons-chevron-down"
    />
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-heroicons-x-mark-20-solid"
      @click="clearFilters"
    >
      Clear
    </UButton>
  </div>
</template>

<script setup lang="ts">
  import { useQuery } from "@tanstack/vue-query";
  const { categories } = useCategoryApi();
  const { data, suspense } = useQuery({
    queryKey: [categories.key],
    staleTime: 1000 * 60 * 60,
    queryFn: categories.call,
  });
  await suspense();

  const router = useRouter();
  const { query } = useRoute();
  const search = ref(query.search);

  const selectedCategory = ref(
    data.value?.data.find((item) => item.id == +query.category!)?.id || null,
  );

  const updateFilter = useDebounce(() => {
    const queryParams = {
      search: search.value || undefined,
      category: selectedCategory.value || undefined,
    };
    router.replace({
      path: "/products",
      query: queryParams,
    });
  }, 800);

  const clearFilters = () => {
    router.replace({
      path: "/products",
      query: {},
    });
  };

  watch([search, selectedCategory], updateFilter);

  onBeforeRouteUpdate(({ query }) => {
    if (query.search === undefined) search.value = undefined;
    if (query.category === undefined) selectedCategory.value = null;
  });
</script>
