import { createGameSocketMiddleware } from "@/websockets/wsGameClient";
import { createLobbySocketMiddleware } from "@/websockets/wsLobbyClient";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import player from "./features/player/index";
import lobby from "./features/lobby/index";
import game from "./features/game/index";
import { combineReducers } from "redux";
import flags from "./features/flags";
import old from "./features/old";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["flags"],
};

const rootReducer = combineReducers({
  player,
  lobby,
  game,
  old,
  flags,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(createGameSocketMiddleware(), createLobbySocketMiddleware()),
});

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);
