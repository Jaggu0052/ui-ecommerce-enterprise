"use client";

import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const user = useAppSelector((state:any) => state.auth.user);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="glass-panel">
        <CardHeader className="items-center text-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
            {getInitials(user?.name)}
          </span>
          <CardTitle>{user?.name || "Admin User"}</CardTitle>
          <Badge>{user?.role?.name || "SUPER_ADMIN"}</Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{user?.email || "admin@enterprise.com"}</p>
          <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-muted-foreground" />JWT authenticated session</p>
          <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-muted-foreground" />Role-based dashboard access</p>
        </CardContent>
      </Card>
      <Card className="glass-panel">
        <CardHeader><CardTitle>Profile Activity</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {["Orders approved", "Products updated", "Employee reviews"].map((label, index) => (
            <div key={label} className="rounded-lg border bg-background/60 p-4">
              <p className="text-2xl font-semibold">{[128, 42, 19][index]}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
