export type PaymentMethod =
  | "credit_card"
  | "paypal"
  | "bank_transfer"
  | "cash_on_delivery";

export interface PaymentDetails {
  card_number: string;
  card_holder: string;
  expiry_month: number;
  expiry_year: number;
  cvv: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  shipping_address_id: number;
  billing_address_id: number;
  payment_method: PaymentMethod;
  notes?: string;
  coupon_code?: string;

  /**
   * Required only when payment_method === 'credit_card'
   */
  payment_details?: PaymentDetails;

  /**
   * Optional if order is created from cart
   */
  items?: OrderItem[];
}