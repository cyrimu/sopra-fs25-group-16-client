import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  playerName: string | undefined;
}

const initialState: PlayerState = {
  playerName: undefined,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerName(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
  },
  selectors: {
    selectPlayerName: ({ playerName }) => playerName,
  },
});

export const { setPlayerName } = playerSlice.actions;

export const { selectPlayerName } = playerSlice.selectors;

export default playerSlice.reducer;
