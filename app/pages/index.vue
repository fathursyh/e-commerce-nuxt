<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative bg-linear-to-r from-purple-600 to-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="max-w-2xl">
          <UBadge color="neutral" variant="solid" class="mb-4">
            🎉 Summer Sale - Up to 50% Off
          </UBadge>
          <h2 class="text-5xl font-bold mb-6">
            Discover Amazing Products
          </h2>
          <p class="text-xl mb-8 text-purple-100">
            Shop the latest trends and exclusive deals. Limited time offers on premium items.
          </p>
          <div class="flex gap-4">
            <UButton size="lg" color="neutral">
              Shop Now
            </UButton>
            <UButton size="lg" color="neutral" variant="outline">
              View Deals
            </UButton>
          </div>
        </div>
      </div>
      <div class="absolute right-0 top-0 h-full w-1/2 hidden lg:block opacity-20">
        <div class="h-full bg-contain bg-right bg-no-repeat" style="background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop')"/>
      </div>
    </section>

    <!-- Featured Products -->
     <LazyHomeFeaturedProduct hydrate-on-idle />
  </div>
</template>