export const useCartApi = () => {
    const { $api } = useNuxtApp();
    const cartUrl = "/cart";

    async function addItem(product_id: string, quantity: number) {
        return $api<SingleResponse<{id: string, items: CartItem[]}>>(cartUrl + "/items", {
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

    async function removeItem(id: string | number) {
        return $api(cartUrl + "/items/" + id, {
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
