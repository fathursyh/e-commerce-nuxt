export const useCart = () => {
    const { cart, saveCart } = useCartState();
    const { addItem, updateItem } = useCartApi();
    const toast = useToast();

    const totalItems = computed(() =>
        cart.value.reduce((a, i) => a + i.quantity, 0),
    );

    const totalPrice = computed(() =>
        cart.value.reduce((a, i) => a + i.quantity * i.price, 0),
    );

    const addToCart = async(item: CartItem) => {
        const existing = cart.value.find((i) => i.product_id === item.product_id);

        try {
            if (existing) {
                existing.quantity += item.quantity ?? 1;
                await updateItem(existing);
                toast.add({
                    title: "Item has been updated!",
                    description: existing.name + "'s quantity has been updated successfully.",
                });
            } else {
                const newItem = { ...item, quantity: item.quantity ?? 1 };
                cart.value.push(newItem);
                await addItem(newItem.product_id.toString(), 1);
                toast.add({
                    title: "Item has been added!",
                    description: newItem.name + " has been added successfully to your cart.",
                });
            }

            saveCart();

        } catch (err) {
            console.error("Cart API Error:", err);
        }
    };

    const removeFromCart = (id: string | number) => {
        cart.value = cart.value.filter((i) => i.id !== id);
        saveCart();
    };

    const updateQty = (id: string | number, qty: number) => {
        const item = cart.value.find((i) => i.id === id);
        if (item) item.quantity = qty;
        saveCart();
    };

    const clearCart = () => {
        cart.value = [];
        saveCart();
    };

    return {
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
    };
};