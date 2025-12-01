export interface CartItem {
    id?: string,
    product_id: string | number;
    name?: string;
    price: number;
    quantity: number;
}