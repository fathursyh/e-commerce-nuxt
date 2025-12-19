import type { LocationQuery } from "vue-router";

export const useProductState = () => {
    const { query } = useRoute();
    const queryParams = useState<LocationQuery | null>("query-params", () => query);

    return {
        queryParams,
    };
};