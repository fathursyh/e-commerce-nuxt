<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <section
        class="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="w-full md:w-fit">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p class="text-gray-500 mt-1">Browse our collection by department</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <UInput
            leading-icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search categories..."
            size="lg"
          />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
          >
            Clear
          </UButton>
        </div>
      </section>

      <section>
        <div
          v-if="isError"
          class="min-h-[300px] flex flex-col justify-center items-center gap-4"
        >
          <UIcon
            name="i-heroicons-exclamation-circle"
            class="w-12 h-12 text-red-500"
          />
          <div class="text-center">
            <p class="text-lg font-medium">Unable to load categories</p>
            <p class="text-sm text-gray-500">
              Please check your connection and try again.
            </p>
          </div>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-arrow-path"
            @click="refetch()"
          >
            Retry
          </UButton>
        </div>

        <div
          v-else-if="isRefetching"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <USkeleton v-for="n in 8" :key="n" class="h-40 w-full rounded-xl" />
        </div>

        <div
          v-else-if="categories?.data"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <NuxtLink
            v-for="category in categories?.data.filter(item => item.products_count !== 0)"
            :key="category.id"
            class="group"
            :to="`/categories/${category.slug}`"
          >
            <UCard
              class="hover:ring-2 hover:ring-primary-500 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div class="flex flex-col items-center text-center gap-3 py-4">
                <div
                  class="p-4 bg-primary-50 dark:bg-primary-950 rounded-full group-hover:scale-110 transition-transform"
                >
                  <UIcon
                    name="i-heroicons-tag"
                    class="w-8 h-8 text-primary-600"
                  />
                </div>
                <div>
                  <h3 class="font-semibold text-lg">{{ category.name }}</h3>
                  <p class="text-xs text-neutral-400">
                    <span class="font-medium">{{
                      category.products_count
                    }}</span>
                    products
                  </p>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-20 text-center"
        >
          <UIcon
            name="i-heroicons-magnifying-glass-slash"
            class="w-12 h-12 text-gray-400"
          />
          <h3 class="mt-4 text-lg font-medium">No categories found</h3>
          <p class="text-gray-500">Try adjusting your search for "a"</p>
          <UButton variant="link">Clear search</UButton>
        </div>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
  const { getAllCategories } = useCategoryActions();
  const {
    data: categories,
    isError,
    isRefetching,
    refetch,
    suspense,
  } = getAllCategories({
    with_products_count: true,
  });
  await suspense();
</script>
