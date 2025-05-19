import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlagsState {
  deleteLobby: boolean;
  startGame: boolean;
  returnLobby: boolean;
  saveGame: boolean;
}

const initialState: FlagsState = {
  deleteLobby: false,
  startGame: false,
  returnLobby: false,
  saveGame: false,
};

const flags = createSlice({
  name: "flags",
  initialState,
  reducers: {
    // The host deletes the lobby
    setDeleteLobby(state, action: PayloadAction<boolean>) {
      state.deleteLobby = action.payload;
    },
    // Start a new or an old game
    setStartGame(state, action: PayloadAction<boolean>) {
      state.startGame = action.payload;
    },
    // Return to the lobby
    setReturnLobby(state, action: PayloadAction<boolean>) {
      state.returnLobby = action.payload;
    },
    // Notify users when a game is saved
    setSaveGame(state, action: PayloadAction<boolean>) {
      state.saveGame = action.payload;
    },
  },
  selectors: {
    selectDeleteLobby: (state) => state.deleteLobby,
    selectStartGame: (state) => state.startGame,
    selectReturnLobby: (state) => state.returnLobby,
    selectSaveGame: (state) => state.saveGame,
  },
});

export const { setDeleteLobby, setStartGame, setReturnLobby, setSaveGame } =
  flags.actions;

export const {
  selectDeleteLobby,
  selectReturnLobby,
  selectStartGame,
  selectSaveGame,
} = flags.selectors;

export default flags.reducer;
