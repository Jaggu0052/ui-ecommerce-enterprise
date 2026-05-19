import { api } from "@/services/api";
import type { AnalyticsSummary, ChartPoint } from "@/types";

export const fallbackRevenue: ChartPoint[] = [
  { name: "Jan", revenue: 92000, orders: 480, customers: 180, attendance: 91 },
  { name: "Feb", revenue: 118000, orders: 560, customers: 220, attendance: 93 },
  { name: "Mar", revenue: 132000, orders: 640, customers: 260, attendance: 95 },
  { name: "Apr", revenue: 149000, orders: 710, customers: 310, attendance: 92 },
  { name: "May", revenue: 178000, orders: 830, customers: 380, attendance: 96 },
  { name: "Jun", revenue: 206000, orders: 960, customers: 420, attendance: 94 }
];

export const analyticsService = {
  async summary(): Promise<AnalyticsSummary> {
    try {
      const { data } = await api.get("/analytics");
      return {
        totalRevenue: data.totalRevenue ?? data.revenue ?? 875000,
        totalOrders: data.totalOrders ?? data.orders ?? 4180,
        totalCustomers: data.totalCustomers ?? data.customers ?? 2170,
        totalEmployees: data.totalEmployees ?? data.employees ?? 148,
        attendanceRate: data.attendanceRate ?? 94,
        conversionRate: data.conversionRate ?? 8.7
      };
    } catch {
      return {
        totalRevenue: 875000,
        totalOrders: 4180,
        totalCustomers: 2170,
        totalEmployees: 148,
        attendanceRate: 94,
        conversionRate: 8.7
      };
    }
  },
  async revenue() {
    try {
      const { data } = await api.get("/analytics/revenue");
      return Array.isArray(data) ? (data as ChartPoint[]) : fallbackRevenue;
    } catch {
      return fallbackRevenue;
    }
  }
};
