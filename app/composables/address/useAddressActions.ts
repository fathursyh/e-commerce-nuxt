import { useMutation } from "@tanstack/vue-query";

export const useAddressActions = () => {
    const api = useAddressApi();

    const saveAddress = () => {
        return useMutation({
            mutationKey: [api.storeAddress.key],
            mutationFn: (payload: Omit<Address, "id">) => api.storeAddress.call(payload),
        });
    };

    return {
        saveAddress,
    };
};