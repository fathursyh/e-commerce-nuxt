import type { User } from "./user";

interface HttpResponse {
  success: boolean;
  message: string;
};

interface ErrorResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
  }
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
};

interface ArrayResponse<T> extends HttpResponse {
  pagination: Pagination;
  data: T[];
};

interface SingleResponse<T> extends HttpResponse {
  data: T;
}

interface AuthResponse extends HttpResponse {
  data: {user: User}
}

export type {
  HttpResponse,
  ErrorResponse,
  ArrayResponse,
  SingleResponse,
  AuthResponse,
};