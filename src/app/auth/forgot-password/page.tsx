"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm, forgotSchema } from "@/components/forms/auth-forms";
import { authService } from "@/services/auth.service";
import type { z } from "zod";

export default function ForgotPasswordPage() {
  const mutation = useMutation({ mutationFn: authService.forgotPassword });

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Receive a recovery link for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode="forgot" loading={mutation.isPending} onSubmit={(values: z.infer<typeof forgotSchema>) => mutation.mutateAsync(values)} />
        {mutation.isSuccess && <p className="mt-4 text-sm text-emerald-500">If that email exists, a reset link has been sent.</p>}
        <p className="mt-5 text-sm text-muted-foreground">
          Remembered it? <Link className="text-primary hover:underline" href="/auth/login">Back to login</Link>
        </p>
      </CardContent>
    </Card>
  );
}
