import type { AuthResponse } from "~~/shared/types/response";

export const useAuthApi = () => {
    const { $api } = useNuxtApp();
    const authUrl = "/auth";

    const user = {
        call: async() => $api<AuthResponse>(authUrl + "/user"),
    } satisfies QueryModel;

    const initSession = {
        call: async() => $api(useRuntimeConfig().public.backend +"/sanctum/csrf-cookie"),
    } satisfies QueryModel;

    const register = {
        call: async(payload: RegisterPayload) => $api<AuthResponse>(authUrl + "/register", {
            body: payload,
            method: "POST",
        }),
    } satisfies QueryModel;

    const login = {
        call: async(payload: LoginPayload) => $api<AuthResponse>(authUrl + "/login", {
            body: payload,
            method: "POST",
        }),
    } satisfies QueryModel;

    const logout = {
        call: async() => $api(authUrl + "/logout", {
            method: "POST",
        }),
    } satisfies QueryModel;

    return {
        user,
        initSession,
        register,
        login,
        logout,
    };

};