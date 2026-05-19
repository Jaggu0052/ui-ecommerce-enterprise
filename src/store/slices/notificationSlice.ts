import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "@/types";

interface NotificationState {
  unread: number;
  items: Notification[];
}

const initialState: NotificationState = {
  unread: 0,
  items: []
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.items = action.payload;
      state.unread = action.payload.filter((item) => !item.read).length;
    },
    markAllRead(state) {
      state.items = state.items.map((item) => ({ ...item, read: true }));
      state.unread = 0;
    }
  }
});

export const { markAllRead, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
