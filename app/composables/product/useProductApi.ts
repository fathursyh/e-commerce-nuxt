export const useProductApi = () => {
    const { $api } = useNuxtApp();
    const productUrl = "/products";

    const products = {
        key: "products",
        call: async(query) => $api<ArrayResponse<Product>>(productUrl, {
            query: query,
        }),
    } satisfies QueryModel;

    const featured = {
        key: "featured",
        call: async() => $api<ArrayResponse<Product>>(productUrl +"/featured"),
    } satisfies QueryModel;
    const getProductById = (id: string) => $api(productUrl + `/${id}`);

    // const createProduct = (data) =>
    //     $api("/api/products", { method: "POST", body: data });

    // const updateProduct = (id, data) =>
    //     $api(`/api/products/${id}`, { method: "PUT", body: data });

    // const deleteProduct = (id) =>
    //     $api(`/api/products/${id}`, { method: "DELETE" });

    return {
        products,
        featured,
        getProductById,
        // createProduct,
        // updateProduct,
        // deleteProduct,
    };
};
