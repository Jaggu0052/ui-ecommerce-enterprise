"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME, sidebarItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/themeSlice";

export function AppSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.theme.sidebarCollapsed);
  const role = useAppSelector((state) => state.auth.user?.role) ?? "SUPER_ADMIN";

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r bg-card/80 backdrop-blur-xl transition-all duration-300 lg:block",
        collapsed ? "w-[76px]" : "w-72"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Boxes className="h-5 w-5" />
          </span>
          {!collapsed && <span className="truncate text-sm font-semibold">{APP_NAME}</span>}
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())} aria-label="Collapse sidebar">
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>
      {collapsed && (
        <div className="p-3">
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())} aria-label="Expand sidebar">
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        </div>
      )}
      <nav className="space-y-1 p-3">
        {sidebarItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  active && "bg-primary/10 text-primary",
                  collapsed && "justify-center px-0"
                )}
                title={item.title}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
