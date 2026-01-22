<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between"
      >
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8 text-primary" />
          <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <!-- <CartClearButton /> -->
        <ClientOnly>
          <LazyUiConfirmationDialog
            text="Clear all cart items?"
            confirm-text="Clear"
            @on-confirm="clearCart()"
          >
            <UButton variant="ghost" color="error" :disabled="cart.length === 0"
              >Clear Cart</UButton
            >
          </LazyUiConfirmationDialog>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <template #fallback>
        <CartLoadingFallback />
      </template>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Empty Cart State -->
        <UCard v-if="cart.length === 0" class="text-center p-12">
          <div class="flex flex-col items-center gap-4">
            <UIcon
              name="i-heroicons-shopping-bag"
              class="w-16 h-16 text-gray-400"
            />
            <h2 class="text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p class="text-gray-600">Add some items to get started</p>
            <UButton size="lg" class="mt-4" to="/products"
              >Continue Shopping</UButton
            >
          </div>
        </UCard>

        <!-- Cart Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            <CartItem v-for="item in cart" :key="item.id" :item="item" />
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <UCard>
              <template #header>
                <h2 class="text-xl font-bold text-gray-900">Order Summary</h2>
              </template>

              <div class="space-y-4">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span
                    >${{
                      data?.data?.estimates.subtotal.toFixed(2) ??
                      totalPrice.toFixed(2)
                    }}</span
                  >
                </div>

                <div class="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>

                <div class="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>
                    ${{ data?.data?.estimates.tax.toFixed(2) ?? tax.toFixed(2) }}
                  </span>
                </div>
                <div
                  class="flex justify-between text-xl font-bold text-gray-900"
                >
                  <span>Total</span>
                  <!-- <span>${{ total.toFixed(2) }}</span> -->
                </div>

                <UButton
                  block
                  size="lg"
                  trailing-icon="i-heroicons-arrow-right"
                  class="mt-6"
                  @click="checkOutOrder()"
                >
                  Proceed to Checkout
                </UButton>

                <UButton block variant="outline" color="neutral">
                  Continue Shopping
                </UButton>
              </div>
            </UCard>
            <UCard class="mt-4">
              <div class="space-y-3">
                <div class="flex gap-2">
                  <UInput
                    placeholder="Enter promo code"
                    icon="i-heroicons-ticket"
                    class="flex-2"
                  />
                  <UButton
                    disabled
                    class="flex-1 line-clamp-1"
                    variant="subtle"
                    color="neutral"
                    >Saturday Promo</UButton
                  >
                </div>
                <UButton block variant="outline">Apply Code</UButton>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </ClientOnly>
    <UModal v-model:open="shippingDialog" title="Shipping Detail" :dismissible="false">
      <template #body>
        <UiShippingForm />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  const { cart } = useCartState();
  const { totalPrice, tax, clearCart } = useCart();
  const { initCheckout, checkOut } = useOrderActions();
  const { isAuthenticated } = useAuthState();
  const toast = useToast();
  const shippingDialog = ref(false);

  const { data, suspense } = initCheckout();
  await suspense();

  const { mutate } = checkOut({
    items: cart.value.map((cartItem) => ({
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
    })),
    billing_address_id: 1,
    shipping_address_id: 1,
    payment_method: "bank_transfer",
  });

  const checkOutOrder = () => {
    if (!isAuthenticated.value) {
      useRouter().push("/login");
      toast.add({
        title: "Not Authenticated",
        description: "Sign in to your account to proceed your checkout.",
      });
      return;
    }
    if (!data.value?.data.shipping_address) {
      shippingDialog.value = true;
      toast.add({
        title: "Shipping Address Required",
        description:
          "Please fill your shipping address to proceed your checkout.",
      });
      return;
    }
    mutate();
  };
</script>
