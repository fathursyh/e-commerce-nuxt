<template>
  <div class="space-y-4 p-4">
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          Products
        </h2>
        <p class="text-sm text-gray-500">
          Manage your inventory and product details.
        </p>
      </div>
      <UButton
        icon="i-heroicons-plus"
        size="md"
        color="primary"
        label="Add Product"
        :trailing="false"
      />
    </div>

    <div class="flex items-center justify-between gap-3 px-4">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search products..."
        class="w-full max-w-xs"
      />
      <USelectMenu
        v-model="selectedColumns"
        :options="columns"
        multiple
        placeholder="Columns"
      />
    </div>

    <UCard flex-1>
      <UTable
        :rows="filteredRows"
        :columns="selectedColumns"
        :loading="pending"
        sort-asc-icon="i-heroicons-arrow-up-20-solid"
        sort-desc-icon="i-heroicons-arrow-down-20-solid"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :src="row.primary_image?.url" :alt="row.name" size="sm" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                {{ row.name }}
              </div>
              <div class="text-xs text-gray-500 hidden md:block">
                {{ row.short_description }}
              </div>
            </div>
          </div>
        </template>

        <template #category-data="{ row }">
          <UBadge color="gray" variant="soft" size="xs">
            {{ row.category.name }}
          </UBadge>
        </template>

        <template #effective_price-data="{ row }">
          <div class="font-medium">
            {{ formatCurrency(row.effective_price) }}
            <span
              v-if="row.sale_price"
              class="text-xs text-red-500 line-through ml-1"
            >
              {{ formatCurrency(row.price) }}
            </span>
          </div>
        </template>

        <template #stock_quantity-data="{ row }">
          <div
            :class="{
              'text-red-500': !row.in_stock,
              'text-gray-700 dark:text-gray-200': row.in_stock,
            }"
          >
            {{ row.stock_quantity }} units
          </div>
        </template>

        <template #is_active-data="{ row }">
          <UBadge
            :color="row.is_active ? 'green' : 'gray'"
            variant="subtle"
            size="xs"
          >
            {{ row.is_active ? "Active" : "Archived" }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: "dashboard",
  });

  const searchQuery = ref("");
  const pending = ref(false);

  // 2. Updated Columns to match new data structure
  const columns = [
    { id: "id", key: "id", label: "ID", sortable: true },
    { id: "product", key: "name", label: "Product", sortable: true }, // Combined Name + Image
    { id: "category", key: "category", label: "Category" },
    { id: "price", key: "effective_price", label: "Price", sortable: true },
    { id: "stock", key: "stock_quantity", label: "Stock", sortable: true },
    { id: "status", key: "is_active", label: "Status" },
    { id: "actions", key: "actions", label: "Actions" },
  ];

  const selectedColumns = ref([...columns]);

  // 3. Helper for Currency formatting
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // 4. ROBUST DUMMY DATA (Matching ProductResource)
  const products: Product[] = [
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      slug: "sony-wh-1000xm5",
      description:
        "Industry-leading noise canceling with two processors controlling 8 microphones.",
      short_description: "Premium Noise Canceling Headphones",
      price: 399.0,
      sale_price: 349.0,
      effective_price: 349.0,
      discount_percentage: 13,
      stock_quantity: 45,
      in_stock: true,
      is_active: true,
      is_featured: true,
      weight: 0.25,
      category: { id: 101, name: "Electronics", slug: "electronics" },
      primary_image: {
        id: 1,
        url: "https://placehold.co/100",
        alt: "Sony Headphones",
      },
      meta_data: [],
      reviews_count: 120,
      average_rating: 4.8,
      created_at: "2023-10-01T10:00:00Z",
    },
    {
      id: 2,
      name: "Keychron Q1 Pro Keyboard",
      slug: "keychron-q1-pro",
      description:
        "A fully customizable wireless mechanical keyboard with QMK/VIA support.",
      short_description: "Wireless Mechanical Keyboard",
      price: 199.0,
      sale_price: null,
      effective_price: 199.0,
      discount_percentage: 0,
      stock_quantity: 12,
      in_stock: true,
      is_active: true,
      is_featured: false,
      weight: 1.8,
      category: { id: 102, name: "Accessories", slug: "accessories" },
      primary_image: {
        id: 2,
        url: "https://placehold.co/100",
        alt: "Keyboard",
      },
      meta_data: [],
      reviews_count: 45,
      average_rating: 4.5,
      created_at: "2023-11-15T08:30:00Z",
    },
    {
      id: 3,
      name: "Classic Leather Satchel",
      slug: "classic-leather-satchel",
      description:
        "Handcrafted full-grain leather bag perfect for daily commute.",
      short_description: "Genuine Leather Bag",
      price: 150.0,
      sale_price: null,
      effective_price: 150.0,
      discount_percentage: 0,
      stock_quantity: 0,
      in_stock: false,
      is_active: true,
      is_featured: false,
      weight: 0.9,
      category: { id: 103, name: "Fashion", slug: "fashion" },
      primary_image: {
        id: 3,
        url: "https://placehold.co/100",
        alt: "Leather Bag",
      },
      meta_data: [],
      reviews_count: 12,
      average_rating: 4.2,
      created_at: "2023-09-20T14:00:00Z",
    },
    {
      id: 4,
      name: "Ceramic Pour-Over Set",
      slug: "ceramic-pour-over",
      description: "Minimalist coffee brewing set for the perfect morning cup.",
      short_description: "Coffee Brewing Kit",
      price: 45.0,
      sale_price: 25.0,
      effective_price: 25.0,
      discount_percentage: 44,
      stock_quantity: 100,
      in_stock: true,
      is_active: true,
      is_featured: true,
      weight: 0.5,
      category: { id: 104, name: "Home", slug: "home" },
      primary_image: {
        id: 4,
        url: "https://placehold.co/100",
        alt: "Coffee Set",
      },
      meta_data: [],
      reviews_count: 8,
      average_rating: 4.9,
      created_at: "2024-01-10T09:00:00Z",
    },
    {
      id: 5,
      name: "Legacy Product X (Archived)",
      slug: "legacy-product-x",
      description: "Old version, no longer sold.",
      short_description: "Archived Item",
      price: 99.99,
      sale_price: null,
      effective_price: 99.99,
      discount_percentage: 0,
      stock_quantity: 0,
      in_stock: false,
      is_active: false, // Inactive
      is_featured: false,
      weight: 1.0,
      category: { id: 101, name: "Electronics", slug: "electronics" },
      primary_image: null,
      meta_data: [],
      reviews_count: 0,
      average_rating: 0,
      created_at: "2022-01-01T12:00:00Z",
    },
  ];

  // Search Logic (Updated for nested objects)
  const filteredRows = computed(() => {
    if (!searchQuery.value) return products;
    const lowerQuery = searchQuery.value.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.name.toLowerCase().includes(lowerQuery) ||
        String(product.id).includes(lowerQuery)
      );
    });
  });

  // Row Actions
  const items = (row: Product) => [
    [
      {
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("Edit", row.id),
      },
      {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid",
      },
    ],
    [
      {
        label: row.is_active ? "Deactivate" : "Activate",
        icon: row.is_active
          ? "i-heroicons-archive-box-20-solid"
          : "i-heroicons-check-circle-20-solid",
      },
      {
        label: "Delete",
        icon: "i-heroicons-trash-20-solid",
        labelClass: "text-red-500",
      },
    ],
  ];
</script>
