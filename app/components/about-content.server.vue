<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="About Us"
        description="The best shop in town"
        :ui="{
          title: 'text-3xl!',
          description: 'text-base! mt-[4px]!',
        }"
      />
      <UPageBody>
        <div class="min-h-screen bg-gray-50">
          <div
            class="relative h-96 bg-linear-to-br from-success to-indigo-600 overflow-hidden"
          >
            <div class="absolute inset-0 bg-black opacity-20" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center text-white z-10 px-4">
                <h1 class="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  About ShopAll
                </h1>
                <p class="text-xl md:text-2xl font-light">
                  Your One-Stop Shop for Everything
                </p>
              </div>
            </div>
            <!-- Decorative Elements -->
            <div
              class="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"
            />
            <div
              class="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full"
            />
            <div
              class="absolute top-40 right-40 w-16 h-16 bg-white opacity-10 rounded-full"
            />
          </div>

          <!-- Main Content -->
          <div class="max-w-6xl mx-auto px-4 py-16">
            <!-- Story Section -->
            <div class="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div class="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2014, ShopAll began with a simple vision: to create
                  a marketplace where customers could find anything they need,
                  all in one place. What started as a small online store has
                  grown into a global e-commerce platform serving millions of
                  customers worldwide.
                </p>
                <p>
                  We believe shopping should be easy, enjoyable, and accessible
                  to everyone. That's why we've built a platform that brings
                  together thousands of quality products across every category
                  imaginable—from electronics and fashion to home goods and
                  outdoor gear. Our commitment to excellence means every product
                  is carefully selected, and every transaction is secure and
                  seamless.
                </p>
                <p>
                  Today, we partner with trusted brands and sellers from around
                  the world to offer you an unparalleled selection at
                  competitive prices. Our dedicated team works around the clock
                  to ensure your shopping experience is nothing short of
                  exceptional, with fast shipping, easy returns, and customer
                  service that truly cares.
                </p>
              </div>
            </div>

            <!-- Stats Section -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div class="text-4xl mb-3" v-html="stat.icon" />
                <div class="text-3xl font-bold text-gray-800 mb-1">
                  {{ stat.value }}
                </div>
                <div class="text-gray-600">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Reviews Section -->
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-8">
                What Our Customers Say
              </h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h3 class="font-semibold text-gray-800 text-lg">
                        {{ review.name }}
                      </h3>
                      <p class="text-sm text-gray-500">{{ review.date }}</p>
                    </div>
                    <span
                      v-if="review.verified"
                      class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >Verified</span
                    >
                  </div>
                  <div class="flex mb-3">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-5 h-5"
                      :class="
                        i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <p class="text-gray-600 leading-relaxed">
                    {{ review.comment }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
  const stats = [
    { icon: "🛍️", value: "500K+", label: "Products" },
    { icon: "👥", value: "2M+", label: "Happy Customers" },
    { icon: "🌍", value: "150+", label: "Countries" },
    { icon: "🏆", value: "10+", label: "Years Experience" },
  ];
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing variety of products! I can find everything I need in one place. Fast shipping and excellent customer service.",
      date: "2 weeks ago",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Been shopping here for over a year. Quality products, competitive prices, and the customer support team is always helpful.",
      date: "1 month ago",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Williams",
      rating: 4,
      comment:
        "Great selection and easy to navigate website. Delivery was quick and packaging was secure. Will definitely shop again!",
      date: "3 weeks ago",
      verified: true,
    },
    {
      id: 4,
      name: "David Martinez",
      rating: 5,
      comment:
        "Best online shopping experience! From electronics to home goods, they have it all. Highly recommend to everyone.",
      date: "1 week ago",
      verified: true,
    },
  ];
</script>
