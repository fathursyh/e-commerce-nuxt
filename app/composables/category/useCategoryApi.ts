export const useCategoryApi = () => {
    const { $api } = useNuxtApp();
    const categoryUrl = "/categories";

    const categories = {
        key: "categories",
        call: (query) => $api<ArrayResponse<Category>>(categoryUrl, {
            query: query,
        }),
    } satisfies QueryModel;

    return {
        categories,
    };
};