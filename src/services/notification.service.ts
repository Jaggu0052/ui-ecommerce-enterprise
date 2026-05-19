import { api } from "@/services/api";
import { normalizeList } from "@/lib/utils";
import type { Notification } from "@/types";

export const notificationService = {
  async list() {
    const { data } = await api.get("/notifications");
    return normalizeList<Notification>(data);
  }
};
