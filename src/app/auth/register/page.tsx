"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm, registerSchema } from "@/components/forms/auth-forms";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import type { z } from "zod";

export default function RegisterPage() {
  const { signIn } = useAuth();
  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => signIn(data.token, data.user)
  });

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Register a new dashboard user.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode="register" loading={mutation.isPending} onSubmit={(values: z.infer<typeof registerSchema>) => mutation.mutateAsync(values)} />
        <p className="mt-5 text-sm text-muted-foreground">
          Already registered? <Link className="text-primary hover:underline" href="/auth/login">Sign in</Link>
        </p>
      </CardContent>
    </Card>
  );
}
