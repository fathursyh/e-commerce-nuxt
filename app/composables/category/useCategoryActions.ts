import { useQuery } from "@tanstack/vue-query";

export const useCategoryActions = () => {
    const api = useCategoryApi();

    const getAllCategories = (query: {
        with_products_count?: boolean,
        search?: undefined | string,
    } = {
            with_products_count: false,
            search: undefined,
        }) => {
        return useQuery({
            queryKey: [api.categories.key, query],
            staleTime: 1000 * 60 * 60,
            queryFn: () => api.categories.call(query),
        });
    };

    const getRandom = () => {
        const query = { random: true, paginate: false };
        return useQuery({
            queryKey: [api.categories.key, query],
            staleTime: 1000 * 60 * 60,
            queryFn: () => api.categories.call(query),
        });
    };

    const getCategoryDetail = (slug: string) => {
        return useQuery({
            queryKey: [api.detail.key, slug],
            staleTime: 1000 * 60 * 1,
            queryFn: () => api.detail.call(slug),
        });
    };

    return {
        getAllCategories,
        getRandom,
        getCategoryDetail,
    };
};