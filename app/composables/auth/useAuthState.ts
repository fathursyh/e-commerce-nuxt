export const useAuthState = () => {
    const user = useState<User | null>("user", () => null);
    const isAuthenticated = computed(() => !!user.value);

    return {
        user,
        isAuthenticated,
    };
};