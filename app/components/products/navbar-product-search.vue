<template>
  <UModal
    title="Search Products"
    :close="{
      color: 'neutral',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <UButton
      icon="i-heroicons-magnifying-glass"
      variant="ghost"
      color="neutral"
    />
    <template #body="{ close }">
      <div class="p-4 px-8">
        <UFormField name="search">
          <UInput
            v-model="search"
            color="secondary"
            placeholder="Search for products"
            type="search"
            autofocus
            :autofocus-delay="200"
            :ui="{ root: 'w-full' }"
            leading-icon="i-heroicons-magnifying-glass"
          />
        </UFormField>
        <div class="w-full flex mt-4 gap-2">
          <UButton
            v-for="category in categories?.data"
            :key="category.id"
            size="xs"
            color="neutral"
            @click="
              goSearchProducts(category.id.toString());
              close();
            "
            >{{ category.name }}</UButton
          >
        </div>
      </div>
    </template>
    <template #footer="{close}">
      <UButton
        leading-icon="i-heroicons-magnifying-glass"
        class="ms-auto min-w-24 justify-center"
        color="secondary"
        @click="
          goSearchProducts();
          close();
        "
        >Search</UButton
      >
    </template>
  </UModal>
</template>

<script setup lang="ts">
  import { useQueryClient } from "@tanstack/vue-query";

  const { getAllCategories } = useCategoryActions();
  const router = useRouter();
  const search = ref("");
  const { data: categories, suspense } = getAllCategories();
  await suspense();

  const queryClient = useQueryClient();
  const { products } = useProductApi();
  const { queryParams } = useProductState();

  const goSearchProducts = (categoryId?: string) => {
    router.push({
      path: "/products",
      query: {
        search: search.value || undefined,
        category: categoryId || undefined,
      },
    });

    queryParams.value = {
      search: search.value,
      category: categoryId!,
    };

    queryClient.refetchQueries({
      queryKey: [products.key],
    });
    search.value = "";
  };
</script>
