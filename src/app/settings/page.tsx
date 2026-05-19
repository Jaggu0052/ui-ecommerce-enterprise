"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">Settings</h2>
          <p className="text-sm text-muted-foreground">Tenant preferences, role policy, notifications, and dashboard behavior.</p>
        </div>
        <Button><Save className="h-4 w-4" />Save</Button>
      </div>
      <Card className="glass-panel max-w-3xl">
        <CardHeader><CardTitle>Workspace Configuration</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Workspace Name</Label>
            <Input defaultValue="EnterpriseOS Commerce" />
          </div>
          <div className="space-y-2">
            <Label>Default Role</Label>
            <Select defaultValue="MANAGER">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="EMPLOYEE">Employee</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <Input defaultValue="24 hours" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Input defaultValue="USD" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
