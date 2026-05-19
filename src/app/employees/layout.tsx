import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
