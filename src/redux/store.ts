import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
