import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "@/store/provider";

export const metadata: Metadata = {
  title: "EnterpriseOS Commerce",
  description: "Enterprise ecommerce, employee management, and ERP dashboard platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
