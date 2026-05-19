import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
