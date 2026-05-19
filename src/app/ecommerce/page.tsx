"use client";

import { ShoppingCart, Store, Tags, Truck } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";
import { ModuleAnalytics } from "@/components/dashboard/module-page";
import { DataTable, statusColumn } from "@/components/tables/data-table";
import { formatCurrency } from "@/lib/utils";

const storefrontRows = [
  { id: "WEB-001", channel: "Direct Storefront", orders: 1240, revenue: 284000, status: "active" },
  { id: "MKT-002", channel: "Marketplace", orders: 1784, revenue: 342000, status: "active" },
  { id: "B2B-003", channel: "B2B Portal", orders: 386, revenue: 249000, status: "processing" }
];

export default function EcommercePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Storefront Revenue" value={formatCurrency(875000)} change="+18.2%" icon={Store} tone="green" />
        <KpiCard title="Cart Recovery" value="31%" change="+5.4%" icon={ShoppingCart} />
        <KpiCard title="Promotions" value="18" change="Active campaigns" icon={Tags} tone="amber" />
        <KpiCard title="Fulfillment SLA" value="96%" change="On-time dispatch" icon={Truck} tone="green" />
      </section>
      <ModuleAnalytics title="Commerce Channels" />
      <DataTable
        title="Ecommerce Channels"
        data={storefrontRows}
        columns={[
          { key: "channel", header: "Channel", sortable: true },
          { key: "orders", header: "Orders", sortable: true },
          { key: "revenue", header: "Revenue", render: (row) => formatCurrency(Number(row.revenue)) },
          statusColumn("status")
        ]}
      />
    </div>
  );
}
