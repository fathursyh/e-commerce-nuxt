import type { Product } from "./product";

export interface CartItem {
    id?: string,
    product_id: number;
    price: number;
    name?: string;
    quantity: number;
    product?: Product
}

export interface InitResponse {
    billing_address: string;
    cart: { id: string; user_id: string; session_id: string };
    estimates: {
      subtotal: number;
      tax: number;
      shipping: 0;
    };
    shipping_address: string | null;
  };