import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Player, PLAYER_ROLES } from "./player.types";
import { TEAM_COLOR } from "../lobby/lobby.types";

const initialState = {
  playerName: undefined,
  role: undefined,
  team: undefined,
} satisfies Player as Player;

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerName(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
    setPlayerRole(state, action: PayloadAction<PLAYER_ROLES>) {
      state.role = action.payload;
    },
    setPlayerTeam(state, action: PayloadAction<TEAM_COLOR>) {
      state.team = action.payload;
    },
  },
  selectors: {
    selectPlayerName: (state) => state.playerName,
    selectPlayerRole: (state) => state.role,
    selectPlayerTeam: (state) => state.team,
  },
});

export const { setPlayerName, setPlayerRole, setPlayerTeam } =
  playerSlice.actions;

export const { selectPlayerName, selectPlayerRole, selectPlayerTeam } =
  playerSlice.selectors;

export default playerSlice.reducer;
