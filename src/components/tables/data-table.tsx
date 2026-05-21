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

      {pageRows.length === 0 ? (
        <div className="border-t p-6 text-center text-sm text-muted-foreground">No records found.</div>
      ) : (
        <div className="grid gap-4 border-t p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pageRows.map((row, index) => (
            <div
              key={String((row as Record<string, unknown>).id ?? index)}
              className="group overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary/70 hover:bg-primary/5 hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <p className="truncate text-base font-semibold text-foreground">
                    {String((row as Record<string, unknown>)[String(columns[0].key)] ?? "")}
                  </p>
                  <p className="text-sm text-muted-foreground">{title}</p>
                </div>
                <Button variant="ghost" size="icon" aria-label="Open row actions">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {columns.map((column) => {
                  const value = (row as Record<string, unknown>)[String(column.key)];
                  return (
                    <div key={String(column.key)} className="rounded-2xl border border-muted/20 bg-muted/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{column.header}</p>
                      <div className="mt-2 text-sm font-medium text-foreground">
                        {column.render ? column.render(row) : String(value ?? "")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

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
