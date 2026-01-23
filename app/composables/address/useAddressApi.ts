export const useAddressApi = () => {
    const { $api } = useNuxtApp();
    const addressUrl = "/addresses";

    const storeAddress = {
        key: "store-address",
        call: async(payload) => $api<SingleResponse<InitResponse>>(addressUrl, {
            method: "POST",
            body: payload,
        }),
    } satisfies QueryModel;

    return {
        storeAddress,
    };

};
