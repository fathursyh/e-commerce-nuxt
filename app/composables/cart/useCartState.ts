export const useCartState = () => {
    const cart = useState<CartItem[]>("cart", () => []);

    onMounted(() => {
        const stored = localStorage.getItem("cart");
        if (stored && cart.value.length === 0) {
            try {
                cart.value = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing stored cart data:", e);
                localStorage.removeItem("cart");
            }
        }
    });

    return {
        cart,
    };
};