import { configureStore } from "@reduxjs/toolkit";
import reloadReducer from "./reload";
const store = configureStore({
  reducer: { reload: reloadReducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
