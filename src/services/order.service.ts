import { api } from "@/services/api";
import { normalizeList } from "@/lib/utils";
import type { Order } from "@/types";

export const orderService = {
  async list(params?: Record<string, unknown>) {
    const { data } = await api.get("/orders", { params });
    return normalizeList<Order>(data);
  },
  async get(id: string) {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  }
};
