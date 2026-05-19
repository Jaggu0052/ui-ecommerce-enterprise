import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
