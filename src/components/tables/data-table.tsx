"use client";

import { ArrowUpDown, Download, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/badges/status-badge";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export function DataTable<T extends object>({
  title,
  data,
  columns,
  searchable = true
}: {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    const source = data.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
    if (!sortKey) return source;
    return [...source].sort((a, b) =>
      String((a as Record<string, unknown>)[sortKey] ?? "").localeCompare(String((b as Record<string, unknown>)[sortKey] ?? ""))
    );
  }, [data, query, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="glass-panel overflow-hidden">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 sm:w-64" placeholder="Search records" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="w-10 px-4 py-3 text-left">
                <input type="checkbox" className="rounded border-input" aria-label="Select all rows" />
              </th>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 text-left font-medium">
                  <button
                    className={cn("inline-flex items-center gap-1", column.sortable && "hover:text-foreground")}
                    onClick={() => column.sortable && setSortKey(String(column.key))}
                    type="button"
                  >
                    {column.header}
                    {column.sortable && <ArrowUpDown className="h-3.5 w-3.5" />}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, index) => (
              <tr key={String((row as Record<string, unknown>).id ?? index)} className="border-t transition-colors hover:bg-muted/40">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-input" aria-label="Select row" />
                </td>
                {columns.map((column) => {
                  const value = (row as Record<string, unknown>)[String(column.key)];
                  return (
                    <td key={String(column.key)} className="px-4 py-3">
                      {column.render ? column.render(row) : String(value ?? "")}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" aria-label="Open row actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
        <span>
          Page {page} of {pageCount}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function statusColumn<T extends object>(key: keyof T | string = "status"): Column<T> {
  return {
    key: String(key),
    header: "Status",
    render: (row) => <StatusBadge status={String((row as Record<string, unknown>)[String(key)] ?? "active")} />
  };
}
