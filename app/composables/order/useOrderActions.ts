import { useMutation, useQuery } from "@tanstack/vue-query";

export const useOrderActions = () => {
    const api = useOrderApi();

    const initCheckout = () => {
        return useQuery({
            queryKey: [api.init.key],
            queryFn: api.init.call,
        });
    };
    const checkOut = (payload: CreateOrderRequest) => {
        return useMutation({
            mutationKey: [api.checkout.key],
            mutationFn: () => api.checkout.call(payload),
        });

    };

    return {
        initCheckout,
        checkOut,
    };
};