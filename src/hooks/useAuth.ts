"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getStoredToken, getStoredUser, persistSession } from "@/lib/auth";
import { hydrateAuth, logout, setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { User } from "@/types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(hydrateAuth({ token: getStoredToken(), user: getStoredUser() }));
  }, [dispatch]);

  function signIn(token: string, user: User) {
    persistSession(token, user);
    dispatch(setCredentials({ token, user }));
    router.push("/dashboard");
  }

  function signOut() {
    clearSession();
    dispatch(logout());
    router.push("/auth/login");
  }

  return { ...auth, signIn, signOut };
}
