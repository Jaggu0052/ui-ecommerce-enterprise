"use client";

import { BarChart3, LineChart, Percent, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/cards/kpi-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatusChart } from "@/components/charts/status-chart";
import { fallbackRevenue } from "@/services/analytics.service";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Gross Revenue" value={formatCurrency(875000)} change="+18.2%" icon={TrendingUp} tone="green" />
        <KpiCard title="AOV" value={formatCurrency(184)} change="+4.1%" icon={BarChart3} />
        <KpiCard title="Conversion" value="8.7%" change="+1.2 pts" icon={Percent} tone="amber" />
        <KpiCard title="Forecast" value={formatCurrency(1040000)} change="Next quarter" icon={LineChart} tone="green" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <RevenueChart data={fallbackRevenue} />
        <StatusChart title="Channel Performance" data={[{ name: "Marketplace", value: 46 }, { name: "Direct", value: 31 }, { name: "Retail", value: 15 }, { name: "Partner", value: 8 }]} />
      </section>
    </div>
  );
}
