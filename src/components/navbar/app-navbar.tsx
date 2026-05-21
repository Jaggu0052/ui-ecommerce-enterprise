"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileSidebar } from "@/store/slices/themeSlice";

export function AppNavbar() {
  const pathname = usePathname();
  const title = pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "dashboard";
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const unread = useAppSelector((state) => state.notifications.unread);

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Button
          className="lg:hidden"
          variant="ghost"
          size="icon"
          aria-label="Open mobile navigation"
          onClick={() => dispatch(toggleMobileSidebar())}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0">
          <p className="text-xs uppercase text-muted-foreground">Workspace</p>
          <h1 className="truncate text-lg font-semibold capitalize">{title}</h1>
        </div>
        <div className="ml-auto hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="bg-muted/50 pl-9" placeholder="Search orders, products, employees" />
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>
        <Button asChild variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
            {unread > 0 && <Badge className="absolute -right-1 -top-1 px-1.5 py-0 text-[10px]">{unread}</Badge>}
          </Link>
        </Button>
        <Button asChild variant="ghost" className="hidden gap-2 sm:flex">
          <Link href="/profile">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {getInitials(user?.name)}
            </span>
            <span className="max-w-32 truncate text-sm">{user?.name || "Admin User"}</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={signOut} aria-label="Logout">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
