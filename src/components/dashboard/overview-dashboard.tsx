"use client";

import { Activity, Banknote, Clock, Package, ShoppingBag, Users, UserRoundCheck } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatusChart } from "@/components/charts/status-chart";
import { DataTable, statusColumn } from "@/components/tables/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/loaders/table-skeleton";
import { useDashboardData } from "@/hooks/useDashboardData";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Order, Product } from "@/types";

export function OverviewDashboard() {
  const { summary, revenue, products, orders, notifications } = useDashboardData();
  const totals = summary.data;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Revenue" value={formatCurrency(totals?.totalRevenue ?? 0)} change="+18.2% this quarter" icon={Banknote} tone="green" />
        <KpiCard title="Orders" value={formatNumber(totals?.totalOrders ?? 0)} change="+11.4% vs last month" icon={ShoppingBag} />
        <KpiCard title="Customers" value={formatNumber(totals?.totalCustomers ?? 0)} change="+9.6% customer growth" icon={Users} tone="amber" />
        <KpiCard title="Attendance" value={`${totals?.attendanceRate ?? 0}%`} change="Healthy workforce coverage" icon={UserRoundCheck} tone="green" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <RevenueChart data={revenue.data ?? []} />
        <StatusChart
          title="Order Status"
          data={[
            { name: "Completed", value: 54 },
            { name: "Processing", value: 28 },
            { name: "Pending", value: 13 },
            { name: "Cancelled", value: 5 }
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        {orders.isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable<Order & Record<string, unknown>>
            title="Recent Orders"
            data={(orders.data ?? []).map((order, index) => ({
              id: order.id ?? `ORD-${index + 1}`,
              customer: order.customer ?? `Customer ${index + 1}`,
              total: order.total ?? 0,
              paymentStatus: order.paymentStatus ?? "paid",
              status: order.status ?? "processing"
            }))}
            columns={[
              { key: "id", header: "Order", sortable: true },
              { key: "customer", header: "Customer", sortable: true },
              { key: "total", header: "Total", render: (row) => formatCurrency(Number(row.total)) },
              { key: "paymentStatus", header: "Payment" },
              statusColumn("status")
            ]}
          />
        )}
        <div className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(products.data ?? []).slice(0, 5).map((product: Product, index) => (
                <div key={product.id ?? index} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Package className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name ?? `Product ${index + 1}`}</p>
                    <p className="text-xs text-muted-foreground">{product.stock ?? 0} units available</p>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(product.price ?? 0)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(notifications.data ?? []).slice(0, 5).map((item, index) => (
                <div key={item.id ?? index} className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    {index % 2 === 0 ? <Activity className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.title ?? "Operational update"}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{item.message ?? "New activity recorded."}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
