"use client";

import { ModuleAnalytics, ModulePage, moneyColumn, statusColumn } from "@/components/dashboard/module-page";
import { orderService } from "@/services/order.service";
import type { Order } from "@/types";

export default function OrdersPage() {
  return (
    <ModulePage<Order>
      title="Orders"
      description="Track orders, payment status, invoices, delivery lifecycle, and fulfillment workload."
      queryKey={["orders"]}
      queryFn={() => orderService.list()}
      columns={[
        { key: "id", header: "Order", sortable: true },
        { key: "customer", header: "Customer", sortable: true },
        moneyColumn("total", "Total"),
        { key: "paymentStatus", header: "Payment" },
        statusColumn("status")
      ]}
    >
      <ModuleAnalytics title="Payment Analytics" />
    </ModulePage>
  );
}
