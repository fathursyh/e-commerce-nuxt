import { useMutation } from "@tanstack/vue-query";
import type { ErrorResponse } from "~~/shared/types/response";

export const useAuthActions = () => {
    const api = useAuthApi();
    const { user } = useAuthState();
    const toast = useToast();

    const getErrorMessage = (error: ErrorResponse) => {
        return error.data.message;
    };

    const fetchUser = async() => {
        try {
            const res = await api.user.call();
            user.value = res.data.user;
        } catch (error) {
            console.error((error as ErrorResponse).status);
            user.value = null;
        }
    };

    const registerUser = () => {
        return useMutation({
            mutationFn: (payload: RegisterPayload) =>
                api.register.call(payload),
            onSuccess: (res) => {
                user.value = res.data.user;
                toast.add({
                    title: "Registration success!",
                    description: "New account has been registered in successfully.",
                    color: "success",
                });
                return navigateTo("/");
            },
            onError: (error: ErrorResponse) => {
                toast.add({
                    title: "Registration failed!",
                    description: getErrorMessage(error),
                    color: "error",
                });
            },
        });
    };

    const loginUser = () => {
        return useMutation({
            mutationFn: (payload: LoginPayload) => api.login.call(payload),
            onSuccess: ({ data }) => {
                user.value = data.user;
                toast.add({
                    title: "Login success!",
                    description: "You have been logged in successfully.",
                    color: "success",
                });
                return navigateTo("/");
            },
            onError: (error: ErrorResponse) => {
                toast.add({
                    title: "Login failed!",
                    description: getErrorMessage(error),
                    color: "error",
                });
            },
        });
    };

    const logoutUser = async() => {
        try {
            await api.logout.call();
            toast.add({
                title: "Logout success!",
                description: "You have been logged out successfully.",
                color: "success",
            });
        } catch (error) {
            toast.add({
                title: "Notice",
                description: getErrorMessage(error as ErrorResponse),
                color: "warning",
            });
        } finally {
            user.value = null;
        }
    };

    return {
        fetchUser,
        registerUser,
        loginUser,
        logoutUser,
    };
};