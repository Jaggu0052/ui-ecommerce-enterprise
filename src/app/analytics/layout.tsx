import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
