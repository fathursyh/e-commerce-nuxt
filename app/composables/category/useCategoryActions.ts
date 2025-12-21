import { useQuery } from "@tanstack/vue-query";

export const useCategoryActions = () => {
    const api = useCategoryApi();

    const getAllCategories = (query: {with_products_count?: boolean, search?: undefined | string} = {
        with_products_count: false,
        search: undefined,
    }) => {
        return useQuery({
            queryKey: [api.categories.key],
            staleTime: 1000 * 60 * 60,
            queryFn: () => api.categories.call(query),
        });
    };
    return {
        getAllCategories,
    };
};