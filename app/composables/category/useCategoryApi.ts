export const useCategoryApi = () => {
    const { $api } = useNuxtApp();
    const categoryUrl = "/categories";

    const categories = {
        key: "categories",
        call: async(query) => $api<ArrayResponse<Category>>(categoryUrl, {
            query: query,
        }),
    } satisfies QueryModel;

    const detail = {
        key: "detail",
        call: async(slug) => $api<SingleResponse<Category>>(categoryUrl + `/${slug}`, {
            query: {
                with_products: true,
            },
        }),
    } satisfies QueryModel;

    return {
        categories,
        detail,
    };
};