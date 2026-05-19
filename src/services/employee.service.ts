import { api } from "@/services/api";
import { normalizeList } from "@/lib/utils";
import type { Employee } from "@/types";

export const employeeService = {
  async list(params?: Record<string, unknown>) {
    const { data } = await api.get("/employees", { params });
    return normalizeList<Employee>(data);
  }
};
