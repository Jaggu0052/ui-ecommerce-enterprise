"use client";

import { Banknote, CalendarCheck, CircleDollarSign, Receipt } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";
import { DataTable, statusColumn } from "@/components/tables/data-table";
import { formatCurrency } from "@/lib/utils";

const salaryRows = [
  { id: "PAY-1001", employee: "Aarav Sharma", department: "Operations", base: 7400, bonus: 650, status: "completed" },
  { id: "PAY-1002", employee: "Maya Patel", department: "Finance", base: 8600, bonus: 900, status: "processing" },
  { id: "PAY-1003", employee: "Noah Williams", department: "Fulfillment", base: 6200, bonus: 420, status: "pending" }
];

export default function SalariesPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Payroll Run" value={formatCurrency(628000)} change="May 2026 cycle" icon={Banknote} tone="green" />
        <KpiCard title="Pending Payslips" value="18" change="Needs approval" icon={Receipt} tone="amber" />
        <KpiCard title="Bonuses" value={formatCurrency(46500)} change="+6.8% this cycle" icon={CircleDollarSign} />
        <KpiCard title="Processed" value="87%" change="Before payroll date" icon={CalendarCheck} tone="green" />
      </section>
      <DataTable
        title="Salary Dashboard"
        data={salaryRows}
        columns={[
          { key: "employee", header: "Employee", sortable: true },
          { key: "department", header: "Department" },
          { key: "base", header: "Base", render: (row) => formatCurrency(Number(row.base)) },
          { key: "bonus", header: "Bonus", render: (row) => formatCurrency(Number(row.bonus)) },
          statusColumn("status")
        ]}
      />
    </div>
  );
}
