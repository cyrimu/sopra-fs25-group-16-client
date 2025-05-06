import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";
import { Player } from "../player/player.types";
import { GAME_TYPE } from "../game/game.types";
import { LANGUAGES } from "./languages.types";
import { createLobby, deleteLobby, joinLobby, leaveLobby } from "./api";

interface LobbyState {
  lobby: Lobby | undefined;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LobbyState = {
  lobby: undefined,
  status: "idle",
  error: null,
};

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    // Set an updated lobby object
    setLobby(state, action: PayloadAction<Lobby>) {
      state.lobby = action.payload;
    },
    // Update the state with the new lobby ID
    setLobbyId(state, action: PayloadAction<string>) {
      if (state.lobby) state.lobby.lobbyID = action.payload;
    },
    // Insert a new player into the state
    setPlayer(state, action: PayloadAction<Player>) {
      if (state.lobby) {
        const player = action.payload;
        // Update the playerName with a new team and role
        const players = state.lobby.players.filter((p) => p);

        state.lobby.players = players.map((p) => {
          if (p.playerName === player.playerName) {
            return {
              ...p,
              team: player.team,
              role: player.role,
            };
          }
          return p;
        });
      }
    },
    // Set the game type
    setGameType(state, action: PayloadAction<GAME_TYPE>) {
      if (state.lobby) state.lobby.gameType = action.payload;
    },
    // Set the language
    setLanguage(state, action: PayloadAction<LANGUAGES>) {
      if (state.lobby) state.lobby.language = action.payload;
    },
    // Update the number of connected players
    updateConnections(state, action: PayloadAction<number>) {
      if (state.lobby) state.lobby.playerCount = action.payload;
    },
    // Delete lobby
    lobbyBeenDeleted() {
      return initialState;
    },
    // Set players ready
    setPlayersReady(state, action: PayloadAction<string[]>) {
      if (state.lobby) {
        state.lobby.playersReady = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(createLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(joinLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(joinLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(joinLobby.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.error);
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(leaveLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(leaveLobby.fulfilled, () => initialState)
      .addCase(leaveLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(deleteLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteLobby.fulfilled, () => initialState)
      .addCase(deleteLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
  selectors: {
    selectLobby: (state) => state.lobby,
    selectLobbyId: (state) => state.lobby?.lobbyID,
    selectLobbyStatus: (state) => state.status,
    selectPlayers: (state) => state.lobby?.players,
    selectGameType: (state) => state.lobby?.gameType,
    selectLanguage: (state) => state.lobby?.language,
    selectPlayersReady: (state) => state.lobby?.playersReady,
  },
});

export const {
  setLobby,
  setLobbyId,
  setGameType,
  setLanguage,
  setPlayer,
  setPlayersReady,
  lobbyBeenDeleted,
} = lobbySlice.actions;

export const {
  selectLobby,
  selectLobbyId,
  selectLobbyStatus,
  selectPlayers,
  selectGameType,
  selectLanguage,
  selectPlayersReady,
} = lobbySlice.selectors;

export default lobbySlice.reducer;
