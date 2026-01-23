import { useMutation, useQuery } from "@tanstack/vue-query";

export const useOrderActions = () => {
    const { clearCart } = useCart();
    const api = useOrderApi();
    const toast = useToast();

    const initCheckout = () => {
        return useQuery({
            queryKey: [api.init.key],
            queryFn: api.init.call,
        });
    };
    const checkOut = () => {
        return useMutation({
            mutationKey: [api.checkout.key],
            mutationFn: (payload: CreateOrderRequest) => api.checkout.call(payload),
            onSuccess: () => {
                toast.add({
                    title: "Order Created",
                    description: "Order has been successfully created!",
                });
                clearCart(true);
                return navigateTo("/");
            },
            onError: () => {
                toast.add({
                    title: "Order Failed",
                    description: "Order has been failed to be created!",
                    color: "error",
                });
            },
        });
    };

    return {
        initCheckout,
        checkOut,
    };
};