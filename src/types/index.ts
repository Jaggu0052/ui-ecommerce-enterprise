export type Role = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "EMPLOYEE" | "CUSTOMER";

export type Status = "active" | "inactive" | "pending" | "completed" | "cancelled" | "processing";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  category?: string;
  price: number;
  stock: number;
  status: Status | string;
  sales?: number;
}

export interface Category {
  id: string;
  name: string;
  products?: number;
  status?: Status | string;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: Status | string;
  paymentStatus?: string;
  createdAt?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders?: number;
  totalSpend?: number;
  status?: Status | string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
  designation?: string;
  attendanceRate?: number;
  salary?: number;
  status?: Status | string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read?: boolean;
  createdAt?: string;
  type?: "order" | "system" | "employee" | "payment";
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalEmployees: number;
  attendanceRate: number;
  conversionRate: number;
}

export interface ChartPoint {
  name: string;
  revenue?: number;
  orders?: number;
  customers?: number;
  attendance?: number;
  value?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
