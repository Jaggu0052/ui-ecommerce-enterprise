"use client";

import { ModuleAnalytics, ModulePage, moneyColumn, statusColumn } from "@/components/dashboard/module-page";
import { customerService } from "@/services/customer.service";
import type { Customer } from "@/types";

export default function CustomersPage() {
  return (
    <ModulePage<Customer>
      title="Customers"
      description="Customer profiles, addresses, customer analytics, and order history."
      queryKey={["customers"]}
      queryFn={() => customerService.list()}
      columns={[
        { key: "name", header: "Customer", sortable: true },
        { key: "email", header: "Email" },
        { key: "orders", header: "Orders", sortable: true },
        moneyColumn("totalSpend", "Total Spend"),
        statusColumn("status")
      ]}
    >
      <ModuleAnalytics title="Customer Segments" />
    </ModulePage>
  );
}
