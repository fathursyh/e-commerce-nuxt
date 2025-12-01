export const useProductApi = () => {
    const { $api } = useNuxtApp();
    const productUrl = "/products";
    const getProducts = () => $api(productUrl);
    const getFeatured = () => $api<ArrayResponse<Product>>(productUrl +"/featured");
    const getProductById = (id: string) => $api(productUrl + `/${id}`);

    // const createProduct = (data) =>
    //     $api("/api/products", { method: "POST", body: data });

    // const updateProduct = (id, data) =>
    //     $api(`/api/products/${id}`, { method: "PUT", body: data });

    // const deleteProduct = (id) =>
    //     $api(`/api/products/${id}`, { method: "DELETE" });

    return {
        getProducts,
        getFeatured,
        getProductById,
        // createProduct,
        // updateProduct,
        // deleteProduct,
    };
};
