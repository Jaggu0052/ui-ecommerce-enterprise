import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
