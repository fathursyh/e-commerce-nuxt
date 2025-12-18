
export const useCategoryApi = () => {
    const { $api } = useNuxtApp();
    const categoryUrl = "/categories";

    const categories = {
        key: "categories",
        call: () => $api<SingleResponse<Category[]>>(categoryUrl),
    } satisfies QueryModel;

    return {
        categories,
    };
};