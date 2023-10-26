import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import minifigsReducer from "./minifigs/minifigs.reducer";

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: [],
}

const rootReducer = combineReducers({
    minifigsReducer: minifigsReducer
});

export default persistReducer(persistConfig, rootReducer);