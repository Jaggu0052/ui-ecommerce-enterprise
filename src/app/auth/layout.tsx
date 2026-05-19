import { Boxes } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/constants/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)))]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1fr_440px]">
        <section className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="h-6 w-6" />
            </span>
            <span className="text-lg font-semibold">{APP_NAME}</span>
          </Link>
          <div className="mt-12 max-w-xl">
            <h1 className="text-5xl font-semibold tracking-normal">Command center for commerce, people, and operations.</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Manage seeded backend data across products, orders, customers, employees, attendance, salaries, and analytics in one production-ready dashboard.
            </p>
          </div>
        </section>
        {children}
      </div>
    </main>
  );
}
