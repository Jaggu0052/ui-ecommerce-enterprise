import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark" | "system";
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
}

const initialState: ThemeState = {
  mode: "system",
  sidebarCollapsed: false,
  sidebarMobileOpen: false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<ThemeState["mode"]>) {
      state.mode = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleMobileSidebar(state) {
      state.sidebarMobileOpen = !state.sidebarMobileOpen;
    },
    closeMobileSidebar(state) {
      state.sidebarMobileOpen = false;
    }
  }
});

export const { setMode, toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = themeSlice.actions;
export default themeSlice.reducer;
