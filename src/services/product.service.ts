import { api } from "@/services/api";
import { normalizeList } from "@/lib/utils";
import type { Category, Product } from "@/types";

export const productService = {
  async list(params?: Record<string, unknown>) {
    const { data } = await api.get("/products", { params });
    return normalizeList<Product>(data);
  },
  async categories() {
    const { data } = await api.get("/categories");
    return normalizeList<Category>(data);
  },
  async create(payload: Partial<Product>) {
    const { data } = await api.post("/products", payload);
    return data;
  },
  async update(id: string, payload: Partial<Product>) {
    const { data } = await api.patch(`/products/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  }
};
