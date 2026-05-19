"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2)
});

export const forgotSchema = z.object({
  email: z.string().email()
});

type AuthMode = "login" | "register" | "forgot";

export function AuthForm({
  mode,
  onSubmit,
  loading
}: {
  mode: AuthMode;
  onSubmit: (values: z.infer<typeof registerSchema>) => Promise<unknown> | unknown;
  loading?: boolean;
}) {
  const schema = mode === "register" ? registerSchema : mode === "forgot" ? forgotSchema : loginSchema;
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" }
  });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      {mode === "register" && (
        <div className="space-y-2">
          <Label>Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Admin User" {...form.register("name")} />
          </div>
          {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
        </div>
      )}
      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="admin@enterprise.com" {...form.register("email")} />
        </div>
        {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
      </div>
      {mode !== "forgot" && (
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" type="password" placeholder="••••••••" {...form.register("password")} />
          </div>
          {form.formState.errors.password && <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>}
        </div>
      )}
      <Button className="w-full" disabled={loading}>
        {loading ? "Please wait" : mode === "login" ? "Sign in" : mode === "register" ? "Create account" : "Send reset link"}
      </Button>
    </form>
  );
}
