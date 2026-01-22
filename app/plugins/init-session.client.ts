export default defineNuxtPlugin((nuxtApp) => {
    const { initSession } = useAuthApi();
    const { fetchUser } = useAuthActions();
    const { initCart } = useCartState();
    nuxtApp.hook("app:created", async() => {
        try {
            initSession.call();
            fetchUser();
            initCart();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        } catch (err) {
            console.error("Something is wrong");
        }
    });
});
