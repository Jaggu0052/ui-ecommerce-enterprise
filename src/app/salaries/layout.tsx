import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function SalariesLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
