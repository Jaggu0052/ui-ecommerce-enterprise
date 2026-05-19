"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm, registerSchema } from "@/components/forms/auth-forms";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import type { z } from "zod";

export default function LoginPage() {
  const { signIn } = useAuth();
  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => signIn(data.token, data.user)
  });

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Access your enterprise dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode="login" loading={mutation.isPending} onSubmit={(values: z.infer<typeof registerSchema>) => mutation.mutateAsync(values)} />
        <div className="mt-5 flex justify-between text-sm">
          <Link className="text-primary hover:underline" href="/auth/register">Create account</Link>
          <Link className="text-primary hover:underline" href="/auth/forgot-password">Forgot password?</Link>
        </div>
        {mutation.isError && <p className="mt-4 text-sm text-red-500">Unable to sign in. Check the seeded credentials and try again.</p>}
      </CardContent>
    </Card>
  );
}
