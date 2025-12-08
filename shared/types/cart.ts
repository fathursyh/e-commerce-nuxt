import type { Product } from "./product";

export interface CartItem {
    id?: string,
    product_id: string | number;
    price: number;
    quantity: number;
    product?: Product
}