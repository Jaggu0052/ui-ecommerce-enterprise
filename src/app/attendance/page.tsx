"use client";

import { ClipboardCheck, Clock, UserCheck, Users } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatusChart } from "@/components/charts/status-chart";
import { DataTable, statusColumn } from "@/components/tables/data-table";
import { fallbackRevenue } from "@/services/analytics.service";

const attendanceRows = [
  { id: "ATT-001", name: "Aarav Sharma", department: "Operations", checkIn: "09:03", attendanceRate: 97, status: "active" },
  { id: "ATT-002", name: "Maya Patel", department: "Finance", checkIn: "09:16", attendanceRate: 94, status: "active" },
  { id: "ATT-003", name: "Noah Williams", department: "Fulfillment", checkIn: "10:02", attendanceRate: 88, status: "pending" }
];

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Present Today" value="126" change="+4 vs yesterday" icon={UserCheck} tone="green" />
        <KpiCard title="Late Check-ins" value="9" change="-12% this week" icon={Clock} tone="amber" />
        <KpiCard title="On Leave" value="13" change="Approved requests" icon={Users} />
        <KpiCard title="Coverage" value="94%" change="Healthy roster coverage" icon={ClipboardCheck} tone="green" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <RevenueChart data={fallbackRevenue.map((item) => ({ ...item, revenue: item.attendance }))} />
        <StatusChart title="Attendance Mix" data={[{ name: "Present", value: 78 }, { name: "Late", value: 8 }, { name: "Leave", value: 10 }, { name: "Absent", value: 4 }]} />
      </section>
      <DataTable
        title="Attendance Records"
        data={attendanceRows}
        columns={[
          { key: "name", header: "Employee", sortable: true },
          { key: "department", header: "Department" },
          { key: "checkIn", header: "Check In" },
          { key: "attendanceRate", header: "Rate %" },
          statusColumn("status")
        ]}
      />
    </div>
  );
}
