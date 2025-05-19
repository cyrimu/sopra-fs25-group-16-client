import { createGameSocketMiddleware } from "@/websockets/wsGameClient";
import { createLobbySocketMiddleware } from "@/websockets/wsLobbyClient";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import player from "./features/player/index";
import lobby from "./features/lobby/index";
import game from "./features/game/index";
import { combineReducers } from "redux";
import old from "./features/old";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "lobby", "game", "old"],
};

const rootReducer = combineReducers({
  player,
  lobby,
  game,
  old,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (gDM) =>
      gDM().concat(createGameSocketMiddleware(), createLobbySocketMiddleware()),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(makeStore());
