"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { StatusChart } from "@/components/charts/status-chart";
import { DataTable, type Column, statusColumn } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/loaders/table-skeleton";
import { fallbackRevenue } from "@/services/analytics.service";
import { formatCurrency } from "@/lib/utils";

interface ModulePageProps<T extends object> {
  title: string;
  description: string;
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  columns: Column<T>[];
  children?: React.ReactNode;
}

export function ModulePage<T extends object>({ title, description, queryKey, queryFn, columns, children }: ModulePageProps<T>) {
  const query = useQuery({ queryKey, queryFn });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => query.refetch()}>
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
      {children}
      {query.isLoading ? <TableSkeleton rows={8} /> : <DataTable title={title} data={query.data ?? []} columns={columns} />}
    </div>
  );
}

export function ModuleAnalytics({ title }: { title: string }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <RevenueChart data={fallbackRevenue} />
      <StatusChart
        title={title}
        data={[
          { name: "Active", value: 62 },
          { name: "Pending", value: 21 },
          { name: "Processing", value: 12 },
          { name: "Inactive", value: 5 }
        ]}
      />
    </section>
  );
}

export const moneyColumn = <T extends object>(key: keyof T | string, header: string): Column<T> => ({
  key: String(key),
  header,
  render: (row) => formatCurrency(Number((row as Record<string, unknown>)[String(key)] ?? 0))
});

export { statusColumn, Card, CardContent, CardHeader, CardTitle };
