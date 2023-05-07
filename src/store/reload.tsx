import { createSlice } from "@reduxjs/toolkit";
const initialReloadSlice = { reload: false };
const reloadSlice = createSlice({
  name: "reload",
  initialState: initialReloadSlice,
  reducers: {
    change(state) {
      state.reload = !state.reload;
    },
  },
});

export default reloadSlice.reducer;
export const reloadAction = reloadSlice.actions;
