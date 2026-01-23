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
      :items="categoryOptions"
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
  import type { SelectItem } from "@nuxt/ui";

  const { getAllCategories } = useCategoryActions();
  const { data, suspense } = getAllCategories({ with_products_count: true });
  await suspense();
  const router = useRouter();
  const { query } = useRoute();
  const search = ref(query.search);

  const categoryOptions = computed<SelectItem[] | undefined>(() =>
    data.value?.data.reduce<SelectItem[]>((acc, item) => {
      if (item.products_count! > 0) {
        acc.push({ id: item.id, label: item.name });
      }
      return acc;
    }, []),
  );

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
    else search.value = query.search;
    if (query.category === undefined) selectedCategory.value = null;
    else selectedCategory.value = +query.category!;
  });
</script>
