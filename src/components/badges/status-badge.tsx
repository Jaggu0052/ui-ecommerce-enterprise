import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status?: string }) {
  const value = (status || "active").toLowerCase();
  const variant = value.includes("cancel") || value.includes("fail") || value.includes("inactive")
    ? "danger"
    : value.includes("pending") || value.includes("process")
      ? "warning"
      : value.includes("complete") || value.includes("paid") || value.includes("active")
        ? "success"
        : "default";

  return <Badge variant={variant}>{value.replaceAll("_", " ")}</Badge>;
}
