import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AttendanceLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
