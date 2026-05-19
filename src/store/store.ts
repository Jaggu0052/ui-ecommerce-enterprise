import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import notificationReducer from "@/store/slices/notificationSlice";
import themeReducer from "@/store/slices/themeSlice";
import userReducer from "@/store/slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notifications: notificationReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
