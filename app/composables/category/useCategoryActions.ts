import { useQuery } from "@tanstack/vue-query";

export const useCategoryActions = () => {
    const api = useCategoryApi();

    const getAllCategories = () => {
        return useQuery({
            queryKey: [api.categories.key],
            staleTime: 1000 * 60 * 60,
            queryFn: api.categories.call,
        });
    };
    return {
        getAllCategories,
    };
};