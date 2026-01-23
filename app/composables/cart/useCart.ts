export const useCart = () => {
  const { cart } = useCartState();
  const { addItem, updateItem, removeItem, clearCart: clear } = useCartApi();
  const toast = useToast();

  const totalItems = computed(() =>
    cart.value.reduce((a, i) => a + i.quantity, 0),
  );

  const totalPrice = computed(() =>
    cart.value.reduce((a, i) => a + i.quantity * i.price, 0),
  );

  const tax = computed(() => totalPrice.value * 0.08);

  const addToCart = async(item: CartItem) => {
    const existing = cart.value.find((i) => i.product_id === item.product_id);

    try {
      if (existing) {
        updateItem(existing);
        existing.quantity += item.quantity ?? 1;
        toast.add({
          title: "Item has been updated!",
          description: item.name + "'s quantity has been updated successfully.",
        });
      } else {
        const { data } = await addItem(item.product_id.toString(), 1);
        cart.value = [];
        cart.value.push(...data.items);
        toast.add({
          title: "Item has been added!",
          description: item.name + " has been added successfully to your cart.",
        });
      }
      saveCart();
    } catch (err) {
      console.warn(err);
      toast.add({
        color: "error",
        title: "Something is wrong!",
        description: (err as { message: string }).message,
      });
    }
  };

  const removeFromCart = (item: CartItem) => {
    cart.value = cart.value.filter((i) => i.id !== item.id);
    removeItem(item.id!);
    saveCart();
    toast.add({
      title: "Item has been removed!",
      description: item.product?.name + " has been removed from your cart.",
    });
  };

  const updateQty = (id: string | number, qty: number) => {
    const item = cart.value.find((i) => i.id === id);
    if (item) {
      item.quantity = qty;
      updateItem(item);
    }
    saveCart();
  };

  const clearCart = async(silent = false) => {
    if (cart.value.length === 0) return;
    try {
      await clear();
      cart.value = [];
      if (!silent) {
        toast.add({
          title: "Cart has been cleared",
          description: "Your cart has been emptied.",
        });
      }
      saveCart();
    } catch (error) {
      if (!silent) {
        toast.add({
          color: "error",
          title: "Failed to clear your cart",
          description: "Something is wrong! try again later.",
        });
      }
      console.error(error);
    }
  };

  // save to local storage
  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };

  return {
    totalItems,
    totalPrice,
    tax,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };
};