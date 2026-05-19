import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
