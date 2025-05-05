import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Old } from "./old.types";

interface OldState {
  old: Old[];
}

const initialState: OldState = {
  old: [],
};

const oldSlice = createSlice({
  name: "old",
  initialState,
  reducers: {
    // Set the old games
    setOldGame(state, action: PayloadAction<Old>) {
      state.old = [...state.old, action.payload];
    },
    deleteOldGame(state, action: PayloadAction<string>) {
      state.old = state.old.filter((g) => g.gameID !== action.payload);
    },
  },
  selectors: {
    selectOldGames: (state) => state.old,
  },
});

export const { setOldGame, deleteOldGame } = oldSlice.actions;

export const { selectOldGames } = oldSlice.selectors;

export default oldSlice.reducer;
