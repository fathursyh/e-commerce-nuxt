export default defineNuxtPlugin((nuxtApp) => {
    const { initSession } = useAuthApi();
    const { fetchUser } = useAuthActions();
    const { cart, initCart } = useCartState();
    nuxtApp.hook("app:created", async() => {
        try {
            initCart();
            if (cart.value.length > 0) return;
            initSession.call();
            fetchUser();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        } catch (err) {
            console.log("Something is wrong");
        }
    });
});
