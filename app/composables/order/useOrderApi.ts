export const useOrderApi = () => {
    const { $api } = useNuxtApp();
    const checkoutUrl = "/checkout";
    const orderUrl = "/orders";

    const init = {
        key: "init-order",
        call: async() => $api<SingleResponse<InitResponse>>(checkoutUrl + "/init", {
            method: "GET",
        }),
    } satisfies QueryModel;

    const checkout = {
        key: "checkout-order",
        call: async(payload) => $api(orderUrl, {
            method: "POST",
            body: payload,
        }),
    } satisfies QueryModel;

    return {
        init,
        checkout,
    };

};
