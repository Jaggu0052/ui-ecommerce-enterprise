import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
