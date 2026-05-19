"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notificationService } from "@/services/notification.service";

export default function NotificationsPage() {
  const query = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });
  const items = query.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">Notifications</h2>
          <p className="text-sm text-muted-foreground">Operational alerts, order updates, employee events, and system messages.</p>
        </div>
        <Button variant="outline">
          <CheckCheck className="h-4 w-4" />
          Mark all read
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="glass-panel">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                  <span className="rounded-md bg-primary/10 p-2 text-primary"><Bell className="h-4 w-4" /></span>
                  <CardTitle>Notification channel ready</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">Real-time notification UI is connected to the backend notification endpoint.</CardContent>
              </Card>
            ))
          : items.map((item) => (
              <Card key={item.id} className="glass-panel">
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle>{item.title}</CardTitle>
                  {!item.read && <Badge>New</Badge>}
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{item.message}</CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
