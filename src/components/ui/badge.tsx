import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      danger: "bg-red-500/10 text-red-600 dark:text-red-400",
      secondary: "bg-secondary text-secondary-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
