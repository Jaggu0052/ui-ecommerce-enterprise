"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { customerService } from "@/services/customer.service";
import { employeeService } from "@/services/employee.service";
import { notificationService } from "@/services/notification.service";
import { orderService } from "@/services/order.service";
import { productService } from "@/services/product.service";

export function useDashboardData() {
  const summary = useQuery({ queryKey: ["analytics", "summary"], queryFn: analyticsService.summary });
  const revenue = useQuery({ queryKey: ["analytics", "revenue"], queryFn: analyticsService.revenue });
  const products = useQuery({ queryKey: ["products"], queryFn: () => productService.list({ limit: 8 }) });
  const orders = useQuery({ queryKey: ["orders"], queryFn: () => orderService.list({ limit: 8 }) });
  const customers = useQuery({ queryKey: ["customers"], queryFn: () => customerService.list({ limit: 8 }) });
  const employees = useQuery({ queryKey: ["employees"], queryFn: () => employeeService.list({ limit: 8 }) });
  const notifications = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });

  return { summary, revenue, products, orders, customers, employees, notifications };
}
