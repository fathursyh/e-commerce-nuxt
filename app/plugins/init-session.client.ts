export default defineNuxtPlugin((nuxtApp) => {
    const { initSession } = useAuth();
    nuxtApp.hook("app:created", async() => {
        try {
            await initSession.call();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        } catch (err) {
            console.log("Something is wrong");
        }
    });
});
