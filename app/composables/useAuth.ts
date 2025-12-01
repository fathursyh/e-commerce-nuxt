export const useAuth = () => {
    const { $api } = useNuxtApp();
    const authUrl = "/auth";

    const initSession = {
        call: async() => $api("http://localhost:8000/sanctum/csrf-cookie"),
    } satisfies QueryModel;

    const register = {
        call: async(payload: RegisterPayload) => $api(authUrl + "/register", {
            body: payload,
        }),
    };
    return {
        initSession,
        register,
    };

};