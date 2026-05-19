"use client";

import { AppNavbar } from "@/components/navbar/app-navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <AppNavbar />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
