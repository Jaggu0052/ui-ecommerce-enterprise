import { api } from "@/services/api";
import { normalizeList } from "@/lib/utils";
import type { Customer } from "@/types";

export const customerService = {
  async list(params?: Record<string, unknown>) {
    const { data } = await api.get("/customers", { params });
    return normalizeList<Customer>(data);
  }
};
