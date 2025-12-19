import { useQuery } from "@tanstack/vue-query";

export const useProductActions = () => {
    const api = useProductApi();
    const { queryParams } = useProductState();

    const fetchFeatured = () => {
        return useQuery({ queryKey: [api.featured.key], queryFn: api.featured.call });
    };

    const fetchProducts = () => {
        return useQuery({
            queryKey: [queryParams.value, api.products.key],
            queryFn: () => api.products.call(queryParams.value),
            staleTime: 1000 * 60 * 10,
        });
    };

    return {
        fetchFeatured,
        fetchProducts,
    };
};