export const useCartApi = () => {
    const { $api } = useNuxtApp();
    const cartUrl = "/cart";

    async function addItem(product_id: string, quantity: number) {
        $api(cartUrl + "/items", {
            method: "POST",
            body: {
                product_id,
                quantity,
            },
        });
    }

    async function updateItem(item: CartItem) {
        return $api(cartUrl + "/items/" + item.id, {
            method: "PUT",
            body: {
                quantity: item.quantity,
            },
        });
    }

    async function removeItem(item: CartItem) {
        return $api(cartUrl + "/items/" + item, {
            method: "DELETE",
        });
    }

    async function clearCart() {
        return $api(cartUrl, { method: "DELETE" });
    }

    return {
        addItem,
        updateItem,
        removeItem,
        clearCart,
    };
};
