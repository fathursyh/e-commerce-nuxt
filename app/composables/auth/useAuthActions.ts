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

    const registerUser = async(payload: RegisterPayload) => {
        try {
            const res = await api.register.call(payload);
            user.value = res.data.user;

            toast.add({
                title: "Registration Success",
                description: "New account been registered in successfully!",
                color: "success",
            });
            return navigateTo("/");
        } catch (error) {
            toast.add({
                title: "Registration Failed",
                description: getErrorMessage(error as ErrorResponse),
                color: "error",
            });
            throw error;
        }
    };

    const loginUser = async(payload: LoginPayload) => {
        try {
            const res = await api.login.call(payload);
            user.value = res.data.user;

            toast.add({
                title: "Login Success",
                description: "You have been logged in successfully!",
                color: "success",
            });
            return navigateTo("/");
        } catch (error) {
            toast.add({
                title: "Login Failed",
                description: getErrorMessage(error as ErrorResponse),
                color: "error",
            });
            throw error;
        }
    };

    const logoutUser = async() => {
        try {
            await api.logout.call();
            toast.add({
                title: "Logout Success",
                description: "You have been logged out successfully!",
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