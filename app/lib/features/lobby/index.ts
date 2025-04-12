import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";
import { Player } from "../player/player.types";
import { GAME_TYPE } from "../game/game.types";
import { LANGUAGES } from "./languages.types";
import { createLobby, joinLobby, leaveLobby } from "./api";

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
    // Update the state with the new lobby ID
    setLobbyId(state, action: PayloadAction<string>) {
      if (state.lobby) state.lobby.lobbyID = action.payload;
    },
    // Insert a new player into the state
    setPlayer(state, action: PayloadAction<Player>) {
      if (state.lobby) {
        const player = action.payload;
        // Update the playerName with a new team and role
        state.lobby.players = state.lobby.players.map((p) => {
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
  },
  extraReducers(builder) {
    builder
      .addCase(createLobby.pending, (state, _) => {
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
      .addCase(joinLobby.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(joinLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(joinLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(leaveLobby.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(leaveLobby.fulfilled, (state, _) => {
        state = initialState;
      })
      .addCase(leaveLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
  selectors: {
    selectLobby: (state) => state.lobby,
    selectLobbyId: (state) => state.lobby?.lobbyID,
    selectLobbyStatus: (state) => state.status,
    selectHost: (state) => state.lobby?.host,
    selectPlayers: (state) => state.lobby?.players,
    selectGameType: (state) => state.lobby?.gameType,
    selectLanguage: (state) => state.lobby?.language,
    selectPlayerCount: (state) => state.lobby?.playerCount,
  },
});

export const {
  setLobbyId,
  setPlayer,
  setGameType,
  setLanguage,
  updateConnections,
} = lobbySlice.actions;

export const {
  selectLobby,
  selectLobbyId,
  selectLobbyStatus,
  selectHost,
  selectPlayers,
  selectGameType,
  selectLanguage,
} = lobbySlice.selectors;

export default lobbySlice.reducer;
