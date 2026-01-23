export interface Address {
  id: number;
  user_id?: number;
  address_type: "shipping" | "billing";
  first_name: string;
  last_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null | undefined;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}
