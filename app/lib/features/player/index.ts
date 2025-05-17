import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  username: string;
}

const initialState: PlayerState = {
  username: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload.trim();
    },
  },
  selectors: {
    selectUsername: ({ username }) => username,
  },
});

export const { setUsername } = playerSlice.actions;

export const { selectUsername } = playerSlice.selectors;

export default playerSlice.reducer;
