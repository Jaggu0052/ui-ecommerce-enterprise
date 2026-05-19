import {
  BarChart3,
  Bell,
  Boxes,
  BriefcaseBusiness,
  ClipboardList,
  FolderTree,
  Home,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  UserRound,
  Users,
  WalletCards
} from "lucide-react";
import type { Role } from "@/types";

export const APP_NAME = "EnterpriseOS Commerce";
export const API_BASE_URL = "https://api-ecommerce-enterprise-backend.onrender.com";

export const ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "EMPLOYEE", "CUSTOMER"];

export const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "EMPLOYEE"] },
  { title: "Ecommerce", href: "/ecommerce", icon: ShoppingCart, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "CUSTOMER"] },
  { title: "Products", href: "/products", icon: Package, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Categories", href: "/categories", icon: FolderTree, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Orders", href: "/orders", icon: ReceiptText, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "CUSTOMER"] },
  { title: "Customers", href: "/customers", icon: Users, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Employees", href: "/employees", icon: BriefcaseBusiness, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Attendance", href: "/attendance", icon: ClipboardList, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "EMPLOYEE"] },
  { title: "Salaries", href: "/salaries", icon: WalletCards, roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Notifications", href: "/notifications", icon: Bell, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "EMPLOYEE", "CUSTOMER"] },
  { title: "Analytics", href: "/analytics", icon: BarChart3, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Settings", href: "/settings", icon: Settings, roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Profile", href: "/profile", icon: UserRound, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "EMPLOYEE", "CUSTOMER"] }
] satisfies Array<{ title: string; href: string; icon: typeof Boxes; roles: Role[] }>;
