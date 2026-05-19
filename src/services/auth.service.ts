import { api } from "@/services/api";
import type { User } from "@/types";

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  async register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },
  async forgotPassword(payload: { email: string }) {
    const { data } = await api.post("/auth/forgot-password", payload);
    return data;
  }
};
