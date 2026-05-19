import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark" | "system";
  sidebarCollapsed: boolean;
}

const initialState: ThemeState = {
  mode: "system",
  sidebarCollapsed: false
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
    }
  }
});

export const { setMode, toggleSidebar } = themeSlice.actions;
export default themeSlice.reducer;
