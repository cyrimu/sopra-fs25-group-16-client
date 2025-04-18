import { createSocketMiddleware } from "@/websockets/wsClient";
import { configureStore } from "@reduxjs/toolkit";
import player from "./features/player/index";
import lobby from "./features/lobby/index";
import game from "./features/game/index";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player,
      lobby,
      game,
    },
    middleware: (gDM) => gDM().concat(createSocketMiddleware()),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
